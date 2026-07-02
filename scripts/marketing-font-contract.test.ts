import { mkdir, mkdtemp, readFile, rename, rm, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'bun:test';

import { writeGeneratedFontFixture } from './fonts-fixture';
import { DEFAULT_GENERATED_FONTS_OUTPUT_DIR_ABSOLUTE } from './generated-font-assets';

const REPO_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const GENERATED_FONTS_BACKUP_ROOT = join(
  REPO_ROOT,
  '.cache',
  'test-font-contract-backups',
);

describe('marketing generated font contract', () => {
  it('uses the generated font family for the hero title in the built page', async () => {
    const restoreGeneratedFonts = await useFixtureGeneratedFonts();

    try {
      await runMarketingBuild();

      const html = await readFile(
        join(REPO_ROOT, 'apps', 'marketing', 'dist', 'index.html'),
        'utf8',
      );

      expect(html).toMatch(
        /font-family:var\(--jukkai-generated-font-family\), Georgia, "?Times New Roman"?, serif/,
      );
    } finally {
      await restoreGeneratedFonts();
    }
  });

  it('serves generated font CSS and bytes from Jukkai-owned build paths', async () => {
    const restoreGeneratedFonts = await useFixtureGeneratedFonts();

    try {
      await runMarketingBuild();

      const html = await readFile(
        join(REPO_ROOT, 'apps', 'marketing', 'dist', 'index.html'),
        'utf8',
      );
      const generatedFontsCss = await readFile(
        join(
          REPO_ROOT,
          'apps',
          'marketing',
          'dist',
          'fonts',
          'generated',
          'fonts.css',
        ),
        'utf8',
      );

      expect(html).toContain(
        '<link rel="stylesheet" href="/fonts/generated/fonts.css">',
      );
      expect(generatedFontsCss).toContain('url("/fonts/generated/fonts/');
      expect(`${html}\n${generatedFontsCss}`).not.toContain(
        'fonts.martinmoradi.com',
      );
    } finally {
      await restoreGeneratedFonts();
    }
  });
});

async function runMarketingBuild() {
  const child = Bun.spawn({
    cmd: [process.execPath, 'run', '--cwd', 'apps/marketing', 'build'],
    cwd: REPO_ROOT,
    env: {
      ...process.env,
      CI: 'true',
      HUSKY: '0',
    },
    stderr: 'pipe',
    stdout: 'pipe',
  });
  const [exitCode, stdout, stderr] = await Promise.all([
    child.exited,
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
  ]);

  if (exitCode !== 0) {
    throw new Error(
      [
        `Marketing build failed with exit code ${exitCode}.`,
        stdout,
        stderr,
      ].join('\n'),
    );
  }
}

async function useFixtureGeneratedFonts() {
  await mkdir(GENERATED_FONTS_BACKUP_ROOT, { recursive: true });
  const backupDir = await mkdtemp(
    join(GENERATED_FONTS_BACKUP_ROOT, 'generated-fonts-'),
  );
  const backupGeneratedFontsDir = join(backupDir, 'generated');
  const hadGeneratedFonts = await pathExists(
    DEFAULT_GENERATED_FONTS_OUTPUT_DIR_ABSOLUTE,
  );

  if (hadGeneratedFonts) {
    await rename(
      DEFAULT_GENERATED_FONTS_OUTPUT_DIR_ABSOLUTE,
      backupGeneratedFontsDir,
    );
  }

  await writeGeneratedFontFixture();

  return async () => {
    await rm(DEFAULT_GENERATED_FONTS_OUTPUT_DIR_ABSOLUTE, {
      force: true,
      recursive: true,
    });

    if (hadGeneratedFonts) {
      await mkdir(dirname(DEFAULT_GENERATED_FONTS_OUTPUT_DIR_ABSOLUTE), {
        recursive: true,
      });
      await rename(
        backupGeneratedFontsDir,
        DEFAULT_GENERATED_FONTS_OUTPUT_DIR_ABSOLUTE,
      );
    }

    await rm(backupDir, { force: true, recursive: true });
  };
}

async function pathExists(path: string) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error) {
      const code = (error as { code?: unknown }).code;

      if (code === 'ENOENT') {
        return false;
      }
    }

    throw error;
  }
}
