# Curated by Tati QA2 findings

Scope: policy drafts, text contrast, and behavioral accessibility. No files in
`src/lib/**`, `src/pages/api/**`, or `studio/**` were changed.

## 1. Policy pages

Created four static policy drafts. Each page uses `Base`, has unique metadata, reads the
contact email from `SITE.email`, states that it is not legal advice, and includes the line
"Please review and adapt these terms."

- `src/pages/privacy.astro`: Covers marketing email collection, order and shipping
  details processed through Stripe, browser storage, use of information, Stripe and the
  email provider as processors, marketing opt out, and contact.
- `src/pages/terms.astro`: Covers one of a kind inventory, final sales, Stripe payment
  processing, configured welcome and bundle discounts, acceptable use, and contact.
- `src/pages/shipping.astro`: Covers the configured flat shipping rate, 1 to 3 day
  handling, United States shipping, tracking by email, and contact.
- `src/pages/returns.astro`: Covers final sales for one of a kind secondhand pieces and
  how to report an item that arrives not as described.
- `src/components/Footer.astro`: Adds Privacy, Terms, Shipping, and Returns links in a
  Policies group.

## 2. Accessibility contrast

Palette hex values were not changed. Normal muted text was deepened to `ink/80` or
`wine/80`. Small wine text over gradients that reach `blushDeep` was deepened to
`wine/85`. Small cream text over wine was deepened to `cream/85`. Placeholders use
`ink/65`.

Static color checks against the palette endpoints produced these approximate ratios:

- `ink/80`: 8.38 to 1 on cream, 7.66 to 1 on blush, and 6.49 to 1 on blushDeep.
- `wine/80`: 5.92 to 1 on cream and 5.37 to 1 on blush.
- `wine/85`: 5.02 to 1 on blushDeep.
- `cream/85`: 7.68 to 1 on wine.
- `ink/65` placeholders: 5.07 to 1 on cream and 5.20 to 1 on white.

Updated contrast in these files:

- `src/layouts/Base.astro`: Deepens the shared eyebrow label.
- `src/components/AddToCartButton.astro`: Deepens disabled button text.
- `src/components/BuyButton.astro`: Deepens disabled button text.
- `src/components/CartDrawer.astro`: Deepens empty copy, subtotal copy, shipping copy,
  item metadata, image fallback text, and remove text.
- `src/components/Faq.astro`: Deepens FAQ intro and answer text.
- `src/components/Footer.astro`: Deepens newsletter copy, section labels, and legal
  footer copy.
- `src/components/Header.astro`: Deepens muted desktop navigation links.
- `src/components/NewsletterForm.astro`: Deepens the placeholder and status text.
- `src/components/ProductCard.astro`: Deepens image fallback, brand, size, and condition
  text.
- `src/components/ProductGrid.astro`: Deepens empty state copy.
- `src/components/ShopControls.astro`: Deepens sort text, clear control, filter values,
  price labels, price placeholders, currency marks, sold filter, and empty state copy.
- `src/components/WelcomeModal.astro`: Deepens labels, body copy, placeholder, success
  copy, and the decline control.
- `src/pages/404.astro`: Deepens the large 404 display to the 3 to 1 floor and deepens
  supporting copy.
- `src/pages/about.astro`: Deepens body copy, wine labels, and card copy on cream, blush,
  and wine backgrounds.
- `src/pages/faq.astro`: Deepens supporting copy.
- `src/pages/index.astro`: Deepens hero copy, labels, image fallback copy, wine section
  copy, and category card copy.
- `src/pages/product/[slug].astro`: Deepens breadcrumbs, image fallback label, brand,
  trust cues, detail labels, description, and scarcity copy.
- `src/pages/shop/[category].astro`: Deepens category intro and inactive navigation.
- `src/pages/shop/index.astro`: Deepens shop intro and inactive navigation.
- `src/pages/success.astro`: Deepens confirmation copy.

Large display text that already meets the 3 to 1 large text requirement was left intact.
A human should still verify computed styles on the final deployed backgrounds, as
requested in the brief.

## 3. Behavioral accessibility

- `src/components/CartDrawer.astro`: Moves focus to the close control on open, traps Tab
  and Shift plus Tab inside the dialog, makes the other body content inert, restores the
  previous inert state and opener focus on close, and keeps Escape and overlay closing.
  It also adds a polite atomic live region, updates every bag trigger name with the
  current item count, announces add and remove changes with the count, and gives Remove
  a 44 by 44 pixel minimum target without increasing its text weight.
- `src/components/AddToCartButton.astro`: Sends the added product name and resulting bag
  count to the cart live region.
- `src/components/Header.astro`: Includes the bag count in the bag button accessible
  name and hides the visual badge from duplicate screen reader output. The mobile menu
  now follows a plain disclosure pattern without full page scroll lock. Escape closes
  it and restores focus to the menu button. Opening the cart also closes the menu.

## Complete changed file inventory

1. `CODEX_QA2_FINDINGS.md`
2. `src/components/AddToCartButton.astro`
3. `src/components/BuyButton.astro`
4. `src/components/CartDrawer.astro`
5. `src/components/Faq.astro`
6. `src/components/Footer.astro`
7. `src/components/Header.astro`
8. `src/components/NewsletterForm.astro`
9. `src/components/ProductCard.astro`
10. `src/components/ProductGrid.astro`
11. `src/components/ShopControls.astro`
12. `src/components/WelcomeModal.astro`
13. `src/layouts/Base.astro`
14. `src/pages/404.astro`
15. `src/pages/about.astro`
16. `src/pages/faq.astro`
17. `src/pages/index.astro`
18. `src/pages/privacy.astro`
19. `src/pages/product/[slug].astro`
20. `src/pages/returns.astro`
21. `src/pages/shipping.astro`
22. `src/pages/shop/[category].astro`
23. `src/pages/shop/index.astro`
24. `src/pages/success.astro`
25. `src/pages/terms.astro`

## Verification

- `npm exec tsc -- --noEmit` passed.
- `npm run build` passed and generated 31 HTML pages.
- `sitemap-index.xml` and `sitemap-0.xml` were generated.
- The sitemap contains 29 indexable URLs, including `/privacy/`, `/terms/`,
  `/shipping/`, and `/returns/`.
- Rendered checks confirmed all four policy pages contain the review line and configured
  contact email, and the footer contains all four links.
- Rendered customer copy passed the em dash, en dash, and spaced hyphen scan.
- `git diff --check` passed.
- The build still reports the existing environment warning that local Node 25 is not a
  supported Vercel Serverless runtime and Vercel will use Node 18.
