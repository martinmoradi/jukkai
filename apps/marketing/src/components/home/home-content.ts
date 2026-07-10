import { getPrimaryNavigationPages, type MarketingPage } from '../../lib/pages';

export const HOME_SECTION_ORDER = [
  'hero',
  'umbrella-answer',
  'projects-teaser',
  'offer-ladder-teaser',
  'art-shop-invitation',
  'trust-strip',
  'closing-cta',
] as const;

export type HomeSectionId = (typeof HOME_SECTION_ORDER)[number];

export const HOME_PROOF_CLAIMS = ['UNAID', '30 ans de métier'] as const;

export const HOME_PENDING_VALIDATION_LABELS = {
  art: 'Art shop à valider',
  prices: 'Tarifs à valider',
  projects: 'Projet à valider',
  reviews: 'Avis et note à valider',
  testimonials: 'Témoignage à valider',
} as const;

export const HOME_PROJECT_PLACEHOLDERS = [
  {
    label: HOME_PENDING_VALIDATION_LABELS.projects,
    meta: 'Commune, type de mission et visuels à renseigner avant publication.',
    title: 'Projet sélection à documenter',
  },
  {
    label: HOME_PENDING_VALIDATION_LABELS.projects,
    meta: 'Avant/après, surface et contexte client à confirmer.',
    title: 'Transformation à choisir',
  },
  {
    label: HOME_PENDING_VALIDATION_LABELS.projects,
    meta: 'Référence de lancement à brancher depuis la page projets.',
    title: 'Référence à valider',
  },
] as const;

export const HOME_OFFER_PLACEHOLDERS = [
  {
    copy: 'Cadrage et conseils pour clarifier un lieu, ses usages et ses priorités.',
    label: HOME_PENDING_VALIDATION_LABELS.prices,
    title: 'Conseil et mission déco',
  },
  {
    copy: 'Accompagnement pour redessiner une pièce, un usage ou une circulation précise.',
    label: HOME_PENDING_VALIDATION_LABELS.prices,
    title: 'Transformation ciblée',
  },
  {
    copy: 'Mission pensée pour tenir ensemble volumes, matières, arbitrages et suivi.',
    label: HOME_PENDING_VALIDATION_LABELS.prices,
    title: 'Rénovation complète',
  },
  {
    copy: 'Porte d’entrée pour les bureaux, lieux de travail et espaces recevant du public.',
    label: HOME_PENDING_VALIDATION_LABELS.prices,
    title: 'Espaces professionnels',
  },
] as const;

export const HOME_ART_PLACEHOLDERS = [
  {
    label: HOME_PENDING_VALIDATION_LABELS.art,
    text: 'Sélection d’œuvres à confirmer',
  },
  {
    label: HOME_PENDING_VALIDATION_LABELS.art,
    text: 'Horaires et modalités à renseigner',
  },
] as const;

export const HOME_TRUST_PLACEHOLDERS = [
  {
    label: HOME_PENDING_VALIDATION_LABELS.testimonials,
    text: 'Citation client à choisir',
  },
  {
    label: HOME_PENDING_VALIDATION_LABELS.reviews,
    text: 'Note et nombre d’avis à confirmer',
  },
  {
    label: HOME_PENDING_VALIDATION_LABELS.projects,
    text: 'Références projets à choisir',
  },
] as const;

type HomePrimaryNavigationPage = MarketingPage & {
  readonly navLabel: string;
};

export function getHomePrimaryNavigationPages(
  pages: readonly MarketingPage[] = getPrimaryNavigationPages(),
): readonly HomePrimaryNavigationPage[] {
  return pages.filter(
    (page): page is HomePrimaryNavigationPage =>
      page.navLabel !== null && page.slug !== '/',
  );
}
