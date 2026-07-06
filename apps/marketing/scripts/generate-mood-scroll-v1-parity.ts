import {
  createDefaultConfig,
  hexToRgb,
  mixRgb,
  type MoodStop,
  resolveMood,
  type Rgb,
} from '../src/components/directions/mood-scroll-v1/mood-scroll-config';

interface BlendWindow {
  from: MoodStop;
  to: MoodStop;
  startVh: number;
  endVh: number;
}

interface BlendTarget {
  from: MoodStop;
  to: MoodStop;
  blend: number;
}

const OUTPUT = new URL(
  '../src/components/directions/mood-scroll-v1-parity.fixture.json',
  import.meta.url,
);
const JOURNEY_END_VH = 550;
const SAMPLE_COUNT = 51;

// This is the frozen v1 boundary chain projected into the conductor-v2
// coordinate space. It intentionally samples the field windows, not the full
// page scroll height.
const WINDOWS: BlendWindow[] = [
  { from: 'hero', to: 'umbrella', startVh: 15, endVh: 80 },
  { from: 'umbrella', to: 'projects', startVh: 200, endVh: 370 },
  { from: 'projects', to: 'artShop', startVh: 385, endVh: 450 },
  { from: 'artShop', to: 'finale', startVh: 485, endVh: 550 },
];

const config = createDefaultConfig();

const samples = Array.from({ length: SAMPLE_COUNT }, (_, index) => {
  const scrollFraction = round(index / (SAMPLE_COUNT - 1));
  const scrollVh = round(scrollFraction * JOURNEY_END_VH);
  const target = resolveTarget(scrollVh);
  const settle = target.to === 'finale' ? target.blend : 0;

  return {
    scrollFraction,
    scrollVh,
    ground: targetRgb(target, 'ground'),
    blob1: targetRgb(target, 'blob1'),
    blob2: targetRgb(target, 'blob2'),
    settle: round(settle),
  };
});

await Bun.write(
  OUTPUT,
  `${[
    '{',
    '  "source": "frozen v1 mood-scroll boundary chain projected into conductor-v2 coordinates",',
    '  "generatedBy": "bun run --cwd apps/marketing fixture:mood-scroll-v1",',
    '  "coordinateSpace": {',
    `    "journeyEndVh": ${JOURNEY_END_VH},`,
    '    "note": "samples field windows, not full DOM page scroll height"',
    '  },',
    '  "samples": [',
    ...samples.flatMap((sample, index) => [
      '    {',
      `      "scrollFraction": ${sample.scrollFraction},`,
      `      "scrollVh": ${sample.scrollVh},`,
      `      "ground": ${formatRgb(sample.ground)},`,
      `      "blob1": ${formatRgb(sample.blob1)},`,
      `      "blob2": ${formatRgb(sample.blob2)},`,
      `      "settle": ${sample.settle}`,
      `    }${index === samples.length - 1 ? '' : ','}`,
    ]),
    '  ]',
    '}',
  ].join('\n')}\n`,
);

function resolveTarget(scrollVh: number): BlendTarget {
  let target: BlendTarget = { from: 'hero', to: 'hero', blend: 0 };
  for (const window of WINDOWS) {
    const blend = progressBetween(scrollVh, window.startVh, window.endVh);
    if (blend > 0) {
      target = {
        from: window.from,
        to: window.to,
        blend,
      };
    }
  }
  return target;
}

function targetRgb(
  target: BlendTarget,
  pick: 'ground' | 'blob1' | 'blob2',
): Rgb {
  const from = hexToRgb(resolveMood(config, target.from)[pick]);
  const to = hexToRgb(resolveMood(config, target.to)[pick]);
  return mixRgb(from, to, target.blend).map(round) as Rgb;
}

function progressBetween(value: number, start: number, end: number): number {
  if (start === end) return value >= start ? 1 : 0;
  return clamp01((value - start) / (end - start));
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(value, 0), 1);
}

function round(value: number): number {
  return Number(value.toFixed(12));
}

function formatRgb(rgb: Rgb): string {
  return `[${rgb.join(', ')}]`;
}
