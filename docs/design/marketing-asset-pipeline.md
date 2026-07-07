# Marketing asset pipeline

How images (and later, all editorial content) get produced and served for the
marketing site, from launch through a client-authored CMS. This is design
capture, not a committed roadmap: the launch phase is settled and in progress;
later phases record the intended shape and the trigger that should wake each one.

Companion decisions: `docs/adr/0004-build-time-image-derivatives.md` (the image
production decision), `docs/adr/0001-manual-production-promotion.md` (static
Cloudflare Pages delivery), `docs/adr/0003-build-time-generated-font-assets.md`
(the same philosophy applied to fonts). Vocabulary: `CONTEXT.md`
(Master, Derivative, Content Image, Design Asset, Publication, Publisher,
Portal).

## The one spine

There is a single architectural spine, and it does not change across phases:

```
Master  →  Derivative (built)  →  Astro build  →  Cloudflare Pages CDN
(durable    (web variant,          (renders from    (edge cached,
 original,   content-hashed)        content)          immutable)
 Garage S3)
```

Everything else is a question of _who fills the content in_ and _what triggers a
build_. The delivery end (static, Pages) and the production end (build-time
derivatives from durable masters) are fixed. This is why launch work is not
throwaway: the CMS era swaps the _author_ and the _trigger_, not the spine.

## Two layers

Keep these separate; conflating them is the usual source of confusion.

- **Editorial layer** — what a person authors. The aggregate roots are
  **Project** and **Artist**; images are _attached to_ them, never modelled as a
  free-standing top-level thing. A team member (Crystelle, Laura) is the same
  shape as an Artist: a person with a portrait and a bio.
- **Asset layer** — how an image physically exists: a **Master** in Garage S3
  and its build-time **Derivatives**. Identical in every phase.

## Governance: Content Image vs Design Asset

Not every image is content. The test is the rotation test: _will a
non-developer swap this image without touching code?_

- **Yes → Content Image.** Belongs to a Project / Artist / team member. Carries
  alt text, focal point, ordering, and a Master reference. Structured.
- **No → Design Asset.** Decorative textures, section backgrounds, the baked
  hero field. Placed in code, lives in `src/assets`, never rotated. Freeform is
  correct here — it is design, not content.

The structuring discipline applies only to the rotatable subset. Design Assets
staying loose is not sloppiness.

Rendering presets (hero / thumbnail / gallery sizing) are a _separate_ axis from
governance. `astro:assets` takes `widths`/`sizes` per `<Picture>` usage, so no
formal "image role" vocabulary is needed until something forces centralised
presets.

## Phase 1 — launch (settled, in progress)

- **Masters**: Garage S3, outside the repo, never in git.
- **Content Images**: curated web-source exports (compressed, ~2560px)
  committed to `src/assets`. Projects and Artists are **Astro content
  collections** (zod-validated); each entry lists its images with alt, focal,
  order, and the Master's S3 key for provenance. Git is the source of truth and
  the "database". No Postgres.
- **Derivatives**: `astro:assets` `<Picture>` generates responsive,
  content-hashed variants at build.
- **Design Assets**: `src/assets` + component imports; bespoke synthesis (hero
  field) stays in the Python baker.
- **Delivery**: static Cloudflare Pages (ADR-0001).

Author is Martin; trigger is a git push / promotion. Exporting web-source by
hand is fine until it is annoying; a small script that reads the collection and
emits web-source is the first thing to add when it is.

## Phase 2 — client-authored CMS (deferred)

Not a launch concern. Wakes when Crystelle needs to rotate project photos, add
artists, or change featured projects without Martin, or when web-source images
become too many/heavy to keep committing.

- **Authoring** is an admin surface _inside the Portal_ (the React app), a
  practice-console capability — not a new app. Reuses Portal auth and the
  Coolify runtime; keeps the static public site cleanly separate from the
  authenticated control plane.
- **Source of truth** moves from git to **Postgres**: the Phase 1 content-
  collection schema, promoted to tables, now written by the client. Content has
  **draft** and **published** states.
- **Publish** is a button in Portal that creates a **job**, never an in-request
  build. The **Publisher** (a background process, likely in `apps/api`) then:
  1. freezes the published editorial truth into an immutable **Publication**
     (`content.snapshot.json`);
  2. pulls the referenced Masters from Garage S3 and generates the web-source /
     Derivatives (a Sharp step, or an Astro content loader);
  3. runs the **same** Astro build, now reading the snapshot instead of hand-
     authored collection files;
  4. deploys to Cloudflare Pages;
  5. records job status so Portal can show pending / success / failure / logs.

The snapshot model (build reads a frozen Publication, not live DB/S3) is the
deliberate choice: reproducible, debuggable, and immune to a mid-build edit
producing a half-updated site. Because the Astro side still reads collections,
Phase 1's rendering code carries over almost unchanged — the Publisher just
_generates_ the collection entries a person used to type.

## Phase 3 — nice-to-haves (much later, "overdeliver")

- **Admin preview helper**: fast, throwaway, non-public-quality builds or image
  previews so Crystelle sees a change before a real Publish. A different animal
  from production (speed over fidelity); may be the one place a runtime image
  transform is actually justified, scoped to preview only.
- Publisher hardening: queue, retries, build history, rollback, per-draft
  preview deployments.

## What would reopen ADR-0004

A runtime image service (Cloudflare Images / imgproxy) is the recorded fallback,
reopened only if: images must appear live within seconds of an edit with no
rebuild, or the image set becomes unbounded/unknowable at build time. Neither is
foreseen.
