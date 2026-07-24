import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '9hd2noq7',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Deployed studio hostname -> https://taticurated.sanity.studio (skips the prompt).
  studioHost: 'taticurated',
});
