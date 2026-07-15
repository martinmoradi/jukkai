import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const GENERATED_FONT_FILES_DIR = 'fonts';
export const GENERATED_FONTS_CSS_FILE = 'fonts.css';
export const GENERATED_FONTS_MANIFEST_FILE = 'manifest.json';
export const GENERATED_FONTS_PUBLIC_BASE_PATH = '/fonts/generated';
export const GENERATED_FONT_FAMILY_CSS_VARIABLE =
  '--jukkai-generated-font-family';
export const DEFAULT_GENERATED_FONTS_OUTPUT_DIR =
  'apps/marketing/public/fonts/generated';
export const APPROVED_MARKETING_FONT_SET = {
  slug: 'jukkai-starter',
  version: 4,
} as const;

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
  style: string | null;
  weight: number | null;
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
  const stagingDir = `${params.outputDir}.tmp-${process.pid}-${Date.now()}`;
  const manifest: GeneratedFontsManifest = {
    fontCount: params.fonts.length,
    fonts: params.fonts.map(
      ({ axes, familySlug, outputPath, style, weight }) => ({
        axes,
        familySlug,
        outputPath,
        style,
        weight,
      }),
    ),
    set: params.set,
    snapshotDigest: params.snapshotDigest,
    version: params.version,
  };

  await rm(stagingDir, { force: true, recursive: true });

  try {
    await mkdir(getGeneratedFontFilesDir(stagingDir), { recursive: true });

    await Promise.all(
      params.fonts.map(async (font) => {
        const outputPath = getGeneratedFontAssetPath(
          stagingDir,
          font.outputPath,
        );
        await mkdir(dirname(outputPath), { recursive: true });
        await writeFile(outputPath, font.bytes);
      }),
    );

    await writeFile(
      getGeneratedFontCssPath(stagingDir),
      buildFontsCss(manifest),
    );
    await writeFile(
      getGeneratedFontManifestPath(stagingDir),
      `${JSON.stringify(manifest, null, 2)}\n`,
    );

    await rm(params.outputDir, { force: true, recursive: true });
    await rename(stagingDir, params.outputDir);
  } finally {
    await rm(stagingDir, { force: true, recursive: true });
  }
}

function buildFontsCss(manifest: GeneratedFontsManifest) {
  const primaryFont = manifest.fonts[0];
  const rootDeclaration = primaryFont
    ? [
        ':root {',
        `  ${GENERATED_FONT_FAMILY_CSS_VARIABLE}: "${escapeCssString(primaryFont.familySlug)}";`,
        '}',
        '',
      ].join('\n')
    : '';

  return `${rootDeclaration}${manifest.fonts
    .map((font) => {
      const weightAxis = font.axes.find((axis) => axis.tag === 'wght');
      const fontWeight = weightAxis
        ? `${weightAxis.min} ${weightAxis.max}`
        : String(font.weight ?? 400);
      const fontStyle = getCssFontStyle(font.style);

      return [
        '@font-face {',
        `  font-family: "${escapeCssString(font.familySlug)}";`,
        `  src: url("${buildGeneratedFontPublicUrl(font.outputPath)}") format("woff2");`,
        `  font-weight: ${fontWeight};`,
        `  font-style: ${fontStyle};`,
        '  font-display: swap;',
        '}',
      ].join('\n');
    })
    .join('\n\n')}\n`;
}

function getCssFontStyle(style: string | null) {
  const normalizedStyle = style?.toLowerCase() ?? '';

  if (normalizedStyle.includes('italic')) {
    return 'italic';
  }

  if (normalizedStyle.includes('oblique')) {
    return 'oblique';
  }

  return 'normal';
}

function escapeCssString(value: string) {
  return value.replaceAll('\\', '\\\\').replaceAll('"', '\\"');
}
