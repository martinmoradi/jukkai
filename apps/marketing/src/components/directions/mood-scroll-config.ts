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
  blobRoundness: number;
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
  // Palette discipline (learned against the reference demo): blob colors
  // stay within a tight lightness band of their ground and differ mainly in
  // saturation/hue. A blob much darker than a light ground reads as a stain,
  // not as light. On dark grounds the blobs sit slightly lighter instead:
  // they are the light sources in the room.
  return {
    blobRadius: 0.65,
    blobRadiusRatio: 0.78,
    blobStrength: 0.9,
    blobRoundness: 0,
    noiseStrength: 0.05,
    driftSpeed: 0.28,
    velocityInfluence: 1,
    projectsVariant: 'aubergine',
    moods: {
      hero: { ground: '#f7ddba', blob1: '#ffb160', blob2: '#eb9c55' },
      umbrella: { ground: '#f2eae0', blob1: '#cdb9e8', blob2: '#e6cbd9' },
      projectsBlue: { ground: '#1a2334', blob1: '#35507c', blob2: '#6f462e' },
      projectsAubergine: {
        ground: '#291a2b',
        blob1: '#5b3459',
        blob2: '#8f4d31',
      },
      artShop: { ground: '#f4e0dd', blob1: '#ec5ea4', blob2: '#ffa075' },
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
