# Magazine website selection

**Status:** first-release design selection, prepared for Martin's review on
2026-09-13. These are web derivatives of the sources Martin supplied for the
landing page. Source photographs and editable masters are preserved.

`manifest.json` records each exact source, its checksum, output dimensions and
the exported WebP checksum. Exports are orientation-corrected, resized without
enlargement, stripped of camera metadata and encoded at WebP quality 88. There
is no new colour treatment. Astro creates smaller responsive derivatives.

- `interior-light`: supplied project photograph, original filename DSCF1385.
- `belle-epoque`: supplied Belle Époque project, C.ABLAIN_6789.
- `le-capri`: supplied restaurant Le Capri project, RESTAURANT_LE_CAPRI_HD-5.
- `crystelle-galerie`: final 2400 px edited Galerie portrait.
- `yoann-bonneville`: selected final web export. Artist attribution comes from
  the supplied artwork metadata; the artwork's title remains unknown.
- `artwork-still-life` and `contrasting-bears`: selected scene v2 exports.
  Captions describe the photographs. They do not invent artwork titles or
  expose internal/private attribution from the source metadata.
- The three wordmark SVGs are byte-identical copies of the current masters
  in `brand/marks/wordmark/`. The existing sphere asset is shared with the card.

The photograph labels describe supplied projects, not new project case studies.
The complete website can add project details and agreed photographer credits.
This first release introduces the Galerie rather than publishing a catalogue,
inventory, prices, public opening hours or an artist programme.

## Art-first second pass, September 13

The revised opening uses `yoann-bonneville` (the selected `yoann-bonneville-02`
export): a close view resolves into the complete square painting. Its artist is
known; no title is assigned. The refined sequence connects the complete painting
to its real presence in Crystelle’s portrait. The viewer opens at a useful detail
scale and offers “Vue entière” to inspect the complete photograph at any time.

Three additional web derivatives follow the same export/checksum convention:

- `nina-bruneau`: selected September 12 revision of `nina-bruneau-01`; the complete
  painting and purple painted edge are retained. The title remains unknown.
- `dogs-scene`: selected scene v2, `dogs-with-real-dog`; descriptive caption only.
  The scene supplies humour and context, without inventing an installation credit.
- `capri-material`: `RESTAURANT_LE_CAPRI_HD-59`, light on wood, metal and upholstery.
  A Studio Terrasson project, never the Jukkai premises. Preserved as an unused
  export after the refinement removed the separate architecture photograph.

The sculptural still life and Crystelle portrait remain selected. Earlier web
exports remain available as provenance but are not all displayed in this edition.
These choices follow contact-sheet and larger-image review against the art-first
brief; they do not establish a catalogue, artwork availability or permanent palette.

## Prototype integration, September 15

The hero uses the supplied prototype films and matching posters from `motion/`.
See [the film selection](motion/README.md) for provenance and replacement guidance.
The three added square works (`m-hope-02`, `m-hope-04`, `mister-zion-01`) are exact
copies from the supplied spiral prototype. The existing Nina Bruneau and Bonneville
exports complete the five-work sequence. Bonneville appears last, on top, and
connects to its real position in the same Crystelle photograph as the second pass.

The two Studio Crystelle Terrasson SVGs are exact copies of Martin's supplied files;
the originals are retained in `brand/source/studio-terrasson/`. Their geometry and
colours are preserved. `manifest.json` records checksums for all new inputs.

## Storage consolidation, September 15

The [media catalog](../../../../../media/catalog.json) identifies the finished
library sources and selected editable masters on Storage. The manifest's `source`
now points to the retained exact input; `historicalSource` records its former
location. Source and app-output hashes are unchanged. Several web exports were
made from smaller previews, so their historical input differs from the full JPEG
available in the library. All runtime inputs remain committed here.
