import { describe, expect, it } from 'vitest';

import {
  applyMoodScrollConfig,
  cloneMoodScrollConfig,
  createDefaultConfig,
  normalizeHexColor,
} from './mood-scroll-config';

describe('mood scroll config dev helpers', () => {
  it('clones configs without sharing nested mood objects', () => {
    const config = createDefaultConfig();
    const clone = cloneMoodScrollConfig(config);

    clone.moods.hero.ground = '#000000';

    expect(config.moods.hero.ground).toBe('#f7ddba');
    expect(clone.moods.hero.ground).toBe('#000000');
  });

  it('normalizes hex colors for hand-edited JSON', () => {
    expect(normalizeHexColor('abc')).toBe('#aabbcc');
    expect(normalizeHexColor('#ABCDEF')).toBe('#abcdef');
    expect(normalizeHexColor('not a color')).toBeNull();
  });

  it('applies a partial loaded config while ignoring invalid fields', () => {
    const config = createDefaultConfig();

    const changed = applyMoodScrollConfig(config, {
      blobStrength: 1.2,
      driftSpeed: Number.NaN,
      projectsVariant: 'blue',
      moods: {
        hero: {
          ground: '123456',
          blob1: '#abc',
          blob2: 'nope',
        },
      },
    });

    expect(changed).toBe(true);
    expect(config.blobStrength).toBe(1.2);
    expect(config.driftSpeed).toBe(0.28);
    expect(config.projectsVariant).toBe('blue');
    expect(config.moods.hero.ground).toBe('#123456');
    expect(config.moods.hero.blob1).toBe('#aabbcc');
    expect(config.moods.hero.blob2).toBe('#eb9c55');
  });

  it('rejects JSON roots that do not contain known config fields', () => {
    const config = createDefaultConfig();

    expect(applyMoodScrollConfig(config, ['nope'])).toBe(false);
    expect(applyMoodScrollConfig(config, { unrelated: true })).toBe(false);
  });
});
