import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
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

export async function writeGeneratedFontFixture(options?: {
  outputDir?: string;
}) {
  const outputDir = options?.outputDir ?? DEFAULT_OUTPUT_DIR;
  const fontBytes = new TextEncoder().encode('jukkai-ci-font-fixture');
  const digest = createHash('sha256').update(fontBytes).digest('hex');
  const outputPath = `fonts/${digest}.woff2`;

  await mkdir(join(outputDir, 'fonts'), { recursive: true });
  await writeFile(join(outputDir, outputPath), fontBytes);
  await writeFile(
    join(outputDir, 'fonts.css'),
    [
      '@font-face {',
      '  font-family: "jukkai-ci-fixture";',
      `  src: url("/fonts/generated/${outputPath}") format("woff2");`,
      '  font-weight: 400;',
      '  font-style: normal;',
      '  font-display: swap;',
      '}',
      '',
    ].join('\n'),
  );
  await writeFile(
    join(outputDir, 'manifest.json'),
    `${JSON.stringify(
      {
        fontCount: 1,
        fonts: [
          {
            axes: [],
            familySlug: 'jukkai-ci-fixture',
            outputPath,
          },
        ],
        set: 'ci-fixture',
        snapshotDigest: digest,
        version: 1,
      },
      null,
      2,
    )}\n`,
  );
}

if (import.meta.main) {
  await writeGeneratedFontFixture();
  console.log('Generated local CI font fixture.');
}
