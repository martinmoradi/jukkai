import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, expect, it } from 'bun:test';

import decodeQr from 'qr/decode.js';
import sharp from 'sharp';

const LOCKED_PAYLOAD = 'https://jukkai.fr/c/crystelle';
const REPO_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const workspaces: string[] = [];

afterEach(async () => {
  await Promise.all(
    workspaces
      .splice(0)
      .map((workspace) => rm(workspace, { force: true, recursive: true })),
  );
});

it('generates M and H business-card QR codes with the locked payload', async () => {
  const outputDir = await createOutputDir();
  const child = Bun.spawn({
    cmd: [
      process.execPath,
      'brand/source/qr-codes/generate.ts',
      '--output',
      outputDir,
    ],
    cwd: REPO_ROOT,
    stderr: 'pipe',
    stdout: 'pipe',
  });
  const [exitCode, stderr] = await Promise.all([
    child.exited,
    new Response(child.stderr).text(),
  ]);

  expect(exitCode, stderr).toBe(0);

  for (const level of ['m', 'h']) {
    const image = sharp(
      await readFile(join(outputDir, `jukkai-crystelle-qr-ec-${level}.png`)),
    );
    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    expect(decodeQr({ data, height: info.height, width: info.width })).toBe(
      LOCKED_PAYLOAD,
    );
  }
});

it('exports complete print-ready artwork in the brand ink', async () => {
  const outputDir = await createOutputDir();
  const child = Bun.spawn({
    cmd: [
      process.execPath,
      'brand/source/qr-codes/generate.ts',
      '--output',
      outputDir,
    ],
    cwd: REPO_ROOT,
    stderr: 'pipe',
    stdout: 'pipe',
  });
  const [exitCode, stderr] = await Promise.all([
    child.exited,
    new Response(child.stderr).text(),
  ]);

  expect(exitCode, stderr).toBe(0);
  expect((await readdir(outputDir)).sort()).toEqual([
    'jukkai-crystelle-qr-ec-h.png',
    'jukkai-crystelle-qr-ec-h.svg',
    'jukkai-crystelle-qr-ec-m.png',
    'jukkai-crystelle-qr-ec-m.svg',
  ]);

  for (const level of ['m', 'h']) {
    const svg = await readFile(
      join(outputDir, `jukkai-crystelle-qr-ec-${level}.svg`),
      'utf8',
    );
    const viewBoxSize = Number(
      svg.match(/viewBox="0 0 (\d+) \1"/)?.[1] ?? Number.NaN,
    );

    expect(svg).toContain('fill="#1D1D1B"');
    expect(svg).toContain('shape-rendering="crispEdges"');
    expect(svg).toContain('<path d="M4 4');
    expect(svg).not.toContain('<rect');

    const { data, info } = await sharp(
      join(outputDir, `jukkai-crystelle-qr-ec-${level}.png`),
    )
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    expect(info.width).toBeGreaterThanOrEqual(1_000);
    expect(info.height).toBe(info.width);
    expect(info.width % viewBoxSize).toBe(0);
    expect(findOpaqueBounds(data, info.width)).toEqual({
      bottom: info.height - (info.width / viewBoxSize) * 4 - 1,
      left: (info.width / viewBoxSize) * 4,
      right: info.width - (info.width / viewBoxSize) * 4 - 1,
      top: (info.width / viewBoxSize) * 4,
    });
    expect([...uniqueRgbaColors(data)]).toEqual(['0,0,0,0', '29,29,27,255']);
  }
});

async function createOutputDir() {
  const workspace = await mkdtemp(join(tmpdir(), 'jukkai-business-card-qr-'));
  workspaces.push(workspace);
  return join(workspace, 'qr-codes');
}

function findOpaqueBounds(data: Uint8Array, width: number) {
  let bottom = 0;
  let left = width;
  let right = 0;
  let top = width;

  for (let offset = 0; offset < data.length; offset += 4) {
    if (data[offset + 3] === 0) {
      continue;
    }

    const pixel = offset / 4;
    const x = pixel % width;
    const y = Math.floor(pixel / width);
    bottom = Math.max(bottom, y);
    left = Math.min(left, x);
    right = Math.max(right, x);
    top = Math.min(top, y);
  }

  return { bottom, left, right, top };
}

function uniqueRgbaColors(data: Uint8Array) {
  const colors = new Set<string>();

  for (let offset = 0; offset < data.length; offset += 4) {
    colors.add(
      `${data[offset]},${data[offset + 1]},${data[offset + 2]},${data[offset + 3]}`,
    );
  }

  return colors;
}
