import type { APIRoute } from 'astro';
import type Stripe from 'stripe';
import { getStripe } from '../../lib/stripe';
import { getEnv } from '../../lib/env';
import { markSold, markAvailable } from '../../lib/inventory';

export const prerender = false;

/**
 * POST /api/webhook. Stripe events. This is the authoritative sold-out mechanism.
 *
 *   checkout.session.completed -> item is paid for -> mark sold
 *   checkout.session.expired   -> buyer never paid -> free the reservation
 *
 * The signature is verified against STRIPE_WEBHOOK_SECRET using the raw body, so
 * forged requests are rejected.
 */
export const POST: APIRoute = async ({ request }) => {
  const stripe = getStripe();
  const webhookSecret = getEnv('STRIPE_WEBHOOK_SECRET');
  if (!stripe || !webhookSecret) {
    return new Response('Webhook not configured.', { status: 503 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) return new Response('Missing signature.', { status: 400 });

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    return new Response(`Signature verification failed: ${(err as Error).message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const ids = productIdsFrom(event.data.object as Stripe.Checkout.Session);
        if (ids.length) {
          await Promise.all(ids.map((id) => markSold(id)));
          await triggerRebuild(); // refresh the static grids/pages so items show as sold
        }
        break;
      }
      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        const ids = productIdsFrom(session);
        await Promise.all(ids.map((id) => markAvailable(id, session.id)));
        break;
      }
      default:
        break; // ignore everything else
    }
  } catch (err) {
    // Log and 500 so Stripe retries rather than dropping the event.
    console.error('Webhook handler error:', err);
    return new Response('Handler error', { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

/**
 * Product ids attached at checkout. Cart orders set metadata.productIds (comma
 * separated); older single-item sessions used metadata.productId. Support both.
 */
function productIdsFrom(session: Stripe.Checkout.Session): string[] {
  const many = session.metadata?.productIds;
  if (many) return many.split(',').map((s) => s.trim()).filter(Boolean);
  const one = session.metadata?.productId;
  return one ? [one] : [];
}

/**
 * Optional: ping a Vercel Deploy Hook so the static storefront rebuilds with the
 * just-sold item marked sold. No-ops if VERCEL_DEPLOY_HOOK_URL is unset. The
 * checkout endpoint's fresh availability check guards sales during the rebuild.
 */
async function triggerRebuild(): Promise<void> {
  const hook = getEnv('VERCEL_DEPLOY_HOOK_URL');
  if (!hook) return;
  try {
    const res = await fetch(hook, { method: 'POST' });
    if (!res.ok) console.error(`Deploy hook returned HTTP ${res.status}`);
  } catch (err) {
    console.error('Deploy hook ping failed:', err);
  }
}
