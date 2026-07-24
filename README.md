# Curated by Tati

A custom, GEO-first storefront for @curatedbytati_. Astro + Tailwind on Vercel,
Stripe Checkout for payments, Sanity as the self-serve catalog. Inventory is
one-of-a-kind: each item sells once, then shows as sold.

Depop stays the discovery engine. This site is the owned, higher-margin channel:
her brand, her customer list, and pages that Google and AI answer engines can cite.

## Architecture

| Piece | Choice | Why |
| --- | --- | --- |
| Frontend | Astro (static + a few server routes) | Fast, crawlable, great for SEO/GEO |
| Payments | Stripe Checkout (hosted) | Stripe owns cards + PCI. We never touch card data |
| Catalog | Sanity (hosted Studio) | Tati adds items herself, no code |
| Sold-out | Stripe webhook -> Sanity status | One-of-a-kind = a boolean, not a count |
| Hosting | Vercel | Same as the agency site |

Data flow: Tati adds a product in Sanity -> it appears on the site -> a buyer pays via
Stripe -> the webhook flips the item to `sold` and triggers a rebuild.

## Runs right now (no accounts needed)

The store ships with a sample catalog modeled on her real Depop pieces, so it builds
and previews before any credentials exist.

```bash
npm install
npm run dev      # http://localhost:4321
```

`src/config/brand.ts` is the single source of truth for name, domain
(`taticurated.com`),
palette, and shipping rate. Change the domain in one place when it is chosen.

## Going live (the credentialed steps that Tati or Nour complete)

> These require creating accounts and handling secret keys, so they are done by you,
> not by an assistant. Never commit `.env`.

### 1. Sanity (catalog), project already created: `9hd2noq7`
The studio is pre-wired to this project. Do NOT run `sanity init` or create a new project.
1. `cd studio && npm install && npx sanity login`
2. `npm run deploy` (from `studio/`) -> hosted studio at `https://<name>.sanity.studio`
3. Tati adds real pieces there: photos, price in dollars, size, condition, status. This is
   what replaces `src/data/sampleProducts.ts`.
4. Create a write token for the sold-out webhook: sanity.io -> project 9hd2noq7 -> API ->
   Tokens -> Editor role -> `SANITY_WRITE_TOKEN`.
5. Once she has real pieces, set `SANITY_PROJECT_ID=9hd2noq7` and `SANITY_DATASET=production`
   in Vercel so the store reads live inventory. Until then it shows the sample catalog.

### 2. Stripe (payments)
1. Create a Stripe account. Start in **test mode**.
2. Copy the secret + publishable keys into `.env` (`STRIPE_SECRET_KEY`, `PUBLIC_STRIPE_PUBLISHABLE_KEY`)
3. Add a webhook endpoint -> `https://<your-domain>/api/webhook`, events
   `checkout.session.completed` and `checkout.session.expired` -> copy the signing
   secret into `STRIPE_WEBHOOK_SECRET`
4. Create two promotion codes (Products -> Coupons): **TATI10** (10% off, the welcome
   offer) and **BUNDLE10** (10% off, the bundle). `allow_promotion_codes` is on at
   checkout, so buyers can enter them. Match the values in `MARKETING` in
   `src/config/brand.ts`. For the bundle to apply automatically at 3+ items (no typing),
   also copy the bundle coupon's id into `STRIPE_BUNDLE_COUPON_ID`.
5. Test a purchase with card `4242 4242 4242 4242`. Confirm the item flips to sold.
6. Flip to live keys when ready.

Email capture: set `EMAIL_WEBHOOK_URL` to any inbound webhook (Klaviyo/Mailchimp/Beehiiv,
or Zapier/Make) to collect welcome signups. Without it, signups are logged only.

### 3. Vercel (hosting)
1. Push this repo to GitHub, import into Vercel (framework auto-detected as Astro).
2. Add every var from `.env.example` in Vercel project settings.
3. Optional: create a Deploy Hook, put its URL in `VERCEL_DEPLOY_HOOK_URL` so sold
   items refresh the static pages within ~a minute.
4. Set the custom domain once chosen, and update `SITE.url` in `src/config/brand.ts`
   plus `site` in `astro.config.mjs` and the sitemap URL in `public/robots.txt`.
5. Recommended: set the Vercel project's Node.js version to 20.

## What is built vs. what is next

**Built (this scaffold):** data model, Stripe Checkout + webhook (server-price-authoritative,
reservation hold, sold-out), Sanity schema, GEO (Product/Store/FAQ schema, sitemap,
llms.txt), and a working-but-plain UI so the whole thing runs today.

**Visual layer:** the full build brief is preserved in `CODEX_BRIEF.md`. The
components, gallery, mobile presentation, and copy are implemented against the
scaffold's contracts.

**Phase 2 (done):** welcome email capture (10% off, TATI10), FAQ across pages + about
build, home decor category, and a **cart** with add to bag, a slide-out drawer, live bundle
progress, and one multi-item Stripe Checkout that auto-applies the 3-for-10% bundle. Buyers
can also "Buy it now" for a single piece.

**Phase 3 (done):** client side shop filtering and sorting.

**Next:** Stripe Tax when registered, drop alerts on the email list, and real product
photography replacing the placeholders.
