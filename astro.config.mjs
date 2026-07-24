import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

// Keep in sync with SITE.url in src/config/brand.ts (TBA domain). Used for the
// sitemap + canonical URLs. Hybrid output: content pages prerender to static HTML
// (fast + crawlable for Google and AI answer engines), while inventory pages and
// /api/* routes run on-demand via `export const prerender = false`.
export default defineConfig({
  site: 'https://curatedbytati.com',
  output: 'hybrid',
  adapter: vercel({ webAnalytics: { enabled: true } }),
  integrations: [
    tailwind(),
    sitemap({ filter: (page) => !page.includes('/success') }),
  ],
});
