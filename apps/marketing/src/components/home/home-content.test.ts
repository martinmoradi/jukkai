import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { getMarketingPage, getPrimaryNavigationPages } from '../../lib/pages';
import {
  getHomePrimaryNavigationPages,
  HOME_ART_PLACEHOLDERS,
  HOME_OFFER_PLACEHOLDERS,
  HOME_PENDING_VALIDATION_LABELS,
  HOME_PROJECT_PLACEHOLDERS,
  HOME_PROOF_CLAIMS,
  HOME_SECTION_ORDER,
  HOME_TRUST_PLACEHOLDERS,
} from './home-content';

describe('homepage content contracts', () => {
  it('keeps the production homepage section order stable', () => {
    expect(HOME_SECTION_ORDER).toEqual([
      'hero',
      'umbrella-answer',
      'projects-teaser',
      'offer-ladder-teaser',
      'art-shop-invitation',
      'trust-strip',
      'closing-cta',
    ]);
  });

  it('keeps the proof claims in the canonical order', () => {
    expect(HOME_PROOF_CLAIMS).toEqual(['UNAID', '30 ans de métier']);
  });

  it('labels every placeholder surface as pending validation', () => {
    const labels = [
      ...HOME_PROJECT_PLACEHOLDERS.map((project) => project.label),
      ...HOME_OFFER_PLACEHOLDERS.map((offer) => offer.label),
      ...HOME_ART_PLACEHOLDERS.map((item) => item.label),
      ...HOME_TRUST_PLACEHOLDERS.map((item) => item.label),
    ];

    expect(labels).toEqual(
      expect.arrayContaining(Object.values(HOME_PENDING_VALIDATION_LABELS)),
    );

    for (const label of labels) {
      expect(label).toMatch(/à valider$/);
    }
  });

  it('derives header navigation from the page registry without duplicating home', () => {
    const registryNav = getPrimaryNavigationPages();
    const homeNav = getHomePrimaryNavigationPages();

    expect(homeNav).toEqual(registryNav.filter((page) => page.slug !== '/'));
    expect(homeNav.map((page) => page.slug)).toEqual([
      '/prestations/',
      '/projets/',
      '/art-shop/',
      '/a-propos/',
      '/contact/',
    ]);
    expect(homeNav.map((page) => page.navLabel)).toEqual([
      'Prestations',
      'Projets',
      "L'art shop",
      'À propos',
      'Contact',
    ]);
  });

  it('keeps the homepage CTA and H1 owned by the registry', () => {
    expect(getMarketingPage('/')).toMatchObject({
      h1: "Architecte d'intérieur à Rennes & Châteaugiron",
      primaryCta: {
        href: '/contact/',
        label: 'Parlons de votre projet',
      },
    });
  });

  it('keeps the hero to one H1 sourced from the page contract', () => {
    const heroSource = readFileSync(
      'src/components/home/HomeHero.astro',
      'utf8',
    );

    expect(heroSource.match(/<h1\b/g)).toHaveLength(1);
    expect(heroSource).toContain('{page.h1}');
    expect(heroSource).toContain('page.primaryCta.href');
    expect(heroSource).toContain('page.primaryCta.label');
  });
});
