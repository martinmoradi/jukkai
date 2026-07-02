import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const GENERATED_FONT_FILES_DIR = 'fonts';
export const GENERATED_FONTS_CSS_FILE = 'fonts.css';
export const GENERATED_FONTS_MANIFEST_FILE = 'manifest.json';
export const GENERATED_FONTS_PUBLIC_BASE_PATH = '/fonts/generated';
export const DEFAULT_GENERATED_FONTS_OUTPUT_DIR =
  'apps/marketing/public/fonts/generated';

const REPO_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

export const DEFAULT_GENERATED_FONTS_OUTPUT_DIR_ABSOLUTE = join(
  REPO_ROOT,
  DEFAULT_GENERATED_FONTS_OUTPUT_DIR,
);

export interface GeneratedFontAxis {
  def: number;
  max: number;
  min: number;
  tag: string;
}

export interface GeneratedFontManifestEntry {
  axes: GeneratedFontAxis[];
  familySlug: string;
  outputPath: string;
}

export interface GeneratedFontsManifest {
  fontCount: number;
  fonts: GeneratedFontManifestEntry[];
  set: string;
  snapshotDigest: string;
  version: number;
}

export interface GeneratedFontAssetInput extends GeneratedFontManifestEntry {
  bytes: Uint8Array;
}

export function buildGeneratedFontOutputPath(digest: string) {
  return `${GENERATED_FONT_FILES_DIR}/${digest}.woff2`;
}

export function buildGeneratedFontPublicUrl(outputPath: string) {
  return `${GENERATED_FONTS_PUBLIC_BASE_PATH}/${outputPath
    .split('/')
    .map(encodeURIComponent)
    .join('/')}`;
}

export function getGeneratedFontCssPath(outputDir: string) {
  return join(outputDir, GENERATED_FONTS_CSS_FILE);
}

export function getGeneratedFontFilesDir(outputDir: string) {
  return join(outputDir, GENERATED_FONT_FILES_DIR);
}

export function getGeneratedFontManifestPath(outputDir: string) {
  return join(outputDir, GENERATED_FONTS_MANIFEST_FILE);
}

export function getGeneratedFontAssetPath(
  outputDir: string,
  outputPath: string,
) {
  return join(outputDir, outputPath);
}

export async function readGeneratedFontsManifest(outputDir: string) {
  return JSON.parse(
    await readFile(getGeneratedFontManifestPath(outputDir), 'utf8'),
  ) as Partial<GeneratedFontsManifest>;
}

export async function writeGeneratedFontAssets(params: {
  fonts: GeneratedFontAssetInput[];
  outputDir: string;
  set: string;
  snapshotDigest: string;
  version: number;
}) {
  const manifest: GeneratedFontsManifest = {
    fontCount: params.fonts.length,
    fonts: params.fonts.map(({ axes, familySlug, outputPath }) => ({
      axes,
      familySlug,
      outputPath,
    })),
    set: params.set,
    snapshotDigest: params.snapshotDigest,
    version: params.version,
  };

  await mkdir(getGeneratedFontFilesDir(params.outputDir), { recursive: true });

  await Promise.all(
    params.fonts.map(async (font) => {
      const outputPath = getGeneratedFontAssetPath(
        params.outputDir,
        font.outputPath,
      );
      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, font.bytes);
    }),
  );

  await writeFile(
    getGeneratedFontCssPath(params.outputDir),
    buildFontsCss(manifest),
  );
  await writeFile(
    getGeneratedFontManifestPath(params.outputDir),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
}

function buildFontsCss(manifest: GeneratedFontsManifest) {
  return `${manifest.fonts
    .map((font) => {
      const weightAxis = font.axes.find((axis) => axis.tag === 'wght');
      const fontWeight = weightAxis
        ? `${weightAxis.min} ${weightAxis.max}`
        : '400';

      return [
        '@font-face {',
        `  font-family: "${escapeCssString(font.familySlug)}";`,
        `  src: url("${buildGeneratedFontPublicUrl(font.outputPath)}") format("woff2");`,
        `  font-weight: ${fontWeight};`,
        '  font-style: normal;',
        '  font-display: swap;',
        '}',
      ].join('\n');
    })
    .join('\n\n')}\n`;
}

function escapeCssString(value: string) {
  return value.replaceAll('\\', '\\\\').replaceAll('"', '\\"');
}
