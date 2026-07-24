# Codex brief: Curated by Tati storefront UI buildout

## Your job
Take this working scaffold and elevate the **visual and content layer** into a
polished, distinctive storefront. The plumbing (payments, catalog, schema, build)
is done and verified. You own how it looks, reads, and feels. Do not rebuild logic.

Run it first: `npm install && npm run dev` (works today on sample data).

## Who this is for
Tatiana (@curatedbytati_ on Depop). She sells hand-picked, one-of-a-kind secondhand
fashion: coquette dresses, y2k pieces, statement heels, trending sneakers (Nike, Vans,
Sugar Thrillz), colorful bags. Customer is Gen-Z women into coquette / soft-girl /
y2k-streetwear. Her brand mark is an elegant burgundy serif badge. Voice is warm and
playful ("unique cute finds"), a little editorial.

The feeling to hit: **coquette editorial meets curated vintage boutique.** Feminine,
premium, a bit romantic, clean galleries that let the clothes pop. Not a generic
Shopify template, not loud, not cluttered.

## Hard rules — do not break these

**Do NOT touch (owned + tested):**
- `src/lib/**` (types, products, sanity, stripe, inventory, env)
- `src/pages/api/**` (checkout, webhook)
- `studio/**` (Sanity schema)
- The `getStaticPaths`, data fetching, and JSON-LD objects inside pages
- Stripe/Sanity contracts and the `Product` type shape

**You own:**
- `src/components/**` — elevate all, add as many as you want
- `src/layouts/Base.astro` — improve markup/styles, but keep the `<head>` SEO + the
  `jsonLd`/schema logic and the `<slot />`
- The **presentational** parts of `src/pages/**.astro` (hero, grids, detail layout,
  about copy) — leave the frontmatter data/schema logic intact
- All copywriting

**Constraints:**
- **No stock images, ever.** Real product photos come from Sanity. Until then keep the
  branded placeholder pattern in `ProductCard`/product page (blush gradient + title).
- **No em dashes, en dashes, or hyphens used as dashes** in any copy. Use periods and
  commas. (Client preference, strict.)
- Keep the `BuyButton` fetch-to-`/api/checkout` behavior exactly. Restyle only.
- Everything must stay responsive and pass `npm run build` with zero console errors.
- Design tokens live in `tailwind.config.mjs` (wine, blush, cream, ink, gold) and fonts
  are `font-display` (Playfair) + `font-sans` (Open Sauce). Use them; extend if needed.

## Build list

1. **Header** — refine the sticky header. Add a slim top announcement bar ("Every piece
   is one of a kind. Once it is gone, it is gone."). Real mobile menu (drawer or sheet)
   for the category links. No cart icon (single-item checkout, no basket).
2. **Hero (home)** — make it editorial and memorable. Consider an asymmetric or
   split composition, generous type, her badge energy. Keep the two CTAs.
3. **Product grid + card** — elevated cards, refined hover (image zoom, quick peek of
   size/brand), a clean sold treatment, category chips that feel like a boutique.
4. **Product detail** — the money page. Multi-photo gallery with thumbnails and a main
   image (data already supports `images[]`), sticky buy panel on desktop, size and
   condition as chips, trust cues ("one of a kind", "ships in 1 to 3 days"), a tasteful
   share button. Keep the schema and BuyButton.
5. **About / story** — turn the placeholder copy into a real editorial brand story in
   her voice. Keep the FAQ schema block.
6. **Footer** — add a newsletter email capture (stub the form action, Phase 2 wires it),
   socials, brand line.
7. **Polish** — a branded 404 page, empty-state styling, loading/hover micro-interactions,
   focus states for a11y, and a proper favicon/OG image treatment (generate on-brand, not
   stock). Mobile first.

## Copy voice
Warm, playful, a little coquette. Short sentences. Emoji sparingly (she uses them). Think
"your cool friend with the best closet," not corporate. Examples of tone are in
`src/config/brand.ts` (`bioVoice`, `tagline`).

## Acceptance
- `npm run build` passes, sitemap still generates, no console errors.
- Product pages still emit `Product` + `Offer` JSON-LD (verify one in devtools).
- Buy button still calls `/api/checkout` and shows the graceful message when Stripe is off.
- Looks intentional and on-brand on mobile and desktop.

## Handoff
When done, hand the diff back to Claude to verify against these contracts (money path,
schema, build) and ship to main. Flag anything you changed outside "You own" above.
