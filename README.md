# Jukkai

Jukkai by Crystelle Terrasson brings together the interior-architecture practice,
Galerie, and place in Châteaugiron. This Bun + Turborepo repo currently delivers
the static Astro website.

Start with [current delivery](docs/operations/current-delivery.md): a polished
first website for the September magazine release, then content and transition
work toward the October opening. The practice has already moved. No teaser or
full-stack project is on the active delivery path.

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
Use the [documentation map](docs/README.md) for task-specific reading routes.
Provisional website plans and copy live in
[website working notes](docs/working-notes/website/README.md).
