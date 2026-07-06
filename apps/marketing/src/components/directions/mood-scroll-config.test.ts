import { describe, expect, it } from 'vitest';

import {
  applyMoodScrollConfig,
  cloneMoodScrollConfig,
  createDefaultConfig,
  normalizeHexColor,
} from './mood-scroll-config';

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

  it('sorts loaded stops at parse time', () => {
    const config = createDefaultConfig();
    const next = cloneMoodScrollConfig(config);
    next.scenes[2].stops.reverse();

    const changed = applyMoodScrollConfig(config, next);

    expect(changed).toBe(true);
    expect(config.scenes[2].stops.map((stop) => stop.at)).toEqual([0, 0.45, 1]);
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
