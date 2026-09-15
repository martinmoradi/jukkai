# Hero artwork edit

Selected on 15 September 2026 for Martin's request to replace the prototype film
with a lively sequence of supplied artwork photographs. This is an implementation
for visual review, not a permanent brand selection.

Ten finished JPEGs from `media/library/artworks/` provide the faces, matching bear
silhouettes, bees, dense colour and gold sculpture. `../manifest.json` records their
exact library/archive sources and SHA-256 hashes. Originals remain untouched.
These WebP inputs preserve the source framing, resize within 1920 × 2400, and use
quality 84. Astro generates responsive delivery images at build time.

`src/data/hero-sequence.ts` owns the edit: 20 shots, alternating hard cuts, closer
crops, horizontal wipes, upward reveals and one dissolve. A short run of matching
bears is balanced by a longer gold-sculpture hold. Runtime crops are deliberate
details; no artwork content is generated or retouched. Artists and titles are not
inferred from the montage.
