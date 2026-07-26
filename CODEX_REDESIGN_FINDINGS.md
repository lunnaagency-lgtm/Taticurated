# Tati Curated Redesign Findings

## Outcome

The storefront now uses a complete editorial boutique system built around warm ivory, soft ink, restrained fabric inspired pastels, generous spacing, and expressive Fraunces display typography. The redesign preserves the existing Astro architecture, product contract, Sanity access, Stripe checkout requests, cart behavior, inventory states, email capture behavior, URLs, metadata, schema, sitemap generation, and Vercel adapter.

## Visual system

The retired wine, burgundy, gold, and old blush system was removed from Tailwind, page components, social metadata, and public brand assets.

The new reusable palette is:

| Role | Token | Value |
| --- | --- | --- |
| Base | cream | `#F8F4EC` |
| Base | ivory | `#FCFAF7` |
| Base | soft white | `#FFFDFC` |
| Neutral | paper | `#EEE5D8` |
| Neutral | parchment | `#E5DACB` |
| Text | ink | `#2F2A28` |
| Text | brown | `#574A45` |
| Muted neutral | taupe | `#8B817B` |
| Accent | blush | `#EFD9DE` |
| Accent | rose | `#D8B8BF` |
| Accent | blue | `#DCE6EF` |

Fraunces replaces Playfair for display typography. Open Sauce remains the body and interface typeface. A lightweight inline SVG grain creates a low contrast uncoated paper effect with no external request.

## Header and navigation

The header now has generous wordmark space, a warm ivory background, fine dividers, restrained bag and menu controls, a desktop category row, and a stronger mobile menu. Every navigation item resolves to an existing route. Unsupported fiber and price filters were not added to navigation.

The current wordmark is intentionally structured as a placeholder. The final logo can replace it with `/logo.svg` or `/logo.png` without changing the header or footer layout.

## Homepage

The homepage was rebuilt as a discovery and trust experience in the requested order:

1. Asymmetrical hero using the exact tagline.
2. Just Sourced product edit.
3. Aspirational Shop by Fiber tiles.
4. Everyday Pieces selected from the lowest priced available items.
5. Rare Finds selected from the highest priced available items.
6. Brand philosophy.
7. Five step curation process.
8. Existing shop categories.
9. Founder story.
10. Dedicated email capture with the requested message.

The fiber tiles link to `/shop`. A code comment marks the product fiber field as a required follow up before real fiber filtering can be introduced.

## Product discovery

Product cards now prioritize large imagery on warm neutral backgrounds, with minimal containers, quiet one of one and inventory states, clear names, prices, sizes, and condition. Affordable and higher priced items use the same component and presentation.

Shop filters, sort controls, empty states, category tabs, cart states, newsletter forms, welcome offer, FAQ controls, and buttons now use the same visual system and accessible focus treatment.

## Product pages

The product page now prioritizes:

1. Product name and price.
2. Size, condition, and availability.
3. Add to bag and immediate checkout.
4. The reason the piece made the edit.
5. Listing details.
6. Fit and measurement guidance.
7. Material and construction disclosure.
8. Shipping and final sale guidance.

The gallery, image thumbnails, sold state, share control, cart integration, checkout request, metadata, Product schema, FAQ schema, and static path generation were retained.

No material, fit, measurement, or construction fields were invented. The page uses the existing description and product properties, with clear guidance around available listing details.

## Footer and public brand assets

The footer now includes the wordmark placeholder, shop links, About, FAQ, Shipping, Returns, Contact, Depop, policy links, email capture, Fort Lauderdale positioning, and the exact tagline.

The favicon was recolored into the new ink, ivory, and blush system. The retired SVG social card was replaced with a new editorial PNG using the final palette, exact tagline, fabric swatches, measurement details, and the short brand descriptor.

The public `llms.txt` positioning was also aligned with the redesigned brand language and honest composition policy.

## Protected functionality

No changes were made to:

* `src/pages/api`
* `studio`
* `src/lib/cart.ts`
* `src/lib/env.ts`
* `src/lib/inventory.ts`
* `src/lib/products.ts`
* `src/lib/sanity.ts`
* `src/lib/stripe.ts`
* `src/lib/types.ts`
* Product data shape
* Commerce configuration
* Marketing configuration

The only edited library file is `src/lib/faq.ts`, and its change is copy only.

## Verification completed

`npm run build` passes.

The build generated all static storefront and product routes plus `sitemap-index.xml` and `sitemap-0.xml`.

`git diff --check` passes.

The retired design tokens and Playfair dependency no longer appear in the storefront system. The word “wine” remains only as a real product color and product description in sample product data.

The customer facing source contains no em dash or en dash characters.

Core palette contrast checks:

| Pair | Contrast |
| --- | --- |
| Ink on cream | 12.91 to 1 |
| Brown on cream | 7.75 to 1 |
| Ink on ivory | 13.59 to 1 |
| Brown on ivory | 8.16 to 1 |
| Ink on blush | 10.56 to 1 |
| Ink on powder blue | 11.20 to 1 |
| Ivory on ink | 13.59 to 1 |
| Ivory on brown | 8.16 to 1 |

These primary text combinations exceed WCAG AA requirements for small text.

## Human browser verification

The workspace sandbox blocked the local Astro preview server, and no connected browser was available. A human should complete a final visual pass at approximately 1440, 1024, 768, 390, and 320 pixels wide.

Verify these items in the real browser:

1. Header logo scale and spacing once the final logo asset is supplied.
2. Hero line breaks and placeholder proportion at each target width.
3. Product crop quality with the live Sanity catalog.
4. Filter panel height and sticky position with a long live catalog.
5. Cart drawer focus order and checkout handoff in a Stripe test environment.
6. Email capture responses with production environment variables.
7. Live listing composition, measurement, and condition completeness.
8. Social preview crop on iMessage, Slack, X, and other unfurl surfaces.

The local build used Node 25 while the project declares Node 20. The Astro Vercel adapter warned that the local Node version is unsupported and selected its compatible serverless runtime. Confirm the production Vercel project is using the intended Node 20 setting.
