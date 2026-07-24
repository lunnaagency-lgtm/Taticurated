import type { APIRoute } from 'astro';
import { getEnv } from '../../lib/env';
import { MARKETING } from '../../config/brand';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/subscribe  { email }
 *
 * Captures a first-visit email for the welcome discount. Provider-agnostic: if
 * EMAIL_WEBHOOK_URL is set (Klaviyo/Mailchimp/Beehiiv inbound, Zapier, Make, etc.)
 * the email is forwarded there; otherwise it is logged so the UX still works in
 * dev/preview. Always returns the welcome code so the modal can show it immediately.
 */
export const POST: APIRoute = async ({ request }) => {
  let email: string | undefined;
  try {
    const body = await request.json();
    email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : undefined;
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  if (!email || !EMAIL_RE.test(email) || email.length > 320) {
    return json({ error: 'Please enter a valid email.' }, 400);
  }

  try {
    await forward(email);
  } catch (err) {
    // Never fail the shopper over a marketing integration hiccup.
    console.error('Subscribe forward failed:', err);
  }

  return json({
    ok: true,
    code: MARKETING.welcomeCode,
    percent: MARKETING.welcomeDiscountPercent,
  });
};

async function forward(email: string): Promise<void> {
  const webhook = getEnv('EMAIL_WEBHOOK_URL');
  if (webhook) {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'welcome-modal', ts: new Date().toISOString() }),
    });
    return;
  }
  console.log('[subscribe] captured (no EMAIL_WEBHOOK_URL configured):', email);
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
