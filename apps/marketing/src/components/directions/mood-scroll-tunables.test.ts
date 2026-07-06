import { describe, expect, it } from 'vitest';

import { createDefaultConfig } from './mood-scroll-config';
import { createTunableRegistry, tunable } from './mood-scroll-tunables';

describe('mood scroll tunables registry', () => {
  it('preserves registration order and derives scene grouping from ids', () => {
    const config = createDefaultConfig();
    const registry = createTunableRegistry(config);

    const growStart = tunable(registry, 'galerie.growStartScale', 0.5, {
      min: 0.2,
      max: 1,
      step: 0.01,
    });
    const captionStart = tunable(registry, 'galerie.captionStart', 0.6, {
      min: 0,
      max: 1,
      step: 0.01,
    });

    expect(registry.entries().map((entry) => entry.id)).toEqual([
      'galerie.growStartScale',
      'galerie.captionStart',
    ]);
    expect(growStart.sceneKey).toBe('galerie');
    expect(captionStart.sceneKey).toBe('galerie');
  });

  it('returns live handles backed by the preset config object', () => {
    const config = createDefaultConfig();
    const registry = createTunableRegistry(config);
    const growStart = tunable(registry, 'galerie.growStartScale', 0.5, {
      min: 0.2,
      max: 1,
      step: 0.01,
    });

    growStart.set(0.72);

    expect(growStart.get()).toBe(0.72);
    expect(config.tunables['galerie.growStartScale']).toBe(0.72);
  });
});
