// @vitest-environment node

import { describe, expect, it } from 'vitest';

import { CRYSTELLE_VCARD } from '#/data/crystelle';

function properties() {
  return CRYSTELLE_VCARD.split('\r\n');
}

describe('Crystelle vCard', () => {
  it('is a vCard 3.0 envelope with the CRLF line endings the format requires', () => {
    expect(CRYSTELLE_VCARD).not.toMatch(/(?<!\r)\n/);
    expect(properties().slice(0, 2)).toEqual(['BEGIN:VCARD', 'VERSION:3.0']);
    expect(properties().at(-2)).toBe('END:VCARD');
    expect(properties().at(-1)).toBe('');
  });

  it('names her the way the page and the card do', () => {
    expect(properties()).toContain('N:Terrasson;Crystelle;;;');
    expect(properties()).toContain('FN:Crystelle Terrasson');
  });

  it('carries her role at Jukkai', () => {
    expect(properties()).toContain('ORG:Jukkai');
    expect(properties()).toContain('TITLE:Dirigeante');
  });

  it('carries the phone and email printed on the card', () => {
    expect(properties()).toContain('TEL;TYPE=CELL:+33 6 62 72 87 99');
    expect(properties()).toContain('EMAIL;TYPE=INTERNET:ct@jukkai.fr');
  });

  it('carries the postal address the page deliberately does not display', () => {
    expect(properties()).toContain(
      'ADR;TYPE=WORK:;;26 bis rue au Prévôt;Châteaugiron;;35410;France',
    );
  });

  it('points back at Jukkai', () => {
    expect(properties()).toContain('URL:https://jukkai.fr');
  });

  it('ships no portrait yet', () => {
    expect(CRYSTELLE_VCARD).not.toContain('PHOTO');
  });

  it('never mentions the retired studioterrasson domain', () => {
    expect(CRYSTELLE_VCARD.toLowerCase()).not.toContain('studioterrasson');
  });

  it('folds no line past the 75-octet limit', () => {
    for (const property of properties()) {
      expect(Buffer.byteLength(property, 'utf8')).toBeLessThanOrEqual(75);
    }
  });
});
