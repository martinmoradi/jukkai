import { createHash } from 'node:crypto';

import {
  APPROVED_MARKETING_FONT_SET,
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
        style: 'Regular',
        weight: 400,
      },
    ],
    outputDir,
    set: APPROVED_MARKETING_FONT_SET.slug,
    snapshotDigest: digest,
    version: APPROVED_MARKETING_FONT_SET.version,
  });
}

if (import.meta.main) {
  await writeGeneratedFontFixture();
  console.log('Generated local CI font fixture.');
}
