import { describe, expect, it } from 'vitest';

import {
  buildSiteJsonLd,
  getAbsoluteSiteUrl,
  getCanonicalPath,
  getSitemapUrl,
  SITE_METADATA,
} from './site-metadata';

describe('site metadata', () => {
  it('formats canonical page paths with trailing slashes', () => {
    expect(getCanonicalPath('/prestations')).toBe('/prestations/');
    expect(getCanonicalPath('art-shop')).toBe('/art-shop/');
    expect(getCanonicalPath('/')).toBe('/');
  });

  it('keeps file-like paths unchanged', () => {
    expect(getCanonicalPath('/robots.txt')).toBe('/robots.txt');
  });

  it('builds absolute production URLs', () => {
    expect(getAbsoluteSiteUrl('/')).toBe('https://jukkai.fr/');
    expect(getSitemapUrl()).toBe('https://jukkai.fr/sitemap-index.xml');
  });

  it('builds truthful organization and website JSON-LD', () => {
    const jsonLd = buildSiteJsonLd({
      canonicalPath: '/',
      description: SITE_METADATA.defaultDescription,
      title: SITE_METADATA.defaultTitle,
    });

    expect(jsonLd).toEqual(
      expect.objectContaining({
        '@context': 'https://schema.org',
      }),
    );
    expect(jsonLd['@graph']).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          '@type': 'Organization',
          name: 'Jukkai by Crystelle Terrasson',
          url: 'https://jukkai.fr',
        }),
        expect.objectContaining({
          '@type': 'WebSite',
          inLanguage: 'fr',
        }),
        expect.objectContaining({
          '@type': 'WebPage',
          url: 'https://jukkai.fr/',
        }),
      ]),
    );
  });
});
