/**
 * Read an env var reliably in both phases: at build/prerender time Astro exposes
 * `.env` on import.meta.env; on Vercel serverless, runtime secrets live on
 * process.env. Checking both covers dev, build, and production.
 */
export function getEnv(key: string): string | undefined {
  // process.env first so production runtime secrets win, then Astro's build env.
  const fromProcess = typeof process !== 'undefined' ? process.env?.[key] : undefined;
  return fromProcess ?? (import.meta.env as Record<string, string | undefined>)[key];
}

export function requireEnv(key: string): string {
  const value = getEnv(key);
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
}
