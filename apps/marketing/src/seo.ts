import { CRYSTELLE_CONTACT_PATH } from '#/data/crystelle';

/**
 * Filter for `@astrojs/sitemap`, which passes fully qualified page URLs.
 *
 * The contact card is a destination for someone who already holds a printed
 * pointer to it, not site content, so it ships `noindex` and stays unlisted.
 */
export function isListedInSitemap(pageUrl: string): boolean {
  return (
    new URL(pageUrl).pathname.replace(/\/$/, '') !== CRYSTELLE_CONTACT_PATH
  );
}
