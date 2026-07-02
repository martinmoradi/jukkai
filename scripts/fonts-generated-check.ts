import { access, readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DEFAULT_OUTPUT_DIR = join(
  REPO_ROOT,
  'apps',
  'marketing',
  'public',
  'fonts',
  'generated',
);

export class GeneratedFontsError extends Error {}

export async function ensureGeneratedFonts(options?: {
  outputDir?: string;
}): Promise<void> {
  const outputDir = options?.outputDir ?? DEFAULT_OUTPUT_DIR;

  try {
    await access(join(outputDir, 'fonts.css'));
    await access(join(outputDir, 'manifest.json'));

    const manifest = JSON.parse(
      await readFile(join(outputDir, 'manifest.json'), 'utf8'),
    ) as { fonts?: { outputPath?: unknown }[] };
    const fonts = manifest.fonts ?? [];

    if (fonts.length === 0) {
      throw new GeneratedFontsError('Generated font manifest is empty.');
    }

    await Promise.all(
      fonts.map(async (font) => {
        if (typeof font.outputPath !== 'string') {
          throw new GeneratedFontsError(
            'Generated font manifest contains an invalid font path.',
          );
        }

        await access(join(outputDir, font.outputPath));
      }),
    );

    const fontFiles = await readdir(join(outputDir, 'fonts'));

    if (!fontFiles.some((file) => file.endsWith('.woff2'))) {
      throw new GeneratedFontsError('Generated font directory is empty.');
    }
  } catch (error) {
    if (error instanceof GeneratedFontsError) {
      throw error;
    }

    throw new GeneratedFontsError(
      'Generated fonts are missing. Run `bun run fonts:prefetch` before starting local dev or building the marketing app.',
    );
  }
}

if (import.meta.main) {
  try {
    await ensureGeneratedFonts();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Generated fonts are missing.');
    }

    process.exitCode = 1;
  }
}
