import { CRYSTELLE_CONTACT_PATH } from '#/data/crystelle';

/**
 * Pages that exist for someone who already holds a printed pointer to them,
 * not for search. They ship `noindex` and stay out of the sitemap.
 */
export const UNLISTED_PATHS: readonly string[] = [CRYSTELLE_CONTACT_PATH];

/** Filter for `@astrojs/sitemap`, which passes fully qualified page URLs. */
export function isListedInSitemap(pageUrl: string): boolean {
  const path = new URL(pageUrl).pathname.replace(/\/+$/, '');

  return !UNLISTED_PATHS.includes(path || '/');
}
