import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jukkai.fr',
  integrations: [sitemap()],
  vite: {
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
  },
});
