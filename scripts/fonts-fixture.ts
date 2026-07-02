import { createHash } from 'node:crypto';

import {
  buildGeneratedFontOutputPath,
  DEFAULT_GENERATED_FONTS_OUTPUT_DIR_ABSOLUTE,
  EXPECTED_GENERATED_FONTS_SET,
  EXPECTED_GENERATED_FONTS_VERSION,
  writeGeneratedFontAssets,
} from './generated-font-assets';

export async function writeGeneratedFontFixture(options?: {
  outputDir?: string;
}) {
  const outputDir =
    options?.outputDir ?? DEFAULT_GENERATED_FONTS_OUTPUT_DIR_ABSOLUTE;
  const fontBytes = new TextEncoder().encode('jukkai-ci-font-fixture');
  const digest = createHash('sha256').update(fontBytes).digest('hex');
  const outputPath = buildGeneratedFontOutputPath(digest);

  await writeGeneratedFontAssets({
    fonts: [
      {
        axes: [],
        bytes: fontBytes,
        familySlug: 'jukkai-ci-fixture',
        outputPath,
      },
    ],
    outputDir,
    set: EXPECTED_GENERATED_FONTS_SET,
    snapshotDigest: digest,
    version: EXPECTED_GENERATED_FONTS_VERSION,
  });
}

if (import.meta.main) {
  await writeGeneratedFontFixture();
  console.log('Generated local CI font fixture.');
}
