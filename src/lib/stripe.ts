import Stripe from 'stripe';
import { getEnv } from './env';

/**
 * Lazily construct the server-side Stripe client at request time so the runtime
 * secret is read when the serverless function executes, not at module load. Returns
 * null when no key is set (e.g. sample-data mode) so callers can degrade gracefully.
 */
let cached: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (cached) return cached;
  const key = getEnv('STRIPE_SECRET_KEY');
  if (!key) return null;
  // No apiVersion pin: the SDK uses the version it ships with, avoiding coupling
  // to a string the installed types may not recognize.
  cached = new Stripe(key);
  return cached;
}

export const stripeConfigured = (): boolean => Boolean(getEnv('STRIPE_SECRET_KEY'));
