import { describe, expect, it } from 'vitest';

import { parseSceneLengthVh } from './mood-scroll-conductor';
import {
  applyMoodScrollConfig,
  cloneMoodScrollConfig,
  createDefaultConfig,
  MOOD_SCENE_KEYS,
  normalizeHexColor,
} from './mood-scroll-config';
import { createTunableRegistry, tunable } from './mood-scroll-tunables';

const LIGHT_CHAPTER_KEYS = ['offerLadder', 'artShop', 'trust'] as const;

describe('mood scroll blockout scene model', () => {
  it('declares the six beats in wireframe order with parseable lengths', () => {
    const config = createDefaultConfig();

    expect(config.scenes.map((scene) => scene.key)).toEqual([
      ...MOOD_SCENE_KEYS,
    ]);
    for (const scene of config.scenes) {
      expect(parseSceneLengthVh(scene.length)).toBeGreaterThan(0);
    }
  });

  it('reserves the hand-off seam between the dark and light chapters', () => {
    const keys = createDefaultConfig().scenes.map((scene) => scene.key);

    expect(keys.indexOf('handoff')).toBe(keys.indexOf('galerie') + 1);
    expect(keys.indexOf('offerLadder')).toBe(keys.indexOf('handoff') + 1);
  });

  it('gives the galerie and the hand-off sticky runways for choreography', () => {
    const config = createDefaultConfig();
    const galerie = config.scenes.find((scene) => scene.key === 'galerie');
    const handoff = config.scenes.find((scene) => scene.key === 'handoff');

    expect(galerie?.pin).toBe(true);
    expect(galerie?.enter.mechanism).toBe('takeover');
    expect(handoff?.pin).toBe(true);
    expect(handoff?.enter.mechanism).toBe('takeover');
    // The hand-off's field stays on the dark ground with presence muting;
    // the visible tonal flip is DOM plus the offer ladder's enter band.
    expect(handoff?.stops.at(-1)?.presence).toBeLessThanOrEqual(0.1);
  });

  it('keeps the light chapter unpinned with field presence near zero', () => {
    const config = createDefaultConfig();

    for (const key of LIGHT_CHAPTER_KEYS) {
      const scene = config.scenes.find((entry) => entry.key === key);
      expect(scene).toBeDefined();
      expect(scene?.pin).not.toBe(true);
      for (const stop of scene?.stops ?? []) {
        expect(stop.presence).toBeLessThanOrEqual(0.1);
      }
    }
  });
});

describe('mood scroll config dev helpers', () => {
  it('clones configs without sharing nested scene stop objects', () => {
    const config = createDefaultConfig();
    const clone = cloneMoodScrollConfig(config);

    clone.scenes[0].stops[0].ground = '#000000';

    expect(config.scenes[0].stops[0].ground).toBe('#f7ddba');
    expect(clone.scenes[0].stops[0].ground).toBe('#000000');
  });

  it('normalizes hex colors for hand-edited JSON', () => {
    expect(normalizeHexColor('abc')).toBe('#aabbcc');
    expect(normalizeHexColor('#ABCDEF')).toBe('#abcdef');
    expect(normalizeHexColor('not a color')).toBeNull();
  });

  it('applies a loaded scene config round trip', () => {
    const config = createDefaultConfig();
    const next = cloneMoodScrollConfig(config);
    next.velocityInfluence = 1.4;
    next.colorSmoothing = 0.2;
    next.scenes[0].stops[0].ground = '#123456';
    next.scenes[2].stops[1].presence = 0.25;
    if (next.scenes[1].enter.mechanism !== 'crossfade') {
      throw new Error('umbrella test fixture should be a crossfade');
    }
    next.scenes[1].enter.ease = 'smoothstep';

    const changed = applyMoodScrollConfig(config, next);

    expect(changed).toBe(true);
    expect(config.velocityInfluence).toBe(1.4);
    expect(config.colorSmoothing).toBe(0.2);
    expect(config.scenes[0].stops[0].ground).toBe('#123456');
    expect(config.scenes[2].stops[1].presence).toBe(0.25);
    expect(config.scenes[1].enter).toMatchObject({
      mechanism: 'crossfade',
      ease: 'smoothstep',
    });
  });

  it('round-trips registered tunables and ignores unknown preset ids', () => {
    const config = createDefaultConfig();
    const registry = createTunableRegistry(config);
    const growStart = tunable(registry, 'galerie.growStartScale', 0.5, {
      min: 0.2,
      max: 1,
      step: 0.01,
    });

    growStart.set(0.7);
    const next = cloneMoodScrollConfig(config);
    next.tunables['galerie.growStartScale'] = 0.42;
    next.tunables['unknown.value'] = 99;

    const changed = applyMoodScrollConfig(config, next, registry);

    expect(changed).toBe(true);
    expect(growStart.get()).toBe(0.42);
    expect(config.tunables['unknown.value']).toBeUndefined();
  });

  it('resets missing registered tunables to their defaults on load', () => {
    const config = createDefaultConfig();
    const registry = createTunableRegistry(config);
    const growStart = tunable(registry, 'galerie.growStartScale', 0.5, {
      min: 0.2,
      max: 1,
      step: 0.01,
    });
    const next = cloneMoodScrollConfig(config);

    growStart.set(0.8);
    delete next.tunables['galerie.growStartScale'];

    const changed = applyMoodScrollConfig(config, next, registry);

    expect(changed).toBe(true);
    expect(growStart.get()).toBe(0.5);
  });

  it('sorts loaded stops at parse time', () => {
    const config = createDefaultConfig();
    const next = cloneMoodScrollConfig(config);
    next.scenes[2].stops.reverse();

    const changed = applyMoodScrollConfig(config, next);

    expect(changed).toBe(true);
    expect(config.scenes[2].stops.map((stop) => stop.at)).toEqual([
      0, 0.24, 0.29, 0.55, 0.88,
    ]);
  });

  it('round-trips the galerie surface track and sorts its stops', () => {
    const config = createDefaultConfig();
    const next = cloneMoodScrollConfig(config);
    next.scenes[2].surfaceStops?.reverse();
    const firstSurface = next.scenes[2].surfaceStops?.at(-1);
    if (!firstSurface)
      throw new Error('galerie fixture should have a surface track');
    firstSurface.ground = '#123456';

    const changed = applyMoodScrollConfig(config, next);

    expect(changed).toBe(true);
    expect(config.scenes[2].surfaceStops?.map((stop) => stop.at)).toEqual([
      0, 0.55, 0.88, 1,
    ]);
    expect(config.scenes[2].surfaceStops?.[0]?.ground).toBe('#123456');
  });

  it('loads presets saved before the surface track existed', () => {
    const config = createDefaultConfig();
    const next = cloneMoodScrollConfig(config);
    for (const scene of next.scenes) {
      delete scene.surfaceStops;
    }

    const changed = applyMoodScrollConfig(config, next);

    expect(changed).toBe(true);
    expect(config.scenes[2].surfaceStops).toBeUndefined();
  });

  it('rejects a present-but-malformed surface track', () => {
    const config = createDefaultConfig();
    const next = cloneMoodScrollConfig(config);
    Object.assign(next.scenes[2], { surfaceStops: [{ ground: 'nope' }] });

    expect(applyMoodScrollConfig(config, next)).toBe(false);
  });

  it('clones the surface track without sharing stop objects', () => {
    const config = createDefaultConfig();
    const clone = cloneMoodScrollConfig(config);
    const surfaceStop = clone.scenes[2].surfaceStops?.[0];
    if (!surfaceStop)
      throw new Error('galerie fixture should have a surface track');

    surfaceStop.ground = '#000000';

    expect(config.scenes[2].surfaceStops?.[0]?.ground).toBe('#2036a8');
  });

  it('rejects old-shape or unknown JSON roots', () => {
    const config = createDefaultConfig();

    expect(applyMoodScrollConfig(config, ['nope'])).toBe(false);
    expect(applyMoodScrollConfig(config, { unrelated: true })).toBe(false);
    expect(
      applyMoodScrollConfig(config, {
        blobStrength: 1.2,
        moods: { hero: { ground: '#000000' } },
      }),
    ).toBe(false);
  });

  it('rejects scene configs that cannot match the page sections', () => {
    const config = createDefaultConfig();
    const emptyScenes = cloneMoodScrollConfig(config);
    emptyScenes.scenes = [];
    const renamedScene = cloneMoodScrollConfig(config);
    renamedScene.scenes[2].key = 'projects';
    const unknownEase = cloneMoodScrollConfig(config);
    if (unknownEase.scenes[1].enter.mechanism !== 'crossfade') {
      throw new Error('umbrella test fixture should be a crossfade');
    }
    Object.assign(unknownEase.scenes[1].enter, { ease: 'bounce' });

    expect(applyMoodScrollConfig(config, emptyScenes)).toBe(false);
    expect(applyMoodScrollConfig(config, renamedScene)).toBe(false);
    expect(applyMoodScrollConfig(config, unknownEase)).toBe(false);
    expect(config.scenes[2].key).toBe('galerie');
  });
});
