import type { Product } from '../lib/types';

/**
 * Seed catalog for the natural fiber Tati Curated positioning. Used
 * automatically whenever SANITY_PROJECT_ID is unset, so the storefront builds,
 * renders, and can be styled before any account exists.
 *
 * NOTE: These products, prices, and sizes are representative placeholders.
 * Tati enters real values and real photos in Sanity. Images are intentionally
 * empty so the UI shows branded placeholders, never stock.
 */
export const sampleProducts: Product[] = [
  {
    id: 'sample-mens-linen-shirt',
    slug: 'mens-ivory-linen-shirt',
    title: 'Men’s Ivory Linen Shirt',
    brand: null,
    size: 'M',
    condition: 'Excellent',
    colors: ['ivory'],
    category: 'tops',
    priceCents: 5800,
    description:
      'A breathable pure linen shirt for men with a relaxed collar and softly structured fit. The kind of layer that gets better with every wear.',
    images: [],
    status: 'available',
    featured: true,
  },
  {
    id: 'sample-womens-wool-overcoat',
    slug: 'womens-camel-wool-overcoat',
    title: 'Women’s Camel Wool Overcoat',
    brand: null,
    size: 'S',
    condition: 'Excellent',
    colors: ['camel'],
    category: 'tops',
    priceCents: 12800,
    description:
      'A substantial wool overcoat for women with a clean long line, deep pockets, and timeless camel color. Warm, beautifully made, and ready for years of wear.',
    images: [],
    status: 'available',
  },
  {
    id: 'sample-silk-slip-dress',
    slug: 'black-silk-slip-dress',
    title: 'Black Silk Slip Dress',
    brand: null,
    size: 'S',
    condition: 'Like new',
    colors: ['black'],
    category: 'dresses',
    priceCents: 8400,
    description:
      'A fluid pure silk slip dress with a softly draped neckline and clean bias cut. Simple on its own and effortless under a knit or tailored jacket.',
    images: [],
    status: 'available',
    featured: true,
  },
  {
    id: 'sample-cotton-knit',
    slug: 'cream-cotton-fisherman-knit',
    title: 'Cream Cotton Fisherman Knit',
    brand: null,
    size: 'L',
    condition: 'Good',
    colors: ['cream'],
    category: 'tops',
    priceCents: 6400,
    description:
      'A weighty cotton fisherman knit with a relaxed unisex fit and rich cable texture. An easy layer for women and men across seasons.',
    images: [],
    status: 'available',
  },
  {
    id: 'sample-mens-cashmere-sweater',
    slug: 'mens-charcoal-cashmere-sweater',
    title: 'Men’s Charcoal Cashmere Sweater',
    brand: null,
    size: 'L',
    condition: 'Excellent',
    colors: ['charcoal'],
    category: 'tops',
    priceCents: 7600,
    description:
      'A fine cashmere wool crewneck for men in deep charcoal. Soft without feeling delicate, with a classic shape made for repeat wear.',
    images: [],
    status: 'reserved',
  },
  {
    id: 'sample-mens-raw-denim',
    slug: 'mens-indigo-raw-denim-jeans',
    title: 'Men’s Indigo Raw Denim Jeans',
    brand: null,
    size: '32',
    condition: 'Like new',
    colors: ['indigo'],
    category: 'bottoms',
    priceCents: 6800,
    description:
      'Rigid cotton raw denim for men with a straight leg and deep indigo finish. Built to soften, shape, and develop character through wear.',
    images: [],
    status: 'available',
  },
  {
    id: 'sample-womens-linen-trousers',
    slug: 'womens-stone-linen-trousers',
    title: 'Women’s Stone Linen Trousers',
    brand: null,
    size: 'M',
    condition: 'Excellent',
    colors: ['stone'],
    category: 'bottoms',
    priceCents: 5400,
    description:
      'Pure linen trousers for women with soft pleats, a high rise, and an easy straight leg. Polished enough for plans and comfortable enough for every day.',
    images: [],
    status: 'sold',
  },
  {
    id: 'sample-silk-scarf',
    slug: 'printed-silk-scarf',
    title: 'Printed Silk Scarf',
    brand: null,
    size: 'One size',
    condition: 'Excellent',
    colors: ['wine', 'cream'],
    category: 'accessories',
    priceCents: 3800,
    description:
      'A pure silk scarf in wine and cream with a soft hand rolled edge. Wear it at the neck, on a bag, or wherever the fit needs one final detail.',
    images: [],
    status: 'available',
  },
  {
    id: 'sample-cotton-canvas-tote',
    slug: 'natural-cotton-canvas-tote',
    title: 'Natural Cotton Canvas Tote',
    brand: null,
    size: 'One size',
    condition: 'Like new',
    colors: ['natural'],
    category: 'bags',
    priceCents: 3200,
    description:
      'A sturdy cotton canvas tote with reinforced handles and a clean unisex shape. Practical, durable, and made for daily use.',
    images: [],
    status: 'available',
  },
];
