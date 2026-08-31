import type { APIRoute } from 'astro';

import { CRYSTELLE_VCARD } from '#/data/crystelle';

export const prerender = true;

/**
 * Emitted as a static `/contact/crystelle.vcf` at build time. The headers here
 * document the contract; Cloudflare Pages serves the built file and takes its
 * content type from `public/_headers`.
 */
export const GET: APIRoute = () =>
  new Response(CRYSTELLE_VCARD, {
    headers: { 'Content-Type': 'text/vcard; charset=utf-8' },
  });
