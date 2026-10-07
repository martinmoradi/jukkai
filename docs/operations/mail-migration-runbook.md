# Mail migration runbook

**Status:** proposed for [#136](https://github.com/martinmoradi/jukkai/issues/136);
not started. Target state: [mail setup](mail.md).
**Owns:** the one-off move from OVH (`studioterrasson.fr`) to Google Workspace
(`jukkai.fr`), in three phases.
**Last reviewed:** 2026-10-07, before any step was run.
**Revisit when:** a step fails or Google changes a screen; once Phase C ends, this
becomes provenance and [mail setup](mail.md) records what is live.

Steps that cite nothing are sourced in the [Workspace
research](../research/google-workspace-mail-transition.md) or link their source;
screen paths were checked on 2026-10-07. **Unverified** marks what no Google page
confirms: test it rather than rely on it.

## Before anything: facts to collect

- [ ] Workspace edition, plan (Flexible or Annual) and renewal date: Admin console →
      Billing.
- [ ] Who holds super admin today (presumably Crystelle's account).
- [ ] DNS host for each domain. `jukkai.fr` is on Cloudflare
      ([production](production.md)); `studioterrasson.fr` is presumably on OVH.
- [ ] OVH mail offer (MX Plan, Email Pro, Exchange or Zimbra) and IMAP host; size of
      each mailbox (`ct`, `lc`, `info`, `etudes`, `contact`) in the OVH manager.
      Starter gives 30 GB per user; Crystelle absorbs `ct` plus old `info`.
- [ ] Passwords for each OVH mailbox (needed by the import).
- [ ] Whether Crystelle's Thunderbird keeps mail only locally ("Local Folders" or a
      POP account). The import only sees server mail.
- [ ] Bitwarden: search `studioterrasson` to list accounts tied to old addresses;
      mark each as shared (→ `admin@`) or personal (→ `crystelle@`/`laura@`). If an
      agent helps sort, export names, usernames and URLs only, never passwords.
- [ ] The CREAD forward: which address or domain it comes from (for the CREAD filter).
- [ ] Karlia: whether the plan includes Google Calendar sync.

## Phase A — remote preparation (Martin's machine)

Everything here runs while OVH keeps delivering mail as today.

### A1. Martin's admin account (needs Crystelle's account once, at home)

- [ ] Add Cloud Identity Free: Billing → Buy or upgrade → Cloud Identity → Cloud
      Identity Free → Get Started; keep "Switch off Auto-Assign" checked
      ([add licences](https://docs.cloud.google.com/identity/docs/how-to/add-cloud-identity-licenses)).
- [ ] Turn off automatic Workspace licensing, so new users get the free licence.
      From then on, assign Workspace licences by hand (Laura, in A3).
- [ ] Create `martin@jukkai.fr`, assign the Super Admin role, sign in, enrol 2-step
      verification and save backup codes in Martin's Bitwarden.
- [ ] **Test (unverified):** the Admin console works fully from
      `martin@`, including Data import and Billing. If not, fall back to Crystelle's
      account with her backup codes stored safely, and note it in [mail setup](mail.md).
- [ ] Crystelle's account: 2-step verification with phone prompts; backup codes in
      her Bitwarden.

### A2. `jukkai.fr` hygiene (Cloudflare DNS)

- [ ] Check MX, SPF (`v=spf1 include:_spf.google.com ~all`), DKIM and DMARC exist
      for `jukkai.fr`. Add what is missing: DKIM is generated in the Admin console
      (Apps → Gmail → Authenticate email); start DMARC at `p=none`. MX and TXT
      records are DNS-only in Cloudflare.

### A3. Users and groups

- [ ] Create `laura@jukkai.fr` and assign a Business licence; add the `lc@jukkai.fr`
      alias. Billing for her starts now.
- [ ] Groups org settings (Apps → Google Workspace → Groups for Business → Sharing
      settings): tick "Group owners can allow external members" **and** "Group
      owners can allow incoming email from outside the organization"; without the
      second, outside senders cannot reach the groups
      ([org policies](https://knowledge.workspace.google.com/admin/groups/set-organization-wide-policies-for-using-groups)).
- [ ] Remove the `admin@jukkai.fr` alias from Crystelle, then immediately create the
      `admin@jukkai.fr` group in the Admin console (reserved word: it cannot be
      created anywhere else or as an alias). Invoices sent in the gap may bounce;
      keep it to minutes.
- [ ] Create `info@jukkai.fr` and `etudes@jukkai.fr` groups.
- [ ] For each group, in the Admin console (Directory → Groups → the group): - Access settings: tick External on the "Who can post" row. - Group name: "Jukkai" for `info@`, "Jukkai · Admin", "Jukkai · Études"
      (Rename group). Recipients only see it in "X via Jukkai" rewrites; the From
      name on replies is the one set under Send mail as (A5). - Members added here get every email by default. - `etudes@`: Laura as Manager, and "Who can manage members" includes managers
      ([group details](https://knowledge.workspace.google.com/admin/groups/update-group-details),
      [add members](https://knowledge.workspace.google.com/admin/groups/add-or-invite-users-to-a-group)).
- [ ] For each group, at groups.google.com → Group settings → Posting policies (not
      in the Admin console): spam message handling = "Post suspicious messages to
      the group", so codes are never held
      ([group settings](https://support.google.com/groups/answer/2464926?hl=en)).
- [ ] Send a real verification-style mail from an outside address to `admin@` and
      `info@`; confirm it reaches both mailboxes.
- [ ] Workspace logo: Account → Account settings → Personalization → Select file to
      upload → Save. JPEG, PNG or GIF at exactly 320 × 132 px, uploaded from Chrome;
      up to 4 days to appear. Only people in the organisation see it, on a
      computer, never on mobile
      ([logo](https://knowledge.workspace.google.com/admin/getting-started/add-your-logo-to-google-workspace)). Export
      from `brand/logo/`.
- [ ] Profile photos: Directory → Users → the user → the avatar (JPEG or PNG, up to
      5 MB). An admin-set photo is visible inside the organisation only; for
      outside recipients to see Crystelle's portrait, she sets it herself in her
      Google Account with open visibility
      ([photos](https://knowledge.workspace.google.com/admin/users/add-or-change-a-users-profile-photo)). Portrait:
      `apps/marketing/src/assets/crystelle-contact-portrait.jpg`. Groups have no
      photo.

### A4. Old domain, added but not yet live

- [ ] Add `studioterrasson.fr` as a **secondary domain** (not a user alias domain)
      and verify ownership with the TXT record. Do **not** change MX and do **not**
      "Activate Gmail" yet.
- [ ] Then, from `crystelle@`, write to `lc@studioterrasson.fr` and confirm it still
      reaches OVH. Whether Google treats a verified but inactive domain as internal
      is **unverified**; if the test mail does not reach OVH, tell Crystelle and
      Laura not to write to old addresses from Gmail until the day.
- [ ] Do not create the old-address aliases yet (see B1).

### A5. Gmail settings (each mailbox; Martin signs in to Laura's account before handing it over)

- [ ] Rename Crystelle's primary address to `crystelle@jukkai.fr` (`ct@` stays as an
      alias); add typo aliases. Her current Thunderbird Jukkai account will need to
      sign in again: tell her, or do this on the evening before.
- [ ] Send mail as: add each shared address (`admin@`, `info@`, plus `etudes@` for
      Laura) and the personal aliases, with "Treat as an alias".
- [ ] Accounts tab, under Send mail as: "When replying to a message" → "Reply from
      the same address the message was sent to" (may already be the default).
      **Unverified:** no Google page documents it, and it is untested for group
      addresses. Test it; without it, the alias scheme loses half its value.
- [ ] Display names, e.g. "Crystelle Terrasson · Jukkai".
- [ ] Settings → See all settings → General → Undo Send: 30 seconds (the maximum);
      Advanced → Templates → Enable → Save Changes. Templates work on a computer
      only; a filter that sends a template may reply from the primary address, not
      the alias ([undo send](https://support.google.com/mail/answer/2819488?hl=en),
      [templates](https://support.google.com/mail/answer/14864208?hl=en)).
- [ ] Labels and filters per [mail setup](mail.md#sorting). Build them in Crystelle's
      account, export the shared ones as XML, import into Laura's. Admin and Contact
      filters: categorise as Primary, mark important, never skip the Inbox.
- [ ] Label colours: prepare a small palette; suggest it on the day (hover the label
      → ⋮ → Label color).
- [ ] Templates (French drafts for Crystelle to approve): internship application
      acknowledgement, quote request acknowledgement, supplier reply.
- [ ] Signatures: designed with brand assets; images hosted on jukkai.fr at a stable
      path (a small website PR, e.g. `public/email/`). Include the temporary line
      "Studio Terrasson devient Jukkai — nouvelle adresse : …".

### A6. Import rehearsal and first import

- [ ] Rehearse with `etudes@` (small): Data → Data import & export → Data import →
      IMAP, OVH host, mapped to Laura. Check labels, dates, read status and whether
      the source INBOX merged into her Inbox (unverified behaviour).
- [ ] 2–3 days before the day, run the full import: `ct` → Crystelle, `lc` → Laura,
      `info` → Crystelle, `etudes` → Laura. Exclude spam and trash.
- [ ] After each import, clean the merged Inbox: search the imported mail (e.g.
      `deliveredto:info@studioterrasson.fr`), apply "Archives Studio Terrasson/…"
      and archive. Agent proposal: Crystelle starts with an empty inbox (all imported
      mail archived); Laura chooses on the day what stays in hers.

### A7. Calendar rehearsal

- [ ] In one Karlia account, connect Google Calendar: two-way, no duplicates,
      categories and private ("autre") appointments come through acceptably. Do not
      connect Calendly to Google.
- [ ] If it works, plan Google Calendar sharing between Crystelle and Laura (see
      event details). If it fails, the calendar waits for the Karlia decision.

### A8. Materials for the day

- [ ] A one-page French guide each: inbox, labels, search, archive, sending from an
      alias, templates. Laura's page adds delegation, out-of-office and sending as
      `etudes@`.
- [ ] Bitwarden shortlist of critical accounts to re-register on the day.

## Phase B — the office day

Morning: switch and import. Midday: devices. Afternoon: training.

### B1. Switch `studioterrasson.fr`

- [ ] First, add the aliases: `ct@` → Crystelle, `lc@` → Laura; `info@` and
      `etudes@` as aliases of their groups. Google advises creating addresses before
      changing MX so mail reaching Google during propagation does not bounce
      ([MX changes](https://knowledge.workspace.google.com/admin/domains/avoid-issues-when-changing-mx-records)). If the
      console refuses them while the domain is inactive, add them right after the
      MX change.
- [ ] In the DNS zone (OVH, if it hosts it): one MX `smtp.google.com`, priority 1;
      remove the OVH MX records. OVH quotes 4–24 h propagation, Google up to 72 h.
- [ ] SPF: `v=spf1 include:_spf.google.com include:mx.ovh.com ~all` — keep OVH while
      the WordPress site may send mail through OVH.
- [ ] Admin console: activate Gmail for `studioterrasson.fr`.
- [ ] From an outside address, write to each old address; check arrival, the
      "Ancienne adresse" label and that the reply goes out from Jukkai.
- [ ] Run a delta import for each mailbox. During propagation some mail still lands
      at OVH; Phase C repeats the delta.

### B2. Devices

- [ ] Computers: Gmail installed as an app (Chrome ⋮ → Cast, save, and
      share → Install page as app…), one Chrome profile for
      Jukkai and another for personal mail, with different colours.
- [ ] Crystelle's local Thunderbird folders, if any: connect Thunderbird to her
      Google account (IMAP with OAuth) and drag them in. Then remove Thunderbird.
- [ ] iPhone and iPad: Gmail app with the Jukkai account (and Crystelle's personal
      Gmail, with a clearly different avatar). In iOS Settings, add the Google
      account for Calendar and Contacts only, Mail off. Remove the OVH accounts from
      Apple Mail.
- [ ] Test sending from each alias in the Gmail app on each device (unverified on
      mobile; on a computer it is the From line).
- [ ] Notifications: Primary only (the default); nothing for Promotions.
- [ ] Home screens: Gmail and Calendar in the dock.
- [ ] Karlia: connect each Karlia calendar to Google; check one appointment on the
      iPhone.
- [ ] 2-step verification on Laura's account with phone prompts; backup codes in her
      Bitwarden (or a sealed copy).

### B3. Accounts

- [ ] Re-register the critical accounts from the shortlist: bank, tax and URSSAF,
      insurance, OVH, Google, Apple ID (if on an old address), Autodesk, Adobe,
      Karlia, Calendly. Shared logins → `admin@`, personal ones → the person.

### B4. Training (both)

- [ ] Inbox, Primary/Promotions, labels and their colours, search, archive, "Move
      to", undo send, scheduled send, templates, choosing the From address.
- [ ] Crystelle: "Filter messages like these" for a new artist; label colours.
- [ ] Laura: grant and revoke delegation to Crystelle; out-of-office reply; sending
      for the intern as `etudes@`; managing `etudes@` members; optional per-client
      filters.
- [ ] Optional, with Crystelle's agreement: AI-assisted cleanup of her archives
      (advertising first), from the office.

## Phase C — afterwards

- [ ] D+2 or D+3: final delta import; check no new mail is arriving at OVH.
- [ ] D+3 or later: DKIM for `studioterrasson.fr` only if anything sends from it;
      DMARC `p=none` after SPF has settled.
- [ ] Website PR: `/contact/` shows `info@jukkai.fr` (wording such as "Écrire à
      l'atelier", to approve), Crystelle's card and vCard show `crystelle@jukkai.fr`
      ([contact-card guide](crystelle-contact-card.md)).
- [ ] Update old addresses on the Studio Terrasson site (track 1), Google Business
      Profile, quote and invoice templates, Instagram and directories.
- [ ] Ask the CREAD school to forward to `crystelle@jukkai.fr`, then adjust the
      filter.
- [ ] Remaining accounts: update each one as it surfaces under "Ancienne adresse".
- [ ] After 3–6 months: remove the transition line from signatures.
- [ ] On the "real Jukkai day" (website complete): the announcement email to active
      contacts, drafted by Martin or an agent and approved by Crystelle.
- [ ] Record in [mail setup](mail.md) what was actually configured, and close #136.
- [ ] At the OVH renewal (about 2029): decide whether old addresses are still
      needed; consider a domain-only offer once the old site is a redirect.

## Lost device or locked-out account

- Lost phone: Directory → Users → the user → reset the password, then Security →
  Sign-in cookies → Reset (cookies alone do not sign Gmail apps out). Then Devices →
  the phone → Wipe Account: removes the work account, keeps personal data. Business
  Starter has account wipe, not full device wipe
  ([sign out](https://knowledge.workspace.google.com/admin/devices/sign-a-user-out-of-a-managed-google-account),
  [wipe](https://knowledge.workspace.google.com/admin/devices/wipe-corporate-data-from-a-device)).
- Lost 2-step device: use a backup code, or the other super admin resets it.
- Crystelle locked out: Martin's super admin account recovers it. That is its
  reason to exist.
