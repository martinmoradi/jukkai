import type { APIRoute } from 'astro';

import { getSitemapUrl } from '../lib/site-metadata';

export const GET: APIRoute = () => {
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${getSitemapUrl()}`]
    .join('\n')
    .concat('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
