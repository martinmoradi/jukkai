import { describe, expect, it } from 'vitest';

import {
  resolveConductorTarget,
  resolveEnterWindow,
  resolveSceneStop,
  toMoodGlFrame,
} from './mood-scroll-conductor';
import type { MoodFieldStop, MoodScene } from './mood-scroll-config';

const TOLERANCE = 0.002;

describe('mood scroll scene conductor', () => {
  it('interpolates scene stops at boundaries and between stops', () => {
    const scene = testScene('test', [
      stop({ at: 0, ground: '#000000', strength: 0, presence: 1 }),
      stop({ at: 0.5, ground: '#808080', strength: 0.5, presence: 0.5 }),
      stop({ at: 1, ground: '#ffffff', strength: 1, presence: 0 }),
    ]);

    expect(resolveSceneStop(scene, 0).ground).toBeCloseRgb([0, 0, 0]);
    expect(resolveSceneStop(scene, 0.5).ground).toBeCloseRgb([
      128 / 255,
      128 / 255,
      128 / 255,
    ]);
    expect(resolveSceneStop(scene, 0.75).ground).toBeCloseRgb([
      (128 / 255 + 1) / 2,
      (128 / 255 + 1) / 2,
      (128 / 255 + 1) / 2,
    ]);
    expect(resolveSceneStop(scene, 0.75).strength).toBeCloseTo(0.75, 6);
    expect(resolveSceneStop(scene, 0.75).presence).toBeCloseTo(0.25, 6);
  });

  it('resolves crossfade enter bands from scene starts', () => {
    expect(
      resolveEnterWindow(
        { mechanism: 'crossfade', band: [0.85, 0.2], ease: 'none' },
        100,
      ),
    ).toEqual({ startVh: 15, endVh: 80 });
  });

  it('applies crossfade enter ease to blend progress', () => {
    const config = {
      colorSmoothing: 0.14,
      velocityInfluence: 1,
      tunables: {},
      scenes: [
        testScene('from', [stop({ at: 0, ground: '#000000' })]),
        testScene('to', [stop({ at: 0, ground: '#ffffff' })]),
      ],
    };

    const frame = resolveConductorTarget(config, {
      mechanism: 'crossfade',
      fromSceneKey: 'from',
      toSceneKey: 'to',
      progress: 0.25,
      ease: 'smoothstep',
    });

    expect(frame.ground).toBeCloseRgb([0.15625, 0.15625, 0.15625]);
  });

  it('applies presence to rendered field strength and grain', () => {
    const frame = toMoodGlFrame(
      {
        ground: [1, 1, 1],
        blob1: [0.5, 0.5, 0.5],
        blob2: [0, 0, 0],
        radius: 0.8,
        radiusRatio: 0.5,
        strength: 1.2,
        roundness: 0.3,
        noise: 0.1,
        drift: 0.2,
        presence: 0.25,
      },
      { time: 3, velocity: 0.4 },
    );

    expect(frame.radius1).toBe(0.8);
    expect(frame.radius2).toBe(0.4);
    expect(frame.strength).toBeCloseTo(0.3, 6);
    expect(frame.noise).toBeCloseTo(0.025, 6);
    expect(frame.time).toBe(3);
    expect(frame.velocity).toBeCloseTo(0.1, 6);
  });
});

function stop(overrides: Partial<MoodFieldStop>): MoodFieldStop {
  return {
    at: 0,
    ground: '#000000',
    blob1: '#111111',
    blob2: '#222222',
    radius: 1,
    radiusRatio: 1,
    strength: 1,
    roundness: 0,
    noise: 0,
    drift: 0,
    presence: 1,
    ...overrides,
  };
}

function testScene(key: string, stops: MoodFieldStop[]): MoodScene {
  return {
    key,
    length: '100vh',
    enter: { mechanism: 'crossfade', band: [0.85, 0.2], ease: 'none' },
    stops,
  };
}

expect.extend({
  toBeCloseRgb(received: number[], expected: number[]) {
    const pass =
      received.length === expected.length &&
      received.every(
        (channel, index) => Math.abs(channel - expected[index]) <= TOLERANCE,
      );

    return {
      message: () =>
        `expected [${received.join(', ')}] to be close to [${expected.join(
          ', ',
        )}]`,
      pass,
    };
  },
});

declare module 'vitest' {
  interface Assertion {
    toBeCloseRgb(expected: number[]): void;
  }
}
