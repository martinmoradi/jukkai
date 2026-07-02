import { SITE_METADATA } from './site-metadata';

export function formatPageTitle(pageTitle?: string): string {
  const normalizedTitle = pageTitle?.trim();
  if (!normalizedTitle) return SITE_METADATA.brandName;
  if (normalizedTitle === SITE_METADATA.name) return SITE_METADATA.brandName;
  if (normalizedTitle === SITE_METADATA.brandName)
    return SITE_METADATA.brandName;
  return `${normalizedTitle} | ${SITE_METADATA.brandName}`;
}
