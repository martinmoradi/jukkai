// @vitest-environment node

import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';

import { JSDOM } from 'jsdom';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import {
  CRYSTELLE,
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
  const buildCache = join(process.cwd(), '.astro', 'test-builds');
  await mkdir(buildCache, { recursive: true });
  outDir = join(
    await mkdtemp(join(buildCache, 'jukkai-marketing-build-')),
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
  it('introduces the Galerie while preserving Studio Terrasson continuity', async () => {
    const page = new JSDOM(await published('index.html'));
    const document = page.window.document;
    const introduction = document.querySelector('[data-art-intro]')!;
    expect(introduction.textContent).toContain('Crystelle Terrasson');
    expect(introduction.textContent).toContain('architecture');
    expect(introduction.textContent).toContain('Galerie');
    expect(introduction.textContent).toContain('octobre 2026');
    expect(
      document.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim(),
    ).toBe('L’art prend place.');
    expect(
      document.querySelector('[data-art-hero-image]')?.getAttribute('alt'),
    ).toContain('Yoann Bonneville');
    expect(document.querySelector('#esprit')?.textContent).toContain(
      'Studio Terrasson',
    );
    expect(document.querySelector('#architecture')?.textContent).toContain(
      'sans attendre octobre',
    );
    expect(
      document.querySelector('a[href="https://www.studioterrasson.fr/"]'),
    ).not.toBeNull();
    expect(document.querySelector('main')?.textContent).not.toMatch(
      /anciennement|a remplacé/i,
    );
    page.window.close();
  });

  it.each(['index.html', 'contact/index.html'])(
    'describes one factual public identity in %s',
    async (file) => {
      const page = new JSDOM(await published(file));
      const scripts = page.window.document.querySelectorAll(
        'script[type="application/ld+json"]',
      );
      expect(scripts).toHaveLength(1);
      const data = JSON.parse(scripts[0].textContent);
      const organizations = data['@graph'].filter(
        (node: { '@type': string }) => node['@type'] === 'Organization',
      );
      expect(organizations).toHaveLength(1);
      expect(organizations[0]).toMatchObject({
        name: 'Jukkai by Crystelle Terrasson',
        url: 'https://jukkai.fr/',
        telephone: CRYSTELLE.phoneTel,
        email: CRYSTELLE.email,
        address: {
          streetAddress: CRYSTELLE.address.street,
          addressLocality: CRYSTELLE.address.locality,
        },
        founder: { name: 'Crystelle Terrasson' },
      });
      expect(organizations[0]).not.toHaveProperty('sameAs');
      expect(organizations[0]).not.toHaveProperty('openingHours');
      expect(organizations[0]).not.toHaveProperty('legalName');
      page.window.close();
    },
  );

  it('offers the full artwork images even when scripts are unavailable', async () => {
    const page = new JSDOM(await published('index.html'));
    const links = page.window.document.querySelectorAll('a[data-artwork]');
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      const href = link.getAttribute('href')!;
      expect(href).toMatch(/^\/_astro\/.+\.webp$/);
      expect(await exists(href.slice(1))).toBe(true);
    }
    page.window.close();
  });

  it('publishes only the two magazine pages in the public sitemap', async () => {
    const xml = await published('sitemap-0.xml');
    const sitemap = new JSDOM(xml, { contentType: 'text/xml' });
    const urls = [...sitemap.window.document.querySelectorAll('loc')].map(
      (node) => node.textContent,
    );
    expect(urls.sort()).toEqual([
      'https://jukkai.fr/',
      'https://jukkai.fr/contact/',
    ]);
    sitemap.window.close();
  });

  it.each([
    ['index.html', 'https://jukkai.fr/'],
    ['contact/index.html', 'https://jukkai.fr/contact/'],
  ])(
    'makes %s discoverable and usable without client rendering',
    async (file, canonical) => {
      const html = await published(file);
      const page = new JSDOM(html);
      const document = page.window.document;

      expect(document.documentElement.lang).toBe('fr');
      expect(document.querySelectorAll('h1')).toHaveLength(1);
      expect(document.querySelector('h1')?.textContent?.trim()).toBeTruthy();
      expect(
        document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
      ).toBe(canonical);
      expect(
        document
          .querySelector('meta[name="robots"]')
          ?.getAttribute('content') ?? '',
      ).not.toContain('noindex');
      expect(document.title).toContain('Jukkai by Crystelle Terrasson');
      expect(
        document
          .querySelector('meta[property="og:image"]')
          ?.getAttribute('content'),
      ).toMatch(/^https:\/\/jukkai\.fr\/_astro\//);
      expect(
        document.querySelector('link[href="/fonts/generated/fonts.css"]'),
      ).not.toBeNull();
      expect(
        document.querySelector('a[href="tel:+33662728799"]'),
      ).not.toBeNull();
      expect(
        document.querySelector('a[href="mailto:ct@jukkai.fr"]'),
      ).not.toBeNull();
      expect(document.querySelector('main')?.textContent).toContain('octobre');
      expect(document.querySelector('main')?.textContent).toContain('2026');

      for (const image of document.querySelectorAll('img')) {
        expect(image.hasAttribute('alt')).toBe(true);
      }
      expect(html).not.toContain('fonts.martinmoradi.com');
      page.window.close();
    },
  );

  it('resolves every homepage section link and public contact destination', async () => {
    const page = new JSDOM(await published('index.html'));
    const document = page.window.document;
    for (const anchor of document.querySelectorAll<HTMLAnchorElement>(
      'a[href^="#"], a[href^="/#"]',
    )) {
      const href = anchor.getAttribute('href')!;
      const id = href.slice(href.indexOf('#') + 1);
      expect(
        document.getElementById(id),
        `Missing section ${id}`,
      ).not.toBeNull();
    }
    expect(document.querySelector('a[href="/contact/"]')).not.toBeNull();
    expect(await exists('contact/index.html')).toBe(true);
    page.window.close();
  });

  it('publishes the redirect and header rules Cloudflare Pages reads', async () => {
    expect(await published('_redirects')).toMatch(
      /^\/c\/crystelle\s+\/contact\/crystelle\/\s+302\s*$/m,
    );
    expect(await published('_headers')).toContain(CRYSTELLE_VCARD_PATH);
  });

  it('publishes the vCard at the path the card page links to', async () => {
    expect(await published(CRYSTELLE_VCARD_PATH.slice(1))).toBe(
      CRYSTELLE_VCARD,
    );
  });

  it('publishes the contact-card styles and links them from the page', async () => {
    const page = await published(
      `${CRYSTELLE_CONTACT_PATH.slice(1)}/index.html`,
    );
    const cssPath = page.match(/href="\/(_astro\/[^"]+\.css)"/)?.[1];

    expect(cssPath).toBeDefined();

    const css = await published(cssPath!);
    expect(css).toContain('--field:#eae2d2');
    expect(css).toContain('--ink:#1d1d1b');
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
