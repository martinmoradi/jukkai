# Jukkai

Jukkai's shared language for public-facing site and marketing artifacts. This glossary names project concepts, not implementation details.

## Language

**Teaser Landing Page** _(retired)_:
A temporary one-screen public page that was planned to precede the full website. It was never built — the website ships directly (ADR-0005). The term survives in older issues and documents as provenance only.
_Avoid_: Teasing page, temporary homepage

**Contact Card Page**:
A small public page that is the target of a printed QR code on a person's business card, offering their contact details and a save-to-contacts action. Its printed pointer path is permanent once cards exist; only the redirect target behind it may change.
_Avoid_: Digital business card, profile page

**Jukkai Updates** _(outside current delivery scope)_:
A lightweight, low-frequency email promise for people who want news about Jukkai's opening and the first life of the place. It can continue as occasional place news, but it is not a broad newsletter unless a later consent moment says so.
_Avoid_: Opening updates, newsletter

**Full Website**:
The public Jukkai website across its successive releases. Its first release can contain only a subset of the eventual pages; the name does not imply a completeness gate.
_Avoid_: Real website

**Jukkai Proper**:
The client-facing Jukkai product and public website, distinct from the archived Jukkai Atelier tooling.
_Avoid_: Real Jukkai

**Modular Monolith** _(historical backend direction; inactive)_:
One deployable backend application with internal modules for distinct product areas. Earlier backend planning proposed this shape; a future full-stack effort must reassess it.
_Avoid_: Tiny API that just grows, microservices

**Portal** _(future, outside current delivery scope)_:
The future authenticated Jukkai frontend for client project access and practice-console workflows. It is expected to be separate from the public marketing site, but it is not scaffolded yet.
_Avoid_: Dashboard, CRM

**Master**:
The original, highest-fidelity archival source of a content image, from which web variants can be reproduced. This content-image term is distinct from the editable identity and print masters in the brand workspace.
_Avoid_: Original, raw, source image

**Derivative**:
A web-ready image variant, at a specific format and width, generated from a Master and served as a static asset on the marketing site. Derivatives are disposable and always reproducible from their Master.
_Avoid_: Optimized image, resized copy, thumbnail (a thumbnail is one Derivative, not the category)

**Content Image** _(editorial concept; editor workflow deferred)_:
An image that describes an editorial subject, such as a project, artist or team member, rather than the site's decorative composition. A code-free editing workflow is future scope.
_Avoid_: CMS image, dynamic image

**Design Asset**:
An image that is part of the site's composition rather than editorial content: decorative textures, section backgrounds, the baked hero field. It is placed in code by a developer, lives in the app's assets, and is never rotated by an editor. Distinct from a Content Image.
_Avoid_: Static image, decorative asset (too narrow)

**Publication** _(historical publishing proposal; inactive)_:
An immutable snapshot of editorial content proposed for a future publishing workflow. It does not describe an implemented publishing system.
_Avoid_: Release, deploy, version

**Publisher** _(historical publishing proposal; inactive)_:
The proposed process that would turn a Publication and its images into a published site. This future concept is distinct from publishing the current website through its normal release process.
_Avoid_: Build script, deploy pipeline, CMS
