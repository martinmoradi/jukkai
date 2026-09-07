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

Replace [`crystelle-contact-portrait.webp`](../../apps/marketing/src/assets/crystelle-contact-portrait.webp)
with a new WebP using the same filename. A square crop around 1200 × 1200px,
with the face centred and room for the circular crop, is a useful starting point.
Keep the original photo separately.

For a JPEG, PNG or different filename, place it in `apps/marketing/src/assets/`
and change the **single import** in
[`crystelle-portrait.ts`](../../apps/marketing/src/data/crystelle-portrait.ts).
The visible portrait and shared-link preview both follow it. The vCard currently
contains **no photo**; replacing the page portrait does not add one there.

## Publish the change

Run `bun run check` and `bun run --cwd apps/marketing build` from the repo root,
then preview `/contact/crystelle/`. Tests deliberately pin the contact details;
when changing them, update the expected values in
[`crystelle.test.ts`](../../apps/marketing/src/data/crystelle.test.ts) and
[`contact-card-page.test.ts`](../../apps/marketing/src/test/contact-card-page.test.ts).

Commit and push through the PR workflow, then promote the updated site through
the normal release process. Local edits alone do not change the live page.
