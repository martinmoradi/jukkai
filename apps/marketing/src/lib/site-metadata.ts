export const SITE_METADATA = {
  baseUrl: 'https://jukkai.fr',
  language: 'fr',
  locale: 'fr_FR',
  name: 'Jukkai',
  brandName: 'Jukkai by Crystelle Terrasson',
  defaultTitle:
    "Jukkai by Crystelle Terrasson | Architecte d'intérieur, Rennes & Châteaugiron",
  defaultDescription:
    "Jukkai by Crystelle Terrasson, architecte d'intérieur à Rennes et Châteaugiron.",
  sitemapPath: '/sitemap-index.xml',
} as const;

export interface PageMetadata {
  canonicalPath: string;
  description: string;
  title: string;
}

export function getCanonicalPath(pathname: string): string {
  const trimmedPath = pathname.trim();
  const pathWithLeadingSlash = trimmedPath.startsWith('/')
    ? trimmedPath
    : `/${trimmedPath}`;

  if (pathWithLeadingSlash === '/') return '/';
  if (
    pathWithLeadingSlash.includes('.') ||
    pathWithLeadingSlash.endsWith('/')
  ) {
    return pathWithLeadingSlash;
  }

  return `${pathWithLeadingSlash}/`;
}

export function getAbsoluteSiteUrl(pathname: string): string {
  return new URL(getCanonicalPath(pathname), SITE_METADATA.baseUrl).toString();
}

export function getSitemapUrl(): string {
  return new URL(SITE_METADATA.sitemapPath, SITE_METADATA.baseUrl).toString();
}

export function buildSiteJsonLd(metadata: PageMetadata) {
  const canonicalUrl = getAbsoluteSiteUrl(metadata.canonicalPath);
  const organizationId = `${SITE_METADATA.baseUrl}/#organization`;
  const websiteId = `${SITE_METADATA.baseUrl}/#website`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: SITE_METADATA.brandName,
        url: SITE_METADATA.baseUrl,
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: SITE_METADATA.brandName,
        url: SITE_METADATA.baseUrl,
        inLanguage: SITE_METADATA.language,
        publisher: {
          '@id': organizationId,
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: metadata.title,
        description: metadata.description,
        inLanguage: SITE_METADATA.language,
        isPartOf: {
          '@id': websiteId,
        },
        about: {
          '@id': organizationId,
        },
      },
    ],
  };
}
