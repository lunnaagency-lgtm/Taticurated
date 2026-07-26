# Tati Curated Design Refinement Findings

## Typography

The storefront now uses the two bundled local fonts throughout:

* Barlow Condensed Bold for display typography
* Barlow Medium for body and interface typography

Both fonts load with `font-display: swap`. Display typography is bold, uppercase, condensed, set at `0.04em` letter spacing, and uses a line height of `1`. The body baseline uses a line height of `1.4`.

The Fraunces and Open Sauce runtime imports, Tailwind mappings, package dependencies, and lockfile entries were removed.

## Logo

The real `/logo.webp` wordmark replaces the temporary text mark in the header and footer. It is shown directly on the ivory surfaces with no surrounding card or border. The header version scales from 160 pixels on mobile to 220 pixels on large screens. Both placements use the requested `Tati Curated` alt text.

## Product cards

Product cards now use a calm four color editorial cycle:

* Faded blush
* Dusty rose
* Powder blue
* Pale sage

Each piece receives the same warm white image stage, branded fallback treatment, uppercase display title, editorial material and fit line, price, size, and restrained hover lift. When separate fiber or fit fields are not available, the card safely falls back to existing brand and condition information. Sold and reserved treatments remain clear but subdued.

Small brown text on the darkest pastel, dusty rose, has a calculated contrast ratio of 4.67 to 1. The other pastel combinations exceed that result, so the card text meets the requested WCAG AA threshold.

## Hero

The hero now uses the requested headline and full supporting line, plus the optional affordable to rare positioning line. Both calls to action and the four trust points remain intact.

The image side is a larger, clean editorial slot with a branded warm white placeholder. Its structure can accept a real portrait format campaign image without changing the hero layout.

## First order offer

A contained pastel campaign band now presents `Receive 10% off your first order`. Its `Sign me up` button jumps to the existing footer signup form, which preserves the existing subscribe request and welcome code behavior.

The announcement bar now reads `10% off your first purchase.` and links to the same signup form.

## Positioning line

`Previously loved. Natural fibers first. New pieces added regularly.` was removed from the announcement bar and reintroduced lower on the homepage as one restrained three part editorial moment.

## Real photography still needed

Three areas are intentionally using branded placeholders:

1. The homepage hero image slot
2. The first order offer image band
3. Any product listing without images from Sanity

No stock photography was added.

## Scope and validation

Commerce, Sanity, Stripe, inventory, schema, URLs, SEO metadata, cart behavior, API routes, studio files, and `src/lib` files were not changed.

`npm run build` passes. Astro generated the complete static route set and created `.vercel/output/static/sitemap-index.xml`, pointing to `https://taticurated.com/sitemap-0.xml`.
