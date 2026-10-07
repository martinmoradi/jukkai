# Mail and calendar setup

**Status:** proposed for [#136](https://github.com/martinmoradi/jukkai/issues/136).
These are Martin's decisions from the 2026-10-07 design session. Crystelle and Laura
have not reviewed them; they see the result on the office day.
**Owns:** the target Google Workspace setup: addresses, groups, sorting, access,
administration and calendar.
**Last reviewed:** 2026-10-07, design only. Nothing is live beyond Crystelle's user
and the `admin@` alias.
**Revisit when:** the setup is live (then record what was actually configured), a
person or intern joins, or at the OVH renewal for `studioterrasson.fr` (about 2029).

How to get there: [migration runbook](mail-migration-runbook.md). Why: [design
record](../working-notes/mail-setup-design.md) and [Workspace
research](../research/google-workspace-mail-transition.md).

## Principles

- **Relationships use personal addresses; systems and the public use functional
  ones.** Artists, clients and partners write to a person. Accounts, first contact
  and interns go to shared addresses, which are sorted automatically.
- **Sorted by the receiving address, not by discipline.** Filters keyed on the
  address do not go stale; sender-based filters do. Every label is fed by a filter
  or is explicitly manual.
- **Google's own apps everywhere.** Gmail on the web and on iPhone and iPad; no
  Thunderbird or Apple Mail for work mail.
- **Native features only.** Nothing custom that needs Martin when it breaks.

## Accounts and addresses

Two paid users (Business Starter at the time of writing). Groups and aliases are free.

| Address               | Type                    | Receives              | Sends as it      |
| --------------------- | ----------------------- | --------------------- | ---------------- |
| `crystelle@jukkai.fr` | Paid user               | Crystelle             | Crystelle        |
| `laura@jukkai.fr`     | Paid user               | Laura                 | Laura            |
| `admin@jukkai.fr`     | Group                   | Crystelle, Laura      | Crystelle, Laura |
| `info@jukkai.fr`      | Group                   | Crystelle, Laura      | Crystelle, Laura |
| `etudes@jukkai.fr`    | Group, managed by Laura | Laura, current intern | Laura            |
| `martin@jukkai.fr`    | Free admin (no Gmail)   | —                     | —                |

- **Aliases:** `ct@jukkai.fr` on Crystelle (her artist address so far), typo aliases
  such as `christelle@`, `lc@jukkai.fr` on Laura.
- **`admin@`:** every software and vendor account used by both or by the practice,
  every subscription owner and every invoice. A login used by one person lives on
  that person's address.
- **`info@`:** public first contact: website enquiries, Calendly, internship
  applications, supplier marketing.
- **`etudes@`:** the intern's personal address is an external member and receives
  supplier replies. Laura sends on the intern's behalf, as `etudes@`.
- **No `galerie@`** (too cold for artists) and no `contact@`.

## Studio Terrasson addresses

`studioterrasson.fr` is a secondary domain, receive-only. Everyone sends from
`jukkai.fr`.

| Old address                 | Delivered to    |
| --------------------------- | --------------- |
| `ct@studioterrasson.fr`     | Crystelle       |
| `lc@studioterrasson.fr`     | Laura           |
| `info@studioterrasson.fr`   | `info@` group   |
| `etudes@studioterrasson.fr` | `etudes@` group |

Mail arriving there is labelled "Ancienne adresse" so senders can be updated over
time. Revisit at the OVH package renewal (about three years from 2026).

## Sorting

Shared filters for both mailboxes (exported and imported as XML):

| Label            | Filter                                                    | Inbox                     |
| ---------------- | --------------------------------------------------------- | ------------------------- |
| Admin & factures | `deliveredto:admin@jukkai.fr`                             | Stays, Primary, important |
| Contact          | `deliveredto:info@jukkai.fr` or `info@studioterrasson.fr` | Stays, Primary            |
| Ancienne adresse | `deliveredto:` any `studioterrasson.fr` address           | Stays                     |

Gmail notifies only for the Primary category, so the Admin and Contact filters force
Primary: verification codes must not land in Updates.

**Crystelle** adds: CREAD (school domain or forward, automatic), Galerie (automatic
for `ct@jukkai.fr`; new artists by hand or "Filter messages like these"),
Architecture (manual) and Archives Studio Terrasson (import). Deliberately short;
expand once she is used to labels.

**Laura** keeps her folder method: mail arrives in the inbox and she uses "Move to"
`Clients/<nom>`. Finished projects move under "Clients archivés". Per-client filters
that label but keep mail in the inbox are offered, not imposed. Use `Clients/<nom>`
consistently: a future CRM would build on it.

## Access and privacy

- Crystelle has no standing access to Laura's mailbox. Laura sets an out-of-office
  reply when away, and grants Gmail delegation herself for a long absence, then
  revokes it.
- Resetting Laura's password is a break-glass admin action only.
- Running AI tools over a mailbox needs its owner's agreement.

## Administration

- Super admins: Crystelle's account and `martin@jukkai.fr` (Cloud Identity Free).
  Both use 2-step verification with phone prompts; backup codes live in Bitwarden.
- Martin's account exists mainly so Crystelle's own account can always be
  recovered.
- Interns never need an admin: Laura manages `etudes@` membership.
- An intern who needs to send from Jukkai would need a temporary paid user, only on
  the Flexible plan. Not planned.

## Calendar

Karlia stays the source of truth. Each person's Karlia calendar syncs two-way with
Google Calendar, so the iPhone and iPad calendars show appointments through the
Google account. Calendly stays connected to Karlia only. Replacing Karlia is a
separate question.

## Parked

- An internal sending form for interns, as a future portal feature.
- A CRM linked to Gmail labels, where "tagged = shared with the practice, untagged
  = private". Check first what Karlia's own Google Workspace mail connector does.

See the [design record](../working-notes/mail-setup-design.md#parked) for both.
