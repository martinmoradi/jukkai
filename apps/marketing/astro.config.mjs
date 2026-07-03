import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
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
