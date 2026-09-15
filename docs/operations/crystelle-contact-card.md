# Edit Crystelle’s contact card

## How the vCard works

The QR opens the contact page. **Ajouter à mes contacts** opens a `.vcf` file:
a small contact file the phone can import. It is generated when the site is
built, then served at `/contact/crystelle.vcf`. Real iPhone/Android import still
needs checking before release.

An imported contact is a snapshot: later website edits do **not** update contacts
already saved on someone’s phone.

## Change the details

Edit [`apps/marketing/src/data/crystelle.ts`](../../apps/marketing/src/data/crystelle.ts):

- `CRYSTELLE`: name, email, address, `role` and `profession`. These feed both the
  page and vCard; the title joins role and profession with `·`.
- `PHONE_DISPLAY`: use French spacing, e.g. `'06 62 72 87 99'`. The dial link and
  international vCard number are derived automatically.
- `instagram.handle` and `instagram.url`: page only.
- `ORG:Jukkai` and `URL:https://jukkai.fr` near the bottom: company and website
  stored in the vCard.

Keep the surrounding quotes and commas. Edit the source, not the generated
`.vcf` or files under `dist/`. Keep the printed `/c/crystelle` path unchanged.

## Replace the portrait

Martin selected `media/library/portraits/crystelle/01-ochre-light.jpg` on
15 September 2026. The page and its social preview now share
[`crystelle-contact-portrait.jpg`](../../apps/marketing/src/assets/crystelle-contact-portrait.jpg):
a 1200px square export, cropped from the top of the selected 4640 × 5800 source
so the full head remains inside the circular frame. The general `/contact/` page
keeps its Galerie photograph.

The vCard embeds a 480px JPEG from that exact square crop, committed as
[`crystelle-vcard-portrait.jpg`](../../apps/marketing/src/assets/crystelle-vcard-portrait.jpg).
[`crystelle-vcard.ts`](../../apps/marketing/src/data/crystelle-vcard.ts) uses Vite's
inline asset import to include it at build time. The contact generator adds a
`PHOTO;ENCODING=b;TYPE=JPEG` property with CRLF folding, following
[vCard 3.0](https://www.rfc-editor.org/rfc/rfc2426#section-3.1.4).
The downloaded contact needs no remote image fetch. Tests decode the actual JPEG
and verify its bytes and dimensions. Import into real iOS/Android Contacts remains
a manual release check.

The [media catalog](../../media/catalog.json) records the source hash, crop and
both web exports. The previous portrait remains preserved as the
`crystelle-contact-legacy` historical input. Do not change the original photograph
or depend on the ignored media library during builds.

When replacing this portrait, update the shared import in
[`crystelle-portrait.ts`](../../apps/marketing/src/data/crystelle-portrait.ts),
regenerate the smaller vCard JPEG from the same crop, and update the catalog.
The vCard action appears only on `/contact/crystelle/`, reached through the locked
printed `/c/crystelle` redirect; it is absent from the public `/contact/` page.

## Publish the change

Run `bun run check` and `bun run --cwd apps/marketing build` from the repo root,
then preview `/contact/crystelle/`. Tests deliberately pin the contact details;
when changing them, update the expected values in
[`crystelle.test.ts`](../../apps/marketing/src/data/crystelle.test.ts) and
[`contact-card-page.test.ts`](../../apps/marketing/src/test/contact-card-page.test.ts).

Commit and push through the PR workflow, then promote the updated site through
the normal release process. Local edits alone do not change the live page.
