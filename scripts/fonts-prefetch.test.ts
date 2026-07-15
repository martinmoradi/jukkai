import { createHash } from 'node:crypto';
import {
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'bun:test';

import { runFontsPrefetch } from './fonts-prefetch';

const workspaces: string[] = [];

afterEach(async () => {
  await Promise.all(
    workspaces
      .splice(0)
      .map((workspace) => rm(workspace, { force: true, recursive: true })),
  );
});

describe('fonts prefetch command', () => {
  it('fails clearly when required environment variables are missing', async () => {
    await expect(
      runFontsPrefetch({
        env: {
          MM_FONTS_CACHE_DIR: '/tmp/cache',
          MM_FONTS_OUTPUT_DIR: '/tmp/output',
        },
      }),
    ).rejects.toThrow(
      'Missing required font prefetch environment variables: MM_FONTS_SERVICE_URL, MM_FONTS_FETCH_TOKEN, MM_FONTS_ACCESS_CLIENT_ID, MM_FONTS_ACCESS_CLIENT_SECRET. Source ~/.config/fonts/jukkai.env and ~/.config/fonts/jukkai-cloudflare-access.env, then run `bun run fonts:prefetch`.',
    );
  });

  it('prefetches a pinned Set into generated CSS, manifest, and cache files', async () => {
    const workspace = await createWorkspace();
    const outputDir = join(workspace, 'public', 'fonts', 'generated');
    const staleFontPath = join(outputDir, 'fonts', 'stale.woff2');
    const cacheSentinelPath = join(workspace, 'cache', 'keep.txt');
    const fontBytes = new TextEncoder().encode('fake-woff2-bytes');
    const digest = createHash('sha256').update(fontBytes).digest('hex');
    const token = 'secret-fetch-token';
    const accessClientId = 'secret-access-client-id';
    const accessClientSecret = 'secret-access-client-secret';
    const requests: Request[] = [];

    await mkdir(join(outputDir, 'fonts'), { recursive: true });
    await mkdir(join(workspace, 'cache'), { recursive: true });
    await writeFile(staleFontPath, 'stale-font');
    await writeFile(cacheSentinelPath, 'keep-cache');

    const server = Bun.serve({
      fetch(request) {
        requests.push(request.clone());

        expect(request.headers.get('authorization')).toBe(`Bearer ${token}`);
        expect(request.headers.get('cf-access-client-id')).toBe(accessClientId);
        expect(request.headers.get('cf-access-client-secret')).toBe(
          accessClientSecret,
        );

        const url = new URL(request.url);

        if (url.pathname === '/api/sets/jukkai-starter/versions/1/snapshot') {
          return Response.json({
            snapshot: {
              digest: 'snapshot-digest',
              manifest: {
                count: 1,
                emitterVersion: 2,
                fonts: [
                  {
                    axes: [{ def: 400, max: 700, min: 300, tag: 'wght' }],
                    cutIndex: 0,
                    familySlug: 'demo-sans',
                    fontDigest: `sha256:${digest}`,
                    sourcePath: `fonts/${digest}.woff2`,
                  },
                ],
                version: 1,
              },
              set: {
                name: 'Jukkai Starter',
                slug: 'jukkai-starter',
              },
              setVersion: 1,
            },
          });
        }

        if (
          url.pathname ===
          `/api/sets/jukkai-starter/versions/1/fonts/${digest}.woff2`
        ) {
          return new Response(fontBytes, {
            headers: { 'content-type': 'font/woff2' },
          });
        }

        return new Response('not found', { status: 404 });
      },
      port: 0,
    });

    try {
      const result = await runFontsPrefetch({
        env: {
          MM_FONTS_ACCESS_CLIENT_ID: accessClientId,
          MM_FONTS_ACCESS_CLIENT_SECRET: accessClientSecret,
          MM_FONTS_CACHE_DIR: join(workspace, 'cache'),
          MM_FONTS_FETCH_TOKEN: token,
          MM_FONTS_OUTPUT_DIR: outputDir,
          MM_FONTS_SERVICE_URL: server.url.origin,
        },
      });

      expect(result).toEqual({
        cacheDir: join(workspace, 'cache'),
        fontCount: 1,
        outputDir,
        set: 'jukkai-starter',
        version: 1,
      });

      const outputFontPath = join(
        workspace,
        'public',
        'fonts',
        'generated',
        'fonts',
        `${digest}.woff2`,
      );
      const cacheFontPath = join(
        workspace,
        'cache',
        'fonts',
        `${digest}.woff2`,
      );

      expect(Array.from(await readFile(outputFontPath))).toEqual(
        Array.from(fontBytes),
      );
      expect(Array.from(await readFile(cacheFontPath))).toEqual(
        Array.from(fontBytes),
      );
      expect(await readFile(cacheSentinelPath, 'utf8')).toBe('keep-cache');
      expect(await readdir(join(outputDir, 'fonts'))).toEqual([
        `${digest}.woff2`,
      ]);

      const css = await readFile(
        join(workspace, 'public', 'fonts', 'generated', 'fonts.css'),
        'utf8',
      );
      expect(css).toContain('@font-face');
      expect(css).toContain('--jukkai-generated-font-family: "demo-sans"');
      expect(css).toContain('font-family: "demo-sans"');
      expect(css).toContain(`url("/fonts/generated/fonts/${digest}.woff2")`);

      const manifest = JSON.parse(
        await readFile(
          join(workspace, 'public', 'fonts', 'generated', 'manifest.json'),
          'utf8',
        ),
      );
      expect(manifest).toEqual({
        fontCount: 1,
        fonts: [
          {
            axes: [{ def: 400, max: 700, min: 300, tag: 'wght' }],
            familySlug: 'demo-sans',
            outputPath: `fonts/${digest}.woff2`,
          },
        ],
        set: 'jukkai-starter',
        snapshotDigest: 'snapshot-digest',
        version: 1,
      });

      expect(requests).toHaveLength(2);
    } finally {
      await server.stop(true);
    }
  });

  it('limits concurrent font downloads for broad Sets', async () => {
    const workspace = await createWorkspace();
    const fonts = Array.from({ length: 12 }, (_, index) => {
      const bytes = new TextEncoder().encode(`fake-woff2-${index}`);
      const digest = createHash('sha256').update(bytes).digest('hex');

      return { bytes, digest, familySlug: `demo-sans-${index}` };
    });
    let activeFontRequests = 0;
    let maxActiveFontRequests = 0;

    const server = Bun.serve({
      async fetch(request) {
        const url = new URL(request.url);

        if (url.pathname === '/api/sets/jukkai-starter/versions/1/snapshot') {
          return Response.json({
            snapshot: {
              digest: 'snapshot-digest',
              manifest: {
                count: fonts.length,
                emitterVersion: 2,
                fonts: fonts.map((font) => ({
                  axes: [],
                  cutIndex: 0,
                  familySlug: font.familySlug,
                  fontDigest: `sha256:${font.digest}`,
                  sourcePath: `fonts/${font.digest}.woff2`,
                })),
                version: 1,
              },
              set: {
                name: 'Jukkai Starter',
                slug: 'jukkai-starter',
              },
              setVersion: 1,
            },
          });
        }

        const font = fonts.find(
          (candidate) =>
            url.pathname ===
            `/api/sets/jukkai-starter/versions/1/fonts/${candidate.digest}.woff2`,
        );

        if (font) {
          activeFontRequests += 1;
          maxActiveFontRequests = Math.max(
            maxActiveFontRequests,
            activeFontRequests,
          );
          await Bun.sleep(5);
          activeFontRequests -= 1;

          return new Response(font.bytes, {
            headers: { 'content-type': 'font/woff2' },
          });
        }

        return new Response('not found', { status: 404 });
      },
      port: 0,
    });

    try {
      const result = await runFontsPrefetch({
        env: {
          MM_FONTS_ACCESS_CLIENT_ID: 'access-client-id',
          MM_FONTS_ACCESS_CLIENT_SECRET: 'access-client-secret',
          MM_FONTS_CACHE_DIR: join(workspace, 'cache'),
          MM_FONTS_FETCH_TOKEN: 'fetch-token',
          MM_FONTS_OUTPUT_DIR: join(workspace, 'public', 'fonts', 'generated'),
          MM_FONTS_SERVICE_URL: server.url.origin,
        },
      });

      expect(result.fontCount).toBe(fonts.length);
      expect(maxActiveFontRequests).toBeLessThanOrEqual(8);
      expect(maxActiveFontRequests).toBeGreaterThan(1);
    } finally {
      await server.stop(true);
    }
  });

  it('does not print fetch or access credentials from the CLI', async () => {
    const workspace = await createWorkspace();
    const fontBytes = new TextEncoder().encode('fake-cli-woff2-bytes');
    const digest = createHash('sha256').update(fontBytes).digest('hex');
    const token = 'cli-secret-fetch-token';
    const accessClientId = 'cli-secret-access-client-id';
    const accessClientSecret = 'cli-secret-access-client-secret';

    const server = Bun.serve({
      fetch(request) {
        const url = new URL(request.url);

        if (url.pathname === '/api/sets/jukkai-starter/versions/1/snapshot') {
          return Response.json({
            snapshot: {
              digest: 'snapshot-digest',
              manifest: {
                count: 1,
                emitterVersion: 2,
                fonts: [
                  {
                    axes: [],
                    cutIndex: 0,
                    familySlug: 'demo-sans',
                    fontDigest: `sha256:${digest}`,
                    sourcePath: `fonts/${digest}.woff2`,
                  },
                ],
                version: 1,
              },
              set: {
                name: 'Jukkai Starter',
                slug: 'jukkai-starter',
              },
              setVersion: 1,
            },
          });
        }

        if (
          url.pathname ===
          `/api/sets/jukkai-starter/versions/1/fonts/${digest}.woff2`
        ) {
          return new Response(fontBytes, {
            headers: { 'content-type': 'font/woff2' },
          });
        }

        return new Response('not found', { status: 404 });
      },
      port: 0,
    });

    try {
      const child = Bun.spawn({
        cmd: [process.execPath, 'scripts/fonts-prefetch.ts'],
        cwd: process.cwd(),
        env: {
          ...process.env,
          MM_FONTS_ACCESS_CLIENT_ID: accessClientId,
          MM_FONTS_ACCESS_CLIENT_SECRET: accessClientSecret,
          MM_FONTS_CACHE_DIR: join(workspace, 'cache'),
          MM_FONTS_FETCH_TOKEN: token,
          MM_FONTS_OUTPUT_DIR: join(workspace, 'public', 'fonts', 'generated'),
          MM_FONTS_SERVICE_URL: server.url.origin,
        },
        stderr: 'pipe',
        stdout: 'pipe',
      });
      const [exitCode, stdout, stderr] = await Promise.all([
        child.exited,
        new Response(child.stdout).text(),
        new Response(child.stderr).text(),
      ]);
      const output = `${stdout}\n${stderr}`;

      expect(exitCode).toBe(0);
      expect(stdout).toContain(
        'Prefetched 1 @mm/fonts Fonts for jukkai-starter@1',
      );
      expect(output).not.toContain(token);
      expect(output).not.toContain(accessClientId);
      expect(output).not.toContain(accessClientSecret);
    } finally {
      await server.stop(true);
    }
  });
});

async function createWorkspace() {
  const workspace = await mkdtemp(join(tmpdir(), 'jukkai-fonts-prefetch-'));
  workspaces.push(workspace);
  return workspace;
}
