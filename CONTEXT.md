# Jukkai

Jukkai's shared language for public-facing site and marketing artifacts. This glossary names project concepts, not implementation details.

## Language

**Teaser Landing Page**:
A temporary one-screen public page that introduces the visual direction and captures email interest before the full website is ready. It has no navigation and no scroll-driven content structure.
_Avoid_: Teasing page, temporary homepage

**Jukkai Updates**:
A lightweight, low-frequency email promise for people who want news about Jukkai's opening and the first life of the place. It can continue as occasional place news, but it is not a broad newsletter unless a later consent moment says so.
_Avoid_: Opening updates, newsletter

**Full Website**:
The complete public Jukkai website that will replace the teaser landing page when the broader content, navigation, and conversion paths are ready.
_Avoid_: Real website

**Jukkai Proper**:
The client-facing Jukkai product and public website, distinct from the archived Jukkai Atelier tooling.
_Avoid_: Real Jukkai

**Modular Monolith**:
One deployable backend application with internal modules for distinct product areas. Jukkai uses this shape to avoid premature microservices while keeping lead capture, content operations, client portal, and practice console code from blending together.
_Avoid_: Tiny API that just grows, microservices

**Portal**:
The future authenticated Jukkai frontend for client project access and practice-console workflows. It is expected to be separate from the public marketing site, but it is not scaffolded yet.
_Avoid_: Dashboard, CRM

**Master**:
The original, highest-fidelity source file for an image, kept in durable storage (Garage S3) outside the site repository. Masters are archival, never edited in place, and never served to browsers directly.
_Avoid_: Original, raw, source image

**Derivative**:
A web-ready image variant, at a specific format and width, generated from a Master and served as a static asset on the marketing site. Derivatives are disposable and always reproducible from their Master.
_Avoid_: Optimized image, resized copy, thumbnail (a thumbnail is one Derivative, not the category)

**Content Image**:
An image an editor will rotate without touching code, so it belongs to an editorial entity (a Project, an Artist, a team member) and is described in that entity's collection or record: alt text, focal point, ordering, and its Master reference. Distinct from a Design Asset.
_Avoid_: CMS image, dynamic image

**Design Asset**:
An image that is part of the site's composition rather than editorial content: decorative textures, section backgrounds, the baked hero field. It is placed in code by a developer, lives in the app's assets, and is never rotated by an editor. Distinct from a Content Image.
_Avoid_: Static image, decorative asset (too narrow)

**Publication**:
An immutable snapshot of the marketing site's published editorial truth at one moment, produced when an editor presses Publish in the Portal. The Astro build consumes a Publication so a build is reproducible and a mid-edit cannot produce a half-updated site.
_Avoid_: Release, deploy, version

**Publisher**:
The background process that turns a Publication plus its Masters into a deployed marketing site: it freezes the Publication, generates Derivatives, runs the Astro build, and deploys to Cloudflare Pages. It runs at publish time, never on a visitor request, and is distinct from the Portal, which only triggers it.
_Avoid_: Build script, deploy pipeline, CMS
