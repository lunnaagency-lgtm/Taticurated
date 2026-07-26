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
  tagline: 'The missing piece to your next fit.',
  description:
    'Tati Curated hand sources one of a kind cotton, linen, wool, and silk pieces for women and men. Timeless natural fiber quality, new drops daily, and shipping in 1 to 2 days.',
  // Warm, emoji-forward voice pulled from her Depop bio.
  bioVoice: "They don't make them like this anymore. I hand source one of a kind cotton, linen, wool, and silk pieces for women and men. New drops daily. Orders ship in 1 to 2 days.",
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
 * Palette derived from her burgundy serif badge + coquette / y2k product mix.
 * Consumed by tailwind.config.mjs. Codex styles against these tokens.
 */
export const PALETTE = {
  wine: '#6E2433', // brand mark burgundy
  wineDeep: '#511824',
  blush: '#F5E4E7', // soft coquette pink
  blushDeep: '#E9C6CD',
  cream: '#FBF7F2', // editorial off-white background
  ink: '#241C1E', // near-black text, warm
  gold: '#C9A227', // sparing accent
} as const;
