// Palette and tuning config for the /directions/mood-scroll/ comp.
//
// Grounds stay on the warm ramp (July 5 color decision); the hue journey
// (lavender, blue/aubergine, magenta) lives in the blob atmosphere so the
// closed color system is not reopened by default. Every value here is a
// stage anchor to point at in the browser, not a token.

export interface Mood {
  ground: string;
  blob1: string;
  blob2: string;
}

export type ProjectsVariant = 'blue' | 'aubergine';

export interface MoodScrollConfig {
  blobRadius: number;
  blobRadiusRatio: number;
  blobStrength: number;
  noiseStrength: number;
  driftSpeed: number;
  velocityInfluence: number;
  projectsVariant: ProjectsVariant;
  moods: {
    hero: Mood;
    umbrella: Mood;
    projectsBlue: Mood;
    projectsAubergine: Mood;
    artShop: Mood;
    finale: Mood;
  };
}

export const MOOD_SEQUENCE = [
  'hero',
  'umbrella',
  'projects',
  'artShop',
  'finale',
] as const;

export type MoodStop = (typeof MOOD_SEQUENCE)[number];

export function createDefaultConfig(): MoodScrollConfig {
  return {
    blobRadius: 0.65,
    blobRadiusRatio: 0.78,
    blobStrength: 0.9,
    noiseStrength: 0.05,
    driftSpeed: 0.28,
    velocityInfluence: 1,
    projectsVariant: 'aubergine',
    moods: {
      hero: { ground: '#f6d9b4', blob1: '#ff9d4d', blob2: '#d96f34' },
      umbrella: { ground: '#f2eae0', blob1: '#c5b0e4', blob2: '#e3c4d6' },
      projectsBlue: { ground: '#1a2334', blob1: '#3d5f94', blob2: '#8a4b2e' },
      projectsAubergine: {
        ground: '#291a2b',
        blob1: '#6c3b63',
        blob2: '#a0522f',
      },
      artShop: { ground: '#f4e0dd', blob1: '#e0348c', blob2: '#ff8a5c' },
      finale: { ground: '#211913', blob1: '#33261d', blob2: '#3d2b20' },
    },
  };
}

export function resolveMood(config: MoodScrollConfig, stop: MoodStop): Mood {
  if (stop === 'projects') {
    return config.projectsVariant === 'blue'
      ? config.moods.projectsBlue
      : config.moods.projectsAubergine;
  }
  return config.moods[stop];
}

export type Rgb = [number, number, number];

export function hexToRgb(hex: string): Rgb {
  const raw = hex.replace('#', '');
  const value = Number.parseInt(raw, 16);
  if (raw.length !== 6 || Number.isNaN(value)) {
    return [0, 0, 0];
  }
  return [
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ];
}

export function mixRgb(a: Rgb, b: Rgb, t: number): Rgb {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}
