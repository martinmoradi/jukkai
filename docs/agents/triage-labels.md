# Triage Labels

The skills speak in terms of canonical triage roles. This file maps those roles
to the actual label strings used in this repo's GitHub issue tracker.

Labels are a handoff contract for Martin and agents. GitHub Projects can own
kanban status, grouping, and priority; labels should answer what kind of handoff
an issue represents.

## Canonical Skill Labels

| Label in mattpocock/skills | Label in our tracker | Meaning                                                            |
| -------------------------- | -------------------- | ------------------------------------------------------------------ |
| `needs-triage`             | `needs-triage`       | Raw captured issue; Martin or an agent still needs to classify it  |
| `needs-info`               | `needs-info`         | Waiting on the reporter or source context                          |
| `ready-for-agent`          | `ready-for-agent`    | Safe for Martin to paste into an agent thread and let it run AFK   |
| `ready-for-human`          | `ready-for-human`    | Martin judgment, review, approval, or selection is the main action |
| `wontfix`                  | `wontfix`            | Will not be actioned                                               |

When a skill mentions a role, use the corresponding label string from this
table.

## Jukkai Workflow Labels

| Label                        | Meaning                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------- |
| `prd`                        | Parent/spec/roadmap issue. PRDs do not get readiness labels by default                      |
| `ready-for-supervised-agent` | Safe for Martin to paste into an agent thread, but the agent must stop at named human gates |
| `deferred`                   | Valid and understood, but intentionally not a current paste-into-agent item                 |

## Gate Labels

Gate labels explain why Martin must stay involved. They can appear on either
`ready-for-supervised-agent` or `ready-for-human` issues.

| Label           | Meaning                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| `gate:approval` | Product, taste, architecture, or operator judgment is required                                              |
| `gate:secrets`  | Credentials, tokens, private env vars, or account secrets are involved                                      |
| `gate:prod`     | Live production deployment, production branch movement, production data, or public availability is involved |

## Area Labels

Area labels are lightweight filters for implementation slices. Prefer one area,
but use multiple when the implementation genuinely crosses ownership boundaries.
Do not add area labels to broad PRD issues by default.

| Label            | Meaning                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| `area:marketing` | Astro marketing site, homepage, teaser page, SEO, or visual implementation                                         |
| `area:api`       | Jukkai Proper backend code, API contracts, data model, or service behavior                                         |
| `area:ops`       | Cloudflare, Coolify, production branches, databases, secrets, observability, release checks, or operator workflows |

## Skill Labels

| Label       | Meaning                                                             |
| ----------- | ------------------------------------------------------------------- |
| `skill:tdd` | Use the TDD skill: red-green-refactor through public behavior tests |

Apply `skill:tdd` when a slice can be driven by public behavior tests before
implementation. This is especially expected for API behavior, data contracts,
validation, route handling, generated artifacts, promotion probes, and other
workflow code with observable outputs. Do not add it to pure design review,
manual approval, or one-off production operation issues.

## Publishing Issues From `to-issues`

- While drafting slices, decide whether each implementation slice is
  red-green-friendly. Add `skill:tdd` when public behavior tests can lead the
  work.
- AFK slice: add `ready-for-agent` plus relevant `area:*` and `skill:*` labels.
- HITL slice where an agent can prepare or implement before a human checkpoint:
  add `ready-for-supervised-agent` plus relevant `gate:*` and `skill:*` labels.
- HITL slice where the main action is Martin judgment, review, approval, or
  selection: add `ready-for-human` plus `gate:approval`.
- Parent/spec/roadmap issue: add `prd`; do not add readiness labels by default.
- Valid but intentionally later issue: add `deferred`.

Do not close or relabel parent PRD issues when publishing child slices unless
Martin explicitly asks.
