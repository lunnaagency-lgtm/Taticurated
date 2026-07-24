# Codex brief: launch polish (policies, contrast, behavioral a11y)

Three UI and content tasks. Same hard rules as before.

## Hard rules
- Do NOT touch `src/lib/**`, `src/pages/api/**`, or `studio/**`. No logic changes there.
- No stock images. No em dashes, en dashes, or hyphens used as dashes. Periods and commas.
- Keep the coquette editorial design system (wine, blush, cream, ink, gold in
  `tailwind.config.mjs`). Read config from `src/config/brand.ts` (`SITE`, `MARKETING`).
- `npm run build` must pass with the sitemap. Summarize every file changed at the end.

## 1. Policy pages
Create four static pages and link them. These are plain, factual DRAFTS for the owner to
review and adapt, not legal advice. Add one small line on each: "Please review and adapt
these terms." Base them on the store's real facts:
- One of a kind, secondhand, hand-picked. All sales final. Flat-rate shipping, ships in 1
  to 3 days, United States. Payments handled by Stripe (the site never stores card data).
  Email capture for marketing. Contact is `SITE.email` (taticuratedshop@gmail.com).

Pages (each using `Base` with a unique title, description, and a readable prose layout in
the site style):
- `/privacy` — what is collected (email for marketing, order and shipping details through
  Stripe), how it is used, processors named (Stripe, the email provider), how to opt out,
  and the contact email.
- `/terms` — sale terms, one of a kind and all sales final, pricing and discounts (welcome
  and bundle), acceptable use, contact.
- `/shipping` — flat-rate shipping, 1 to 3 day handling, United States, how tracking is
  shared.
- `/returns` — because pieces are one of a kind and secondhand, all sales are final; how to
  report an item that arrives not as described, via the contact email.

Link all four in the footer (a small "Policies" column or row). They will enter the sitemap
automatically as static pages, which is fine.

## 2. Accessibility contrast (WCAG AA)
Many small muted text styles use low opacity on light backgrounds and fall below 4.5:1.
Fix normal-size text to at least 4.5:1, and large text (24px or 18.66px bold and up) to at
least 3:1, against each element's ACTUAL background. Keep the brand hues and the overall
look; only deepen where needed.

Practical floors to apply (adjust per real background):
- Small text (under ~18px) on cream or blush: use `text-ink` or no lighter than `text-ink/80`
  for body-muted, and no lighter than `text-wine/80` for wine labels. Replace `/50`, `/55`,
  `/60` on small text accordingly.
- Placeholders: no lighter than `text-ink/60`.
- Small text on the wine background: no lighter than `text-cream/85`.
- Leave large display headings as they are if they already pass at 3:1.
Cover the spots flagged in `CODEX_QA_FINDINGS.md` items 20 to 23 (footer, cart, product
detail, home, about, product card, shop controls, newsletter, welcome modal). Do not change
the palette hex values; adjust the opacity or token on the text only. A human will verify
computed contrast after.

## 3. Behavioral accessibility
- **Cart drawer** (`CartDrawer.astro`): on open, move focus into the panel and trap Tab
  within it; on close, restore focus to the trigger; make background content inert or
  otherwise non-focusable while open. Mirror the pattern already in `WelcomeModal.astro`.
  Escape already closes it.
- **Cart announcements**: add a polite live region so adding a piece and the bag count are
  announced. Include the count in the bag button accessible name, e.g. "Open bag, 2 items"
  (update it when the count changes, alongside the existing `[data-cart-count]` update).
- **Remove control** in the cart row: enlarge the pointer target to at least 44 by 44 CSS
  pixels without changing its visual weight (padding or an inset hit area).
- **Mobile menu** (`Header.astro`): while open it locks scroll but does not manage focus.
  Either contain focus and restore it on close, or treat it as a plain disclosure without a
  full page scroll lock. Pick one and make it consistent.

## Deliver
Write `CODEX_QA2_FINDINGS.md` listing every file changed and what you did in each of the
three areas. Run `npm run build` and confirm it passes with the sitemap.
