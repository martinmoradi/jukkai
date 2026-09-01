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

  it('publishes icons and social-card metadata from committed assets', () => {
    expect(
      page.querySelector('link[rel="icon"][type="image/svg+xml"][href]'),
    ).not.toBeNull();
    expect(
      page.querySelector('link[rel="apple-touch-icon"][sizes="180x180"][href]'),
    ).not.toBeNull();
    expect(
      page.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content,
    ).toBe(page.title);
    expect(
      page.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.content,
    ).toMatch(/^https?:\/\//);
  });

  it('introduces her by name and role', () => {
    expect(page.querySelector('h1')?.textContent?.trim()).toBe(
      'Crystelle Terrasson',
    );
    expect(page.body.textContent).toContain('Dirigeante');
  });

  it('shows her real portrait with a useful text alternative', () => {
    const portrait = page.querySelector<HTMLImageElement>(
      '.card__portrait-image',
    );

    expect(portrait).not.toBeNull();
    expect(portrait?.alt).toBe(
      'Crystelle Terrasson, architecte d’intérieur et dirigeante de Jukkai',
    );
  });

  it('dials the phone number shown in French grouping', () => {
    const phones = page.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]');
    const phone = phones.item(0);

    expect(phones).toHaveLength(1);
    expect(phone?.getAttribute('href')).toBe('tel:+33662728799');
    expect(
      phone?.querySelector('.card__detail-value')?.textContent?.trim(),
    ).toBe('06 62 72 87 99');
  });

  it('opens a compose window for her address', () => {
    const emails =
      page.querySelectorAll<HTMLAnchorElement>('a[href^="mailto:"]');
    const email = emails.item(0);

    expect(emails).toHaveLength(1);
    expect(email?.getAttribute('href')).toBe('mailto:ct@jukkai.fr');
    expect(
      email?.querySelector('.card__detail-value')?.textContent?.trim(),
    ).toBe('ct@jukkai.fr');
  });

  it('offers saving the contact as a plain link so iOS opens Contacts', () => {
    const save = page.querySelector<HTMLAnchorElement>(
      'a[href="/contact/crystelle.vcf"]',
    );

    expect(save?.textContent?.trim()).toBe('Ajouter à mes contacts');
    expect(save?.hasAttribute('download')).toBe(false);
  });

  it('places Jukkai discovery above the thumb-reachable primary action', () => {
    expect(
      [...page.querySelectorAll('.card__action')].map((action) =>
        action.textContent?.trim(),
      ),
    ).toEqual(['Visiter jukkai.fr', 'Ajouter à mes contacts']);
  });

  it('keeps the identity compact without a redundant wordmark', () => {
    expect(page.querySelector('.card__wordmark')).toBeNull();
  });

  it('opens the professional address in a mobile-friendly maps destination', () => {
    const address = page.querySelector<HTMLAnchorElement>(
      'a[href^="https://www.google.com/maps/search/"]',
    );

    expect(address?.textContent).toContain('26 bis rue au Prévôt');
    expect(address?.textContent).toContain('35410 Châteaugiron');

    const destination = new URL(address!.href);
    expect(destination.searchParams.get('query')).toBe(
      '26 bis rue au Prévôt, 35410 Châteaugiron, France',
    );
    expect(address?.dataset.appleMapsUrl).toContain('https://maps.apple.com/');
  });

  it("links to Crystelle's current Instagram account", () => {
    const instagram = page.querySelector<HTMLAnchorElement>(
      'a[href="https://www.instagram.com/studiocrystelleterrasson/"]',
    );

    expect(instagram?.textContent).toContain('@studiocrystelleterrasson');
  });

  it('keeps the mobile card concise without redundant framing or actions', () => {
    expect(html).not.toContain('Carte de contact Jukkai');
    expect(html).not.toContain('Deux expressions d’un même regard');
    expect(html).not.toContain('Ou directement');
    expect(html).not.toContain('Architecture intérieure');
  });

  it('names the action available from every contact row', () => {
    expect(
      [...page.querySelectorAll('.card__detail-action')].map((action) =>
        action.textContent?.trim(),
      ),
    ).toEqual(['Appeler', 'Écrire', 'Plan', 'Voir']);
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
