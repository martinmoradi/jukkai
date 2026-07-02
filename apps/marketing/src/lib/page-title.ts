const SITE_NAME = 'Jukkai';

export function formatPageTitle(pageTitle?: string): string {
  const normalizedTitle = pageTitle?.trim();
  if (!normalizedTitle) return SITE_NAME;
  if (normalizedTitle === SITE_NAME) return SITE_NAME;
  return `${normalizedTitle} | ${SITE_NAME}`;
}
