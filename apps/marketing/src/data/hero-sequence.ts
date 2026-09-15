/** An authored edit: matching faces and silhouettes, colour bursts, then a breath. */
export type HeroShot = {
  artwork: number;
  duration: number;
  transition?: 'wipe' | 'rise' | 'dissolve';
  from: [scale: number, x: number, y: number];
  to: [scale: number, x: number, y: number];
};

// Translations are percentages. A little overscan keeps every crop edge covered.
export const HERO_SHOTS: HeroShot[] = [
  { artwork: 0, duration: 1600, from: [1.04, 0, 1], to: [1.12, -1, 0] },
  { artwork: 1, duration: 800, from: [1.12, -1, 0], to: [1.15, -1, 0] },
  { artwork: 0, duration: 700, from: [1.3, 2, 2], to: [1.33, 2, 2] },
  {
    artwork: 7,
    duration: 1900,
    transition: 'wipe',
    from: [1.1, -2, 1],
    to: [1.04, 0, 0],
  },
  { artwork: 8, duration: 850, from: [1.04, 0, 0], to: [1.1, 1, 0] },
  { artwork: 5, duration: 1100, from: [1.08, 0, 0], to: [1.15, -1, 0] },
  { artwork: 6, duration: 800, from: [1.1, 1, 0], to: [1.14, 1, 0] },
  { artwork: 5, duration: 700, from: [1.35, -4, 2], to: [1.38, -4, 2] },
  {
    artwork: 2,
    duration: 1800,
    transition: 'rise',
    from: [1.08, 0, 0],
    to: [1.14, 0, 1],
  },
  { artwork: 3, duration: 750, from: [1.1, 0, 0], to: [1.14, 0, 0] },
  { artwork: 4, duration: 750, from: [1.1, 0, 0], to: [1.14, 0, 0] },
  { artwork: 2, duration: 750, from: [1.24, 0, 2], to: [1.27, 0, 2] },
  {
    artwork: 9,
    duration: 2300,
    transition: 'dissolve',
    from: [1.14, 1, 0],
    to: [1.04, 0, 0],
  },
  { artwork: 1, duration: 1100, from: [1.18, 1, 1], to: [1.24, 0, 1] },
  { artwork: 7, duration: 750, from: [1.25, -3, 1], to: [1.28, -3, 1] },
  { artwork: 8, duration: 850, from: [1.12, 1, 0], to: [1.16, 0, 0] },
  {
    artwork: 6,
    duration: 1800,
    transition: 'wipe',
    from: [1.14, -1, 0],
    to: [1.04, 0, 0],
  },
  { artwork: 4, duration: 900, from: [1.12, 0, 1], to: [1.16, 0, 1] },
  { artwork: 3, duration: 750, from: [1.18, 0, 1], to: [1.22, 0, 1] },
  {
    artwork: 1,
    duration: 2000,
    transition: 'rise',
    from: [1.06, 0, 0],
    to: [1.14, 1, 0],
  },
];
