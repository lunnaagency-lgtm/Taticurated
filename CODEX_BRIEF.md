# Codex brief: Tati Curated storefront buildout

## Your job
Take this working Astro scaffold and build it into a polished, distinctive, GEO-first
storefront. The plumbing (payments, catalog, email capture, schema, build) is done and
verified. You own the **visual and content layer**. Do not rebuild logic.

Run it first: `npm install && npm run dev` (works today on sample data). When you finish,
`npm run build` must pass with zero errors and the sitemap must still generate.

## Brand
Tatiana (@curatedbytati_ on Depop). Domain is **taticurated.com**. Display name is
**"Curated by Tati"** (her existing burgundy serif badge). The name **"Tati Curated"** is
also used, especially in copy and FAQ, so both should read naturally.

She sells hand-picked, one-of-a-kind secondhand fashion: coquette dresses, y2k pieces,
statement heels, trending sneakers (Nike, Vans, Sugar Thrillz), colorful bags. Customer is
Gen-Z women into coquette / soft-girl / y2k-streetwear. Voice is warm, playful, a little
editorial ("unique cute finds").

**She has seen and likes the current design.** Elevate and extend that language. Do not
redesign from scratch. Feeling to hit: coquette editorial meets curated vintage boutique.
Feminine, premium, romantic, clean galleries that let the clothes pop.

## Hard rules (do not break)

**Do NOT touch (owned + tested):**
- `src/lib/**` (types, products, sanity, stripe, inventory, env, faq)
- `src/pages/api/**` (checkout, webhook, subscribe)
- `studio/**` (Sanity schema)
- The `getStaticPaths`, data fetching, and JSON-LD objects inside pages
- Stripe / Sanity / subscribe contracts and the `Product` type

**You own:** everything in `src/components/**`, `src/layouts/Base.astro` (markup/style, but
keep the `<head>` SEO + `jsonLd` logic + `<slot />`), the presentational parts of
`src/pages/**.astro`, and all copy. Add components and pages freely.

**Constraints:**
- **No stock images, ever.** Real photos come from Sanity later. Keep the branded blush
  placeholder pattern until then. Any favicon / OG image you make must be original SVG.
- **No em dashes, en dashes, or hyphens used as dashes** in any copy. Periods and commas
  only. This is a strict client rule.
- Keep `BuyButton` -> `/api/checkout` and the welcome form -> `/api/subscribe` behavior.
  Restyle only.
- Design tokens are in `tailwind.config.mjs` (wine, blush, cream, ink, gold). Fonts are
  `font-display` (Playfair) + `font-sans` (Open Sauce). Read config values from
  `src/config/brand.ts` (`SITE`, `MARKETING`) rather than hardcoding.
- Responsive and accessible. `npm run build` clean.

## Build list

### 1. Welcome email capture modal (NEW, priority)
First-visit modal offering **10% off the first order** for an email.
- Show once per visitor (localStorage), after a short delay or on exit intent. Dismissible.
- Email field -> `POST /api/subscribe` with `{ email }`. On success the JSON returns
  `{ code, percent }`. Show a success state with the code (e.g. TATI10) and a copy button.
- Read the headline percentage from `MARKETING.welcomeDiscountPercent`.
- On-brand: blush/cream card, wine accents, serif headline, soft entrance. Not spammy.

### 2. Bundle promo banner (NEW)
A promo band at the **top of the footer** using `MARKETING.bundle.message`
("Bundle up. Add 3 pieces to your order and get 10% off."). Make it feel intentional and
boutique, wine or blush. It advertises the offer. (Enforcement needs the cart, which is a
separate task the repo owner is building. Do not build cart/checkout logic.)

### 3. FAQ across pages, GEO-optimized (NEW, priority)
The content is written and lives in `src/lib/faq.ts` (`FAQ` array + `faqSchema()` helper).
It is tuned for her niche and for AI answer engines. Do NOT rewrite the answers; you may
reorder or subset per page.
- Build a reusable `<Faq />` component that renders `FAQ` (accordion or clean list).
- Put a FAQ section on the **home page, the about page, and product pages** (a relevant
  subset is fine on product pages), and add a dedicated **`/faq` page** with the full list.
- On every page that shows FAQ content, inject `faqSchema(...)` into `<head>` via Base's
  `jsonLd` prop so it is eligible for rich results and AI citation. Import the helper from
  `../lib/faq`.

### 4. About page buildout (NEW)
Turn `src/pages/about.astro` into a real editorial brand story in her voice: what "curated"
means to her, one of a kind, the coquette/y2k point of view, why buy from the site vs a
marketplace. Keep it citable and warm. Include the FAQ section. Keep any schema logic.

### 5. Core UI elevation
- **Header**: refine; add a slim top announcement bar; real mobile menu. No cart icon yet.
- **Hero (home)**: editorial and memorable, keep the two CTAs.
- **Product grid + card**: elevated cards, refined hover, clean sold treatment, boutique
  category chips.
- **Product detail**: multi-photo gallery with thumbnails (data supports `images[]`), sticky
  buy panel on desktop, size/condition chips, one-of-a-kind trust cues, tasteful share.
- **Footer**: bundle band (above), newsletter capture (reuse the subscribe endpoint),
  socials (Depop link is in `SITE.depop`), brand line.
- **Polish**: branded 404, empty states, focus states, micro-interactions, original SVG
  favicon + OG treatment. Mobile first.

## GEO / SEO notes (this is the whole point)
This store exists to be found and cited where Depop cannot. So: keep pages static and fast,
keep every `<title>`/meta/description meaningful, use semantic headings, keep the schema
(Product, Store, FAQPage) intact and add FAQPage where you render FAQ. Naming the brand both
ways and using niche terms (coquette, y2k, secondhand, one of a kind) in visible copy helps.

## Acceptance
- `npm run build` passes, sitemap generates, no console errors in the browser.
- Product pages still emit `Product` + `Offer` JSON-LD; FAQ pages emit `FAQPage`.
- Welcome modal calls `/api/subscribe` and shows the code; Buy still calls `/api/checkout`.
- Looks intentional and on-brand, mobile and desktop.

## Handoff
When done, run `npm run build`, then summarize every file you changed and flag anything
touched outside "You own." The repo owner (Claude) verifies against the contracts (money
path, schema, build) and ships.
