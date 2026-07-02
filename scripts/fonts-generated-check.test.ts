import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'bun:test';

import { writeGeneratedFontFixture } from './fonts-fixture';
import { ensureGeneratedFonts } from './fonts-generated-check';

const workspaces: string[] = [];

afterEach(async () => {
  await Promise.all(
    workspaces
      .splice(0)
      .map((workspace) => rm(workspace, { force: true, recursive: true })),
  );
});

describe('generated font check', () => {
  it('fails clearly when generated font files are missing', async () => {
    const workspace = await createWorkspace();

    await expect(
      ensureGeneratedFonts({
        outputDir: join(
          workspace,
          'apps',
          'marketing',
          'public',
          'fonts',
          'generated',
        ),
      }),
    ).rejects.toThrow(
      'Generated fonts are missing. Run `bun run fonts:prefetch` before starting local dev or building the marketing app.',
    );
  });

  it('passes when the generated CSS, manifest, and font bytes are present', async () => {
    const workspace = await createWorkspace();
    const outputDir = join(
      workspace,
      'apps',
      'marketing',
      'public',
      'fonts',
      'generated',
    );

    await mkdir(join(outputDir, 'fonts'), { recursive: true });
    await writeFile(join(outputDir, 'fonts.css'), '@font-face {}\n');
    await writeFile(
      join(outputDir, 'manifest.json'),
      JSON.stringify({
        fonts: [{ outputPath: 'fonts/demo.woff2' }],
      }),
    );
    await writeFile(join(outputDir, 'fonts', 'demo.woff2'), 'fake-font');

    await expect(ensureGeneratedFonts({ outputDir })).resolves.toBeUndefined();
  });

  it('accepts the generated CI font fixture', async () => {
    const workspace = await createWorkspace();
    const outputDir = join(
      workspace,
      'apps',
      'marketing',
      'public',
      'fonts',
      'generated',
    );

    await writeGeneratedFontFixture({ outputDir });

    await expect(ensureGeneratedFonts({ outputDir })).resolves.toBeUndefined();
  });
});

async function createWorkspace() {
  const workspace = await mkdtemp(join(tmpdir(), 'jukkai-fonts-check-'));
  workspaces.push(workspace);
  return workspace;
}
