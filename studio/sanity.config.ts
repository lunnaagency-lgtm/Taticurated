import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

/**
 * Tati's admin. Run `npm run dev` here for local editing, or `npm run deploy` to
 * publish it to https://<name>.sanity.studio so she can add items from anywhere.
 * Project id comes from SANITY_STUDIO_PROJECT_ID (see .env.example at repo root).
 */
export default defineConfig({
  name: 'curated-by-tati',
  title: 'Curated by Tati',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '9hd2noq7',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
