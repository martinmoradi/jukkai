// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { isListedInSitemap } from '#/seo';

describe('isListedInSitemap', () => {
  it('keeps the printed-card contact page out, however Astro spells its URL', () => {
    expect(isListedInSitemap('https://jukkai.fr/contact/crystelle/')).toBe(
      false,
    );
    expect(isListedInSitemap('https://jukkai.fr/contact/crystelle')).toBe(
      false,
    );
  });

  it('lists ordinary site content', () => {
    expect(isListedInSitemap('https://jukkai.fr/')).toBe(true);
    expect(isListedInSitemap('https://jukkai.fr/contact/')).toBe(true);
  });
});
