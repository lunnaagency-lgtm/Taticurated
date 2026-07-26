# Tati Curated Rebrand Findings

## Outcome

The storefront now positions Tati Curated as an alternative to fast fashion, centered on one of a kind cotton, linen, wool, and silk pieces for women and men. The voice now emphasizes hand sourcing, lasting quality, new drops daily, and the tagline, “The missing piece to your next fit.”

The wine, blush, and cream design system is unchanged. Commerce behavior, product types, inventory behavior, page schema, checkout logic, and visual classes are unchanged.

## Changes by file

1. `src/config/brand.ts`

Updated only `SITE.tagline`, `SITE.description`, and `SITE.bioVoice`. All other `SITE` values and all `COMMERCE`, `MARKETING`, and `PALETTE` values remain unchanged.

2. `src/lib/faq.ts`

Rewrote the FAQ answers around natural fibers, women and men pieces, one of a kind inventory, daily drops, and shipping in 1 to 2 days. Preserved the existing FAQ and schema structure, the “also known as Curated by Tati” alias, and the `@curatedbytati_` Depop mention.

3. `src/pages/index.astro`

Repositioned the metadata, hero, trust cues, product section, value story, and category descriptions around natural fibers, lasting quality, women and men, and daily drops.

4. `src/pages/about.astro`

Rewrote the brand story in Tati’s warm first person voice. The new story directly addresses polyester and fast fashion, explains her natural fiber sourcing standard, welcomes women and men, and reinforces daily one of a kind drops. The FAQ block and schema logic are unchanged.

5. `src/pages/shop/index.astro`

Updated the shop metadata, eyebrow, and introduction to present the full natural fiber edit for women and men.

6. `src/pages/shop/[category].astro`

Updated category metadata and introductory copy to emphasize natural fibers, lasting quality, daily drops, and one of a kind inventory. Static path logic is unchanged.

7. `src/pages/product/[slug].astro`

Changed the shipping cue to 1 to 2 days. Reframed the trust cue around natural fibers, updated the FAQ introduction, and rewrote the share text around the new tagline. Product schema and purchase behavior are unchanged.

8. `src/pages/404.astro`

Updated the meta description and recovery copy to reference one of a kind natural fiber finds and daily drops.

9. `src/pages/success.astro`

Changed the fulfillment promise to 1 to 2 days and connected the confirmation message to the one of a kind natural fiber story.

10. `src/pages/shipping.astro`

Updated the meta description and handling language to state that orders ship in 1 to 2 days.

11. `src/pages/faq.astro`

Updated the page meta description to reflect natural fibers, women and men, daily drops, and one of a kind availability.

12. `src/pages/returns.astro`

Retuned the final sale explanation around one of a kind natural fiber sourcing while preserving the policy meaning.

13. `src/pages/terms.astro`

Updated the product description in the terms to state that Tati Curated sells hand sourced cotton, linen, wool, and silk pieces for women and men. Terms logic is unchanged.

14. `src/data/sampleProducts.ts`

Replaced the old placeholder catalog with nine natural fiber examples for women and men. The catalog now includes linen shirts and trousers, a wool overcoat, a silk slip dress, a cotton knit, a cashmere wool sweater, raw cotton denim, a silk scarf, and a cotton canvas tote. It includes seven available items, one reserved item, one sold item, and two featured items. Every image array remains empty.

15. `public/llms.txt`

Rewrote the answer engine summary around the new positioning. Preserved the Curated by Tati alias and added the `@curatedbytati_` Depop identity, natural fiber standard, women and men audience, daily drops, and 1 to 2 day shipping.

16. `public/og.svg`

Updated only the accessible description and headline text. The visual structure and brand palette remain unchanged.

17. `src/layouts/Base.astro`

Updated the social image alternative text to match the new tagline and natural fiber positioning. Metadata and schema logic are unchanged.

18. `src/components/WelcomeModal.astro`

Replaced the cute finds language with the new tagline and natural fiber daily drop message. Offer behavior is unchanged.

19. `src/components/Footer.astro`

Updated newsletter and footer brand copy to reflect daily drops, natural fibers, women and men, and the new tagline. Navigation destinations and layout are unchanged.

20. `src/components/ProductGrid.astro`

Updated the empty collection message to reference new natural fiber pieces added daily.

21. `src/components/CartDrawer.astro`

Updated the empty bag message to reinforce that each natural fiber piece is one of a kind. Cart behavior is unchanged.

## Validation

`npm run build` passed.

Astro prerendered the storefront and all nine sample product pages.

The sitemap integration created `.vercel/output/static/sitemap-index.xml` and `.vercel/output/static/sitemap-0.xml`.

The generated static storefront contains no coquette, Y2K, soft girl, cute finds, romantic secondhand, playful secondhand, or 1 to 3 day language.

No em dash or en dash characters were added. No spaced hyphen punctuation was added.

No `studio` file changed. No `src/pages/api` file changed. The only changed `src/lib` file is `src/lib/faq.ts`.

The build emitted a nonblocking warning that local Node 25 is not supported by the configured Vercel serverless adapter. The adapter selected its supported runtime and the build completed successfully.

## Protected scope conflict

`src/pages/api/checkout.ts` line 131 still contains the customer facing label, `Standard shipping (1 to 3 days)`.

That is the only remaining 1 to 3 day claim in `src` and `public`. It was not changed because the brief explicitly prohibits any edit inside `src/pages/api`. Updating that checkout label requires lifting the API file restriction for this one copy only change.
