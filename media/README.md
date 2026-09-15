# Jukkai media

**Status:** current storage workflow, approved by Martin on 15 September 2026.
**Owns:** photographic sources, selected edits and local intake.
**Last reviewed:** 15 September 2026, consolidation of the September production folders.
**Revisit when:** a backup destination or publishing workflow changes.

## Find an image

- `library/` is the ignored, replaceable shelf of finished photographs, decorations
  and films. Browse it locally when choosing website assets.
- `catalog.json` identifies usable selections, their checksums, archive paths and
  current website uses. Availability does not grant publication approval. Unknown
  artwork titles, project identities, credits and permissions remain unknown.
- `/mnt/storage/jukkai/` owns originals and selected editable masters. Mount Storage
  before copying into it; never create an archive under an unmounted mountpoint.
- `incoming/` is ignored temporary intake. Empty it after verified promotion.
- `apps/marketing/src/assets/` contains the committed inputs the website actually
  builds from. CI needs neither this local shelf nor Storage.

Archive paths in the catalog are relative to its single `archiveRoot`. Library
paths are relative to this directory. Checksums identify file bytes, not visual
similarity or approval. Project batches preserve received filenames and retouches;
old-site recoveries remain separate from photographer-supplied images.

## Archive layout

| Location under `/mnt/storage/jukkai/` | Contents                                                                                                                                                           |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `photoshoot-09-09-26/`                | Complete capture groups in Rio, Crystelle/Orange, Crystelle/Sunshine, Crystelle/Composition, Laura, Artworks and Scenes. Original filenames and bytes stay intact. |
| `originals/projects/`                 | Received project batches and separate old-website recovery.                                                                                                        |
| `media/`                              | Selected artwork, scene, portrait, decoration and motion packages. Native names are preserved; flattened results live in `exports/`.                               |
| `campaigns/tendances-2026-10/`        | Final Tendances v10 editable master and any required resources.                                                                                                    |
| `design-resources/fonts/`             | Retained working font files; original trial/license distinctions still apply. Installed fonts and the site's generated font pipeline have separate roles.          |
| `records/2026-09-production/`         | Useful historical notes, source indexes, scripts and exact historical website inputs. Consult the current catalog before following old paths.                      |
| `records/migration-2026-09/`          | Approved plan, original-to-current file maps, hashes, native validation and cleanup results.                                                                       |

The received project batches are `belle-epoque`, `le-capri`,
`to-identify/photos1` and `to-identify/unknown-new`. These labels preserve intake
context; Crystelle still owns project identification, image selection, photographer
credits and publication permission. Preserve both original and retouched files.

## Use or revise an asset

1. Choose a finished source from `library/`; crop/export a deliberate website input
   into the app's tracked assets and record the exact source/checksum in its
   provenance manifest. Astro generates responsive delivery sizes at build time.
2. To revise a photograph, copy its chosen native and required resources from
   Storage into one temporary Desktop session folder. Affinity uses Desktop-accessible
   paths under Wine. Check for unsaved documents before changing sessions.
3. Save, reopen and inspect the result, then verify a copy into Storage. Refresh
   the corresponding library file and catalog. Do not edit the two copies independently.
4. Retire superseded versions deliberately, retaining meaningful alternate crops
   and treatments. Empty the temporary session after verification.

Historical web inputs can be smaller than today's selected full JPEG. Preserve
those exact inputs and their recorded hashes; moving files does not mean the
website was regenerated from the larger source. Keep native files, RAWs and stacks
of responsive variants out of the library and Git.

Git, Prettier, ESLint and Stylelint exclude the two local folders. App source,
TypeScript and deployment scopes stay within their existing workspace paths.
Any future scanner, watcher or packaging tool that ignores Git rules must explicitly
exclude `media/library/` and `media/incoming/`.

## Backup coverage

Storage is one physical disk. The local shelf duplicates selected flattened files,
not the complete archive. No independent remote backup or S3 upload is established
by this consolidation. Verify a second independent copy before deleting remaining
phone originals. Record S3 object URLs only after actual uploads exist.
