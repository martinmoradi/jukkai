import type { APIRoute } from 'astro';

import { CRYSTELLE_VCARD } from '#/data/crystelle';

/**
 * Serving this rather than `text/plain` is what makes a phone offer the
 * add-contact flow, so `public/_headers` repeats it for Cloudflare Pages.
 */
export const VCARD_CONTENT_TYPE = 'text/vcard; charset=utf-8';

export const prerender = true;

/** Emitted as a static `/contact/crystelle.vcf` at build time. */
export const GET: APIRoute = () =>
  new Response(CRYSTELLE_VCARD, {
    headers: { 'Content-Type': VCARD_CONTENT_TYPE },
  });
