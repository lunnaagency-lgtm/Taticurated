# Codex brief: full static QA sweep

Do a thorough QA pass over the whole storefront. You cannot run a browser in your
sandbox, so focus on what static analysis and the build catch. Report everything you
find; fix only the clearly safe items. A human is doing the interactive and visual QA
separately.

## Rules
- Do NOT change `src/lib/**` or `src/pages/api/**` (money path and data model). If you
  find issues there, REPORT them, do not edit.
- Fixes must be non-behavioral: copy, dashes, alt text, aria labels, obviously dead code,
  wrong link hrefs, consistency. Do not change logic or component behavior.
- No em dashes, en dashes, or hyphens used as dashes in any copy. Scanning for and fixing
  these is a priority.
- Keep the build green: `npm run build` must pass with the sitemap generating.

## Audit (report every finding: file:line, severity high/med/low, suggested fix)
1. Correctness and bugs: logic errors, wrong or missing props, broken conditionals, dead
   links (hrefs to routes that do not exist), mismatched data attributes used by scripts.
2. Copy: any em or en dashes or hyphen-as-dash, typos, lorem or placeholder text, tone
   slips. Brand may read as "Curated by Tati" or "Tati Curated", both fine, but flag
   anything that reads unintentional.
3. Accessibility: missing alt text, missing or wrong aria labels, unlabeled form controls,
   missing focus states, heading order, button vs link misuse. Flag contrast risks, do not
   guess-fix color.
4. SEO, GEO, schema: every page has a unique title, meta description, and canonical;
   JSON-LD (Product, Offer, FAQPage, Store, WebSite) present and valid where expected;
   sitemap, robots.txt, llms.txt correct and consistent with the taticurated.com domain.
5. Consistency: off-palette hardcoded colors, spacing and radius drift, inconsistent
   hover and focus patterns, missing empty states.
6. Responsive risks (static reasoning only, for the human to verify in browser): fixed
   widths, likely overflow, small tap targets, and especially the top nav, which now has 7
   categories plus Shop all, Our story, and FAQ, so check it will not overflow on desktop.
7. Dead code: unused imports, components, exports, or files.

## Fix now (safe only)
Apply fixes for: dashes in copy, clear typos, missing alt or aria, dead or incorrect link
hrefs, unused imports and dead code. List each fix you make.

## Deliver
Write `CODEX_QA_FINDINGS.md` with two sections: "Fixed" (what you changed, with files) and
"Needs review" (everything else, categorized, each with file:line, severity, and a
suggested fix). Then run `npm run build` and confirm it passes. Summarize at the end.
