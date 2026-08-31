// @vitest-environment node

import { readFile } from 'node:fs/promises';

import { beforeAll, describe, expect, it } from 'vitest';

let css: string;

beforeAll(async () => {
  css = await readFile('src/styles/contact-card.css', 'utf8');
});

describe('contact-card.css', () => {
  it('paints from the visual foundations v0 palette and proposes no accent colour', () => {
    const hexes = new Set(
      (css.match(/#[0-9a-f]{3,8}\b/gi) ?? []).map((hex) => hex.toUpperCase()),
    );

    expect(hexes).toEqual(new Set(['#EAE2D2', '#1D1D1B']));
  });

  it('sets Hatton for the name and Frama for the contact block', () => {
    expect(css).toContain('pangram-pangram-hatton');
    expect(css).toContain('pangram-pangram-frama');
  });

  it('is mobile-first: any viewport query widens rather than narrows', () => {
    expect(css).not.toMatch(/@media[^{]*max-width/);
  });
});
