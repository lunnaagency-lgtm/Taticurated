/**
 * Single source of truth for brand identity, commerce rules, and palette.
 *
 * The chosen domain is taticurated.com. Keep SITE.url and SITE.domain aligned.
 * Every page, canonical tag, and JSON-LD block reads from this file.
 */

export const SITE = {
  name: 'Tati Curated',
  shortName: 'Tati Curated',
  // Display name matches the domain: Tati Curated (taticurated.com). Her Depop badge
  // reads "Curated by Tati", kept only as an alias in FAQ copy and the Depop link.
  url: 'https://taticurated.com',
  domain: 'taticurated.com',
  tagline: "They don't make them like this no more.",
  description:
    'Tati Curated is an elevated boutique for previously loved clothing made primarily from natural fibers. Every one of a kind piece is hand sourced for its fabric, construction, character, and ability to be worn for years to come.',
  bioVoice: "They don't make them like this no more. Every piece is sourced by me, with the fabric, construction, character, and years ahead of it in mind.",
  depop: 'https://www.depop.com/curatedbytati_/',
  instagram: '', // add handle when ready
  email: 'taticuratedshop@gmail.com', // official order and support inbox
} as const;

/**
 * Commerce rules. Because inventory is one-of-a-kind (quantity 1), "sold" is a
 * boolean, never a count. Shipping is a flat rate collected at Stripe Checkout;
 * Tati prints labels herself (Pirate Ship / Shippo). Tax is off for the MVP and
 * becomes a one-line Stripe Tax toggle in Phase 2 once she registers.
 */
export const COMMERCE = {
  currency: 'usd',
  // Flat domestic shipping in cents. Mirrors her Depop "seller covers small shipping" model.
  shippingFlatRateCents: 500,
  // Countries she will ship to at checkout.
  shipToCountries: ['US'] as const,
  // Minutes a checkout session holds an item as "reserved" before it frees back up.
  reserveMinutes: 30,
} as const;

/**
 * Marketing offers, all in one place.
 *
 * - Welcome: first-visit email capture. The code is shown after signup and entered
 *   at Stripe Checkout (allow_promotion_codes is on). Create a matching Stripe
 *   promotion code with this exact value + percentage.
 * - Bundle: add N pieces and get X% off the order. The cart and checkout enforce
 *   the configured threshold when the matching Stripe coupon is available.
 */
export const MARKETING = {
  welcomeCapture: true,
  welcomeDiscountPercent: 10,
  welcomeCode: 'TATI10',
  bundle: {
    enabled: true,
    minItems: 3,
    discountPercent: 10,
    code: 'BUNDLE10',
    message: 'Bundle up. Add 3 pieces to your order and get 10% off.',
  },
} as const;

/**
 * Warm editorial palette built around the black script logo and natural materials.
 * Consumed by tailwind.config.mjs. Codex styles against these tokens.
 */
export const PALETTE = {
  cream: '#F8F4EC',
  ivory: '#FCFAF7',
  softWhite: '#FFFDFC',
  paper: '#EEE5D8',
  parchment: '#E5DACB',
  ink: '#2F2A28',
  brown: '#574A45',
  taupe: '#8B817B',
  blush: '#EFD9DE',
  rose: '#D8B8BF',
  blue: '#DCE6EF',
} as const;
