// @vitest-environment node

import { readFile } from 'node:fs/promises';

import type { APIContext } from 'astro';
import { describe, expect, it } from 'vitest';

import { CRYSTELLE_VCARD } from '#/data/crystelle';
import { GET, VCARD_CONTENT_TYPE } from '#/pages/contact/crystelle.vcf';

describe('GET /contact/crystelle.vcf', () => {
  it('serves the vCard as a contact file rather than as text', async () => {
    const response = await GET({} as APIContext);

    expect(response.headers.get('content-type')).toBe(VCARD_CONTENT_TYPE);
    expect(await response.text()).toBe(CRYSTELLE_VCARD);
  });
});

describe('_headers', () => {
  it('pins the vCard content type on Cloudflare Pages, which serves it as a static file', async () => {
    const contents = await readFile('public/_headers', 'utf8');

    expect(contents).toContain('/contact/crystelle.vcf');
    expect(contents).toContain(`Content-Type: ${VCARD_CONTENT_TYPE}`);
  });
});
