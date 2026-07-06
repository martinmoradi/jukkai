import {
  mkdir,
  readdir,
  readFile,
  rename,
  stat,
  unlink,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const moodScrollPresetDir = fileURLToPath(
  new URL('./dev/mood-scroll-presets/', import.meta.url),
);
const moodScrollPresetRoute = '/__mood-scroll-presets';
const moodScrollPresetFilePattern =
  /^\d{2}-\d{4}(?:-[a-z0-9]+(?:-[a-z0-9]+)*)?\.json$/;

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  site: 'https://jukkai.fr',
  integrations: [sitemap()],
  vite: {
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
    plugins: [moodScrollPresetPlugin()],
  },
});

function moodScrollPresetPlugin() {
  return {
    name: 'jukkai-mood-scroll-presets',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const url = new URL(request.url ?? '/', 'http://localhost');
        if (!url.pathname.startsWith(moodScrollPresetRoute)) {
          next();
          return;
        }

        const route = url.pathname.slice(moodScrollPresetRoute.length) || '/';
        try {
          if (request.method === 'GET' && route === '/') {
            await sendPresetList(response);
            return;
          }

          if (request.method === 'GET' && route === '/load') {
            await sendPresetFile(response, url.searchParams.get('fileName'));
            return;
          }

          if (request.method === 'POST' && route === '/save') {
            await savePreset(response, await readRequestJson(request));
            return;
          }

          if (request.method === 'POST' && route === '/rename') {
            await renamePreset(response, await readRequestJson(request));
            return;
          }

          if (request.method === 'POST' && route === '/delete') {
            await deletePreset(response, await readRequestJson(request));
            return;
          }

          sendJson(response, 404, {
            message: 'Unknown mood-scroll preset route',
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Preset action failed';
          sendJson(response, 500, { message });
        }
      });
    },
  };
}

async function sendPresetList(response) {
  await mkdir(moodScrollPresetDir, { recursive: true });
  const entries = await readdir(moodScrollPresetDir);
  const presets = await Promise.all(
    entries.filter(isPresetFileName).map(async (name) => {
      const metadata = await stat(path.join(moodScrollPresetDir, name));
      return { name, updatedAt: metadata.mtime.toISOString() };
    }),
  );

  presets.sort((a, b) => a.name.localeCompare(b.name));
  sendJson(response, 200, { presets });
}

async function sendPresetFile(response, fileName) {
  if (!isPresetFileName(fileName)) {
    sendJson(response, 400, { message: 'Invalid preset file name' });
    return;
  }

  const text = await readFile(path.join(moodScrollPresetDir, fileName), 'utf8');
  response.statusCode = 200;
  response.setHeader('content-type', 'application/json; charset=utf-8');
  response.end(text);
}

async function savePreset(response, body) {
  const fileName = isPresetFileName(body?.fileName)
    ? body.fileName
    : `${createPresetStamp()}.json`;

  await mkdir(moodScrollPresetDir, { recursive: true });
  await writeFile(
    path.join(moodScrollPresetDir, fileName),
    `${JSON.stringify(body?.config ?? {}, null, 2)}\n`,
  );
  sendJson(response, 200, { fileName });
}

async function renamePreset(response, body) {
  if (!isPresetFileName(body?.fileName)) {
    sendJson(response, 400, { message: 'Invalid preset file name' });
    return;
  }

  const match = body.fileName.match(/^(\d{2}-\d{4})/);
  if (!match) {
    sendJson(response, 400, { message: 'Preset is missing its timestamp' });
    return;
  }

  const slug = sanitizePresetSlug(body?.slug);
  const nextFileName = `${match[1]}${slug ? `-${slug}` : ''}.json`;
  if (nextFileName === body.fileName) {
    sendJson(response, 200, { fileName: nextFileName });
    return;
  }

  const from = path.join(moodScrollPresetDir, body.fileName);
  const to = path.join(moodScrollPresetDir, nextFileName);
  try {
    await stat(to);
    sendJson(response, 409, { message: `${nextFileName} already exists` });
    return;
  } catch {
    // No target file exists, so the rename can proceed.
  }

  await rename(from, to);
  sendJson(response, 200, { fileName: nextFileName });
}

async function deletePreset(response, body) {
  if (!isPresetFileName(body?.fileName)) {
    sendJson(response, 400, { message: 'Invalid preset file name' });
    return;
  }

  await unlink(path.join(moodScrollPresetDir, body.fileName));
  sendJson(response, 200, { ok: true });
}

function createPresetStamp(date = new Date()) {
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${day}-${hour}${minute}`;
}

function isPresetFileName(value) {
  return typeof value === 'string' && moodScrollPresetFilePattern.test(value);
}

function sanitizePresetSlug(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
    .replace(/-+$/g, '');
}

async function readRequestJson(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const text = Buffer.concat(chunks).toString('utf8');
  return text ? JSON.parse(text) : {};
}

function sendJson(response, statusCode, body) {
  response.statusCode = statusCode;
  response.setHeader('content-type', 'application/json; charset=utf-8');
  response.end(JSON.stringify(body));
}
