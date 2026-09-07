# Jukkai

Bun + Turborepo workspace for the Jukkai product repo.

`apps/marketing` contains the Astro frontend and Crystelle’s Contact Card Page
at `/contact/crystelle/`. See the short
[contact details and portrait editing guide](docs/operations/crystelle-contact-card.md).

## Commands

```sh
bun install
bun run dev:marketing
bun run check
bun run build
```

The marketing workspace uses Astro with Vite, CSS Modules, Astro type checking,
ESLint, Stylelint, Prettier, Vitest, Husky, and lint-staged. The generated-font
pipeline is retained under `scripts/` and documented in
`docs/operations/fonts.md`.

Shareable identity masters and their supporting source files live in `brand/`.
Provisional session captures live in `docs/working-notes/`.
