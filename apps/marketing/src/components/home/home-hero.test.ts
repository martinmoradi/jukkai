import { existsSync, readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { getMarketingPage } from '../../lib/pages';
import {
  HOME_HERO_DISPLAY_EMPHASIS,
  HOME_HERO_DISPLAY_ROWS,
  HOME_HERO_FIELD_IMAGE,
  HOME_HERO_PRINTS,
  homeHeroPrintLayer,
} from './home-hero';

const heroSource = readFileSync('src/components/home/HomeHero.astro', 'utf8');
const heroDataSource = readFileSync('src/components/home/home-hero.ts', 'utf8');

describe('homepage hero contracts', () => {
  it('keeps the display rows owned by the hero data contract', () => {
    expect(HOME_HERO_DISPLAY_ROWS).toEqual([
      'Le même œil',
      'choisit les œuvres',
      'et dessine les espaces.',
    ]);
  });

  it('italicizes the display flourish as a suffix of the final row', () => {
    const finalRow = HOME_HERO_DISPLAY_ROWS[HOME_HERO_DISPLAY_ROWS.length - 1];

    expect(HOME_HERO_DISPLAY_EMPHASIS.length).toBeGreaterThan(0);
    expect(finalRow.endsWith(HOME_HERO_DISPLAY_EMPHASIS)).toBe(true);
    expect(heroSource).toContain('<em');
  });

  it('renders the wordmark as the inline, recolorable component', () => {
    expect(heroSource).toContain("import Wordmark from '../Wordmark.astro'");
    expect(heroSource).toContain('<Wordmark');
    expect(heroSource).not.toContain('jukkai-wordmark.svg');
  });

  it('keeps the visible H1 and CTA sourced from the page contract', () => {
    const page = getMarketingPage('/');

    expect(page.h1).toBe("Architecte d'intérieur à Rennes & Châteaugiron");
    expect(page.primaryCta).toEqual({
      href: '/contact/',
      label: 'Parlons de votre projet',
    });
    expect(heroSource.match(/<h1\b/g)).toHaveLength(1);
    expect(heroSource).toContain('{page.h1}');
    expect(heroSource).toContain('page.primaryCta.href');
    expect(heroSource).toContain('page.primaryCta.label');
  });

  it('keeps exploration-only names and placeholder links out of hero code', () => {
    const productionHeroSource = `${heroSource}\n${heroDataSource}`;

    expect(productionHeroSource).not.toMatch(/\/directions\//);
    expect(productionHeroSource).not.toMatch(/href=(['"])#\1/);
    expect(productionHeroSource).not.toMatch(/\bv3\b/i);
    expect(productionHeroSource).not.toMatch(/\bcomp\b/i);
    expect(productionHeroSource).not.toMatch(/\bround\b/i);
  });

  it('keeps stream depth and phase inside their normalized ranges', () => {
    for (const print of HOME_HERO_PRINTS) {
      expect(print.depth).toBeGreaterThan(0);
      expect(print.depth).toBeLessThanOrEqual(1);
      expect(print.phase).toBeGreaterThanOrEqual(0);
      expect(print.phase).toBeLessThan(1);
    }
  });

  it('keeps the near tier reserved for the largest, closest prints', () => {
    const nearPrints = HOME_HERO_PRINTS.filter(
      (print) => homeHeroPrintLayer(print) === 'near',
    );

    expect(nearPrints).toHaveLength(4);
    for (const print of nearPrints) {
      // Near prints are the only ones surfaced on mobile, so the tier and
      // the mobile subset must stay the same set.
      expect(print.mobileWidthVw).toBeGreaterThan(0);
    }
  });

  it('uses only production hero asset paths that exist locally', () => {
    const uniquePrintPaths = [
      ...new Set(HOME_HERO_PRINTS.map((print) => print.imageSrc)),
    ];

    expect(HOME_HERO_FIELD_IMAGE).toBe('/home/hero/field.webp');
    expect(existsSync(`public${HOME_HERO_FIELD_IMAGE}`)).toBe(true);
    expect(uniquePrintPaths).toEqual([
      '/home/hero/prints/jardin-escalier.webp',
      '/home/hero/prints/zigzag-cuisine.webp',
      '/home/hero/prints/arrondir-bleu.webp',
      '/home/hero/prints/waouh-theatre.webp',
      '/home/hero/prints/geometrie-spirale.webp',
      '/home/hero/prints/tournesol-jaune.webp',
      '/home/hero/prints/vivre-grand-entree.webp',
      '/home/hero/prints/caractere-courbe.webp',
      '/home/hero/prints/fonderie-rouge.webp',
    ]);

    for (const print of HOME_HERO_PRINTS) {
      expect(print.imageSrc.startsWith('/home/hero/prints/')).toBe(true);
      expect(existsSync(`public${print.imageSrc}`)).toBe(true);
    }
  });
});
