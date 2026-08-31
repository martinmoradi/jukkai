/// <reference types="vitest/config" />

import { getViteConfig } from 'astro/config';

// `getViteConfig` applies the Astro Vite plugins, which is what lets tests
// render `.astro` pages through the Astro Container API.
export default getViteConfig({
  test: {
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        url: 'http://localhost:4321/',
      },
    },
    globals: true,
    passWithNoTests: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
