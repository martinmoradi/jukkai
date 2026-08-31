import { fileURLToPath } from 'node:url';

import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { isListedInSitemap } from './src/seo';

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  site: 'https://jukkai.fr',
  integrations: [sitemap({ filter: isListedInSitemap })],
  vite: {
    resolve: {
      alias: {
        // Brand masters stay single-source under `brand/`; pages read them
        // from there rather than keeping drifting copies in the app.
        '#brand': fileURLToPath(new URL('../../brand', import.meta.url)),
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
  },
});
