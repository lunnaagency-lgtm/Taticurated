# Codex brief: Phase 3 — shop filtering and sorting

Build client-side filtering and sorting into the shop, so a growing catalog stays easy
to browse. This is UI only. The data model, cart, and money path are done and fixed.

Run first: `npm install && npm run dev` (works on sample data). Finish with `npm run build`
passing and the sitemap generating.

## Hard rules (unchanged from the earlier brief)
- Do NOT touch `src/lib/**`, `src/pages/api/**`, or `studio/**`. Do NOT change any
  `getStaticPaths`, data fetching, or JSON-LD in pages.
- No stock images. No em dashes, en dashes, or hyphens used as dashes in copy.
- Read config from `src/config/brand.ts`. Product shape is in `src/lib/types.ts`
  (`title, brand, size, condition, colors[], category, priceCents, status`).
- Pages stay static. Filtering and sorting happen client-side over the already-rendered
  grid. No server calls, no new endpoints.

## What to build
1. A filter and sort experience on `/shop` (src/pages/shop/index.astro) and on the category
   pages (src/pages/shop/[category].astro). Factor it into a reusable component
   (e.g. `src/components/ShopControls.astro`) that takes the product list and renders the
   controls plus the grid, so both pages share it.
2. Add `data-*` attributes to each product card (edit `ProductCard.astro`, or wrap it) so
   the client script can filter and reorder without refetching: `data-size`, `data-brand`,
   `data-condition`, `data-colors` (space joined), `data-category`, `data-price` (cents,
   for sorting and range), `data-status`, and a stable `data-created-index` for the default
   "newest" order (use the array index passed in).
3. Controls, with options derived from the actual product set (do not hardcode facet lists):
   - Size, Brand, Condition, Color: multi-select chips or checkboxes. Only show values that
     exist in the current set.
   - Price: a simple range (min/max or a few bands is fine).
   - A "Hide sold" toggle (sold items still render for SEO, but can be hidden here).
   - Sort: Newest (default), Price low to high, Price high to low.
4. Show a live result count ("12 pieces"). Show a friendly empty state when nothing matches,
   with a "Clear filters" action.
5. Mobile: put the filters in a collapsible panel or a slide-up sheet, with an "apply/close"
   affordance. Desktop: an inline bar or a left rail, your call, but keep it on brand.
6. Keep it coquette editorial, matching the existing wine/blush/cream system and the tokens
   in `tailwind.config.mjs`. Accessible: labelled controls, keyboard usable, visible focus.

## Optional, only if clean
A subtle "Add to bag" affordance on grid cards (hover on desktop). The cart API is
`import { addToCart } from '../lib/cart'` and a line is `{ slug, title, priceCents, image, size }`;
dispatching is handled by the module. The card is an `<a>`, so make the add control a real
button layered above it (stop propagation), not a nested link. Skip this if it gets messy.

## Acceptance
- `npm run build` passes, sitemap generates, no console errors.
- Filtering and sorting work with zero page reloads; the URL can stay as is.
- Product, Offer, and FAQPage JSON-LD on product pages remain untouched.
- Summarize every file you changed and flag anything outside the allowed UI files.
