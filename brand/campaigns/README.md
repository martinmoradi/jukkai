# Jukkai print campaigns

**Status:** current. **Owns:** the record of each print ad and the conventions for
the next one. **Last reviewed:** 2026-10-12. **Revisit when:** a campaign is added
or a shared constant changes.

Start here for any magazine ad or printed promotion. Read the campaign READMEs
below and look at their proofs before proposing a new layout.

| Folder                                                                 | Publication | Format                    | Status             |
| ---------------------------------------------------------------------- | ----------- | ------------------------- | ------------------ |
| [`mlle-adele-2026-09`](mlle-adele-2026-09/README.md)                   | Mlle Adèle  | 65 × 265 mm « chandelle » | Sent for September |
| [`tendances-2026-10`](tendances-2026-10/README.md)                     | Tendances   | 180 × 126 mm half page    | Sent for October   |
| [`tendances-2026-quarter-page`](tendances-2026-quarter-page/README.md) | Tendances   | 88 × 126 mm quarter page  | Brief written      |

## Folder convention

One folder per ad, named `<publication>-<yyyy-mm>` after the issue month, mirrored
on Storage under `/mnt/storage/jukkai/campaigns/` when its files are large.

- **In Git:** a README, the file actually sent to the publisher, a JPG proof of it
  (about 1600 px), the publisher's spec sheet, and the native only when it is a few
  MB.
- **On Storage:** photo-heavy Affinity natives, iterations, print TIFFs and review
  renders, with SHA-256 recorded in the README.
- **README:** brief (publication, issue, format, job), exact copy, accepted values,
  files and their roles, what is still unknown. Label what Martin settled, what was
  read from files, and what is open.

## Shared across campaigns

- **Fonts:** Voyage, PP Hatton and PP Frama; working copies and licence caveats in
  [brand/fonts](../fonts/README.md).
- **Wordmark:** [brand/marks/wordmark](../marks/wordmark/README.md). Tendances
  pairs it with a `BY CRYSTELLE TERRASSON` byline; Mlle Adèle set Crystelle's name
  and title as a small-caps line under the headline.
- **Colour:** ivory C10 M10 J20 N0 and house rich black C14 M34 J38 N90 come from the
  Mlle Adèle ad and the [business card](../card/README.md#colour). The October navy
  was derived from its photo, not a house colour.
- **Photographs:** choose from [media/catalog.json](../../media/README.md); originals
  and print TIFFs are on Storage.
- **Contact details:** printed ads used `jukkai.fr` and the Châteaugiron address,
  owned by `apps/marketing/src/data/crystelle.ts`. Do not invent QR-scan
  attribution (ADR-0006).
- **Prepress:** both ads went out as PDF/X-1a:2003 from Affinity, CMYK, fonts
  embedded. Affinity runs under Wine and only reads Desktop paths; see
  [the media workflow](../../media/README.md#use-or-revise-an-asset).
