import {
  findMoodScene,
  hexToRgb,
  mixRgb,
  MOOD_FIELD_COLOR_CHANNELS,
  MOOD_FIELD_NUMBER_CHANNELS,
  type MoodFieldColorChannel,
  type MoodFieldNumberChannel,
  type MoodFieldStop,
  type MoodScene,
  type MoodSceneEnter,
  type MoodScrollConfig,
  type Rgb,
} from './mood-scroll-config';
import type { MoodGlFrame } from './mood-scroll-gl';

export interface ResolvedMoodField {
  ground: Rgb;
  blob1: Rgb;
  blob2: Rgb;
  radius: number;
  radiusRatio: number;
  strength: number;
  roundness: number;
  noise: number;
  drift: number;
  presence: number;
}

export type ConductorTarget =
  | {
      mechanism: 'rest';
      sceneKey: string;
      progress: number;
    }
  | {
      mechanism: 'crossfade' | 'cut';
      fromSceneKey: string;
      toSceneKey: string;
      progress: number;
    }
  | {
      mechanism: 'takeover';
      sceneKey: string;
      progress: number;
    };

interface SceneLayout {
  scene: MoodScene;
  startVh: number;
  lengthVh: number;
}

interface ConductorWindow {
  target: ConductorTarget;
  startVh: number;
  endVh: number;
}

export function resolveSceneStop(
  scene: MoodScene,
  progress: number,
): ResolvedMoodField {
  const stops = [...scene.stops].sort((a, b) => a.at - b.at);
  if (stops.length === 0) {
    return stopToResolved(fallbackStop());
  }

  const clamped = clamp01(progress);
  const first = stops[0];
  const last = stops[stops.length - 1];
  if (clamped <= first.at) return stopToResolved(first);
  if (clamped >= last.at) return stopToResolved(last);

  for (let index = 1; index < stops.length; index += 1) {
    const right = stops[index];
    if (clamped > right.at) continue;
    const left = stops[index - 1];
    const span = right.at - left.at || 1;
    return mixResolved(
      stopToResolved(left),
      stopToResolved(right),
      (clamped - left.at) / span,
    );
  }

  return stopToResolved(last);
}

export function resolveConductorTarget(
  config: MoodScrollConfig,
  target: ConductorTarget,
): ResolvedMoodField {
  if (target.mechanism === 'rest' || target.mechanism === 'takeover') {
    return resolveSceneStop(
      requireScene(config, target.sceneKey),
      target.progress,
    );
  }

  const fromScene = requireScene(config, target.fromSceneKey);
  const toScene = requireScene(config, target.toSceneKey);
  return mixResolved(
    resolveSceneStop(fromScene, 1),
    resolveSceneStop(toScene, 0),
    target.mechanism === 'cut' && target.progress > 0 ? 1 : target.progress,
  );
}

export function resolveConductorFrameAt(
  config: MoodScrollConfig,
  scrollFraction: number,
): ResolvedMoodField {
  const windows = createConductorWindows(config);
  const journeyEndVh = Math.max(...windows.map((window) => window.endVh), 1);
  const scrollVh = clamp01(scrollFraction) * journeyEndVh;
  const firstScene = config.scenes[0];
  let picked: ResolvedMoodField = resolveSceneStop(firstScene, 0);

  for (const window of windows) {
    const progress = progressBetween(scrollVh, window.startVh, window.endVh);
    if (progress > 0) {
      picked = resolveConductorTarget(config, {
        ...window.target,
        progress,
      });
    }
  }

  return picked;
}

export function resolveEnterWindow(
  enter: MoodSceneEnter,
  sceneStartVh: number,
  sceneLengthVh = 100,
  pin = false,
): { startVh: number; endVh: number } {
  if (enter.mechanism === 'crossfade') {
    const [start, end] = enter.band;
    return {
      startVh: sceneStartVh - start * 100,
      endVh: sceneStartVh - end * 100,
    };
  }
  if (enter.mechanism === 'cut') {
    const atVh = sceneStartVh - enter.at * 100;
    return { startVh: atVh, endVh: atVh };
  }
  return {
    startVh: sceneStartVh,
    endVh: sceneStartVh + sceneProgressTravelVh(sceneLengthVh, pin),
  };
}

export function parseSceneLengthVh(length: string): number {
  const match = length.trim().match(/^([0-9]+(?:\.[0-9]+)?)vh$/);
  return match ? Number.parseFloat(match[1]) : 100;
}

export function toMoodGlFrame(
  field: ResolvedMoodField,
  dynamic: { time: number; velocity: number },
): MoodGlFrame {
  const presence = clamp01(field.presence);
  return {
    ground: field.ground,
    blob1: field.blob1,
    blob2: field.blob2,
    radius1: field.radius,
    radius2: field.radius * field.radiusRatio,
    strength: field.strength * presence,
    noise: field.noise * presence,
    time: dynamic.time,
    velocity: dynamic.velocity * presence,
    roundness: field.roundness,
  };
}

function createConductorWindows(config: MoodScrollConfig): ConductorWindow[] {
  const layout = createSceneLayout(config);
  const windows: ConductorWindow[] = [];

  for (let index = 1; index < layout.length; index += 1) {
    const current = layout[index];
    const previous = layout[index - 1];
    const window = resolveEnterWindow(
      current.scene.enter,
      current.startVh,
      current.lengthVh,
      current.scene.pin === true,
    );
    const mechanism = current.scene.enter.mechanism;
    if (mechanism === 'takeover') {
      windows.push({
        startVh: window.startVh,
        endVh: window.endVh,
        target: {
          mechanism,
          sceneKey: current.scene.key,
          progress: 0,
        },
      });
      continue;
    }

    windows.push({
      startVh: window.startVh,
      endVh: window.endVh,
      target: {
        mechanism,
        fromSceneKey: previous.scene.key,
        toSceneKey: current.scene.key,
        progress: 0,
      },
    });
  }

  return windows;
}

function createSceneLayout(config: MoodScrollConfig): SceneLayout[] {
  let startVh = 0;
  return config.scenes.map((scene) => {
    const lengthVh = parseSceneLengthVh(scene.length);
    const layout = { scene, startVh, lengthVh };
    startVh += lengthVh;
    return layout;
  });
}

function sceneProgressTravelVh(lengthVh: number, pin: boolean): number {
  return pin ? Math.max(lengthVh - 100, 1) : Math.max(lengthVh, 1);
}

function requireScene(config: MoodScrollConfig, key: string): MoodScene {
  const scene = findMoodScene(config, key);
  if (!scene) throw new Error(`Unknown mood scene: ${key}`);
  return scene;
}

function stopToResolved(stop: MoodFieldStop): ResolvedMoodField {
  return {
    ground: hexToRgb(stop.ground),
    blob1: hexToRgb(stop.blob1),
    blob2: hexToRgb(stop.blob2),
    radius: stop.radius,
    radiusRatio: stop.radiusRatio,
    strength: stop.strength,
    roundness: stop.roundness,
    noise: stop.noise,
    drift: stop.drift,
    presence: stop.presence,
  };
}

function mixResolved(
  from: ResolvedMoodField,
  to: ResolvedMoodField,
  progress: number,
): ResolvedMoodField {
  const t = clamp01(progress);
  const colors = Object.fromEntries(
    MOOD_FIELD_COLOR_CHANNELS.map((channel) => [
      channel,
      mixRgb(from[channel], to[channel], t),
    ]),
  ) as Record<MoodFieldColorChannel, Rgb>;
  const numbers = Object.fromEntries(
    MOOD_FIELD_NUMBER_CHANNELS.map((channel) => [
      channel,
      mixNumber(from[channel], to[channel], t),
    ]),
  ) as Record<MoodFieldNumberChannel, number>;

  return {
    ...colors,
    ...numbers,
  };
}

function mixNumber(from: number, to: number, progress: number): number {
  return from + (to - from) * progress;
}

function progressBetween(value: number, start: number, end: number): number {
  if (start === end) return value >= start ? 1 : 0;
  return clamp01((value - start) / (end - start));
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(value, 0), 1);
}

function fallbackStop(): MoodFieldStop {
  return {
    at: 0,
    ground: '#000000',
    blob1: '#000000',
    blob2: '#000000',
    radius: 0,
    radiusRatio: 1,
    strength: 0,
    roundness: 0,
    noise: 0,
    drift: 0,
    presence: 0,
  };
}
