import type { ProductStatus } from './types';
import { sanityWrite } from './sanity';

/**
 * Inventory writes. One-of-a-kind means status is the whole model. All of these are
 * best-effort: in sample-data mode (no write client) they no-op and return false, so
 * the money path still works end to end for local testing.
 */

async function setStatus(
  id: string,
  status: ProductStatus,
  extra: Record<string, unknown> = {},
): Promise<boolean> {
  if (!sanityWrite) return false;
  await sanityWrite.patch(id).set({ status, ...extra }).commit();
  return true;
}

/** Hold an item while a Checkout session is live. Records the session for later reconciliation. */
export function markReserved(id: string, checkoutSessionId: string): Promise<boolean> {
  return setStatus(id, 'reserved', { reservedBy: checkoutSessionId });
}

/** Final state after a paid Checkout. */
export function markSold(id: string): Promise<boolean> {
  return setStatus(id, 'sold', { soldAt: new Date().toISOString() });
}

/** Free an item back up if a Checkout session expires without payment. */
export function markAvailable(id: string): Promise<boolean> {
  return setStatus(id, 'available', { reservedBy: null });
}
