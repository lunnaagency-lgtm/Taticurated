import { createClient, type SanityClient } from '@sanity/client';
import { getEnv } from './env';

const projectId = getEnv('SANITY_PROJECT_ID');
const dataset = getEnv('SANITY_DATASET') || 'production';
const writeToken = getEnv('SANITY_WRITE_TOKEN');

/** True once a real Sanity project is wired up. Until then the store uses sample data. */
export const sanityConfigured = Boolean(projectId);

/** Read-only client for the storefront (product pages, grids) at build time. */
export const sanityRead: SanityClient | null = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-10-01',
      useCdn: true, // fast, cached reads for public pages
    })
  : null;

/**
 * Uncached read client for runtime correctness checks (e.g. the checkout endpoint
 * confirming an item is still available before charging). Bypasses the CDN so it
 * never sees a stale "available" for something that just sold.
 */
export const sanityFresh: SanityClient | null = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-10-01',
      useCdn: false,
    })
  : null;

/**
 * Write client used ONLY server-side by the Stripe flow to flip status to
 * reserved / sold / available. Requires SANITY_WRITE_TOKEN. Never import into a
 * page that ships to the browser.
 */
export const sanityWrite: SanityClient | null =
  sanityConfigured && writeToken
    ? createClient({
        projectId,
        dataset,
        apiVersion: '2024-10-01',
        token: writeToken,
        useCdn: false,
      })
    : null;
