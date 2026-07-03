import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

const headerSource = readFileSync(
  'src/components/home/HomeHeader.astro',
  'utf8',
);
const headerStyles = readFileSync(
  'src/components/home/HomeHeader.module.css',
  'utf8',
);

describe('homepage header contracts', () => {
  it('floats as a transparent overlay over the hero', () => {
    expect(headerStyles).toMatch(/position:\s*absolute/);
    expect(headerStyles).not.toMatch(/background:/);
  });

  it('uses the inline wordmark so the overlay can read light', () => {
    expect(headerSource).toContain("import Wordmark from '../Wordmark.astro'");
    expect(headerSource).toContain('<Wordmark');
    expect(headerSource).not.toContain('jukkai-wordmark.svg');
  });

  it('carries no header CTA button (the hero owns the call to action)', () => {
    expect(headerSource).not.toContain('primaryCta');
    expect(headerSource).not.toContain('navCta');
  });
});
