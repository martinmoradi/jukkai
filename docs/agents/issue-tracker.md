# Issue tracker: GitHub

Issues and PRDs for this repo live as GitHub issues. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --comments`, filtering comments by `jq` and also fetching labels.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

Infer the repo from `git remote -v` - `gh` does this automatically when run inside a clone.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.

## Wayfinding operations

Use GitHub's native sub-issues and blocking relationships, not `Part of` or
`Blocked by` prose as the source of truth. The current map is
[Wayfinder map: plan the magazine release and October transition](https://github.com/martinmoradi/jukkai/issues/84).
Refer to issues by linked title in human-facing text.

- Map: `wayfinder:map` and `spec`, without an execution-readiness label.
- Decision children: one `wayfinder:grilling`, `wayfinder:prototype`,
  `wayfinder:research` or `wayfinder:task` label and the appropriate handoff label.
- Query children: `gh api --paginate repos/{owner}/{repo}/issues/MAP_NUMBER/sub_issues`.
  Keep the returned order when selecting the first available ticket.
- Query blockers: `gh api --paginate repos/{owner}/{repo}/issues/TICKET_NUMBER/dependencies/blocked_by`.
- Frontier: open children with no assignees and no open blockers. Closed blockers
  do not prevent work. Check each child's blockers; a label-only search is insufficient.
- Claim the chosen ticket first: `gh issue edit TICKET_NUMBER --add-assignee @me`.
  Re-read its assignees before beginning when other sessions may be active.
- Attach a child: obtain its numeric REST `id` with `gh api
repos/{owner}/{repo}/issues/CHILD_NUMBER --jq .id`, then POST to
  `repos/{owner}/{repo}/issues/MAP_NUMBER/sub_issues` with integer
  `sub_issue_id`. This is the database id, not the visible issue number or GraphQL id.
- Add a blocker: obtain the blocker's numeric REST `id`, then POST to
  `repos/{owner}/{repo}/issues/TICKET_NUMBER/dependencies/blocked_by` with integer
  `issue_id`. Use a JSON file with `gh api --method POST --input FILE` or typed `-F`.
- Remove an obsolete blocker with DELETE to
  `repos/{owner}/{repo}/issues/TICKET_NUMBER/dependencies/blocked_by/BLOCKER_ID`.
- Verify every relationship with a fresh GET. Create all issues before wiring
  dependencies. Do not use reassignment flags to steal an existing child silently.

Only add a blocker when work cannot proceed without its answer. The current map's
research scoping, page planning and transition planning can start independently;
there is no blanket research-before-design gate. Implementation work does not become
a Wayfinder decision merely because it relates to the map.

On resolution, record the answer in a comment, close the ticket, and append a named
link with a one-line gist to the map's Decisions so far. Out-of-scope closures use
`not planned`, with the reason and a link under Out of scope, not Decisions so far.
Keep unanswered questions open; charting a map does not resolve them.

For multiline issue/PR bodies and comments, write the exact Markdown to a temporary
file and pass `--body-file`. Read current bodies, labels, assignees and relationships
before editing; preserve unrelated updates and use native relationships for blockers.

API references: [sub-issues](https://docs.github.com/en/rest/issues/sub-issues),
[issue dependencies](https://docs.github.com/en/rest/issues/issue-dependencies).
