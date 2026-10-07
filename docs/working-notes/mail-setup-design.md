# Mail setup design — working record

**Status:** session record (issue #136, 2026-10-07). The proposal it produced is
[mail setup](../operations/mail.md) with its [runbook](../operations/mail-migration-runbook.md);
those win where they differ.
**Useful for:** resuming the session and drafting the setup and migration proposal.
**Not:** an approved plan. Decisions below are Martin's working decisions; Crystelle
and Laura have not reviewed the proposal yet.
**Revisit when:** the proposal is drafted, or after the account inventory.

Inputs: [meeting notes, 5 October](mail-calendar-meeting-2026-10-05.md) and
[Workspace research](../research/google-workspace-mail-transition.md).

## Problem framing (Martin's observation, agent interpretation)

The current setup "works" but is tolerated rather than good, especially for
Crystelle: too many places (Thunderbird, OVH webmail, iPad Mail, several accounts),
unreliable IMAP sync and sending on devices, and an inbox full of advertising.
One Google account per person, used through Gmail on every device, should remove
the first two by construction; categories and filters address the third.
Organisation (labels, automatic sorting) is a quality-of-life layer on top.

**Hard requirement (theirs):** an easy shared view of important mail, such as an
Autodesk 2FA code while Crystelle is away or a password reset Laura needs.

## Working decisions (Martin, 2026-10-07)

- **Two paid users** (Crystelle, Laura). A small loss in shared sent history is
  accepted rather than a third licence.
- **Two shared addresses as free Google Groups, both delivered to Crystelle and
  Laura:**
  - `admin@` — software and vendor accounts (Autodesk, Adobe…), password resets,
    codes and invoices. Quiet and high-signal.
  - `info@` — public first contact: website enquiries, Calendly, applications,
    supplier marketing and catalogues.
  - Suppliers get no shared address; they write to whoever they work with.
- **Interns:** free setup. The intern's personal address is an external member of
  `etudes@` (receives supplier replies). To send, the intern drafts and Laura sends
  **as `etudes@`** so replies return to the group.
- **Absence cover for `laura@`:** no standing access for Crystelle (she confirmed
  she does not need Laura's day-to-day mail). Default is Laura's out-of-office
  reply; for a long absence Laura grants Gmail delegation herself and revokes it on
  return. Admin password reset remains a break-glass route only.
- **Studio Terrasson addresses keep receiving, receive-only.** `studioterrasson.fr`
  joins Workspace (secondary domain) with each old address attached to its new
  owner (`ct@` → Crystelle, `lc@` → Laura, `info@`/`etudes@` → the groups). A filter
  labels mail arriving there "ancienne adresse" so senders can be updated over
  time. Everyone sends from Jukkai. Crystelle recently renewed the OVH package
  (about three years, mail included); revisit sunsetting at that renewal, possibly
  dropping to a domain-only offer once the old website is a redirect.
- **All old mail is imported.** Google's data import reads OVH over IMAP (no manual
  export), keeps dates and read status, and turns folders into labels. `ct@` goes
  into Crystelle's account, `lc@` into Laura's. Shared-mailbox history goes under
  archive labels: old `info@` into Crystelle's account, old `etudes@` into Laura's.
  A delta import after the cutover catches late arrivals.
- **Gmail everywhere.** Gmail web installed as an app on office computers, the
  Gmail app on iPhone and iPad. Thunderbird and Apple Mail are removed for work
  mail after the migration (Thunderbird may first be needed to upload local
  folders). Personal and work accounts get clearly different avatars.
- **Crystelle's starting labels:** Admin & factures (auto, `admin@`), Contact
  (auto, `info@`), CREAD (auto), Galerie (partly auto), Architecture (manual),
  Ancienne adresse (auto), Archives Studio Terrasson (import). Rules sort whatever
  they can; manual labelling is optional. Deliberately short: expand once she is
  used to labels. Laura keeps her own folder structure, plus the same automatic
  labels for the shared addresses.
- **Administration:** Martin gets a free `martin@jukkai.fr` account (Cloud
  Identity Free, no Gmail) as a second super admin; Crystelle's account stays super
  admin. Main reason: recovering Crystelle's own account if she is locked out.
  Workspace admin roles cannot go to an outside Google account (agent knowledge,
  not in the research file). Both admins use 2-step verification with backup codes
  stored off their phones. Laura manages the `etudes@` group so interns never need
  an admin. **Test first:** that a Cloud Identity Free user can be full super admin
  inside the Workspace organisation (unverified); fallback is administering through
  Crystelle's account with stored backup codes.
- **Cutover: one on-site day for both.** Everything else is prepared beforehand
  without disruption (admin account, groups, Laura's account, `studioterrasson.fr`
  verified, first full import). On the day: MX change, delta import, device setup,
  then training. MX switches per domain, so phasing per person would mean
  temporary forwards and mixed state. `jukkai.fr` can switch earlier. Rehearse
  beforehand: import on one mailbox, the admin account, and a real code sent to
  `admin@` to check group spam settings. Date open; avoid a busy week.
- **Account rule:** a login shared by both (some software is shared by choice) and
  every subscription owner, billing contact and practice-wide tool live on
  `admin@`, so codes and resets reach whoever is at the office. A login used by one
  person lives on that person's address. Re-register critical accounts before or on
  the day (Calendly, Karlia, Autodesk, Adobe, bank and tax portals if tied to an
  old address); the rest as they appear under "ancienne adresse".

- **Personal addresses `crystelle@` and `laura@`** (confirmed by Martin), keeping
  `ct@`/`lc@` as aliases, plus typo aliases such as `christelle@`.
- **Principle: relationships use personal addresses, systems and the public use
  functional ones.** Artists, clients and partners write to `crystelle@`/`laura@`;
  `admin@`, `info@` and `etudes@` handle accounts, first contact and interns, and
  are the addresses sorted automatically. Filters keyed on the receiving address
  do not go stale; sender-based filters do.
- **No `galerie@` address** (too cold for artist relationships). `ct@jukkai.fr`,
  used so far only for artists, stays an alias and feeds the Galerie label while
  existing artist threads continue there; new artists get `crystelle@` and are
  labelled manually or with "Filter messages like these".
- **Website shows `info@` on `/contact/`, `crystelle@` on her card and vCard.**
  Small website change, shipped after the cutover day (`ct@` keeps working).
- **Laura files by hand as today** ("Move to" = her folder gesture; her OVH
  folders import as nested labels, finished projects move under "Clients
  archivés" or are hidden). Offer, not impose: per-client filters that label but
  keep mail in the inbox. Avoid filters that skip the inbox for client mail.
- **Calendar joins the switch day, without replacing Karlia.** Karlia stays the
  source of truth; each person's Karlia calendar syncs two-way with Google
  Calendar so the iPhone/iPad calendar shows appointments through the Google
  account. Calendly stays connected to Karlia only (no direct Google link, to
  avoid duplicates). **Test first** with one account: plan includes sync, two-way
  without duplicates, categories and private appointments. If it fails, the
  calendar waits for the Karlia decision. Two-way sync and a Google Workspace mail
  connector are Karlia's own marketing claims, unverified on their plan; the mail
  connector is relevant to the build-or-configure question for the CRM.
- **Telling people.** From the switch day, a temporary signature line (3–6
  months) announces the new address. One announcement email to active contacts
  (clients, regular contractors and suppliers, accountant, bank, CREAD) is
  delayed to the "real Jukkai day", once the website is complete, and doubles as
  the opening announcement: continuation, not closure. Martin or the agent drafts;
  Crystelle approves the content. Places showing old addresses (Studio Terrasson
  site, Google Business Profile, quote and invoice templates, Instagram,
  directories, cards) are updated with track 1 or at reprint. No auto-reply on old
  addresses (noise, loops with automated senders).
- **Account hunt via Bitwarden.** Search "studioterrasson" for the full list. Change
  only critical accounts before or on the day (bank, tax, URSSAF, insurance, OVH,
  Google, Apple ID, Autodesk, Adobe, Karlia, Calendly); the rest lazily as they
  surface under "Ancienne adresse". If the agent helps sort, export names,
  usernames and URLs only, never passwords.
- **Runbook in three phases.** A: remote prep from Martin's machine once his super
  admin exists (creating it needs Crystelle's account once, at home). B: the
  office day, only what needs them or their devices. C: afterwards (website change,
  lazy account updates, signature transition line removed after 3–6 months,
  announcement on the Jukkai day, review at OVH renewal).
- **Extras, all in the runbook:** Jukkai logo in Gmail (admin console), display
  names ("Crystelle Terrasson · Jukkai", "Jukkai" for `info@`), profile photos,
  label colours (suggest on the day, with how-to), reply templates (internship
  applications, quote requests, suppliers), 30-second undo send and scheduled
  send, tuned notifications, tidy phone home screens, 2-step verification by phone
  prompt with backup codes in Bitwarden, remote sign-out for lost devices.
  Signatures designed with brand assets; signature images hosted on jukkai.fr at a
  stable path.
- **No pre-visit check-in.** Martin finishes the design, asks only what the design
  shows is missing, then sets a date in the office. Crystelle sees the labels in the
  Gmail UI on the day; AI cleanup is optional, done from the office.

## Tentative preferences (not yet decided)

- Crystelle's personal Gmail stays a separate account, available in the same apps.

## Provisional ideas

- **AI-assisted cleanup of imported archives** through a Gmail connector: bulk
  removal of advertising (old `info@`, Crystelle's mailbox) and sorting into the
  label set above. Crystelle's mailbox only with her agreement; Laura's only if she
  asks (her own system, client data). Labels first, so filters keep the result tidy.

## Parked

- **CRM ↔ Gmail integration (future portal, replaces Karlia only if decided).**
  Agent orientation from general knowledge, not researched: the Gmail API can
  create and apply labels, search, read threads and receive new-mail push
  notifications; an internal app in the Workspace organisation avoids Google's
  app verification. The CRM could own the client → contacts → project mapping
  that Gmail filters cannot, auto-label contractor and supplier mail per project,
  learn from labels applied by hand, and show a Gmail sidebar card. Store thread
  references, not copies. Access to Laura's mailbox needs her agreement. To keep
  the door open now: consistent label names (`Clients/<name>`).
  Martin's intent (2026-10-07): the CRM is the project's record and source of
  history, not an automatic sorter (contractors work across many projects).
  Creating a lead or client creates the label in both mailboxes; threads tagged by
  hand become part of the project history. **Sharing rule: tagged = shared with the
  practice, untagged = private.** Gmail scopes cannot be limited to a label, so the
  app can technically read the whole mailbox; the CRM only ingests and exposes
  tagged threads. Explain this to Laura before connecting her mailbox; nothing to
  announce now.

- **Internal sending form for interns** on jukkai.fr (sends as `etudes@` through a
  transactional provider, behind Cloudflare Access, BCC to `etudes@`). Legitimate
  and workable, but it is the first server-side piece of the site. Candidate feature
  for the future Jukkai portal; build only if Crystelle and Laura ask for it.
- Rejected workarounds, for the record: forwarding (fixed destination, keeps the
  original sender), Apps Script relay in Laura's account and logging the intern's
  workstation into Laura's account (fragile, exposes her mailbox, likely against
  licence terms).

## Onboarding checklist (do not forget)

- Show Laura how to grant and revoke Gmail delegation to Crystelle, and how to set
  her out-of-office reply.
- Prepare the training part of the day: a short French guide per person.
- Show Laura how to send as `etudes@` (and both of them as `info@`/`admin@`).

## Facts to check in the accounts

- Workspace edition and plan (Flexible or Annual) and who holds super admin.
- `admin@` is currently Crystelle's user alias; it is a reserved word, so it must
  be removed from her account and created as a group's primary address in the
  Admin console.
- Size of each OVH mailbox (Starter gives 30 GB per user; Crystelle absorbs `ct@`
  plus old `info@`).
- Whether Crystelle's Thunderbird holds local-only mail (Local Folders or POP).
  The import only sees server mail; local folders must be dragged into the Gmail
  account from Thunderbird.
- See the research file's final section for the full inventory list.

## Open

- Migration order and cutover (the MX change ends delivery to OVH mailboxes).
- Date. Replacing Karlia stays a separate question.
