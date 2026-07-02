import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, join, normalize, relative } from 'node:path';

const DEFAULT_CACHE_DIR = '.cache/mm-fonts';
const DEFAULT_OUTPUT_DIR = 'apps/marketing/public/fonts/generated';
const SNAPSHOT_FONT_DIGEST_PATTERN = /^sha256:(?<digest>[a-f0-9]{64})$/;

const REQUIRED_ENV_KEYS = [
  'MM_FONTS_SERVICE_URL',
  'MM_FONTS_FETCH_TOKEN',
  'MM_FONTS_ACCESS_CLIENT_ID',
  'MM_FONTS_ACCESS_CLIENT_SECRET',
  'MM_FONTS_SET',
  'MM_FONTS_SET_VERSION',
] as const;

type RequiredEnvKey = (typeof REQUIRED_ENV_KEYS)[number];

interface FontsPrefetchEnv extends Partial<
  Record<RequiredEnvKey, string | undefined>
> {
  MM_FONTS_CACHE_DIR?: string | undefined;
  MM_FONTS_OUTPUT_DIR?: string | undefined;
}

interface FontAxis {
  def: number;
  max: number;
  min: number;
  tag: string;
}

interface SnapshotFont {
  axes: FontAxis[];
  familySlug: string;
  fontDigest: string;
  sourcePath: string;
}

interface Snapshot {
  digest: string;
  manifest: {
    count: number;
    fonts: SnapshotFont[];
  };
  set: {
    slug: string;
  };
  setVersion: number;
}

interface SnapshotResponse {
  snapshot?: Snapshot;
}

export interface FontsPrefetchResult {
  cacheDir: string;
  fontCount: number;
  outputDir: string;
  set: string;
  version: number;
}

export class FontsPrefetchError extends Error {}

export async function runFontsPrefetch(options: {
  env?: FontsPrefetchEnv;
  fetcher?: typeof fetch;
}): Promise<FontsPrefetchResult> {
  const config = readConfig(options.env ?? process.env);
  const fetcher = options.fetcher ?? fetch;
  const snapshot = await fetchSnapshot({ config, fetcher });

  await mkdir(config.cacheDir, { recursive: true });
  await mkdir(config.outputDir, { recursive: true });

  const fonts = await Promise.all(
    snapshot.manifest.fonts.map(async (font) => {
      const sourcePath = getSafeSourcePath(font.sourcePath);
      const digest = parseSnapshotFontDigest(font.fontDigest);
      const cachePath = join(config.cacheDir, sourcePath);
      const outputPath = join(config.outputDir, sourcePath);
      const bytes = await readOrFetchFont({
        cachePath,
        config,
        digest,
        fetcher,
        sourcePath,
      });

      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, bytes);

      return {
        axes: font.axes,
        familySlug: font.familySlug,
        outputPath: sourcePath,
      };
    }),
  );

  await writeFile(
    join(config.outputDir, 'fonts.css'),
    buildFontsCss({ fonts, outputDir: config.outputDir }),
  );
  await writeFile(
    join(config.outputDir, 'manifest.json'),
    `${JSON.stringify(
      {
        fontCount: fonts.length,
        fonts,
        set: snapshot.set.slug,
        snapshotDigest: snapshot.digest,
        version: snapshot.setVersion,
      },
      null,
      2,
    )}\n`,
  );

  return {
    cacheDir: config.cacheDir,
    fontCount: fonts.length,
    outputDir: config.outputDir,
    set: snapshot.set.slug,
    version: snapshot.setVersion,
  };
}

async function fetchSnapshot(params: {
  config: FontsPrefetchConfig;
  fetcher: typeof fetch;
}) {
  const url = new URL(
    `/api/sets/${encodeURIComponent(params.config.set)}/versions/${params.config.version}/snapshot`,
    withTrailingSlash(params.config.serviceUrl),
  );
  const response = await params.fetcher(url, {
    headers: buildAuthHeaders(params.config),
  });

  if (!response.ok) {
    throw new FontsPrefetchError(
      `Failed to fetch @mm/fonts Snapshot for ${params.config.set}@${params.config.version}: HTTP ${response.status}.`,
    );
  }

  const body = (await response.json()) as SnapshotResponse;

  if (!body.snapshot) {
    throw new FontsPrefetchError('@mm/fonts Snapshot response was missing.');
  }

  return body.snapshot;
}

async function readOrFetchFont(params: {
  cachePath: string;
  config: FontsPrefetchConfig;
  digest: string;
  fetcher: typeof fetch;
  sourcePath: string;
}) {
  const cached = await readCachedFont(params.cachePath, params.digest);

  if (cached) {
    return cached;
  }

  const fontFile = params.sourcePath.split('/').at(-1);

  if (!fontFile) {
    throw new FontsPrefetchError(
      `Snapshot Font has an invalid sourcePath: ${params.sourcePath}.`,
    );
  }

  const url = new URL(
    `/api/sets/${encodeURIComponent(params.config.set)}/versions/${params.config.version}/fonts/${encodeURIComponent(fontFile)}`,
    withTrailingSlash(params.config.serviceUrl),
  );
  const response = await params.fetcher(url, {
    headers: buildAuthHeaders(params.config),
  });

  if (!response.ok) {
    throw new FontsPrefetchError(
      `Failed to fetch @mm/fonts Font ${params.digest}: HTTP ${response.status}.`,
    );
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  verifyDigest(bytes, params.digest);
  await mkdir(dirname(params.cachePath), { recursive: true });
  await writeFile(params.cachePath, bytes);

  return bytes;
}

async function readCachedFont(cachePath: string, digest: string) {
  try {
    const bytes = await readFile(cachePath);
    verifyDigest(bytes, digest);
    return bytes;
  } catch (error) {
    if (error instanceof FontsPrefetchError) {
      return undefined;
    }

    if (error && typeof error === 'object' && 'code' in error) {
      const code = (error as { code?: unknown }).code;

      if (code === 'ENOENT') {
        return undefined;
      }
    }

    throw error;
  }
}

function verifyDigest(bytes: Uint8Array, expectedDigest: string) {
  const actualDigest = createHash('sha256').update(bytes).digest('hex');

  if (actualDigest !== expectedDigest) {
    throw new FontsPrefetchError(
      `Font Digest mismatch for ${expectedDigest}; fetched bytes do not match the Snapshot.`,
    );
  }
}

function parseSnapshotFontDigest(value: string) {
  const digest = SNAPSHOT_FONT_DIGEST_PATTERN.exec(value)?.groups?.digest;

  if (!digest) {
    throw new FontsPrefetchError(
      `Snapshot Font Digest must use sha256:<digest>: ${value}.`,
    );
  }

  return digest;
}

function buildFontsCss(params: {
  fonts: { axes: FontAxis[]; familySlug: string; outputPath: string }[];
  outputDir: string;
}) {
  return `${params.fonts
    .map((font) => {
      const weightAxis = font.axes.find((axis) => axis.tag === 'wght');
      const fontWeight = weightAxis
        ? `${weightAxis.min} ${weightAxis.max}`
        : '400';

      return [
        '@font-face {',
        `  font-family: "${escapeCssString(font.familySlug)}";`,
        `  src: url("${buildPublicFontUrl(font.outputPath)}") format("woff2");`,
        `  font-weight: ${fontWeight};`,
        '  font-style: normal;',
        '  font-display: swap;',
        '}',
      ].join('\n');
    })
    .join('\n\n')}\n`;
}

function buildPublicFontUrl(outputPath: string) {
  return `/fonts/generated/${outputPath.split('/').map(encodeURIComponent).join('/')}`;
}

function escapeCssString(value: string) {
  return value.replaceAll('\\', '\\\\').replaceAll('"', '\\"');
}

interface FontsPrefetchConfig {
  accessClientId: string;
  accessClientSecret: string;
  cacheDir: string;
  fetchToken: string;
  outputDir: string;
  serviceUrl: string;
  set: string;
  version: number;
}

function readConfig(env: FontsPrefetchEnv): FontsPrefetchConfig {
  const missing = REQUIRED_ENV_KEYS.filter((key) => !env[key]?.trim());

  if (missing.length > 0) {
    throw new FontsPrefetchError(
      `Missing required font prefetch environment variables: ${missing.join(', ')}. Source ~/.config/fonts/jukkai.env and ~/.config/fonts/jukkai-cloudflare-access.env, then run \`bun run fonts:prefetch\`.`,
    );
  }

  const version = Number(env.MM_FONTS_SET_VERSION);

  if (!Number.isInteger(version) || version < 1) {
    throw new FontsPrefetchError(
      'MM_FONTS_SET_VERSION must be a positive integer.',
    );
  }

  return {
    accessClientId: env.MM_FONTS_ACCESS_CLIENT_ID!,
    accessClientSecret: env.MM_FONTS_ACCESS_CLIENT_SECRET!,
    cacheDir: env.MM_FONTS_CACHE_DIR?.trim() || DEFAULT_CACHE_DIR,
    fetchToken: env.MM_FONTS_FETCH_TOKEN!,
    outputDir: env.MM_FONTS_OUTPUT_DIR?.trim() || DEFAULT_OUTPUT_DIR,
    serviceUrl: env.MM_FONTS_SERVICE_URL!,
    set: env.MM_FONTS_SET!,
    version,
  };
}

function buildAuthHeaders(config: FontsPrefetchConfig) {
  return {
    Authorization: `Bearer ${config.fetchToken}`,
    'CF-Access-Client-Id': config.accessClientId,
    'CF-Access-Client-Secret': config.accessClientSecret,
  };
}

function getSafeSourcePath(sourcePath: string) {
  const normalized = normalize(sourcePath);

  if (
    isAbsolute(sourcePath) ||
    normalized.startsWith('..') ||
    relative('fonts', normalized).startsWith('..') ||
    !normalized.endsWith('.woff2')
  ) {
    throw new FontsPrefetchError(
      `Snapshot Font sourcePath must stay inside fonts/ and end with .woff2: ${sourcePath}.`,
    );
  }

  return normalized;
}

function withTrailingSlash(value: string) {
  return value.endsWith('/') ? value : `${value}/`;
}

if (import.meta.main) {
  try {
    const result = await runFontsPrefetch({});
    console.log(
      `Prefetched ${result.fontCount} @mm/fonts Fonts for ${result.set}@${result.version} into ${result.outputDir}.`,
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Font prefetch failed.');
    }

    process.exitCode = 1;
  }
}
