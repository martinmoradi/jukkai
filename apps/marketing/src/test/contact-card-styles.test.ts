// @vitest-environment node

import { readFile } from 'node:fs/promises';

import { beforeAll, describe, expect, it } from 'vitest';

let css: string;

beforeAll(async () => {
  css = await readFile('src/styles/contact-card.css', 'utf8');
});

describe('contact-card.css', () => {
  it('keeps the ivory and ink anchors while adding the sphere cobalt for action', () => {
    const hexes = new Set(
      (css.match(/#[0-9a-f]{3,8}\b/gi) ?? []).map((hex) => hex.toUpperCase()),
    );

    expect(hexes).toEqual(new Set(['#EAE2D2', '#1D1D1B']));
    expect(css).toContain('oklch(30.2% 0.202 264.157deg)');
  });

  it('sets Hatton for the name and Frama for the contact block', () => {
    expect(css).toContain('pangram-pangram-hatton');
    expect(css).toContain('pangram-pangram-frama');
  });

  it('is mobile-first: any viewport query widens rather than narrows', () => {
    expect(css).not.toMatch(/@media[^{]*max-width/);
  });
});
