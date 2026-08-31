// @vitest-environment node

import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import {
  CRYSTELLE_CONTACT_PATH,
  CRYSTELLE_VCARD,
  CRYSTELLE_VCARD_PATH,
} from '#/data/crystelle';

/**
 * The published artefacts, not the source that produces them. Redirect rules,
 * headers, sitemap membership and bundled styles only exist after a build, so
 * asserting on the source instead would prove nothing about what deploys.
 */
let outDir: string;

async function published(path: string) {
  return readFile(join(outDir, path), 'utf8');
}

async function exists(path: string) {
  return stat(join(outDir, path)).then(
    () => true,
    () => false,
  );
}

beforeAll(async () => {
  outDir = join(
    await mkdtemp(join(tmpdir(), 'jukkai-marketing-build-')),
    'dist',
  );

  await promisify(execFile)('bunx', ['astro', 'build', '--outDir', outDir], {
    cwd: process.cwd(),
  });
}, 120_000);

afterAll(async () => {
  await rm(join(outDir, '..'), { force: true, recursive: true });
});

describe('published site', () => {
  it('publishes the redirect and header rules Cloudflare Pages reads', async () => {
    expect(await published('_redirects')).toContain('/c/crystelle');
    expect(await published('_headers')).toContain(CRYSTELLE_VCARD_PATH);
  });

  it('publishes the vCard at the path the card page links to', async () => {
    expect(await published(CRYSTELLE_VCARD_PATH.slice(1))).toBe(
      CRYSTELLE_VCARD,
    );
  });

  it('bundles the contact-card styles into the page itself', async () => {
    const page = await published(
      `${CRYSTELLE_CONTACT_PATH.slice(1)}/index.html`,
    );

    expect(page).toContain('--field:#eae2d2');
    expect(page).toContain('--ink:#1d1d1b');
  });

  it('leaves the card page out of the generated sitemap', async () => {
    // While the card is the only page there is no sitemap to read at all.
    // Once indexable pages exist, this reads the real thing.
    const sitemaps = await Promise.all(
      ['sitemap-index.xml', 'sitemap-0.xml'].map((name) =>
        published(name).catch(() => ''),
      ),
    );

    expect(sitemaps.join('\n')).not.toContain(CRYSTELLE_CONTACT_PATH);
    expect(await exists(`${CRYSTELLE_CONTACT_PATH.slice(1)}/index.html`)).toBe(
      true,
    );
  });
});
