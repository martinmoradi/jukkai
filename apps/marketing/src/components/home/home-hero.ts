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

export interface HomeHeroPrint {
  /**
   * How close the print sits to the viewer, 0 (far) to 1 (near). Drives the
   * near/far opacity tier, stream speed, and cursor-parallax amplitude.
   */
  readonly depth: number;
  readonly imageSrc: `/home/hero/prints/${string}.webp`;
  readonly mobileWidthVw?: number;
  /**
   * Where in the stream loop this print starts, 0 to 1, so the field is
   * already populated at load instead of every print entering from the
   * bottom at once. Ignored by the static (reduced-motion / no-JS) frame.
   */
  readonly phase: number;
  readonly widthVw: number;
  readonly xPercent: number;
  readonly yPercent: number;
}

// Prints at or above this depth read as the near tier: full opacity on
// desktop, allowed to pass in front of the type.
const HOME_HERO_NEAR_DEPTH = 0.7;

export function homeHeroPrintLayer(print: HomeHeroPrint): 'near' | 'far' {
  return print.depth >= HOME_HERO_NEAR_DEPTH ? 'near' : 'far';
}

export const HOME_HERO_PRINTS: readonly HomeHeroPrint[] = [
  {
    depth: 0.95,
    imageSrc: '/home/hero/prints/jardin-escalier.webp',
    mobileWidthVw: 18,
    phase: 0,
    widthVw: 11,
    xPercent: 5,
    yPercent: 21,
  },
  {
    depth: 0.35,
    imageSrc: '/home/hero/prints/zigzag-cuisine.webp',
    phase: 0.35,
    widthVw: 5,
    xPercent: 2,
    yPercent: 48,
  },
  {
    depth: 0.8,
    imageSrc: '/home/hero/prints/arrondir-bleu.webp',
    mobileWidthVw: 17,
    phase: 0.6,
    widthVw: 9.5,
    xPercent: 13,
    yPercent: 61,
  },
  {
    depth: 0.3,
    imageSrc: '/home/hero/prints/waouh-theatre.webp',
    phase: 0.15,
    widthVw: 5.2,
    xPercent: 19,
    yPercent: 76,
  },
  {
    depth: 0.3,
    imageSrc: '/home/hero/prints/geometrie-spirale.webp',
    phase: 0.45,
    widthVw: 4.6,
    xPercent: 36,
    yPercent: 15,
  },
  {
    depth: 0.25,
    imageSrc: '/home/hero/prints/tournesol-jaune.webp',
    phase: 0.75,
    widthVw: 4.2,
    xPercent: 47,
    yPercent: 68.5,
  },
  {
    depth: 0.35,
    imageSrc: '/home/hero/prints/vivre-grand-entree.webp',
    phase: 0.1,
    widthVw: 4.8,
    xPercent: 57,
    yPercent: 68.5,
  },
  {
    depth: 0.3,
    imageSrc: '/home/hero/prints/caractere-courbe.webp',
    phase: 0.9,
    widthVw: 4.4,
    xPercent: 64,
    yPercent: 8,
  },
  {
    depth: 1,
    imageSrc: '/home/hero/prints/fonderie-rouge.webp',
    mobileWidthVw: 18,
    phase: 0.25,
    widthVw: 11.5,
    xPercent: 85,
    yPercent: 56.5,
  },
  {
    depth: 0.85,
    imageSrc: '/home/hero/prints/tournesol-jaune.webp',
    mobileWidthVw: 16,
    phase: 0.7,
    widthVw: 10,
    xPercent: 78,
    yPercent: 17,
  },
  {
    depth: 0.4,
    imageSrc: '/home/hero/prints/caractere-courbe.webp',
    phase: 0.5,
    widthVw: 5,
    xPercent: 93,
    yPercent: 44,
  },
  {
    depth: 0.35,
    imageSrc: '/home/hero/prints/jardin-escalier.webp',
    phase: 0.85,
    widthVw: 5.5,
    xPercent: 72,
    yPercent: 10,
  },
  {
    depth: 0.3,
    imageSrc: '/home/hero/prints/arrondir-bleu.webp',
    phase: 0.55,
    widthVw: 4.5,
    xPercent: 30,
    yPercent: 6,
  },
  {
    depth: 0.3,
    imageSrc: '/home/hero/prints/waouh-theatre.webp',
    phase: 0.3,
    widthVw: 4.8,
    xPercent: 90,
    yPercent: 78,
  },
] as const;
