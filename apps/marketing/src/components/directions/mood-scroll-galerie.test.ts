import { describe, expect, it } from 'vitest';

import {
  clampSegment,
  entranceSegment,
  resolveHandoffGeometry,
  shrinkEase,
  stuckPosition,
  stuckSegment,
  takeoverEntranceFraction,
  wrapIndex,
} from './mood-scroll-galerie';

describe('galerie choreography segments', () => {
  it('keeps segments inside the 0..1 pin contract', () => {
    expect(clampSegment(0.3, 0.2)).toEqual({ start: 0.3, duration: 0.2 });
    const clipped = clampSegment(0.9, 0.5);
    expect(clipped.start).toBe(0.9);
    expect(clipped.duration).toBeCloseTo(0.1, 10);
    expect(clampSegment(-0.2, 0.4)).toEqual({ start: 0, duration: 0.4 });
    expect(clampSegment(1.4, 0.4).start).toBe(1);
  });

  it('never collapses a segment to zero duration', () => {
    expect(clampSegment(1, 0.5).duration).toBeGreaterThan(0);
    expect(clampSegment(0.5, 0).duration).toBeGreaterThan(0);
  });
});

describe('sticky runway mapping', () => {
  it('derives the entrance window from the block length', () => {
    // 400vh block: the first viewport (a quarter) is the entrance.
    expect(takeoverEntranceFraction(400)).toBeCloseTo(0.25, 10);
    // 200vh block: the traversal is half the domain.
    expect(takeoverEntranceFraction(200)).toBeCloseTo(0.5, 10);
    // A degenerate length still keeps some stuck travel.
    expect(takeoverEntranceFraction(100)).toBeCloseTo(0.9, 10);
    expect(takeoverEntranceFraction(0)).toBe(0);
    expect(takeoverEntranceFraction(Number.NaN)).toBe(0);
  });

  it('maps stuck-space fractions past the entrance window', () => {
    expect(stuckPosition(0.25, 0)).toBeCloseTo(0.25, 10);
    expect(stuckPosition(0.25, 1)).toBeCloseTo(1, 10);
    expect(stuckPosition(0.25, 0.4)).toBeCloseTo(0.55, 10);
  });

  it('scales stuck segments by the remaining runway', () => {
    const segment = stuckSegment(0.25, 0.2, 0.4);
    expect(segment.start).toBeCloseTo(0.4, 10);
    expect(segment.duration).toBeCloseTo(0.3, 10);
  });

  it('keeps entrance segments inside the entrance window', () => {
    const segment = entranceSegment(0.25, 0.1, 0.75);
    expect(segment.start).toBeCloseTo(0.025, 10);
    expect(segment.duration).toBeCloseTo(0.1875, 10);
    expect(segment.start + segment.duration).toBeLessThanOrEqual(0.25);
  });
});

describe('hand-off geometry', () => {
  const viewport = { widthPx: 1400, heightPx: 900 };

  it('sizes the arch from viewport fractions', () => {
    const geometry = resolveHandoffGeometry(
      {
        archWidthVw: 24,
        archHeightVh: 46,
        archRadius: 1,
        seamY: 0.56,
        archOverlap: 0.22,
      },
      viewport,
    );

    expect(geometry.archWidthPx).toBeCloseTo(336, 6);
    expect(geometry.archHeightPx).toBeCloseTo(414, 6);
    // Full radius is a semicircular arch: half the frame width.
    expect(geometry.archRadiusPx).toBeCloseTo(168, 6);
    expect(geometry.seamTopPx).toBeCloseTo(504, 6);
  });

  it('rests the arch overlapping the seam like a hung door', () => {
    const geometry = resolveHandoffGeometry(
      {
        archWidthVw: 24,
        archHeightVh: 46,
        archRadius: 1,
        seamY: 0.56,
        archOverlap: 0.22,
      },
      viewport,
    );

    // slotTop = seam − archHeight·(1−overlap): 504 − 414·0.78
    expect(geometry.slotTopPx).toBeCloseTo(504 - 414 * 0.78, 6);
    // The overlay's translate lands the frame center on the slot center.
    expect(geometry.frameShiftYPx).toBeCloseTo(
      geometry.slotTopPx + geometry.archHeightPx / 2 - 450,
      6,
    );
  });

  it('keeps a zero radius rectangular and clamps inputs', () => {
    const geometry = resolveHandoffGeometry(
      {
        archWidthVw: 24,
        archHeightVh: 46,
        archRadius: 0,
        seamY: 2,
        archOverlap: -1,
      },
      viewport,
    );

    expect(geometry.archRadiusPx).toBe(0);
    expect(geometry.seamTopPx).toBe(900);
    expect(geometry.slotTopPx).toBeCloseTo(900 - 414, 6);
  });
});

describe('shrink ease', () => {
  it('is identity at shape 1 and stays inside 0..1', () => {
    expect(shrinkEase(0.3, 1)).toBeCloseTo(0.3, 6);
    expect(shrinkEase(0, 2)).toBe(0);
    expect(shrinkEase(1, 2)).toBe(1);
  });

  it('holds the full bleed longer with a harder shape', () => {
    expect(shrinkEase(0.25, 2)).toBeLessThan(0.25);
    expect(shrinkEase(0.75, 2)).toBeGreaterThan(0.75);
  });

  it('stays monotonic for scrub reversibility', () => {
    for (const shape of [0.5, 1.4, 3]) {
      let previous = 0;
      for (let step = 0; step <= 20; step += 1) {
        const value = shrinkEase(step / 20, shape);
        expect(value).toBeGreaterThanOrEqual(previous);
        previous = value;
      }
    }
  });
});

describe('carousel index', () => {
  it('wraps in both directions', () => {
    expect(wrapIndex(5, 5)).toBe(0);
    expect(wrapIndex(-1, 5)).toBe(4);
    expect(wrapIndex(7, 5)).toBe(2);
    expect(wrapIndex(0, 0)).toBe(0);
  });
});
