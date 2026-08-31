import { mkdtemp, readFile, rm } from 'node:fs/promises';
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

async function createOutputDir() {
  const workspace = await mkdtemp(join(tmpdir(), 'jukkai-business-card-qr-'));
  workspaces.push(workspace);
  return join(workspace, 'qr-codes');
}
