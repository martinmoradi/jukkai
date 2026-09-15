# Jukkai brand workspace

This is the central home for identity assets shared between the repository,
Figma or Canva working files, and client handoff. It contains durable masters
and the source material needed to revise them; it is not the marketing app's
runtime asset directory.

## Structure

- `logo/` - compact logo masters, including the sphere used by the contact card.
- `marks/wordmark/` - current wordmark exports and byline.
- `marks/seal/` - current seal exports.
- `card/` - editable business-card and print assets.
- `ad/` - retained compact brand advertisement masters and handoffs; the final
  Tendances production native lives on Storage under `campaigns/tendances-2026-10/`.
- `qr-codes/` - reproducible QR masters and convenience exports.
- `source/` - non-current construction files, generators, captured references,
  and superseded studies. Never use this as the export folder.
- `fonts/` - local working copies for design tools. Font binaries are ignored;
  only the usage note is committed.

Large photographic masters belong in `/mnt/storage/jukkai/media/`, with finished
working copies in the ignored `media/library/`. See [the media workflow](../media/README.md)
and catalog, including `crystelle-window-light` for the September portrait formerly
kept in `brand/pictures/`. Keep compact identity and print files in this tree.

## Asset states

- Files under `marks/` are the easiest exports to share or place in a design.
  Their presence here does not by itself mean every variant is approved.
- Files under `source/` explain or reproduce an export. They are not current
  marks and should not be placed in designs or handed to a client.
- Session reasoning, open questions, and provisional specifications belong in
  `docs/working-notes/`, not inside the export folders.

Use lowercase kebab-case filenames. Include `jukkai-` on exported wordmarks so
they remain identifiable when downloaded outside this folder. Prefer SVG for
marks; add print or raster exports only when a real handoff needs them.

## Fonts and the website

The local `fonts/` directory is a convenience for Figma, Canva, and export
work. It is deliberately not tracked because font files can be licensed,
replaceable, and large.

The marketing app uses the separate pinned `@mm/fonts` pipeline documented in
`docs/operations/fonts.md`. Do not copy these local font binaries into the app.
