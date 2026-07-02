import { access, readdir } from 'node:fs/promises';

import {
  DEFAULT_GENERATED_FONTS_OUTPUT_DIR_ABSOLUTE,
  EXPECTED_GENERATED_FONTS_SET,
  EXPECTED_GENERATED_FONTS_VERSION,
  getGeneratedFontAssetPath,
  getGeneratedFontCssPath,
  getGeneratedFontFilesDir,
  getGeneratedFontManifestPath,
  readGeneratedFontsManifest,
} from './generated-font-assets';

export class GeneratedFontsError extends Error {}

export async function ensureGeneratedFonts(options?: {
  outputDir?: string;
}): Promise<void> {
  const outputDir =
    options?.outputDir ?? DEFAULT_GENERATED_FONTS_OUTPUT_DIR_ABSOLUTE;

  try {
    await access(getGeneratedFontCssPath(outputDir));
    await access(getGeneratedFontManifestPath(outputDir));

    const manifest = await readGeneratedFontsManifest(outputDir);
    const fonts = manifest.fonts ?? [];

    if (
      manifest.set !== EXPECTED_GENERATED_FONTS_SET ||
      manifest.version !== EXPECTED_GENERATED_FONTS_VERSION
    ) {
      throw new GeneratedFontsError(
        `Generated fonts must be prefetched from ${EXPECTED_GENERATED_FONTS_SET}@${EXPECTED_GENERATED_FONTS_VERSION}.`,
      );
    }

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

        await access(getGeneratedFontAssetPath(outputDir, font.outputPath));
      }),
    );

    const fontFiles = await readdir(getGeneratedFontFilesDir(outputDir));

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
