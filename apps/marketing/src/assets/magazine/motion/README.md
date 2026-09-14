# Landing film selection

Review selection requested by Martin on 2026-09-15. These are the existing silent
H.264 clips and posters from `/home/martin/Desktop/jukkai-hero-prototype/public/media/`,
copied without modification. This is provisional footage; Martin will refine the
image/video loop later. It is not documentation of a completed Galerie interior.

- `duo.mp4` / `duo.jpg`: landscape travelling shot, default on wide viewports.
- `sculpture.mp4` / `sculpture.jpg`: portrait sculpture shot, phones in portrait.

Replace each film and its matching poster together in this directory. The imports
in `VideoHero.astro` produce cache-versioned URLs. No video URL is requested before
client enhancement; reduced-motion visitors see the poster with a play control.
Only the chosen orientation's film loads. Playback pauses offscreen and when the
tab is hidden. The full primary wordmark includes its supplied designed byline.
