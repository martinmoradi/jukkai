# Jukkai brand workspace

This is the central home for identity assets shared between the repository,
Figma or Canva working files, and client handoff. It contains durable masters
and the source material needed to revise them; it is not the marketing app's
runtime asset directory.

## Structure

- `ad/mlle-adele/` - previous chandelle ad, native file and source material.
- `ad/tendances-2026-10/` - October half-page commission; start with its
  [coordination brief](ad/tendances-2026-10/README.md).
- `marks/wordmark/` - current wordmark exports and byline.
- `marks/seal/` - current seal exports.
- `qr-codes/` - reproducible QR masters and convenience exports.
- `source/` - non-current construction files, generators, captured references,
  and superseded studies. Never use this as the export folder.
- `fonts/` - local working copies for design tools. Font binaries are ignored;
  only the usage note is committed.

## Asset states

- Files under `marks/` are the easiest exports to share or place in a design.
  Their presence here does not by itself mean every variant is approved.
- Files under `source/` explain or reproduce an export. They are not current
  marks and should not be placed in designs or handed to a client.
- Session reasoning, open questions, and provisional specifications belong in
  `docs/working-notes/`, not inside the export folders. Exception requested by
  Martin on 2026-09-12: a bounded print commission keeps its working brief beside
  its assets under `ad/`, linked from the documentation map. The brief remains
  provisional and does not replace shared business facts or approved decisions.

Use lowercase kebab-case filenames. Include `jukkai-` on exported wordmarks so
they remain identifiable when downloaded outside this folder. Prefer SVG for
marks; add print or raster exports only when a real handoff needs them.

## Fonts and the website

The local `fonts/` directory is a convenience for Figma, Canva, and export
work. It is deliberately not tracked because font files can be licensed,
replaceable, and large.

The marketing app uses the separate pinned `@mm/fonts` pipeline documented in
`docs/operations/fonts.md`. Do not copy these local font binaries into the app.
