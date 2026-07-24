# Curated by Tati static QA findings

Scope: static source review, rendered build output review, TypeScript validation, and a production build. Browser interaction and visual inspection were not performed.

## Fixed

1. File: `src/components/ProductCard.astro:13`. Severity: low. Finding: the `home-decor` slug rendered as `Home-decor` on product cards. Suggested fix: completed by formatting the category slug as the customer facing label `Home decor`.

2. Files: `src/components/AddToCartButton.astro:22`, `src/components/AddToCartButton.astro:29`, `src/components/BuyButton.astro:16`, `src/components/BuyButton.astro:23`. Severity: low. Finding: reusable commerce buttons relied on the browser default button type. Suggested fix: completed by adding `type="button"` to prevent accidental form submission if these components are ever placed inside a form.

3. File: `src/components/CartDrawer.astro:120`. Severity: med. Finding: the image only product link in each cart row had no accessible name because its image intentionally uses empty alt text. Suggested fix: completed by adding a product specific `aria-label` to the link.

4. File: `src/components/CartDrawer.astro:126`. Severity: med. Finding: every remove control had the same accessible name and relied on the default button type. Suggested fix: completed by adding a product specific `aria-label` and `type="button"`.

5. File: `src/pages/success.astro:6`. Severity: low. Finding: the success page inherited the home page description, creating duplicate metadata. Suggested fix: completed by adding a unique confirmation page description.

6. File: `src/pages/faq.astro:34`. Severity: low. Finding: a direct question ended with a period. Suggested fix: completed by using a question mark.

7. File: `src/config/brand.ts:19`. Severity: low. Finding: the displayed bio used the ungrammatical phrase `Offers welcomed` and did not say where offers are accepted. Suggested fix: completed by changing it to `Offers are welcome on Depop` and clarifying order shipping.

8. File: `src/data/sampleProducts.ts:25`. Severity: low. Finding: the lead sample product description contained a comma splice. Suggested fix: completed by separating the thoughts into two sentences.

9. File: `public/llms.txt:17`. Severity: med. Finding: the file claimed product schema had live availability even though availability is published at build time. Suggested fix: completed by describing it as published availability.

10. Files: `src/config/brand.ts:4`, `astro.config.mjs:6`, `README.md:33`, `README.md:84`, `README.md:94`. Severity: low. Finding: comments and project documentation still described the domain as undecided and shop filtering as future work. Suggested fix: completed by aligning the documentation with `taticurated.com` and the implemented Phase 3 controls.

## Needs review

### Correctness, money path, and launch readiness

1. Files: `src/data/sampleProducts.ts:8`, `src/data/sampleProducts.ts:11`, `src/lib/products.ts:28`. Severity: high. Finding: this QA build used 14 representative sample products, reconstructed prices, and no real product photos. These pages are also present in the generated sitemap. Suggested fix: configure the production Sanity project, publish verified inventory and images, rebuild, and confirm every sample slug is absent before launch. `src/lib` was not changed.

2. Files: `src/pages/api/checkout.ts:52`, `src/pages/api/checkout.ts:106`, `src/pages/api/checkout.ts:130`, `src/lib/inventory.ts:10`. Severity: high. Finding: availability is checked before Stripe session creation, but the reservation is a later best effort write whose failures are swallowed. Two near simultaneous requests can both see `available` and create checkout sessions for the same unique item. Suggested fix: implement an atomic compare and reserve operation before returning a checkout URL, with rollback and idempotency handling. Protected files were not changed.

3. Files: `src/pages/api/webhook.ts:47`, `src/pages/api/webhook.ts:49`, `src/lib/inventory.ts:31`. Severity: high. Finding: any expired checkout session sets its products back to `available` without confirming that `reservedBy` still matches that session. An older expiry can reopen an item held by a newer session or already sold. Suggested fix: make release conditional on both current status and the matching checkout session ID. Protected files were not changed.

4. Files: `src/pages/api/checkout.ts:69`, `src/pages/api/checkout.ts:132`, `src/components/CartDrawer.astro:207`. Severity: med. Finding: when only some requested products are unavailable, checkout continues with the remaining products and returns the unavailable list with a success response. The cart client only prunes that list for a `409`, so the shopper can be redirected without an explicit explanation that items were dropped. Suggested fix: stop and return a conflict whenever any requested item is unavailable, or show a confirmation step before continuing. Protected API code was not changed.

5. Files: `src/components/CartDrawer.astro:137`, `src/pages/api/checkout.ts:93`, `.env.example:18`. Severity: med. Finding: the cart says the bundle discount is applied at checkout, but automatic application only happens when `STRIPE_BUNDLE_COUPON_ID` is configured. Suggested fix: treat the coupon ID as a launch gate, then test a three item checkout. If manual code entry remains possible, make the cart message conditional and explicit.

6. Files: `src/pages/api/subscribe.ts:44`, `src/pages/api/subscribe.ts:54`, `.env.example:33`. Severity: high. Finding: without `EMAIL_WEBHOOK_URL`, email captures are written only to server logs while the shopper sees a successful signup. Suggested fix: configure and test the production email destination, including a failed destination test, before collecting real addresses. Protected API code was not changed.

7. File: `src/pages/api/webhook.ts:83`. Severity: med. Finding: the deploy hook call only handles network exceptions. A non successful HTTP response is treated as success, so sold state and published schema can remain stale without an alert. Suggested fix: check the response status, log a safe diagnostic, and add monitoring or a retry path. Protected API code was not changed.

8. Files: `src/pages/api/checkout.ts:25`, `src/pages/api/subscribe.ts:17`. Severity: med. Finding: public endpoints have no request rate control, and checkout accepts an unbounded slug array before sequential catalog reads. Suggested fix: cap cart size and request body size, then add platform rate controls for checkout and signup endpoints. Protected API code was not changed.

9. Files: `studio/schemaTypes/product.ts:85`, `src/lib/types.ts:35`, `src/lib/products.ts:22`. Severity: med. Finding: the TypeScript contract requires a product description, but the Sanity field is optional and the projection does not provide a fallback. A published product can therefore produce weak or invalid metadata and schema. Suggested fix: require a meaningful description in Sanity and add a defensive projection fallback after owner approval.

10. File: `studio/schemaTypes/product.ts:20`. Severity: med. Finding: product slugs are required but not checked for uniqueness. Duplicate slugs can collide during static generation and make checkout select an unintended record. Suggested fix: add an asynchronous uniqueness validation and audit existing content before launch.

11. File: `package.json:1`. Severity: med. Finding: no Node engine is pinned. The final build warned that local Node 25 is unsupported by the Vercel serverless adapter and that Node 18 will be used instead. Suggested fix: choose the production Node version, pin it in project and hosting settings, and rerun the full build with that exact version.

### SEO, GEO, and schema

12. Files: `src/pages/about.astro:8`, `src/pages/about.astro:39`, `src/pages/about.astro:42`. Severity: high. Finding: the about page emits two `FAQPage` blocks. The first contains shipping and returns questions that are not visibly rendered on that page, while the second matches the displayed FAQ subset. Suggested fix: remove the legacy schema object and keep only the schema generated from the visible `aboutFaq` content.

13. File: `src/pages/product/[slug].astro:20`. Severity: med. Finding: every status except `sold` maps to schema.org `InStock`, so a reserved product is advertised as in stock while both purchase controls say it is on hold. Suggested fix: map `reserved` to an unavailable value that matches the customer experience.

14. Files: `src/layouts/Base.astro:33`, `astro.config.mjs:11`. Severity: med. Finding: canonicals omit trailing slashes while generated sitemap URLs include them. Suggested fix: choose one URL convention, configure Astro and hosting redirects to match it, and regenerate both canonicals and the sitemap.

15. Files: `src/layouts/Base.astro:34`, `public/og.svg:1`. Severity: low. Finding: the default social preview is SVG, which has uneven support across link preview services. Suggested fix: verify previews on the launch channels and provide a branded raster fallback if any service fails to render the image.

16. Files: `src/lib/types.ts:48`, `src/pages/shop/[category].astro:16`. Severity: low. Finding: the empty Accessories category is indexable and included in the sitemap in this build. Suggested fix: publish real inventory before launch, or temporarily exclude empty category pages from indexing and the sitemap.

17. Files: `src/config/brand.ts:16`, `src/layouts/Base.astro:32`. Severity: low. Finding: the home title is 68 characters and the home description is 198 characters, so search results may truncate them. Suggested fix: approve shorter home metadata while preserving brand and category terms.

### Accessibility

18. Files: `src/components/CartDrawer.astro:150`, `src/components/CartDrawer.astro:158`, `src/components/CartDrawer.astro:177`. Severity: high. Finding: the modal cart does not move focus into the dialog, trap focus, make background content inert, or restore focus to its opener. Suggested fix: implement full dialog focus management and test keyboard and screen reader behavior in the human browser pass.

19. Files: `src/components/AddToCartButton.astro:46`, `src/components/CartDrawer.astro:95`, `src/components/Header.astro:31`. Severity: med. Finding: adding a product changes button text briefly and opens the cart without moving focus. The visual cart count is not announced or included in the bag button name. Suggested fix: use a polite live status, include the count in the accessible bag name, and coordinate this with the cart focus fix.

20. Files: `src/components/Footer.astro:39`, `src/components/Footer.astro:46`, `src/components/Footer.astro:56`, `src/components/CartDrawer.astro:47`, `src/components/CartDrawer.astro:118`, `src/components/CartDrawer.astro:126`. Severity: med. Finding: several small text styles use `wine` or `ink` at 50 to 60 percent opacity. Static contrast calculations against the cream and blush backgrounds range from about 2.6 to 4.3 to 1, below 4.5 to 1 for normal text. Suggested fix: have design select stronger approved token variants, then verify every foreground and actual background combination. No colors were changed during this pass.

21. Files: `src/pages/product/[slug].astro:60`, `src/pages/product/[slug].astro:108`, `src/pages/product/[slug].astro:127`, `src/pages/product/[slug].astro:164`, `src/pages/product/[slug].astro:174`. Severity: med. Finding: breadcrumb, placeholder, brand, trust cue, and detail label text also use low opacity colors at small sizes. Suggested fix: include these combinations in the contrast review and preserve at least 4.5 to 1 for normal text.

22. Files: `src/pages/index.astro:33`, `src/pages/index.astro:53`, `src/pages/index.astro:106`, `src/pages/index.astro:109`, `src/pages/about.astro:92`, `src/pages/about.astro:94`. Severity: med. Finding: small home and about page labels and supporting copy use the same low contrast opacity range. The repeated about blocks at lines 97 through 104 share the risk. Suggested fix: review these as a group with the same approved contrast tokens.

23. Files: `src/components/ProductCard.astro:72`, `src/components/ProductCard.astro:74`, `src/components/ShopControls.astro:127`, `src/components/ShopControls.astro:143`, `src/components/ShopControls.astro:186`, `src/components/NewsletterForm.astro:31`, `src/components/WelcomeModal.astro:69`. Severity: med. Finding: card metadata, filter labels, empty state copy, and email placeholders also fall into the low contrast range. Suggested fix: verify normal text and placeholder contrast separately, then update only approved color tokens.

24. File: `src/components/CartDrawer.astro:126`. Severity: med. Finding: the remove control is visually a small text link with no padding, so its pointer target is likely below 44 by 44 CSS pixels. Suggested fix: enlarge the clickable area without changing its visual weight and verify touch use on a narrow phone.

25. Files: `src/components/Header.astro:87`, `src/components/Header.astro:91`. Severity: med. Finding: the mobile navigation locks page scrolling but does not contain focus or hide background content while open. Suggested fix: either treat it as a disclosure without full page scroll lock, or give it complete modal navigation focus behavior.

### Responsive and visual risks for human verification

26. Files: `src/components/Header.astro:14`, `src/components/Header.astro:18`. Severity: high. Finding: desktop navigation appears at 1024 pixels and contains Shop all, seven categories, Our story, and FAQ alongside the brand and cart. Static width estimates exceed the available row near the breakpoint. Suggested fix: verify at 1024, 1100, 1280, and browser zoom up to 200 percent. Move the breakpoint or collapse lower priority links if any overlap occurs.

27. Files: `src/components/ProductGrid.astro:26`, `src/components/ShopControls.astro:89`. Severity: med. Finding: at the medium breakpoint the filtered shop combines a 14rem sidebar with a three column product grid. Cards can become narrow enough to wrap prices and sizes aggressively. Suggested fix: verify from 768 through 1023 pixels and keep two columns until sufficient content width exists if needed.

28. File: `src/pages/product/[slug].astro:164`. Severity: med. Finding: three trust cues use roughly 10 pixel uppercase text in a fixed three column row on small screens. Suggested fix: verify long text, text zoom, and 320 pixel layouts. Allow wrapping to rows or increase text size if readability suffers.

29. Files: `src/components/ProductCard.astro:39`, `src/pages/product/[slug].astro:87`, `src/pages/product/[slug].astro:96`. Severity: med. Finding: image data includes dimensions, but rendered image elements do not set width and height. Real catalog photos can cause layout movement before CSS aspect boxes settle. Suggested fix: pass through known dimensions or use an image pipeline that reserves the intrinsic ratio, then test mixed photo dimensions.

### Dead code, consistency, and policy gaps

30. Files: `src/pages/product/[slug].astro:161`, `src/components/BuyButton.astro:12`. Severity: low. Finding: the page only renders `BuyButton` for available products, so the component branch for sold and reserved products is unreachable in the current storefront. Suggested fix: choose one status owner after review, either the page or the component, and remove the redundant branch without changing the rendered controls.

31. Files: `src/lib/env.ts:12`, `src/lib/stripe.ts:21`. Severity: low. Finding: `requireEnv` and `stripeConfigured` are exported but have no repository consumers. Suggested fix: confirm they are not planned extension points, then remove them in a dedicated protected code change. `src/lib` was not changed.

32. Files: `src/config/brand.ts:67`, `tailwind.config.mjs:2`. Severity: low. Finding: the palette exists in two manually synchronized objects, and the exported `PALETTE` object has no consumers. Suggested fix: generate one configuration from the other or document one as the sole source to prevent drift.

33. Files: `src/components/NewsletterForm.astro:15`, `src/components/WelcomeModal.astro:60`, `src/components/Footer.astro:37`. Severity: med. Finding: the storefront collects email addresses and states that all sales are final, but there are no privacy, terms, shipping, or returns policy pages or links. Suggested fix: have the owner and qualified adviser approve the required policies, add clear links near collection and checkout entry points, and include the routes in the sitemap when appropriate.

### Verification completed

1. `npm exec tsc -- --noEmit` passed.

2. `npm run build` passed. Astro generated 27 HTML pages and `sitemap-index.xml`.

3. The sitemap contains 25 indexable URLs, uses `https://taticurated.com`, and excludes the success page.

4. Rendered checks found 27 unique titles, 27 unique descriptions, and 27 unique canonicals.

5. Rendered JSON LD parsed successfully on every page. Product pages contain Product and Offer data. Pages with visible FAQ content contain FAQPage data.

6. All rendered internal links and hash targets resolved against generated routes. No dead customer facing href was found.

7. Every rendered image has an alt attribute. No duplicate rendered IDs or missing H1 elements were found.

8. No em dash, en dash, or hyphen used as a sentence dash was found in rendered customer copy.

9. No changes were made under `src/lib/**` or `src/pages/api/**`.
