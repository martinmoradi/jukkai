import portrait from '#/assets/crystelle-vcard-portrait.jpg?inline';
import { createCrystelleVCard } from '#/data/crystelle';

// Vite embeds this small, committed JPEG at build time; no runtime file access.
export const CRYSTELLE_VCARD = createCrystelleVCard(portrait.split(',')[1]);
