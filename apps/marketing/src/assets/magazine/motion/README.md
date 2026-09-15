# Landing film selection

Review selection requested by Martin on 2026-09-15. These are the existing silent
H.264 clips and posters supplied through the Desktop hero prototype, copied
without modification. Their durable copies and original motion sources are now
under `/mnt/storage/jukkai/media/motion/`; finished local copies live in
`media/library/motion/`. The [media catalog](../../../../../../media/catalog.json)
owns those paths, while the manifest preserves exact historical input hashes.
This is provisional footage; Martin will refine the
image/video loop later. It is not documentation of a completed Galerie interior.

- `duo.mp4` / `duo.jpg`: landscape travelling shot, default on wide viewports.
- `sculpture.mp4` / `sculpture.jpg`: portrait sculpture shot, phones in portrait.

Replace each film and its matching poster together in this directory. The imports
in `VideoHero.astro` produce cache-versioned URLs. No video URL is requested before
client enhancement; reduced-motion visitors see the poster with a play control.
Only the chosen orientation's film loads. Playback pauses offscreen and when the
tab is hidden. The full primary wordmark includes its supplied designed byline.
