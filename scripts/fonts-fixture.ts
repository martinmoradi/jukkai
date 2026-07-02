import { createHash } from 'node:crypto';

import {
  buildGeneratedFontOutputPath,
  DEFAULT_GENERATED_FONTS_OUTPUT_DIR_ABSOLUTE,
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
    set: 'ci-fixture',
    snapshotDigest: digest,
    version: 1,
  });
}

if (import.meta.main) {
  await writeGeneratedFontFixture();
  console.log('Generated local CI font fixture.');
}
