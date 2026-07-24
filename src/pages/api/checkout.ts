import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { getProductBySlug, getFreshStatus } from '../../lib/products';
import { getStripe } from '../../lib/stripe';
import { markReserved } from '../../lib/inventory';
import { getEnv } from '../../lib/env';
import { COMMERCE, MARKETING } from '../../config/brand';

export const prerender = false; // runs on-demand at the edge/serverless

/**
 * POST /api/checkout   { slug: string }  or  { slugs: string[] }
 *
 * Creates one Stripe Checkout Session for one or more one-of-a-kind items (the cart).
 * Price and availability are read on the server from our own catalog with an uncached
 * read, so a tampered client cannot change the amount charged or buy a sold item.
 * Items already gone are returned in `unavailable` so the cart can prune them.
 *
 * Bundle: when the number of available items reaches MARKETING.bundle.minItems, the
 * discount is auto-applied using the Stripe coupon id in STRIPE_BUNDLE_COUPON_ID.
 * Stripe forbids combining `discounts` with `allow_promotion_codes`, so when no coupon
 * id is configured we instead leave promo codes open (the code can be typed at Stripe).
 */
export const POST: APIRoute = async ({ request }) => {
  let slugs: string[] = [];
  try {
    const body = await request.json();
    if (Array.isArray(body?.slugs)) {
      slugs = body.slugs.filter((s: unknown): s is string => typeof s === 'string');
    } else if (typeof body?.slug === 'string') {
      slugs = [body.slug];
    }
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  slugs = [...new Set(slugs)];
  if (!slugs.length) return json({ error: 'Your cart is empty.' }, 400);

  const stripe = getStripe();
  if (!stripe) {
    return json(
      { error: 'Checkout is not configured yet. Add STRIPE_SECRET_KEY to enable purchases.' },
      503,
    );
  }

  // Stripe Tax stays off until the shop is registered for sales tax. Flip on with
  // STRIPE_TAX_ENABLED=true; Stripe then calculates tax from the shipping address.
  const taxEnabled = getEnv('STRIPE_TAX_ENABLED') === 'true';

  // Authoritative, uncached availability check for every item.
  const available = [] as NonNullable<Awaited<ReturnType<typeof getProductBySlug>>>[];
  const unavailable: string[] = [];
  for (const slug of slugs) {
    const product = await getProductBySlug(slug);
    if (!product) {
      unavailable.push(slug);
      continue;
    }
    const liveStatus = await getFreshStatus(slug);
    if ((liveStatus ?? product.status) !== 'available') {
      unavailable.push(slug);
      continue;
    }
    available.push(product);
  }

  if (!available.length) {
    return json({ error: 'Sorry, those just sold or are on hold.', unavailable }, 409);
  }

  const origin = getEnv('PUBLIC_SITE_URL') || new URL(request.url).origin;

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = available.map((product) => ({
    quantity: 1,
    price_data: {
      currency: COMMERCE.currency,
      unit_amount: product.priceCents,
      ...(taxEnabled ? { tax_behavior: 'exclusive' as const } : {}),
      product_data: {
        name: product.title,
        description:
          [product.brand, product.size, product.condition].filter(Boolean).join(' • ') || undefined,
        images: product.images.slice(0, 1).map((i) => i.url).filter(Boolean),
        metadata: { productId: product.id, slug: product.slug },
      },
    },
  }));

  // Bundle discount: auto-apply when eligible and a coupon is configured; otherwise
  // keep promo codes open so a welcome/bundle code can still be entered at Stripe.
  const bundleEligible = available.length >= MARKETING.bundle.minItems;
  const bundleCoupon = getEnv('STRIPE_BUNDLE_COUPON_ID');
  const discountConfig: Partial<Stripe.Checkout.SessionCreateParams> =
    bundleEligible && bundleCoupon
      ? { discounts: [{ coupon: bundleCoupon }] }
      : { allow_promotion_codes: true };

  const productIds = available.map((p) => p.id).join(',');
  const cancelUrl =
    available.length === 1
      ? `${origin}/product/${available[0].slug}?checkout=cancelled`
      : `${origin}/shop?checkout=cancelled`;

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    ...(taxEnabled ? { automatic_tax: { enabled: true } } : {}),
    ...discountConfig,
    line_items,
    shipping_address_collection: { allowed_countries: [...COMMERCE.shipToCountries] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: COMMERCE.shippingFlatRateCents, currency: COMMERCE.currency },
          display_name: 'Standard shipping (1 to 3 days)',
        },
      },
    ],
    // One shared shipment for the whole cart. Session expiry frees the reservations.
    expires_at: Math.floor(Date.now() / 1000) + Math.max(30, COMMERCE.reserveMinutes) * 60,
    metadata: { productIds },
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
  });

  // Best-effort hold on every item. No-ops in sample-data mode; the webhook is the
  // source of truth for sold/expired.
  await Promise.all(available.map((p) => markReserved(p.id, session.id).catch(() => {})));

  return json({ url: session.url, unavailable });
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
