export const HOME_HERO_FIELD_IMAGE = '/home/hero/field.webp' as const;

export const HOME_HERO_DISPLAY_ROWS = [
  'Le même œil',
  'choisit les œuvres',
  'et dessine les espaces.',
] as const;

export const HOME_HERO_DISPLAY_TEXT = HOME_HERO_DISPLAY_ROWS.join(' ');

// The tail of the final row is set in italic — the one expressive flourish in
// the display. It must stay a suffix of the last row so the split renders the
// full sentence unchanged.
export const HOME_HERO_DISPLAY_EMPHASIS = 'les espaces.' as const;

type HomeHeroPrintLayer = 'near' | 'far';

export interface HomeHeroPrint {
  readonly imageSrc: `/home/hero/prints/${string}.webp`;
  readonly layer: HomeHeroPrintLayer;
  readonly mobileWidthVw?: number;
  readonly widthVw: number;
  readonly xPercent: number;
  readonly yPercent: number;
}

export const HOME_HERO_PRINTS: readonly HomeHeroPrint[] = [
  {
    imageSrc: '/home/hero/prints/jardin-escalier.webp',
    layer: 'near',
    mobileWidthVw: 18,
    widthVw: 11,
    xPercent: 5,
    yPercent: 21,
  },
  {
    imageSrc: '/home/hero/prints/zigzag-cuisine.webp',
    layer: 'far',
    widthVw: 5,
    xPercent: 2,
    yPercent: 48,
  },
  {
    imageSrc: '/home/hero/prints/arrondir-bleu.webp',
    layer: 'near',
    mobileWidthVw: 17,
    widthVw: 9.5,
    xPercent: 13,
    yPercent: 61,
  },
  {
    imageSrc: '/home/hero/prints/waouh-theatre.webp',
    layer: 'far',
    widthVw: 5.2,
    xPercent: 19,
    yPercent: 76,
  },
  {
    imageSrc: '/home/hero/prints/geometrie-spirale.webp',
    layer: 'far',
    widthVw: 4.6,
    xPercent: 36,
    yPercent: 15,
  },
  {
    imageSrc: '/home/hero/prints/tournesol-jaune.webp',
    layer: 'far',
    widthVw: 4.2,
    xPercent: 47,
    yPercent: 68.5,
  },
  {
    imageSrc: '/home/hero/prints/vivre-grand-entree.webp',
    layer: 'far',
    widthVw: 4.8,
    xPercent: 57,
    yPercent: 68.5,
  },
  {
    imageSrc: '/home/hero/prints/caractere-courbe.webp',
    layer: 'far',
    widthVw: 4.4,
    xPercent: 64,
    yPercent: 8,
  },
  {
    imageSrc: '/home/hero/prints/fonderie-rouge.webp',
    layer: 'near',
    mobileWidthVw: 18,
    widthVw: 11.5,
    xPercent: 85,
    yPercent: 56.5,
  },
  {
    imageSrc: '/home/hero/prints/tournesol-jaune.webp',
    layer: 'near',
    mobileWidthVw: 16,
    widthVw: 10,
    xPercent: 78,
    yPercent: 17,
  },
  {
    imageSrc: '/home/hero/prints/caractere-courbe.webp',
    layer: 'far',
    widthVw: 5,
    xPercent: 93,
    yPercent: 44,
  },
  {
    imageSrc: '/home/hero/prints/jardin-escalier.webp',
    layer: 'far',
    widthVw: 5.5,
    xPercent: 72,
    yPercent: 10,
  },
  {
    imageSrc: '/home/hero/prints/arrondir-bleu.webp',
    layer: 'far',
    widthVw: 4.5,
    xPercent: 30,
    yPercent: 6,
  },
  {
    imageSrc: '/home/hero/prints/waouh-theatre.webp',
    layer: 'far',
    widthVw: 4.8,
    xPercent: 90,
    yPercent: 78,
  },
] as const;
