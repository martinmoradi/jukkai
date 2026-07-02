import { describe, expect, it } from 'vitest';

import {
  getIndexableMarketingPages,
  getMarketingPage,
  getPrimaryNavigationPages,
  MARKETING_PAGES,
  PAGE_STATUSES,
} from './pages';

describe('marketing page content', () => {
  it('keeps the homepage traceable to the content matrix', () => {
    expect(getMarketingPage('/')).toMatchObject({
      h1: "Architecte d'intérieur à Rennes & Châteaugiron",
      primaryCta: {
        href: '/contact/',
        label: 'Parlons de votre projet',
      },
      primaryKeyword: 'jukkai, crystelle terrasson, studio terrasson',
      sourceDoc: 'docs/content-matrix.md',
      status: 'draft-ready',
    });
  });

  it('requires every page row to have the contract fields reviewers asked for', () => {
    const slugs = new Set<string>();

    for (const page of MARKETING_PAGES) {
      expect(page.slug === '/' || /^\/.*\/$/.test(page.slug)).toBe(true);
      expect(slugs.has(page.slug)).toBe(false);
      slugs.add(page.slug);

      expect(page.title.trim()).not.toBe('');
      expect(page.metaDescription.trim()).not.toBe('');
      expect(PAGE_STATUSES).toContain(page.status);
      expect(page.sourceDoc).toMatch(/^docs\/.+\.md$/);
    }

    const ctas = MARKETING_PAGES.flatMap((page) =>
      page.primaryCta ? [page.primaryCta] : [],
    );

    for (const cta of ctas) {
      expect(cta.href).toMatch(/^\/.*\/$/);
      expect(cta.label.trim()).not.toBe('');
    }
  });

  it('keeps reserved and template rows out of indexable page lists', () => {
    const indexableSlugs = getIndexableMarketingPages().map(
      (page) => page.slug,
    );

    expect(indexableSlugs).toContain('/prestations/');
    expect(indexableSlugs).not.toContain('/decoratrice-interieur-rennes/');
    expect(indexableSlugs).not.toContain('/projets/{slug-descriptif}/');
  });

  it('keeps primary navigation ordered from the matrix', () => {
    expect(getPrimaryNavigationPages().map((page) => page.navLabel)).toEqual([
      'Accueil',
      'Prestations',
      'Projets',
      "L'art shop",
      'À propos',
      'Contact',
    ]);
  });
});
