// @vitest-environment node
//
// The Astro Container API only produces server-rendered components under
// Vitest's SSR transform, which jsdom-environment files do not get. The page
// is rendered to a string here and parsed explicitly instead.

import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { JSDOM } from 'jsdom';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import CrystellePage from '#/pages/contact/crystelle.astro';

const ANALYTICS_TOKEN_KEY = 'PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN';

async function render() {
  const container = await AstroContainer.create();
  const html = await container.renderToString(CrystellePage);

  return { document: new JSDOM(html).window.document, html };
}

let page: Document;
let html: string;

beforeAll(async () => {
  ({ document: page, html } = await render());
});

describe('/contact/crystelle', () => {
  it('is a French page', () => {
    expect(page.documentElement.lang).toBe('fr');
    expect(page.title).toContain('Crystelle Terrasson');
  });

  it('is mobile-first', () => {
    expect(
      page.querySelector<HTMLMetaElement>('meta[name="viewport"]')?.content,
    ).toBe('width=device-width, initial-scale=1');
  });

  it('dresses the browser chrome in the ivory field', () => {
    expect(
      page.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.content,
    ).toBe('#EAE2D2');
  });

  it('introduces her by name and role', () => {
    expect(page.querySelector('h1')?.textContent?.trim()).toBe(
      'Crystelle Terrasson',
    );
    expect(page.body.textContent).toContain('Dirigeante');
  });

  it('dials the phone number shown in French grouping', () => {
    const phone = page.querySelector<HTMLAnchorElement>('a[href^="tel:"]');

    expect(phone?.getAttribute('href')).toBe('tel:+33662728799');
    expect(phone?.textContent?.trim()).toBe('06 62 72 87 99');
  });

  it('opens a compose window for her address', () => {
    const email = page.querySelector<HTMLAnchorElement>('a[href^="mailto:"]');

    expect(email?.getAttribute('href')).toBe('mailto:ct@jukkai.fr');
    expect(email?.textContent?.trim()).toBe('ct@jukkai.fr');
  });

  it('leads with saving the contact, as a plain link so iOS opens Contacts', () => {
    const save = page.querySelector<HTMLAnchorElement>(
      'a[href="/contact/crystelle.vcf"]',
    );

    expect(save?.textContent?.trim()).toBe('Enregistrer le contact');
    expect(save?.hasAttribute('download')).toBe(false);
  });

  it('offers Jukkai itself as the second step', () => {
    const discover = page.querySelector<HTMLAnchorElement>('a[href="/"]');

    expect(discover?.textContent?.trim()).toBe('Découvrir Jukkai');
  });

  it('carries the Jukkai wordmark as inline artwork that takes the ink colour', () => {
    const mark = page.querySelector('svg');

    expect(mark).not.toBeNull();
    expect(mark?.closest('[aria-label="Jukkai"]')).not.toBeNull();
  });

  it('keeps her postal address off the page', () => {
    expect(html).not.toContain('Châteaugiron');
    expect(html).not.toContain('26 bis');
  });

  it('never mentions the retired studioterrasson domain', () => {
    expect(html.toLowerCase()).not.toContain('studioterrasson');
  });

  it('is a card pointer, not search-engine content', () => {
    expect(
      page.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content,
    ).toBe('noindex, follow');
  });

  it('loads the generated brand fonts', () => {
    expect(
      page.querySelector(
        'link[rel="stylesheet"][href="/fonts/generated/fonts.css"]',
      ),
    ).not.toBeNull();
  });
});

describe('/contact/crystelle analytics', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('sends the Cloudflare Web Analytics beacon when a site token is configured', async () => {
    vi.stubEnv(ANALYTICS_TOKEN_KEY, 'test-site-token');

    const { document: withToken } = await render();
    const beacon = withToken.querySelector<HTMLScriptElement>(
      'script[src="https://static.cloudflareinsights.com/beacon.min.js"]',
    );

    expect(beacon).not.toBeNull();
    expect(beacon?.dataset.cfBeacon).toBe('{"token": "test-site-token"}');
    expect(beacon?.defer).toBe(true);
  });

  it('ships no half-configured beacon when no token is set', async () => {
    vi.stubEnv(ANALYTICS_TOKEN_KEY, '');

    const { html: withoutToken } = await render();

    expect(withoutToken).not.toContain('cloudflareinsights.com');
  });
});
