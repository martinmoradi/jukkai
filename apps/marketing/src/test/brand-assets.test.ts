// @vitest-environment node

import { readFile } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

/**
 * `brand/` holds durable masters and is not the app's runtime asset directory
 * (`brand/README.md`, ADR-0004), so the app keeps its own committed export.
 * That is only safe while the copy is provably the master.
 */
describe('committed brand exports', () => {
  it('keeps the sphere identical to its brand master', async () => {
    const [master, appCopy] = await Promise.all([
      readFile('../../brand/logo/circle_logo_master.svg', 'utf8'),
      readFile('src/assets/jukkai-sphere.svg', 'utf8'),
    ]);

    expect(appCopy).toBe(master);
  });
});
