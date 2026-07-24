/**
 * Client-side cart for one-of-a-kind items. Because every piece is quantity one,
 * the cart is just a set of slugs (no quantities). It lives in localStorage since
 * there are no accounts, and the checkout endpoint re-validates price and
 * availability on the server, so the cart is display-only and never trusted for money.
 *
 * Updates broadcast a `cart:change` window event plus the native `storage` event, so
 * every mounted component (header count, drawer) stays in sync without a shared module
 * instance.
 */
export interface CartLine {
  slug: string;
  title: string;
  priceCents: number;
  image: string | null;
  size: string | null;
}

const KEY = 'tatiCart_v1';

export function getCart(): CartLine[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

function save(lines: CartLine[]): void {
  localStorage.setItem(KEY, JSON.stringify(lines));
  window.dispatchEvent(new CustomEvent('cart:change'));
}

/** Adds a piece. No-op if it is already in the cart (one of a kind, quantity one). */
export function addToCart(line: CartLine): { added: boolean; lines: CartLine[] } {
  const lines = getCart();
  if (lines.some((l) => l.slug === line.slug)) return { added: false, lines };
  const next = [...lines, line];
  save(next);
  return { added: true, lines: next };
}

export function removeFromCart(slug: string): CartLine[] {
  const next = getCart().filter((l) => l.slug !== slug);
  save(next);
  return next;
}

/** Drop slugs that came back unavailable from checkout (already sold elsewhere). */
export function pruneCart(unavailableSlugs: string[]): CartLine[] {
  if (!unavailableSlugs.length) return getCart();
  const next = getCart().filter((l) => !unavailableSlugs.includes(l.slug));
  save(next);
  return next;
}

export function cartCount(): number {
  return getCart().length;
}

export function cartSubtotalCents(): number {
  return getCart().reduce((sum, l) => sum + l.priceCents, 0);
}

export function isInCart(slug: string): boolean {
  return getCart().some((l) => l.slug === slug);
}

/** Subscribe to any cart mutation (this tab or another). Returns an unsubscribe fn. */
export function onCartChange(fn: () => void): () => void {
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) fn();
  };
  window.addEventListener('cart:change', fn);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener('cart:change', fn);
    window.removeEventListener('storage', onStorage);
  };
}
