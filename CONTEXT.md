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
