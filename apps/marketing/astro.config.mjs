import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { isListedInSitemap } from './src/seo';

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  image: {
    dangerouslyProcessSVG: true,
  },
  site: 'https://jukkai.fr',
  integrations: [sitemap({ filter: isListedInSitemap })],
  vite: {
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
  },
});
