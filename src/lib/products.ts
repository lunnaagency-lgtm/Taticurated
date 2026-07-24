import type { Product, ProductStatus } from './types';
import { sanityRead, sanityFresh, sanityConfigured } from './sanity';
import { sampleProducts } from '../data/sampleProducts';

/**
 * Data access for products. Reads from Sanity when configured, otherwise serves the
 * sample catalog so the site works with zero setup. All storefront pages go through
 * these helpers, never the Sanity client directly.
 */

// Projects a Sanity `product` document into our Product contract.
const PRODUCT_PROJECTION = /* groq */ `{
  "id": _id,
  "slug": slug.current,
  title,
  brand,
  size,
  condition,
  "colors": coalesce(colors, []),
  "category": category,
  "priceCents": round(price * 100),
  description,
  "images": images[]{ "url": asset->url, "alt": coalesce(alt, ^.title), "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height },
  status,
  featured
}`;

export async function getAllProducts(): Promise<Product[]> {
  if (sanityConfigured && sanityRead) {
    return sanityRead.fetch<Product[]>(
      /* groq */ `*[_type == "product"] | order(status == "sold", _createdAt desc) ${PRODUCT_PROJECTION}`,
    );
  }
  return sortForDisplay(sampleProducts);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (sanityConfigured && sanityRead) {
    const result = await sanityRead.fetch<Product | null>(
      /* groq */ `*[_type == "product" && slug.current == $slug][0] ${PRODUCT_PROJECTION}`,
      { slug },
    );
    return result ?? null;
  }
  return sampleProducts.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const all = await getAllProducts();
  const featured = all.filter((p) => p.featured && p.status !== 'sold');
  const pool = featured.length ? featured : all.filter((p) => p.status !== 'sold');
  return pool.slice(0, limit);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.category === category);
}

/**
 * Live status straight from the source (no CDN cache), used by the checkout endpoint
 * to reject a sale on an item that just went reserved/sold. Falls back to sample data.
 */
export async function getFreshStatus(slug: string): Promise<ProductStatus | null> {
  if (sanityConfigured && sanityFresh) {
    return sanityFresh.fetch<ProductStatus | null>(
      /* groq */ `*[_type == "product" && slug.current == $slug][0].status`,
      { slug },
    );
  }
  return sampleProducts.find((p) => p.slug === slug)?.status ?? null;
}

// Available items first, then reserved, then sold; keeps sold pieces at the bottom.
function sortForDisplay(products: Product[]): Product[] {
  const rank: Record<ProductStatus, number> = { available: 0, reserved: 1, sold: 2 };
  return [...products].sort((a, b) => rank[a.status] - rank[b.status]);
}
