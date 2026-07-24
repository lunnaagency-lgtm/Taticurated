/**
 * The product contract. This shape is shared across the storefront UI, the Stripe
 * Checkout endpoint, and the Sanity schema. Inventory is one-of-a-kind, so there is
 * no quantity field: `status` is the whole inventory model.
 *
 *   available -> in stock, buyable
 *   reserved  -> a live Checkout session is holding it (auto-frees after COMMERCE.reserveMinutes)
 *   sold      -> gone; page stays up for SEO but shows sold out
 */
export type ProductStatus = 'available' | 'reserved' | 'sold';

export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Product {
  /** Stable id (Sanity _id, or a slug-derived id for sample data). */
  id: string;
  /** URL slug, e.g. "nike-air-max-dia-light-violet". */
  slug: string;
  title: string;
  brand: string | null;
  /** Free-text size as she lists it, e.g. "US 9.5", "M", "One size". */
  size: string | null;
  /** e.g. "Like new", "Good", "Fair". */
  condition: string | null;
  /** Primary color words for filtering + schema. */
  colors: string[];
  /** High-level category slug: shoes | dresses | tops | bottoms | bags | accessories. */
  category: string;
  priceCents: number;
  description: string;
  images: ProductImage[];
  status: ProductStatus;
  /** Optional: highlight on the home page. */
  featured?: boolean;
}

export const CATEGORIES = [
  { slug: 'dresses', label: 'Dresses' },
  { slug: 'tops', label: 'Tops' },
  { slug: 'bottoms', label: 'Bottoms' },
  { slug: 'shoes', label: 'Shoes' },
  { slug: 'bags', label: 'Bags' },
  { slug: 'accessories', label: 'Accessories' },
  { slug: 'home-decor', label: 'Home decor' },
] as const;

export function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: (cents % 100 === 0) ? 0 : 2,
  });
}
