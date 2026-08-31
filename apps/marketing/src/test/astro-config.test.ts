// @vitest-environment node

import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

describe('astro.config.mjs', () => {
  it('hands the sitemap the tested filter rather than an inline copy of it', async () => {
    const config = await readFile('astro.config.mjs', 'utf8');

    expect(config).toContain('isListedInSitemap');
    expect(config).toContain('sitemap({ filter: isListedInSitemap })');
  });
});
