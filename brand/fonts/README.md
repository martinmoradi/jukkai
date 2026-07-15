# Local design fonts

Place local working font files here when they are needed by Figma, Canva, or
brand-export tooling. The directory is centralized for convenience, but font
binaries are ignored by git.

Current local working set:

- Voyage: Regular and Bold (`.otf`)
- PP Hatton: all 10 supplied upright and italic cuts (`.otf`)
- PP Frama and PP Frama Text: all 20 supplied upright and italic cuts (`.otf`)

The working copies come from `/home/martin/Documents/Fonts`. Preserve that
directory as the original package source; files here are disposable local
copies for brand tools.

Keep one desktop-design format here. For the currently supplied Hatton and
Frama packages, the OTF and TTF files expose matching family, style, weight,
and version metadata; this workspace keeps the OTF editions and leaves both
vendor formats untouched in the original package source.

Possession of these files is not proof of public-web, client, or font-file
modification rights. Confirm the applicable purchase licence and invoice before
deployment or automated glyph subsetting.

These names are an operator inventory, not an approved typography contract.
The provisional marketing choice is Voyage, Hatton, and Frama with all supplied
cuts retained until the exact weights and styles are locked. The marketing site
still obtains web-ready font assets through the pinned `@mm/fonts` pipeline in
`docs/operations/fonts.md`.
