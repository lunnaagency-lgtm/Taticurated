import type { APIRoute } from 'astro';
import { getProductBySlug, getFreshStatus } from '../../lib/products';
import { getStripe } from '../../lib/stripe';
import { markReserved } from '../../lib/inventory';
import { getEnv } from '../../lib/env';
import { SITE, COMMERCE } from '../../config/brand';

export const prerender = false; // runs on-demand at the edge/serverless

/**
 * POST /api/checkout  { slug: string }
 *
 * Creates a Stripe Checkout Session for a single one-of-a-kind item. The price and
 * availability are read on the server from our own catalog, so a tampered client
 * request cannot change what is charged or buy a sold item. Returns { url } to
 * redirect the buyer to Stripe's hosted, PCI-compliant Checkout.
 */
export const POST: APIRoute = async ({ request }) => {
  let slug: string | undefined;
  try {
    const body = await request.json();
    slug = body?.slug;
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }
  if (!slug) return json({ error: 'Missing product slug.' }, 400);

  const stripe = getStripe();
  if (!stripe) {
    return json(
      { error: 'Checkout is not configured yet. Add STRIPE_SECRET_KEY to enable purchases.' },
      503,
    );
  }

  const product = await getProductBySlug(slug);
  if (!product) return json({ error: 'Item not found.' }, 404);

  // Authoritative, uncached availability check: static pages can be briefly stale,
  // so confirm against the source before creating a charge for a one-of-a-kind item.
  const liveStatus = await getFreshStatus(slug);
  if ((liveStatus ?? product.status) !== 'available') {
    return json({ error: 'Sorry, this one just sold or is on hold.' }, 409);
  }

  const origin = getEnv('PUBLIC_SITE_URL') || new URL(request.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: COMMERCE.currency,
          unit_amount: product.priceCents,
          product_data: {
            name: product.title,
            description: [product.brand, product.size, product.condition]
              .filter(Boolean)
              .join(' • ') || undefined,
            images: product.images.slice(0, 1).map((i) => i.url).filter(Boolean),
            metadata: { productId: product.id, slug: product.slug },
          },
        },
      },
    ],
    shipping_address_collection: {
      allowed_countries: [...COMMERCE.shipToCountries],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: COMMERCE.shippingFlatRateCents, currency: COMMERCE.currency },
          display_name: 'Standard shipping (1 to 3 days)',
        },
      },
    ],
    // Hold the item for the reserve window, then Stripe expires the session and our
    // webhook frees it back up. Stripe requires 30 min to 24 h.
    expires_at: Math.floor(Date.now() / 1000) + Math.max(30, COMMERCE.reserveMinutes) * 60,
    metadata: { productId: product.id, slug: product.slug },
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/product/${product.slug}?checkout=cancelled`,
  });

  // Best-effort hold. No-ops in sample-data mode; the webhook is the source of truth.
  await markReserved(product.id, session.id).catch(() => {});

  return json({ url: session.url });
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
