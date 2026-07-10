# Jukkai

Bun + Turborepo workspace for the Jukkai product repo.

`apps/marketing` retains the configured Astro frontend toolchain but intentionally
contains no pages after the July 2026 exploration reset. Current work is rebuilding
the research and content pipeline before a new frontend implementation begins.

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
