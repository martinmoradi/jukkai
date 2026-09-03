// @vitest-environment node

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const REDIRECTS_FILE = fileURLToPath(
  new URL('../../public/_redirects', import.meta.url),
);

interface RedirectRule {
  from: string;
  status: number;
  to: string;
}

async function readRedirectRules(): Promise<RedirectRule[]> {
  const contents = await readFile(REDIRECTS_FILE, 'utf8');

  return contents
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'))
    .map((line) => {
      const [from, to, status] = line.split(/\s+/);
      return { from: from, status: Number(status), to: to };
    });
}

describe('_redirects', () => {
  it('sends the printed business-card path to the contact page with its source tag', async () => {
    expect(await readRedirectRules()).toContainEqual({
      from: '/c/crystelle',
      status: 302,
      to: '/contact/crystelle/?src=card-crystelle',
    });
  });

  it('records that printed paths are permanent', async () => {
    const contents = await readFile(REDIRECTS_FILE, 'utf8');

    expect(contents).toMatch(/^#.*permanent/im);
  });
});
