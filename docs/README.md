# Documentation

This folder is organized by how the docs are used.

## Current working docs

- `strategy/` - canonical business truth and unresolved client questions.
- `operations/` - process, CI, and delivery notes. Start here for how the project
  is run.
- `adr/` - architecture decision records. Start here before changing deployment,
  backend, or cross-cutting product decisions.
- `agents/` - repo-local instructions for coding agents.
- `working-notes/` - provisional captures that make a session resumable without
  turning it into project truth.

## Inputs and evidence

- `source-material/` - frozen source docs imported from the previous project.
- `reference/` - bulky reference crawls and inventories. Load only when a task
  needs that raw evidence.
- `research/` - current investigation artifacts and evidence maps.
- `archive/` - superseded material retained for provenance. Do not load it as a
  current input unless the task explicitly calls for historical comparison.

## Main files

- `strategy/foundation.md` - canonical marketing truth.
- `strategy/questions-for-crystelle.md` - unresolved business/content questions,
  bucketed by what they block.
- `operations/method.md` - how the marketing docs are produced phase by phase.
- `operations/ci.md` - pull request and branch protection policy.
- `operations/fonts.md` - the retained generated-font pipeline contract.
