// Scene-model tuning config for the /directions/mood-scroll/ comp.
//
// Grounds stay on the warm ramp (July 5 color decision); the hue journey
// (lavender, blue, magenta) lives in the blob atmosphere so the closed color
// system is not reopened by default. Every value here is a stage anchor to
// point at in the browser, not a token.

export type Rgb = [number, number, number];

export const MOOD_FIELD_COLOR_CHANNELS = ['ground', 'blob1', 'blob2'] as const;
export type MoodFieldColorChannel = (typeof MOOD_FIELD_COLOR_CHANNELS)[number];

export const MOOD_FIELD_NUMBER_CHANNELS = [
  'radius',
  'radiusRatio',
  'strength',
  'roundness',
  'noise',
  'drift',
  'presence',
] as const;
export type MoodFieldNumberChannel =
  (typeof MOOD_FIELD_NUMBER_CHANNELS)[number];

export interface MoodFieldStop {
  at: number;
  ground: string;
  blob1: string;
  blob2: string;
  radius: number;
  radiusRatio: number;
  strength: number;
  roundness: number;
  noise: number;
  drift: number;
  presence: number;
}

export type MoodEnterEase = 'none';

export type MoodSceneEnter =
  | {
      mechanism: 'crossfade';
      band: [number, number];
      ease: MoodEnterEase;
    }
  | {
      mechanism: 'cut';
      at: number;
    }
  | {
      mechanism: 'takeover';
    };

export interface MoodScene {
  key: string;
  label?: string;
  length: string;
  pin?: boolean;
  enter: MoodSceneEnter;
  stops: MoodFieldStop[];
}

export interface MoodScrollConfig {
  colorSmoothing: number;
  velocityInfluence: number;
  scenes: MoodScene[];
}

export const MOOD_SCENE_KEYS = [
  'hero',
  'umbrella',
  'galerie',
  'artShop',
  'finale',
] as const;

export type MoodSceneKey = (typeof MOOD_SCENE_KEYS)[number];

const DEFAULT_RADIUS = 0.65;
const DEFAULT_RADIUS_RATIO = 0.78;
const DEFAULT_STRENGTH = 0.9;
const DEFAULT_ROUNDNESS = 0;
const DEFAULT_NOISE = 0.05;
const DEFAULT_DRIFT = 0.28;
const DEFAULT_PRESENCE = 1;

export function createDefaultConfig(): MoodScrollConfig {
  const field = (
    at: number,
    colors: Pick<MoodFieldStop, 'ground' | 'blob1' | 'blob2'>,
    overrides: Partial<MoodFieldStop> = {},
  ): MoodFieldStop => ({
    at,
    ground: colors.ground,
    blob1: colors.blob1,
    blob2: colors.blob2,
    radius: DEFAULT_RADIUS,
    radiusRatio: DEFAULT_RADIUS_RATIO,
    strength: DEFAULT_STRENGTH,
    roundness: DEFAULT_ROUNDNESS,
    noise: DEFAULT_NOISE,
    drift: DEFAULT_DRIFT,
    presence: DEFAULT_PRESENCE,
    ...overrides,
  });

  // The galerie middle stop is the v1 umbrella->projects blend at 45%.
  // Keeping it explicit proves the three-stop scene path without changing
  // the first visual pass.
  const galerieMid = {
    ground: '#919093',
    blob1: '#898ab7',
    blob2: '#b08f8c',
  };

  return {
    colorSmoothing: 0.14,
    velocityInfluence: 1,
    scenes: [
      {
        key: 'hero',
        label: 'hero',
        length: '100vh',
        enter: { mechanism: 'cut', at: 0 },
        stops: [
          field(0, {
            ground: '#f7ddba',
            blob1: '#ffb160',
            blob2: '#eb9c55',
          }),
        ],
      },
      {
        key: 'umbrella',
        label: 'umbrella',
        length: '100vh',
        enter: { mechanism: 'crossfade', band: [0.85, 0.2], ease: 'none' },
        stops: [
          field(0, {
            ground: '#f2eae0',
            blob1: '#cdb9e8',
            blob2: '#e6cbd9',
          }),
        ],
      },
      {
        key: 'galerie',
        label: 'galerie',
        length: '270vh',
        pin: true,
        enter: { mechanism: 'takeover' },
        stops: [
          field(0, {
            ground: '#f2eae0',
            blob1: '#cdb9e8',
            blob2: '#e6cbd9',
          }),
          field(0.45, galerieMid),
          field(1, {
            ground: '#1a2334',
            blob1: '#35507c',
            blob2: '#6f462e',
          }),
        ],
      },
      {
        key: 'artShop',
        label: 'art shop',
        length: '100vh',
        enter: { mechanism: 'crossfade', band: [0.85, 0.2], ease: 'none' },
        stops: [
          field(0, {
            ground: '#f4e0dd',
            blob1: '#ec5ea4',
            blob2: '#ffa075',
          }),
        ],
      },
      {
        key: 'finale',
        label: 'finale',
        length: '140vh',
        enter: { mechanism: 'crossfade', band: [0.85, 0.2], ease: 'none' },
        stops: [
          field(
            0,
            {
              ground: '#211913',
              blob1: '#33261d',
              blob2: '#3d2b20',
            },
            {
              drift: DEFAULT_DRIFT * 0.15,
              strength: DEFAULT_STRENGTH * 0.15,
            },
          ),
        ],
      },
    ],
  };
}

export function cloneMoodScrollConfig(
  config: MoodScrollConfig,
): MoodScrollConfig {
  return {
    colorSmoothing: config.colorSmoothing,
    velocityInfluence: config.velocityInfluence,
    scenes: config.scenes.map(cloneScene),
  };
}

export function applyMoodScrollConfig(
  target: MoodScrollConfig,
  raw: unknown,
): boolean {
  const next = parseMoodScrollConfig(raw);
  if (!next) return false;

  target.colorSmoothing = next.colorSmoothing;
  target.velocityInfluence = next.velocityInfluence;
  copyScenes(target.scenes, next.scenes);
  return true;
}

export function findMoodScene(
  config: MoodScrollConfig,
  key: string,
): MoodScene | undefined {
  return config.scenes.find((scene) => scene.key === key);
}

export function normalizeHexColor(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const value = raw.trim();
  const short = value.match(/^#?([0-9a-f]{3})$/i);
  if (short) {
    return `#${short[1]
      .split('')
      .map((char) => `${char}${char}`)
      .join('')
      .toLowerCase()}`;
  }
  const long = value.match(/^#?([0-9a-f]{6})$/i);
  return long ? `#${long[1].toLowerCase()}` : null;
}

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

function parseMoodScrollConfig(raw: unknown): MoodScrollConfig | null {
  if (!isRecord(raw)) return null;
  if (!Array.isArray(raw.scenes)) return null;

  const scenes = raw.scenes.map(parseScene);
  if (scenes.some((scene) => !scene)) return null;

  const colorSmoothing = finiteOrDefault(raw.colorSmoothing, 0.14);
  const velocityInfluence = finiteOrDefault(raw.velocityInfluence, 1);

  return {
    colorSmoothing,
    velocityInfluence,
    scenes: scenes as MoodScene[],
  };
}

function parseScene(raw: unknown): MoodScene | null {
  if (!isRecord(raw)) return null;
  if (typeof raw.key !== 'string' || raw.key.trim() === '') return null;
  if (!Array.isArray(raw.stops) || raw.stops.length === 0) return null;

  const enter = parseEnter(raw.enter);
  if (!enter) return null;

  const stops = raw.stops.map(parseStop);
  if (stops.some((stop) => !stop)) return null;

  return {
    key: raw.key,
    label: typeof raw.label === 'string' ? raw.label : undefined,
    length: typeof raw.length === 'string' ? raw.length : '100vh',
    pin: raw.pin === true,
    enter,
    stops: (stops as MoodFieldStop[]).sort((a, b) => a.at - b.at),
  };
}

function parseEnter(raw: unknown): MoodSceneEnter | null {
  if (!isRecord(raw)) return null;
  if (raw.mechanism === 'takeover') return { mechanism: 'takeover' };
  if (raw.mechanism === 'cut') {
    return {
      mechanism: 'cut',
      at: finiteOrDefault(raw.at, 0),
    };
  }
  if (raw.mechanism === 'crossfade') {
    if (!Array.isArray(raw.band) || raw.band.length !== 2) return null;
    const start = finiteOrDefault(raw.band[0], Number.NaN);
    const end = finiteOrDefault(raw.band[1], Number.NaN);
    if (!Number.isFinite(start) || !Number.isFinite(end)) return null;
    return {
      mechanism: 'crossfade',
      band: [start, end],
      ease: raw.ease === 'none' ? 'none' : 'none',
    };
  }
  return null;
}

function parseStop(raw: unknown): MoodFieldStop | null {
  if (!isRecord(raw)) return null;
  const ground = normalizeHexColor(raw.ground);
  const blob1 = normalizeHexColor(raw.blob1);
  const blob2 = normalizeHexColor(raw.blob2);
  if (!ground || !blob1 || !blob2) return null;

  const stop: Partial<MoodFieldStop> = {
    at: finiteOrDefault(raw.at, Number.NaN),
    ground,
    blob1,
    blob2,
  };

  for (const key of MOOD_FIELD_NUMBER_CHANNELS) {
    stop[key] = finiteOrDefault(raw[key], Number.NaN);
  }

  for (const key of ['at', ...MOOD_FIELD_NUMBER_CHANNELS] as const) {
    if (!Number.isFinite(stop[key])) return null;
  }

  return stop as MoodFieldStop;
}

function cloneScene(scene: MoodScene): MoodScene {
  return {
    key: scene.key,
    label: scene.label,
    length: scene.length,
    pin: scene.pin,
    enter: cloneEnter(scene.enter),
    stops: scene.stops.map((stop) => ({ ...stop })),
  };
}

function cloneEnter(enter: MoodSceneEnter): MoodSceneEnter {
  if (enter.mechanism === 'crossfade') {
    return {
      mechanism: 'crossfade',
      band: [...enter.band],
      ease: enter.ease,
    };
  }
  return { ...enter };
}

function copyScenes(target: MoodScene[], source: MoodScene[]): void {
  target.length = source.length;
  for (let index = 0; index < source.length; index += 1) {
    const next = source[index];
    const current = target[index];
    if (!current) {
      target[index] = cloneScene(next);
      continue;
    }

    current.key = next.key;
    current.label = next.label;
    current.length = next.length;
    current.pin = next.pin;
    current.enter = cloneEnter(next.enter);
    current.stops.length = next.stops.length;
    for (let stopIndex = 0; stopIndex < next.stops.length; stopIndex += 1) {
      current.stops[stopIndex] = { ...next.stops[stopIndex] };
    }
  }
}

function finiteOrDefault(raw: unknown, fallback: number): number {
  return typeof raw === 'number' && Number.isFinite(raw) ? raw : fallback;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
