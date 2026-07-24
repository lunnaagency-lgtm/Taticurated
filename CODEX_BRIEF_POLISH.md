# Codex brief: 10/10 polish pass

Refine the storefront to a genuinely polished, professional 10/10 across speed,
responsiveness, visual cohesion, theme, and typography. This is REFINEMENT, not a
redesign. The coquette editorial look (wine, blush, cream, ink, gold) is approved. Keep
it. Improve consistency, rhythm, responsiveness, and performance.

## Hard rules
- Do NOT touch `src/lib/**`, `src/pages/api/**`, or `studio/**`.
- No stock images. No em dashes, en dashes, or hyphens used as dashes. Periods and commas.
- Keep tokens from `tailwind.config.mjs`; read config from `src/config/brand.ts`.
- `npm run build` must pass with the sitemap. Do not regress the WCAG AA contrast already
  achieved (small text stays at or above 4.5:1). Do not touch the money path or schema logic.

## 1. Brand name consistency (priority)
The display name is now "Tati Curated" (SITE.name). Replace the remaining hardcoded
"Curated by Tati" in visible copy and assets with "Tati Curated":
- `src/pages/404.astro` (meta description)
- `src/pages/about.astro` (meta description and the "I built Curated by Tati for..." line)
- `src/pages/product/[slug].astro` (the share text near line 237)
- `src/pages/shop/index.astro` and `src/pages/shop/[category].astro` (meta descriptions)
- `public/og.svg` (the title and the visible headline text)
- `public/llms.txt` (heading and first paragraph)
- `public/favicon.svg` (the SVG title metadata)
LEAVE the intentional alias in `src/lib/faq.ts` ("also known as Curated by Tati") and the
Depop handle `@curatedbytati_` as they are. Do not touch `src/lib`.

## 2. Speed and performance
- Give every rendered `<img>` explicit `width`/`height` (or a reserved aspect ratio) so
  real photos cannot cause layout shift. Product image data carries width and height; pass
  them through. Keep the first product image eager, the rest lazy.
- Confirm no render-blocking or heavy client JS; keep islands minimal. Fonts should not
  cause invisible-text flashes (use swap behavior).
- Remove any unused CSS/classes you introduce. Do not add dependencies.

## 3. Responsiveness (verify 320, 375, 768, 1024, 1280)
- Fix the shop grid at the medium breakpoint so cards do not get so narrow that prices and
  sizes wrap awkwardly (keep two columns until there is enough width).
- The three product-detail trust cues in a fixed 3-column row get cramped on small phones;
  let them wrap or scale so they stay readable at 320px.
- Any wide content (galleries, chip rows) scrolls inside its own container; the page body
  never scrolls sideways. Tap targets stay at least 44 by 44.

## 4. Visual and theme cohesion
- Consistent radii, shadow depths, border treatments, and hover/focus states across cards,
  buttons, inputs, chips, and panels. One system, no drift.
- Consistent section vertical rhythm (the space between major sections should feel even and
  intentional across pages).

## 5. Typography, titles, bodies, spacing
- One clear type scale. Confirm a single H1 per page and a sensible heading hierarchy.
- Body copy sits around a comfortable reading measure (about 60 to 70 characters per line);
  set max-widths where paragraphs run wide.
- Consistent line-heights and label letter-spacing. Tighten or loosen only for consistency.
- Trim over-long metadata: the home title and description are long enough to truncate in
  search results. Keep the brand and key terms, shorten to roughly 60 and 155 characters.

## Deliver
Write `CODEX_POLISH_FINDINGS.md` listing what changed per area (brand, performance,
responsive, visual, typography). Run `npm run build` and confirm it passes with the sitemap.
Note anything you intentionally left for a human to verify in-browser (real-device responsive
checks, real photo layout shift).
