/**
 * Crystelle's contact card. One person, one route, one object: there is no
 * person abstraction here and there should not be one until a second person
 * needs a card of their own.
 */

/**
 * Where the printed `/c/crystelle` card path lands. Astro builds directory-form
 * pages, so the canonical URL carries a trailing slash.
 */
export const CRYSTELLE_CONTACT_PATH = '/contact/crystelle';

/**
 * The vCard the page's primary action downloads.
 *
 * Link to it plainly, with no `download` attribute: iOS Safari honours
 * `download` by saving the file to Files, whereas a plain link to a
 * `text/vcard` response is what opens the add-contact sheet.
 */
export const CRYSTELLE_VCARD_PATH = '/contact/crystelle.vcf';

/**
 * One number in three renderings. `06 …` is the French reading grouping shown
 * on the page; dropping the trunk `0` behind `+33` derives the other two, so
 * correcting the number stays a single edit.
 */
const PHONE_DISPLAY = '06 62 72 87 99';
const PHONE_INTERNATIONAL = `+33 ${PHONE_DISPLAY.slice(1)}`;

export const CRYSTELLE = {
  address: {
    country: 'France',
    locality: 'Châteaugiron',
    postalCode: '35410',
    street: '26 bis rue au Prévôt',
  },
  email: 'ct@jukkai.fr',
  familyName: 'Terrasson',
  givenName: 'Crystelle',
  instagram: {
    handle: '@studiocrystelleterrasson',
    url: 'https://www.instagram.com/studiocrystelleterrasson/',
  },
  phoneDisplay: PHONE_DISPLAY,
  phoneTel: PHONE_INTERNATIONAL.replaceAll(' ', ''),
  profession: 'Architecte d’intérieur',
  role: 'Dirigeante',
} as const;

export const CRYSTELLE_FULL_NAME = `${CRYSTELLE.givenName} ${CRYSTELLE.familyName}`;

/**
 * vCard 3.0 — the dialect iOS Contacts and Android both import cleanly.
 *
 * Properties are listed in emission order, so adding her portrait later is a
 * single entry here: `PHOTO;ENCODING=b;TYPE=JPEG:<base64>`.
 *
 * The postal address is shared with the Contact Card Page so the screen and
 * saved contact cannot drift apart.
 */
const CRYSTELLE_VCARD_PROPERTIES = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  `N:${CRYSTELLE.familyName};${CRYSTELLE.givenName};;;`,
  `FN:${CRYSTELLE_FULL_NAME}`,
  'ORG:Jukkai',
  `TITLE:${CRYSTELLE.role}`,
  `TEL;TYPE=CELL:${PHONE_INTERNATIONAL}`,
  `EMAIL;TYPE=INTERNET:${CRYSTELLE.email}`,
  `ADR;TYPE=WORK:;;${CRYSTELLE.address.street};${CRYSTELLE.address.locality};;${CRYSTELLE.address.postalCode};${CRYSTELLE.address.country}`,
  'URL:https://jukkai.fr',
  'END:VCARD',
] as const;

/** RFC 6350 requires CRLF; some Android importers reject bare LF outright. */
export const CRYSTELLE_VCARD = `${CRYSTELLE_VCARD_PROPERTIES.join('\r\n')}\r\n`;
