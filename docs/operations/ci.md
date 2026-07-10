# CI

Jukkai uses one pull-request workflow for the merge gate on `main`.

## Trigger Policy

- The workflow runs only for pull requests targeting `main`.
- Draft pull requests do not run jobs. CI starts when a PR is opened as ready,
  marked ready for review, reopened, or updated while ready for review.
- Heavy jobs run only when code-affecting files change. Docs-only PRs get the
  cheap `ci / changes` classifier plus the aggregate `ci / required` check.

The workflow intentionally avoids `paths-ignore` at the workflow trigger level.
Required GitHub checks can remain pending when a workflow is skipped before it
creates the required status. The small classifier job keeps docs-only PRs cheap
while still giving branch protection a stable required check.

## Jobs

- `ci / format`: Prettier check for root config, app code, and workflow files.
- `ci / lint`: actionlint for GitHub Actions workflow files, then ESLint plus
  Stylelint through Turbo.
- `ci / typecheck`: Astro type checking through Turbo.
- `ci / unit tests`: Vitest through Turbo.
- `ci / build`: Astro static build through Turbo.
- `ci / required`: Stable branch-protection gate.

After issue #72, the Astro workspace intentionally builds zero pages. The build
job remains active so the retained toolchain and generated-font preflight cannot
drift while the content pipeline is rebuilt.

Each job restores Bun's package cache and `.turbo/cache`. The cache keys are
job-specific to avoid parallel cache write conflicts, with broad restore keys so
tasks can still reuse previous Turbo artifacts.

The lint job downloads `actionlint` from the official project script before it
installs Bun dependencies. That keeps workflow validation cheap and lets broken
CI YAML fail before spending time on application setup.

## Branch Protection

Protect `main` with:

- Require a pull request before merging.
- Require status checks to pass before merging.
- Require branches to be up to date before merging.
- Required check: `ci / required`.
- Require linear history.
- Block force pushes.
- Block branch deletion.

For a single-operator repo, requiring a pull request with zero mandatory
approvals is a good starting point. Add one required approval and stale-review
dismissal once someone else regularly reviews product changes.

## Playwright

Do not put Playwright in the required gate yet.

For the Astro workspace, `astro build`, Astro type checking, unit tests, ESLint,
Stylelint, and formatting catch the valuable early failures without spending CI
minutes on browser provisioning. Add Playwright when the rebuilt site has real
navigation, forms, CMS data, or production-critical visual states.

When it is added, start with a narrow Chromium smoke suite in a separate job:
home page renders, primary navigation works, and one representative content page
loads from the static build. Keep it out of the required gate until it is stable
and fast.
