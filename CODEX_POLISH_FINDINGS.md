# Tati Curated polish findings

## Brand

* Replaced the remaining visible and asset references to Curated by Tati with Tati Curated in the 404 page, about page, product share text, shop metadata, category metadata, Open Graph artwork, favicon title, and llms.txt.
* Preserved the intentional Curated by Tati alias in `src/lib/faq.ts`.
* Preserved the Depop handle `@curatedbytati_`.
* Left `src/lib`, `src/pages/api`, and `studio` unchanged.

## Performance

* Passed product image width and height data through every product card, gallery thumbnail, and main product image.
* Kept a reserved aspect ratio around product media. The cart thumbnail also has explicit dimensions, so image space is reserved before loading.
* Set the first product card image and the main product image to eager loading with high fetch priority. Remaining product card images and gallery thumbnails use lazy loading and asynchronous decoding.
* Added no dependencies and no new client side state. The largest generated client script is 11.06 KB before compression and 3.74 KB after gzip.
* Confirmed the bundled Playfair Display and Open Sauce Sans font faces use `font-display: swap`.

## Responsive behavior

* Kept the filtered shop at two product columns through 1024 px. It moves to three columns at 1280 px, when the available card width is comfortable.
* Reduced the filter rail to 13 rem at 768 px, then restores the wider 16 rem rail at 1024 px.
* Made product price and size stack at 320 px, then flow naturally from 375 px upward.
* Changed the product trust cues to a readable two plus one layout on narrow phones. They become three columns once the product panel has enough room.
* Kept category chips and gallery thumbnails inside dedicated horizontal scroll containers. The page body clips accidental horizontal overflow.
* Standardized primary controls, navigation links, chips, filter controls, and dialog controls around a minimum 44 by 44 px touch target.

### Breakpoint checks

The compiled responsive rules were checked at the requested widths:

* 320 px: two product columns, stacked card metadata, two plus one product trust cues, contained chip scrolling.
* 375 px: two product columns with flexible card metadata, contained chip scrolling.
* 768 px: two product columns beside the compact filter rail, about 234 px available per card.
* 1024 px: two product columns beside the full filter rail, about 328 px available per card.
* 1280 px: three filtered product columns, about 296 px available per card.

## Visual cohesion

* Added shared card and panel radius tokens plus card, panel, hover, and overlay shadow tokens.
* Applied the shared surface system to product cards, product detail panels, filters, dialogs, policy panels, and home category cards.
* Standardized the wine border treatment and blush hover treatment across category chips, navigation controls, filters, and modal controls.
* Preserved the approved wine, blush, cream, ink, and gold palette.
* Kept existing focus outlines and reduced motion support. No stock imagery was introduced.
* Checked the main small text combinations against the approved palette. Measured ratios range from 5.39 to 8.73 to 1, above the 4.5 to 1 WCAG AA requirement.

## Typography and rhythm

* Added balanced heading wrapping and improved paragraph wrapping.
* Standardized eyebrow tracking and line height.
* Applied a 68 character reading measure to long about and policy copy.
* Normalized the shared FAQ section rhythm to match the major page sections.
* Confirmed every generated page has exactly one H1.
* Shortened the home search title to 50 characters and the home description to 153 characters.

## Validation

* `npm run build` passes.
* 31 routes prerender successfully.
* `sitemap-index.xml` and `sitemap-0.xml` are generated.
* The build reports an existing environment warning that local Node 25 is not a supported Vercel Serverless build version. The adapter completes successfully and selects its supported runtime.

## Human verification still needed

* Review the main home, shop, product, cart, welcome dialog, about, and policy views on physical devices at 320, 375, 768, 1024, and 1280 px.
* Recheck product crops and visual layout shift after real Sanity photos are loaded, including unusually tall and wide source images.
* Confirm hover feel, focus order, chip scrolling, and gallery interaction in a real browser. This workspace could not open a local preview port and did not expose a browser backend, so the final pass used compiled output and breakpoint rule checks rather than browser screenshots.
