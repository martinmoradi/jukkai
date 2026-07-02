import { formatPageTitle } from './page-title';
import { getCanonicalPath, SITE_METADATA } from './site-metadata';

export const PAGE_STATUSES = [
  'draft-ready',
  'draft-gated',
  'proof-pending',
  'reserved',
] as const;

export type PageStatus = (typeof PAGE_STATUSES)[number];

export type SourceDoc = 'docs/content-matrix.md' | 'docs/foundation.md';

export interface PageCta {
  readonly href: string;
  readonly label: string;
}

export interface MarketingPage {
  readonly h1: string | null;
  readonly kind: 'page' | 'system' | 'template';
  readonly metaDescription: string;
  readonly navLabel: string | null;
  readonly noindex?: boolean;
  readonly primaryCta: PageCta | null;
  readonly primaryKeyword: string | null;
  readonly slug: string;
  readonly sourceDoc: SourceDoc;
  readonly status: PageStatus;
  readonly title: string;
}

export const MARKETING_PAGES: readonly MarketingPage[] = [
  {
    h1: "Architecte d'intérieur à Rennes & Châteaugiron",
    kind: 'page',
    metaDescription: `${SITE_METADATA.brandName}, architecte d'intérieur à Rennes et Châteaugiron.`,
    navLabel: 'Accueil',
    primaryCta: {
      href: '/contact/',
      label: 'Parlons de votre projet',
    },
    primaryKeyword: 'jukkai, crystelle terrasson, studio terrasson',
    slug: '/',
    sourceDoc: 'docs/content-matrix.md',
    status: 'draft-ready',
    title: `${SITE_METADATA.brandName} — Architecte d'intérieur, Rennes & Châteaugiron`,
  },
  {
    h1: "Architecte d'intérieur à Rennes",
    kind: 'page',
    metaDescription:
      "Architecte d'intérieur à Rennes et dans la région rennaise pour rénovation, transformation ciblée et projet professionnel.",
    navLabel: null,
    primaryCta: {
      href: '/contact/',
      label: 'Parlons de votre projet',
    },
    primaryKeyword: "architecte d'intérieur rennes",
    slug: '/architecte-interieur-rennes/',
    sourceDoc: 'docs/content-matrix.md',
    status: 'draft-gated',
    title: formatPageTitle("Architecte d'intérieur Rennes"),
  },
  {
    h1: "Prestations d'architecture intérieure",
    kind: 'page',
    metaDescription: `Prestations et tarifs de ${SITE_METADATA.brandName} pour mission déco, transformation ciblée, rénovation complète et espaces professionnels.`,
    navLabel: 'Prestations',
    primaryCta: {
      href: '/contact/',
      label: 'Parlons de votre projet',
    },
    primaryKeyword: null,
    slug: '/prestations/',
    sourceDoc: 'docs/content-matrix.md',
    status: 'draft-gated',
    title: formatPageTitle('Prestations & tarifs'),
  },
  {
    h1: 'Aménagement de bureaux à Rennes',
    kind: 'page',
    metaDescription: `Aménagement de bureaux à Rennes par ${SITE_METADATA.brandName}, de la conception au suivi de transformation.`,
    navLabel: null,
    primaryCta: {
      href: '/contact/',
      label: 'Parlons de votre projet',
    },
    primaryKeyword: 'aménagement bureaux rennes',
    slug: '/amenagement-bureaux-rennes/',
    sourceDoc: 'docs/content-matrix.md',
    status: 'proof-pending',
    title: formatPageTitle('Aménagement de bureaux à Rennes'),
  },
  {
    h1: "Combien coûte un architecte d'intérieur à Rennes ?",
    kind: 'page',
    metaDescription:
      "Repères 2026 pour comprendre le tarif d'un architecte d'intérieur à Rennes et préparer votre projet.",
    navLabel: null,
    primaryCta: {
      href: '/contact/',
      label: 'Parlons de votre projet',
    },
    primaryKeyword: "tarif architecte d'intérieur rennes",
    slug: '/combien-coute-architecte-interieur-rennes/',
    sourceDoc: 'docs/content-matrix.md',
    status: 'draft-gated',
    title: formatPageTitle(
      "Combien coûte un architecte d'intérieur à Rennes en 2026 ?",
    ),
  },
  {
    h1: 'Projets',
    kind: 'page',
    metaDescription: `Réalisations et transformations portées par ${SITE_METADATA.brandName}, de l'habitat aux espaces professionnels.`,
    navLabel: 'Projets',
    primaryCta: {
      href: '/contact/',
      label: 'Parlons de votre projet',
    },
    primaryKeyword: null,
    slug: '/projets/',
    sourceDoc: 'docs/content-matrix.md',
    status: 'proof-pending',
    title: formatPageTitle('Projets'),
  },
  {
    h1: null,
    kind: 'template',
    metaDescription: `Étude de projet par ${SITE_METADATA.brandName} : contexte, transformation, matières et rôle de l'architecture intérieure.`,
    navLabel: null,
    primaryCta: {
      href: '/contact/',
      label: 'Parlons de votre projet',
    },
    primaryKeyword: 'rénovation {type} {commune}',
    slug: '/projets/{slug-descriptif}/',
    sourceDoc: 'docs/content-matrix.md',
    status: 'proof-pending',
    title: formatPageTitle('{Titre créatif} : {sous-titre descriptif}'),
  },
  {
    h1: "L'art shop",
    kind: 'page',
    metaDescription:
      "L'art shop Jukkai à Châteaugiron : lieu vivant autour de l'architecture intérieure, de l'art et de la rencontre.",
    navLabel: "L'art shop",
    primaryCta: {
      href: '/contact/',
      label: 'Parlons de votre projet',
    },
    primaryKeyword: 'jukkai châteaugiron',
    slug: '/art-shop/',
    sourceDoc: 'docs/content-matrix.md',
    status: 'draft-gated',
    title: formatPageTitle("L'art shop"),
  },
  {
    h1: 'À propos',
    kind: 'page',
    metaDescription: `Crystelle Terrasson, architecte d'intérieur UNAID, son studio depuis 2012 et l'univers Jukkai à Châteaugiron.`,
    navLabel: 'À propos',
    primaryCta: {
      href: '/contact/',
      label: 'Parlons de votre projet',
    },
    primaryKeyword: 'anciennement studio crystelle terrasson',
    slug: '/a-propos/',
    sourceDoc: 'docs/content-matrix.md',
    status: 'draft-gated',
    title: formatPageTitle('À propos'),
  },
  {
    h1: 'Parlons de votre projet',
    kind: 'page',
    metaDescription: `Contactez ${SITE_METADATA.brandName} pour parler d'un projet d'architecture intérieure à Rennes, Châteaugiron ou alentours.`,
    navLabel: 'Contact',
    primaryCta: {
      href: '/contact/',
      label: 'Envoyer une demande',
    },
    primaryKeyword: null,
    slug: '/contact/',
    sourceDoc: 'docs/content-matrix.md',
    status: 'draft-gated',
    title: formatPageTitle('Contact'),
  },
  {
    h1: 'Merci',
    kind: 'system',
    metaDescription: `Votre demande a bien été transmise à ${SITE_METADATA.brandName}.`,
    navLabel: null,
    noindex: true,
    primaryCta: {
      href: '/contact/merci/',
      label: 'Choisir un créneau',
    },
    primaryKeyword: null,
    slug: '/contact/merci/',
    sourceDoc: 'docs/content-matrix.md',
    status: 'draft-ready',
    title: formatPageTitle('Merci'),
  },
  {
    h1: null,
    kind: 'page',
    metaDescription: `Mentions légales de ${SITE_METADATA.brandName}.`,
    navLabel: null,
    primaryCta: null,
    primaryKeyword: null,
    slug: '/mentions-legales/',
    sourceDoc: 'docs/content-matrix.md',
    status: 'draft-ready',
    title: formatPageTitle('Mentions légales'),
  },
  {
    h1: null,
    kind: 'page',
    metaDescription: `Politique de confidentialité de ${SITE_METADATA.brandName}.`,
    navLabel: null,
    primaryCta: null,
    primaryKeyword: null,
    slug: '/politique-de-confidentialite/',
    sourceDoc: 'docs/content-matrix.md',
    status: 'draft-ready',
    title: formatPageTitle('Politique de confidentialité'),
  },
  {
    h1: null,
    kind: 'page',
    metaDescription: `Conditions générales de ${SITE_METADATA.brandName}.`,
    navLabel: null,
    primaryCta: null,
    primaryKeyword: null,
    slug: '/conditions-generales/',
    sourceDoc: 'docs/content-matrix.md',
    status: 'draft-ready',
    title: formatPageTitle('Conditions générales'),
  },
  {
    h1: null,
    kind: 'system',
    metaDescription: `La page demandée n'existe pas. Retrouvez les projets ou contactez ${SITE_METADATA.brandName}.`,
    navLabel: null,
    noindex: true,
    primaryCta: {
      href: '/projets/',
      label: 'Voir les projets',
    },
    primaryKeyword: null,
    slug: '/404/',
    sourceDoc: 'docs/content-matrix.md',
    status: 'draft-ready',
    title: formatPageTitle('Page introuvable'),
  },
  {
    h1: "Décoratrice d'intérieur à Rennes",
    kind: 'page',
    metaDescription:
      "Page réservée pour une future mission déco avec l'exigence d'une architecte d'intérieur.",
    navLabel: null,
    primaryCta: {
      href: '/contact/',
      label: 'Parlons de votre projet',
    },
    primaryKeyword: "décoratrice d'intérieur rennes",
    slug: '/decoratrice-interieur-rennes/',
    sourceDoc: 'docs/content-matrix.md',
    status: 'reserved',
    title: formatPageTitle("Décoratrice d'intérieur Rennes"),
  },
  {
    h1: "Architecte d'intérieur à Châteaugiron",
    kind: 'page',
    metaDescription:
      "Page réservée pour une future preuve locale d'architecture intérieure à Châteaugiron.",
    navLabel: null,
    primaryCta: {
      href: '/contact/',
      label: 'Parlons de votre projet',
    },
    primaryKeyword: 'architecte intérieur châteaugiron',
    slug: '/architecte-interieur-chateaugiron/',
    sourceDoc: 'docs/content-matrix.md',
    status: 'reserved',
    title: formatPageTitle("Architecte d'intérieur Châteaugiron"),
  },
  {
    h1: 'Rénover un appartement à Rennes',
    kind: 'page',
    metaDescription:
      "Page réservée pour un futur guide sur la rénovation d'appartement à Rennes.",
    navLabel: null,
    primaryCta: {
      href: '/architecte-interieur-rennes/',
      label: 'Voir la page service',
    },
    primaryKeyword: 'rénovation appartement rennes',
    slug: '/renover-appartement-rennes/',
    sourceDoc: 'docs/content-matrix.md',
    status: 'reserved',
    title: formatPageTitle('Rénover un appartement à Rennes'),
  },
] as const;

export type MarketingPageSlug = (typeof MARKETING_PAGES)[number]['slug'];

export function getMarketingPage(slug: string): MarketingPage {
  const canonicalSlug = getCanonicalPath(slug);
  const page = MARKETING_PAGES.find(
    (candidate) => candidate.slug === canonicalSlug,
  );

  if (!page) {
    throw new Error(`No marketing page content found for ${canonicalSlug}`);
  }

  return page;
}

export function getPrimaryNavigationPages(): readonly MarketingPage[] {
  return MARKETING_PAGES.filter((page) => page.navLabel !== null);
}

export function getIndexableMarketingPages(): readonly MarketingPage[] {
  return MARKETING_PAGES.filter(
    (page) =>
      page.kind === 'page' &&
      page.status !== 'reserved' &&
      page.noindex !== true,
  );
}
