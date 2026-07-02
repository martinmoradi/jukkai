# Build-Time Generated Font Assets

Jukkai consumes fonts through pinned `@mm/fonts` Set versions that are materialized into generated build assets before local development, preview, or production builds. `@mm/fonts` remains the source of truth; Jukkai serves the generated font files from Jukkai-owned assets and does not commit font binaries or fetch private registry font bytes from the browser at runtime.

This keeps font selection explicit through Set version bumps, keeps registry credentials in local or deployment secret stores, and lets the public site behave like a normal self-hosted static asset consumer.
