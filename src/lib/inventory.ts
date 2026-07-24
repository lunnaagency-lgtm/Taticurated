import type { ProductStatus } from './types';
import { sanityWrite, sanityFresh } from './sanity';

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

/**
 * Free an item back up when a Checkout session expires without payment. Only releases
 * if the item is still `reserved` by this exact session, so a late-arriving expiry
 * cannot reopen a piece that already sold or that a newer session now holds.
 */
export async function markAvailable(id: string, checkoutSessionId?: string): Promise<boolean> {
  if (!sanityWrite || !sanityFresh) return false;
  const doc = await sanityFresh.fetch<{ status?: string; reservedBy?: string } | null>(
    /* groq */ `*[_id == $id][0]{status, reservedBy}`,
    { id },
  );
  if (!doc || doc.status !== 'reserved') return false;
  if (checkoutSessionId && doc.reservedBy && doc.reservedBy !== checkoutSessionId) return false;
  await sanityWrite.patch(id).set({ status: 'available', reservedBy: null }).commit();
  return true;
}
