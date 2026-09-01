// @vitest-environment node

import { readFile } from 'node:fs/promises';

import sharp from 'sharp';
import { describe, expect, it } from 'vitest';

/**
 * `brand/` holds durable masters and is not the app's runtime asset directory
 * (`brand/README.md`, ADR-0004), so the app keeps its own committed export.
 * That is only safe while the copy is provably the master.
 */
describe('committed brand exports', () => {
  it('keeps the wordmark identical to its master under brand/marks/', async () => {
    const [master, appCopy] = await Promise.all([
      readFile(
        '../../brand/marks/wordmark/jukkai-wordmark-primary.svg',
        'utf8',
      ),
      readFile('src/assets/jukkai-wordmark-primary.svg', 'utf8'),
    ]);

    expect(appCopy).toBe(master);
  });

  it('keeps the sphere identical to its brand master', async () => {
    const [master, appCopy] = await Promise.all([
      readFile('../../brand/logo/circle_logo_master.svg', 'utf8'),
      readFile('src/assets/jukkai-sphere.svg', 'utf8'),
    ]);

    expect(appCopy).toBe(master);
  });

  it("keeps Crystelle's contact portrait reproducible from its source", async () => {
    const [expected, appCopy] = await Promise.all([
      sharp('../../brand/ad/high-res-source.jpeg')
        .rotate()
        .extract({ height: 950, left: 2200, top: 2150, width: 950 })
        .resize(800, 800, { fit: 'cover' })
        .webp({ quality: 88 })
        .toBuffer(),
      readFile('src/assets/crystelle-contact-portrait.webp'),
    ]);

    expect(appCopy.equals(expected)).toBe(true);
  });
});
