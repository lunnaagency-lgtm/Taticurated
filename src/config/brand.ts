/**
 * Single source of truth for brand identity, commerce rules, and palette.
 *
 * DOMAIN IS TBA. When the domain is chosen (curatedbytati.com / taticurated.com /
 * other), update SITE.url and SITE.domain here and nowhere else. Every page, the
 * sitemap, canonical tags, and JSON-LD read from this file.
 */

export const SITE = {
  name: 'Curated by Tati',
  shortName: 'Curated by Tati',
  // Domain chosen 2026-07-24: taticurated.com. Display name stays "Curated by Tati"
  // (her existing badge / Depop identity). Swap SITE.name if that ever changes.
  url: 'https://taticurated.com',
  domain: 'taticurated.com',
  tagline: 'Unique cute finds, hand-picked and one of a kind.',
  description:
    'Curated by Tati is a hand-picked secondhand shop of one-of-a-kind cute finds. Coquette dresses, y2k denim, statement heels, and trending sneakers. Every piece is unique, so once it sells it is gone.',
  // Warm, emoji-forward voice pulled from her Depop bio.
  bioVoice: "I'm selling unique cute finds. Every piece is hand-picked and one of a kind. Offers welcomed, ships in 1 to 3 days.",
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
 * - Bundle: "add N pieces, get X% off the order." NOTE: honoring this needs a cart
 *   (multi-item checkout). The current store is single-item checkout, so the bundle
 *   is advertised now and enforced once the cart lands. See CODEX_BRIEF / README.
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
