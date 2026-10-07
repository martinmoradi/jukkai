# Google Workspace mail transition: vendor facts

- **Status:** Research findings, not a decision. Vendor facts with sources. The
  [interpretation section](#implications-for-the-open-design-questions) is
  agent-authored and is labelled as such.
- **Date:** 2026-10-07 (sources read that day. Google Admin Help pages showed
  "Last updated 2026-10-07 UTC" unless another date is given).
- **Question:** What can Google Workspace, Gmail, Groups, OVHcloud and the
  devices actually do for moving Crystelle and Laura from OVH mail on
  `studioterrasson.fr` to two paid Workspace users on `jukkai.fr`? This covers
  shared addresses, unlicensed interns, absence cover, old addresses,
  migration, cutover and devices. Input to issue #136.
- **Owner:** Martin.
- **Revisit:** Before running the migration, or if Google changes editions,
  pricing, "Send mail as" or Groups behaviour. Several Gmail changes take
  effect in January 2027.
- **Evidence notes:** `support.google.com/a/answer/*` links now redirect to
  `knowledge.workspace.google.com`, and this file cites the redirect targets.
  OVHcloud help pages now redirect to `docs.ovhcloud.com`. The OVHcloud pages
  render client-side, so they were read through a summarising fetch tool. Their
  quotations are close but not character-exact. **Unverified** marks a claim
  that no primary source confirmed.

## Answers in brief

- **Groups are free and do not use a licence.** Groups for Business comes with
  every Workspace edition. An organisation has no stated cap on how many groups
  it can have. Each user can have up to 30 aliases and each group up to 30
  aliases, at no cost
  ([Groups FAQ](https://knowledge.workspace.google.com/admin/groups/groups-administrator-faq),
  [limits](https://knowledge.workspace.google.com/admin/groups/understand-groups-policies-and-limits),
  [user aliases](https://knowledge.workspace.google.com/admin/users/add-or-delete-an-alternate-email-address-email-alias),
  [group aliases](https://knowledge.workspace.google.com/admin/groups/give-a-group-an-additional-alias-address)).
- **Price in France, excluding VAT, per user per month.** With an annual
  commitment: Business Starter €6.80, Standard €13.60, Plus €21.10. Monthly
  (Flexible) prices in the page data are about €8.10, €16.20 and €25.30. Starter
  pools 30 GB per user. Only Business Plus includes Vault
  ([FR pricing](https://workspace.google.com/intl/fr/pricing.html),
  [compare Business editions](https://knowledge.workspace.google.com/admin/getting-started/editions/compare-business-editions)).
- **An alias belongs to one user; a group reaches several people.** Mail to an
  alias goes only to the owner's inbox. Mail to a group goes to every member,
  and members can be external (for example a personal Gmail address) once the
  admin allows it
  ([aliases](https://knowledge.workspace.google.com/admin/users/add-or-delete-an-alternate-email-address-email-alias),
  [org policies](https://knowledge.workspace.google.com/admin/groups/set-organization-wide-policies-for-using-groups)).
- **Sending from an alias needs a one-time setup.** It is not automatic. The
  user adds the address under Gmail "Send mail as" with "Treat as an alias".
  A licensed group member can also send as the group this way, provided the
  group accepts posts from "Anyone on the web"
  ([aliases](https://knowledge.workspace.google.com/admin/users/add-or-delete-an-alternate-email-address-email-alias),
  [Send mail as](https://support.google.com/mail/answer/22370?hl=en),
  [Treat as an alias](https://knowledge.workspace.google.com/admin/users/should-i-uncheck-treat-as-an-alias-in-gmail)).
- **Gmail can sort mail by receiving address.** The search operator
  `deliveredto:` finds mail by the address it was delivered to, `to:` by the
  To header, and `list:` by mailing list. Each can drive a filter
  ([search operators](https://support.google.com/mail/answer/7190?hl=en)).
- **Unlicensed interns cannot send from a Jukkai address.** Every native route
  needs a licensed user in the organisation:
  - Delegation works only within the same organisation.
  - SMTP relay authenticates as a Workspace user, or by fixed IP address.
    Google also says it should not relay mail that originates from Gmail.
  - Cloud Identity Free, Workspace guests and visitors have no Gmail mailbox.
  - From January 2027, personal Gmail drops "Send as" for third-party
    addresses.

  Sources:
  [delegation](https://knowledge.workspace.google.com/admin/gmail/let-users-delegate-access-to-a-gmail-account),
  [SMTP relay](https://knowledge.workspace.google.com/admin/gmail/advanced/route-outgoing-smtp-relay-messages-through-google),
  [Cloud Identity editions](https://docs.cloud.google.com/identity/docs/editions),
  [guests](https://knowledge.workspace.google.com/admin/users/advanced/manage-workspace-guests),
  [third-party changes](https://support.google.com/mail/answer/17101213?hl=en).

- **Unlicensed interns can receive.** An intern can be an external member of the
  `etudes@` group and get its mail. In a private Groups setup (the default),
  external members reach the group "by email only"
  ([org policies](https://knowledge.workspace.google.com/admin/groups/set-organization-wide-policies-for-using-groups)).
- **A temporary intern licence is billed pro rata, on the Flexible plan only.**
  A user added on 1 April and deleted on 15 April costs half a month. On the
  Annual plan, licences can only be reduced at renewal. A suspended user is
  still billed
  ([Flexible plan](https://knowledge.workspace.google.com/admin/billing/flexible-plan),
  [licensing](https://knowledge.workspace.google.com/admin/billing/how-licensing-works),
  [suspend](https://knowledge.workspace.google.com/admin/users/suspend-a-user-temporarily)).
- **Group spam handling can hold verification codes.** Two of a group's spam
  options send suspected spam to a pending queue. The relaxed option, "Post
  suspicious messages to the group", delivers it instead. High-confidence spam
  is always rejected
  ([group settings](https://support.google.com/groups/answer/2464926?hl=en),
  [legitimate mail marked spam](https://knowledge.workspace.google.com/admin/support/troubleshooting/legitimate-email-to-a-group-marked-as-spam)).
- **The old domain can be added free, in one of two ways.**
  - As a **user alias domain**, every user and group automatically gets the
    same local part at `studioterrasson.fr`.
  - As a **secondary domain**, the admin chooses specific aliases such as
    `ct@studioterrasson.fr` for a user or `info@studioterrasson.fr` for a group.

  Either way, the domain's MX records must point to Google
  ([domain types](https://knowledge.workspace.google.com/admin/domains/add-a-user-alias-domain-or-secondary-domain)).

- **Renaming a primary address keeps the old one.** If `ct@jukkai.fr` becomes
  `crystelle@jukkai.fr`, `ct@jukkai.fr` stays as an alias
  ([rename](https://knowledge.workspace.google.com/admin/users/overview-changing-a-directory-users-name-or-email-address)).
- **`admin@` can be a group's primary address but not a group alias.** The word
  is reserved, so the group must be created in the Admin console
  ([reserved words](https://knowledge.workspace.google.com/admin/groups/words-that-cant-be-used-in-group-addresses)).
- **The data import tool can migrate the OVH mailboxes.**
  - It supports IMAP sources, up to 100 users per import, including OVHcloud
    (`ssl0.ovh.net` is listed).
  - It imports folders and subfolders, read/unread status, drafts and sent
    mail, and has a delta import.
  - Mapping can be many-to-one, so `info@` can be imported into an existing
    user. Each target must be an existing licensed user
    ([about import](https://knowledge.workspace.google.com/admin/migrate/about-importing-email-with-the-data-import-tool),
    [IMAP import](https://knowledge.workspace.google.com/admin/migrate/migrate-email-from-an-imap-account)).
- **OVH IMAP hosts depend on the offer.**
  - MX Plan and Zimbra Starter: `ssl0.ovh.net` (IMAP 993, SMTP 465, SSL).
  - Email Pro: `pro?.mail.ovh.net` (993 / 587 STARTTLS).
  - Exchange: `ex?.mail.ovh.net` (993 / 587 STARTTLS).

  The ? is the account's server number
  ([MX Plan iOS](https://docs.ovhcloud.com/en/guides/web-cloud/email-and-collaborative-solutions/mx-plan/how-to-configure-ios),
  [Email Pro](https://docs.ovhcloud.com/en/guides/web-cloud/email-and-collaborative-solutions/email-pro/first-config),
  [Exchange](https://docs.ovhcloud.com/en/guides/web-cloud/email-and-collaborative-solutions/microsoft-exchange/thunderbird-windows-configuration)).

- **Cutover runs MX, then SPF, DKIM and DMARC.** Set one MX record to
  `smtp.google.com` (it can take up to 72 hours to take effect), then activate
  Gmail. DKIM keys can only be generated 24–72 hours after Gmail is turned on.
  DMARC should wait 48 hours after SPF and DKIM. Every domain needs its own SPF,
  DKIM and DMARC records
  ([MX](https://knowledge.workspace.google.com/admin/domains/set-up-mx-records-for-google-workspace),
  [DKIM](https://knowledge.workspace.google.com/admin/security/set-up-dkim),
  [DMARC](https://knowledge.workspace.google.com/admin/security/set-up-dmarc)).
- **Delegation gives the whole mailbox to the delegate.** The delegate can read,
  send and delete. It cannot be limited to certain labels and has no built-in
  expiry. Vault, the admin search tool, needs a Vault licence, which only
  Business Plus includes
  ([delegation](https://support.google.com/mail/answer/138350?hl=en),
  [Vault](https://knowledge.workspace.google.com/vault/getting-started/vault-overview)).
- **Gmail on the web stops fetching other mailboxes.** "Check mail from other
  accounts" (POP) and Gmailify have taken no new users since after Q1 2026, and
  end for everyone in January 2027. The Gmail mobile app can still add non-Google
  IMAP accounts
  ([Gmailify and POP](https://support.google.com/mail/answer/16604719?hl=en),
  [Gmail app accounts](https://support.google.com/mail/answer/6078445?hl=en)).
- **Clients must sign in with OAuth.** Since 14 March 2025, Workspace has no
  password-based ("less secure") access. Thunderbird, Apple Mail and Outlook
  must use "Sign in with Google"
  ([LSA → OAuth](https://knowledge.workspace.google.com/admin/sync/transition-from-less-secure-apps-to-oauth)).

## 1. Editions and limits

- **Pricing, France, as of 2026-10-07.**
  - The page states "Le prix est par utilisateur et par mois, et n'inclut pas les
    taxes" (per user per month, excluding taxes). The default view is annual
    commitment ("économisez 16 % en vous engageant pour un an").
  - Annual prices are €6.80 (Starter), €13.60 (Standard) and €21.10 (Plus).
  - The toggled monthly (Flexible) prices are embedded in the page data rather
    than in the visible text: about €8.10, €16.20 and €25.30.
  - The page also shows temporary promotions: 20–50% off for 3 months from
    21 October 2026 to 21 January 2027, and a 12-month "prix découverte" for
    _new_ customers.
  - Source: [FR pricing](https://workspace.google.com/intl/fr/pricing.html).
  - The Flexible plan's USD reference prices are $8.40, $16.80 and $26.40
    ([Flexible plan](https://knowledge.workspace.google.com/admin/billing/flexible-plan)).
  - Whether Jukkai's existing organisation still counts as "new" for the
    promotions is **unverified**. Google confirms the final price at checkout.
- **Storage** is pooled: 30 GB per user (Starter), 2 TB (Standard), 5 TB (Plus).
  All three editions allow 1–300 users
  ([compare Business editions](https://knowledge.workspace.google.com/admin/getting-started/editions/compare-business-editions)).
- **Feature differences by edition**
  ([compare](https://knowledge.workspace.google.com/admin/getting-started/editions/compare-business-editions),
  [shared inbox](https://knowledge.workspace.google.com/admin/users/create-a-shared-inbox),
  [data import](https://knowledge.workspace.google.com/admin/migrate/about-importing-email-with-the-data-import-tool)):
  - **In all Business editions:** collaborative inboxes, message moderation,
    "additional addresses per user", "addresses at multiple domains", and the
    admin "shared inbox" feature (still rolling out).
  - **Data import tool:** supported in all three. The comparison page lists
    Starter's email migration as "< 100 users".
  - **Vault (eDiscovery, retention):** Business Plus only. Since
    2025-11-01, admins also need a Vault licence to use Vault
    ([Vault](https://knowledge.workspace.google.com/vault/getting-started/vault-overview)).
- **Alias limits:**
  - Up to 30 aliases per user, free. An alias belongs to one user only
    ([aliases](https://knowledge.workspace.google.com/admin/users/add-or-delete-an-alternate-email-address-email-alias)).
  - Up to 30 aliases per group
    ([group aliases](https://knowledge.workspace.google.com/admin/groups/give-a-group-an-additional-alias-address)).
  - Up to 20 user alias domains, within 600 domains in total
    ([multi-domain FAQ](https://knowledge.workspace.google.com/admin/domains/faq-for-multiple-domains)).
- **Group limits:**
  - No stated organisation-wide cap. Users can create unlimited groups. One user
    can own at most 1,500 groups, and a group can have unlimited members.
  - At most 500 external member invitations per day per group, and 25 MB per
    message
    ([limits](https://knowledge.workspace.google.com/admin/groups/understand-groups-policies-and-limits)).
- **Licences:**
  - Groups for Business is "available for all editions of Google Workspace"
    ([FAQ](https://knowledge.workspace.google.com/admin/groups/groups-administrator-faq)).
  - A group is not a user, so it takes no licence. "Multiple users can't share a
    single Google Workspace license"
    ([licensing](https://knowledge.workspace.google.com/admin/billing/how-licensing-works)).

## 2. User aliases vs Groups

- **Where mail lands:**
  - Mail to a user alias "automatically route[s] to the user's primary email
    account's inbox". Only one user can have a given alias. Google recommends
    delegation when several people need one address
    ([aliases](https://knowledge.workspace.google.com/admin/users/add-or-delete-an-alternate-email-address-email-alias)).
  - Mail to a group goes to every member who receives email updates. Its
    conversation history (archive) can also be read at groups.google.com
    ([group settings](https://support.google.com/groups/answer/2464926?hl=en)).
- **Aliases are not private.** A search for messages from a user can also
  return messages sent from that user's alias
  ([aliases](https://knowledge.workspace.google.com/admin/users/add-or-delete-an-alternate-email-address-email-alias)).
- **Which address received the message:**
  - In Gmail, `deliveredto:address` finds mail delivered to a specific address.
  - `to:` matches the To header. `list:` matches mailing-list mail, such as
    group posts.
  - Source: [search operators](https://support.google.com/mail/answer/7190?hl=en).
  - A group can add a subject prefix that marks its mail
    ([group settings](https://support.google.com/groups/answer/2464926?hl=en)).
- **Sending as an alias:**
  - It is not automatic: "To send email from an alias, the user must set up a
    custom From address in Gmail", which the admin cannot see. Also: "multiple
    users can send email from an alias if they set up a custom From address"
    ([aliases](https://knowledge.workspace.google.com/admin/users/add-or-delete-an-alternate-email-address-email-alias)).
  - Steps: Settings → Accounts → Send mail as → Add another email address →
    tick "Treat as an alias" → confirm. Gmail then shows a From selector
    ([domain alias page](https://knowledge.workspace.google.com/admin/domains/add-a-user-alias-domain-or-secondary-domain),
    [Send mail as](https://support.google.com/mail/answer/22370?hl=en)).
  - With "Treat as an alias" ticked, replies go to the addresses in the
    original To field. For a group address, Google recommends keeping the box
    ticked
    ([Treat as an alias](https://knowledge.workspace.google.com/admin/users/should-i-uncheck-treat-as-an-alias-in-gmail)).
- **"Reply from the same address the message was sent to"** is the Accounts tab
  option "When replying to a message". **Unverified** from a primary source: no
  current Gmail Help page states it. Only third-party pages (university IT
  knowledge bases) describe it. Check it in the UI.
- **Changing a primary address** turns the old address into an alias, so
  `ct@jukkai.fr` keeps working if Crystelle's primary changes
  ([rename](https://knowledge.workspace.google.com/admin/users/overview-changing-a-directory-users-name-or-email-address)).

## 3. Google Groups as shared inboxes

- **What a collaborative inbox does.** Members with permission can take or
  assign conversations, mark them complete, duplicate or "no action needed",
  label them and filter by status, all at groups.google.com. It needs Groups for
  Business and conversation history to be on
  ([collaborative inbox](https://support.google.com/a/users/answer/167430?hl=en),
  [group settings](https://support.google.com/groups/answer/2464926?hl=en)).
  It is available in all Business editions
  ([compare](https://knowledge.workspace.google.com/admin/getting-started/editions/compare-business-editions)).
  It is optional: a plain email-list group already delivers to members' inboxes.
- **Replying as the group from Gmail.** A member using a work account can add the
  group under "Send mail as".
  - This requires the group's posting permission to be "Anyone on the web".
  - If that option is missing, the admin must enable "Group owners can allow
    incoming email from outside the organization"
    ([Send mail as](https://support.google.com/mail/answer/22370?hl=en)).
  - That admin setting is needed anyway for `info@` to receive external mail.
    Without it, people outside the organisation cannot email the group
    ([fix group settings](https://knowledge.workspace.google.com/admin/support/troubleshooting/fix-common-issues-with-group-settings)).
- **Posting from the Groups web interface.**
  - Groups has "Who can post as group" and "Default sender" (author's address
    or group address) settings
    ([group settings](https://support.google.com/groups/answer/2464926?hl=en)).
  - "Reply to author" in the Groups UI "opens your configured email client".
    The reply therefore goes from the member's own mailbox, not from Groups
    ([respond to conversations](https://support.google.com/a/users/answer/9303221?hl=en)).
- **External members:**
  - They are allowed only if the admin ticks "Group owners can allow external
    members". The default is unchecked
    ([org policies](https://knowledge.workspace.google.com/admin/groups/set-organization-wide-policies-for-using-groups)).
  - With group access set to Private (the default), "External members, if
    allowed, can access groups by email only". They receive mail but cannot use
    the Groups web UI (same source).
  - A personal @gmail.com address can be an external member: the admin can add
    "external vendors, clients, customers, and others"
    ([FAQ](https://knowledge.workspace.google.com/admin/groups/groups-administrator-faq)).
- **Sending as the group from an external member's account:**
  - _Gmail "Send mail as" from a personal Gmail:_ needs SMTP credentials for the
    address (see 4b). No documented route exists.
  - _Groups web "post as group":_ external members in a private organisation are
    email-only. A post would only go to group members anyway.
  - **Unverified** whether "Who can post as group" can be granted to an external
    member in a Public-access organisation. A Groups Community thread is titled
    "Allow external members to Post as Group", but its content could not be read
    and it is not a primary source. **Treat this route as unavailable.**
- **Moderation and spam:**
  - "Spam message handling" has four options: "Reject all messages marked as
    spam", "Moderate and notify content moderators", "Moderate without
    notifying" and "Post suspicious messages to the group"
    ([group settings](https://support.google.com/groups/answer/2464926?hl=en)).
  - Both "Moderate…" options put messages in the pending list "regardless of the
    message moderation setting"
    ([approve or block messages](https://support.google.com/groups/answer/2466386?hl=en)).
  - Google: "Sometimes, Google Groups marks legitimate messages as spam and sends
    them to the moderation queue". The fix is "Post suspicious messages to the
    group". High-confidence spam is always rejected, and some spam controls are
    unavailable on trial accounts
    ([legitimate mail marked spam](https://knowledge.workspace.google.com/admin/support/troubleshooting/legitimate-email-to-a-group-marked-as-spam)).
- **From-header rewriting.** When mail comes into a group from a domain whose
  DMARC policy is `p=quarantine` or `p=reject`, recipients see
  "'Sender Name' via Group-Name <group@domain>"
  ([Gmail "via"](https://support.google.com/mail/answer/1311182?hl=en)).
  For `info@`, a supplier's or Calendly's mail may therefore appear as sent by
  the group. The original sender is not shown if "Default sender" is set to the
  group address
  ([fix group settings](https://knowledge.workspace.google.com/admin/support/troubleshooting/fix-common-issues-with-group-settings)).

## 4. Intern access without a licence

**a. External group member.**

- Receiving works once external members are allowed (section 3).
- Sending as the group from a personal account has no documented route.
- **Unverified alternative:** the intern sends from a personal address with
  Reply-To `etudes@jukkai.fr`. Supplier replies then reach the group (intern plus
  Laura). Gmail lets a user set a different reply-to address per sending
  identity ([Send mail as](https://support.google.com/mail/answer/22370?hl=en)),
  but Google does not document using it on the user's own primary address.
  **Unverified**, so test it. The From line still shows the personal address.

**b. Personal Gmail "Send mail as" a Jukkai address.**

- Adding a non-Gmail address requires "the SMTP server … and the username and
  password on that account"
  ([Send mail as](https://support.google.com/mail/answer/22370?hl=en)).
- A group or alias has no password and is not an account
  ([aliases](https://knowledge.workspace.google.com/admin/users/add-or-delete-an-alternate-email-address-email-alias)).
- Also, "Starting January 2027 … You will no longer be able to send mail from
  third-party email accounts in Gmail on the web or in the Gmail mobile apps".
  Restrictions on new setups apply before then
  ([third-party changes](https://support.google.com/mail/answer/17101213?hl=en)).
- The same page says "Google Workspace 'Send as' functionality is not affected".
  **Unverified** whether a personal Gmail sending as a Workspace-hosted address
  counts as "third-party". The credential requirement already rules it out.

**c. SMTP relay (`smtp-relay.gmail.com`).** Source:
[SMTP relay](https://knowledge.workspace.google.com/admin/gmail/advanced/route-outgoing-smtp-relay-messages-through-google).

- It is "intended for on-premise devices and applications".
- It "should not be used as a relay for email that originates from Gmail".
- Authentication is by fixed IP address or SMTP AUTH, which "verifies … the
  user Google Workspace email address and password". Password access for
  third-party apps has otherwise ended
  ([LSA → OAuth](https://knowledge.workspace.google.com/admin/sync/transition-from-less-secure-apps-to-oauth)).
- The "Only addresses in my domains" option allows sender addresses that are not
  users, such as a group address.
- If the MAIL FROM address belongs to a user, that user needs a licence that
  includes Gmail.
- **Conclusion:** it is not usable from an intern's personal Gmail.

**d. Gmail delegation.** "Users can only delegate access to another user in the
same organization"
([admin](https://knowledge.workspace.google.com/admin/gmail/let-users-delegate-access-to-a-gmail-account),
[user](https://support.google.com/mail/answer/138350?hl=en)).
The delegate must be a user in the organisation. Section 11 covers whether that
user also needs a Workspace licence (Cloud Identity Free users have no Gmail).

**e. Free account types.**

- Cloud Identity Free is "for users who don't need Google Workspace services,
  such as Gmail" ([editions](https://docs.cloud.google.com/identity/docs/editions)).
  It gives 50 free users by default
  ([CI licensing](https://docs.cloud.google.com/identity/docs/how-to/how-licensing-works-for-cloud-identity)).
- Workspace _guests_ get email only to "receive and reply to encrypted emails",
  and only with Enterprise Plus plus Assured Controls
  ([guests](https://knowledge.workspace.google.com/admin/users/advanced/manage-workspace-guests)).
- _Visitors_ get access to shared Drive files, with a PIN, for 7 days
  ([visitor sharing](https://knowledge.workspace.google.com/admin/drive/allow-sharing-to-non-google-users-with-visitor-sharing)).
- None of these has a Gmail mailbox.

**f. "Re-send as Jukkai" through a Jukkai address.**

- No native mechanism was found.
- Groups delivers posts to the group's members. "Reply to author" opens the
  member's own mail client. Admin address maps forward _incoming_ mail, and
  messages "appear to come directly from the original sender"
  ([address maps](https://knowledge.workspace.google.com/admin/gmail/advanced/redirect-or-forward-gmail-messages-to-another-user)).
- The only built-in From rewrite is for DMARC (section 3), and it labels the
  original sender "via" the group.
- **Unverified (no doc found):** that Groups never relays a post to non-member
  addresses. No setting for that exists among the documented Groups settings.

**g. Licence per intern vs a shared account.**

- Flexible plan: "You can add or remove user accounts at any time", "If you add
  a user on April 1 and delete them on April 15, you are charged for only half a
  month" ([Flexible plan](https://knowledge.workspace.google.com/admin/billing/flexible-plan)).
- Annual plan: licences can be reduced "only when it's time to renew"
  ([licensing](https://knowledge.workspace.google.com/admin/billing/how-licensing-works)).
- Suspended accounts "are still charged at the same rate" on both plans
  ([suspend](https://knowledge.workspace.google.com/admin/users/suspend-a-user-temporarily)).
- A permanent shared "stagiaire" account therefore costs a full licence all
  year.
- Rough cost of a per-intern licence: about €8.10 per month on Starter Flexible,
  or about €16 for two months. That figure is arithmetic from the page data, not
  a quote.

## 5. Absence cover and privacy

- **Delegation.**
  - What a delegate can do: a delegate "can read, send, and delete emails in
    your account". Delegates are added from Gmail on a computer and accept by
    email within a week. It can take up to 24 hours to become active
    ([delegation](https://support.google.com/mail/answer/138350?hl=en)).
  - Removal: the owner removes the delegate manually in Settings. There is no
    built-in expiry date (same source).
  - What delegates cannot use: Gemini, Chat, Smart Compose and Google Account
    settings, among others (same source).
  - Sender display: the admin chooses whether messages show "the account owner
    and the delegate who sent the email" or "the account owner only", and can
    let users choose. Turning delegation off pauses all relationships, which
    reactivate when it is turned back on
    ([admin delegation](https://knowledge.workspace.google.com/admin/gmail/let-users-delegate-access-to-a-gmail-account)).
  - A Google Group can be a delegate if the admin allows it (same source).
  - Delegation covers the whole mailbox. No documented option limits it to
    certain labels.
- **Admin-side alternatives:**
  - An admin address map can "Include original recipient (forward)" for "a leave
    of absence". It forwards _future incoming_ mail, not the existing mailbox
    ([address maps](https://knowledge.workspace.google.com/admin/gmail/advanced/redirect-or-forward-gmail-messages-to-another-user)).
  - Vault searches users' mail, but needs Vault licences for both users and
    admins, which only Business Plus or an add-on provides
    ([Vault](https://knowledge.workspace.google.com/vault/getting-started/vault-overview)).
  - Workspace users may also delegate a mailbox without the user's involvement:
    "your admin can delegate access to your account"
    ([delegation](https://support.google.com/mail/answer/138350?hl=en)).
- **Lighter options:**
  - A vacation responder with dates, optionally sent only to contacts
    ([vacation](https://support.google.com/mail/answer/25922?hl=en)).
  - Automatic forwarding of all mail or of filtered mail, which only affects new
    messages
    ([auto-forward](https://support.google.com/mail/answer/10957?hl=en),
    [filters](https://support.google.com/mail/answer/6579?hl=en)).
  - In Workspace, the admin must allow automatic forwarding (same auto-forward
    page). **Unverified:** whether that applies to forwarding inside the
    organisation.

## 6. Keeping old addresses working

Sources:
[domain types](https://knowledge.workspace.google.com/admin/domains/add-a-user-alias-domain-or-secondary-domain),
[FAQ](https://knowledge.workspace.google.com/admin/domains/faq-for-multiple-domains),
[limitations](https://knowledge.workspace.google.com/admin/domains/limitations-with-multiple-domains).

|            | User alias domain                                                                                                                                                                                                        | Secondary domain                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Effect     | Every user and group automatically gets the same local part at the new domain ("if you have info@your-company.com, you automatically get info@example.com")                                                              | No automatic addresses. Users, groups or aliases are created at that domain explicitly |
| Cost       | "No extra cost per user or group"                                                                                                                                                                                        | Pay only for user _accounts_ created there; aliases are free                           |
| Count      | Up to 20                                                                                                                                                                                                                 | Up to 599 domains in total                                                             |
| Sending    | "Everyone can send and receive email from either address", after adding it under Send mail as with Treat as an alias                                                                                                     | Same Send mail as setup for aliases                                                    |
| Removal    | An alias-domain address cannot be removed for a single user; the whole domain alias must be removed ([aliases](https://knowledge.workspace.google.com/admin/users/add-or-delete-an-alternate-email-address-email-alias)) | Aliases are managed individually                                                       |
| Conversion | Cannot be converted into a secondary domain; it must be removed and added again                                                                                                                                          | Can become the primary domain                                                          |

- **Requirements for either type:**
  - Ownership verification, then "Activate Gmail" for the domain once it is
    verified.
  - The domain's MX records must point to Google.
  - If test mail does not arrive within 48–72 hours, check verification and MX.
- **Initials vs names:**
  - A user alias domain mirrors local parts. If Crystelle's primary becomes
    `crystelle@jukkai.fr`, it creates `crystelle@studioterrasson.fr`.
  - Whether it also mirrors a user's existing primary-domain aliases (so that
    `ct@jukkai.fr` gives `ct@studioterrasson.fr`) is **unverified**: the pages
    say "each user" and "each mailing group" but are silent on aliases. Test it
    before relying on it.
  - With a secondary domain, the admin adds `ct@studioterrasson.fr` directly: the
    user alias form lets the admin "select a secondary domain". User alias
    domains do not appear in that menu
    ([aliases](https://knowledge.workspace.google.com/admin/users/add-or-delete-an-alternate-email-address-email-alias)).
- **Group addresses on the other domain.** A group can have an alias "with a
  different domain" (up to 30), but not with a reserved word such as `admin`,
  `postmaster` or `webmaster`
  ([group aliases](https://knowledge.workspace.google.com/admin/groups/give-a-group-an-additional-alias-address),
  [reserved words](https://knowledge.workspace.google.com/admin/groups/words-that-cant-be-used-in-group-addresses)).
  `info@studioterrasson.fr` and `etudes@studioterrasson.fr` can therefore be
  group aliases on a secondary domain.
- **Sign-in and calendar invites.** Users sign in only with their primary
  address. Calendar invites go out only from the primary address
  ([domain types](https://knowledge.workspace.google.com/admin/domains/add-a-user-alias-domain-or-secondary-domain)).

## 7. Migrating mail from OVH

- **Tool.** Admin console → Data → Data import & export → Data import → IMAP.
  A super admin must run it
  ([IMAP import](https://knowledge.workspace.google.com/admin/migrate/migrate-email-from-an-imap-account)).
- **Scope:**
  - It supports "IMAP accounts: 100" users per import, from any RFC 3501 IMAP
    server with a trusted TLS certificate. Otherwise the alternative is GWMME
    ([about import](https://knowledge.workspace.google.com/admin/migrate/about-importing-email-with-the-data-import-tool),
    [IMAP guide](https://knowledge.workspace.google.com/admin/getting-started/migrate-from-imap-servers-to-google-workspace)).
  - "OVHcloud — ssl0.ovh.net" is in Google's provider list (IMAP import page).
- **What gets imported** (about import page):
  - Messages, including drafts and sent mail.
  - Most attachments; nothing over 25 MB and no blocked file types.
  - Read/unread status, and IMAP folders and subfolders.
  - Mail only: no contacts or calendar
    ([IMAP guide](https://knowledge.workspace.google.com/admin/getting-started/migrate-from-imap-servers-to-google-workspace)).
  - **Unverified:** that original dates are kept. The pages don't say so
    explicitly, though the "Start date" filter implies dates are read.
- **Options:**
  - A start date filter.
  - Whether to import deleted and spam mail.
  - Folders to exclude.
  - A delta import "to import data that was added to the IMAP account after the
    import" ([IMAP import](https://knowledge.workspace.google.com/admin/migrate/migrate-email-from-an-imap-account)).
  - Google's delta-import page describes Exchange Online behaviour in detail,
    not IMAP ([delta](https://knowledge.workspace.google.com/admin/migrate/run-a-delta-migration)).
- **Per-user mapping:**
  - The admin enters each user's IMAP address, IMAP password and Workspace
    target.
  - The tool "imports data only to accounts of existing users", which need a
    licence.
  - Mapping may be "one-to-one or many-to-one", but not one source to several
    targets.
  - So `info@`'s and `etudes@`'s archives can be imported into Crystelle's or
    Laura's mailbox
    ([IMAP import](https://knowledge.workspace.google.com/admin/migrate/migrate-email-from-an-imap-account),
    [about import](https://knowledge.workspace.google.com/admin/migrate/about-importing-email-with-the-data-import-tool)).
  - **Unverified:** whether such an import is labelled by source. The source's
    INBOX would likely merge into the target's Inbox. Google does not document
    this.
- **OVH server names by offer** (the practice's offer is unknown):
  - **MX Plan:** IMAP `ssl0.ovh.net` (also `imap.mail.ovh.net`) on 993 SSL.
    SMTP `ssl0.ovh.net` (also `smtp.mail.ovh.net`) on 465 SSL. Username is the
    full address. Page dated 2024-10-01
    ([MX Plan iOS](https://docs.ovhcloud.com/en/guides/web-cloud/email-and-collaborative-solutions/mx-plan/how-to-configure-ios)).
  - **Zimbra Starter:** same hosts and ports. Page dated 2026-06-19
    ([Zimbra](https://docs.ovhcloud.com/en/guides/web-cloud/email-and-collaborative-solutions/zimbra/overview)).
  - **MX Plan webmail migration:** OVH is moving MX Plan webmail from OWA to
    Zimbra. "The migration does not require a reconfiguration of your email
    software". Page dated 2026-08-31
    ([MX Plan Zimbra FAQ](https://docs.ovhcloud.com/en/guides/web-cloud/email-and-collaborative-solutions/mx-plan/faq-zimbra)).
  - **Email Pro:** `pro?.mail.ovh.net` with IMAP 993 SSL/TLS and SMTP 587
    STARTTLS. The server number is under "General Information → Connection" in
    the OVH Control Panel. Page dated 2025-04-28
    ([Email Pro](https://docs.ovhcloud.com/en/guides/web-cloud/email-and-collaborative-solutions/email-pro/first-config)).
  - **Exchange:** `ex?.mail.ovh.net` with IMAP 993 SSL/TLS and SMTP 587
    STARTTLS. Page dated 2026-03-24
    ([Exchange](https://docs.ovhcloud.com/en/guides/web-cloud/email-and-collaborative-solutions/microsoft-exchange/thunderbird-windows-configuration)).
- **OVH's own tools:**
  - OVHcloud Mail Migrator (omm.ovhcloud.com) can migrate "to OVHcloud email
    addresses or an external email service" over IMAP/POP. It was built "to meet
    the need for reversibility" (page dated 2026-08-25)
    ([OMM](https://docs.ovhcloud.com/en/guides/web-cloud/email-and-collaborative-solutions/migrating/omm-migrate-email-account-to-ovhcloud)).
  - The manual migration guide recommends checking OMM first
    ([manual migration](https://docs.ovhcloud.com/en/guides/web-cloud/email-and-collaborative-solutions/migrating/manual-email-migration)).
- **OVH redirections** are available on MX Plan, Email Pro, Exchange and Zimbra.
  Destinations can be external, with or without a local copy, and each
  recipient is set up separately. Page dated 2026-06-08
  ([redirections](https://docs.ovhcloud.com/en/guides/web-cloud/email-and-collaborative-solutions/common-email-features/feature-redirections)).

## 8. Cutover mechanics

- **MX:**
  - Google's MX value is `smtp.google.com`, priority 1, and "Remove any other MX
    records".
  - Changes can take "up to 72 hours" to be recognised.
  - After the MX change, click "Activate Gmail" for the domain
    ([MX](https://knowledge.workspace.google.com/admin/domains/set-up-mx-records-for-google-workspace)).
  - OVH says MX changes take "between 4 and 24 hours" to propagate
    ([OVH MX](https://docs.ovhcloud.com/en/guides/web-cloud/domains/dns-zone-mx)).
- **SPF:**
  - Use `v=spf1 include:_spf.google.com ~all` if Google is the only sender.
    Each domain needs its own SPF record. It can take up to 48 hours to work
    ([SPF](https://knowledge.workspace.google.com/admin/security/set-up-spf)).
  - OVH's SPF value is `v=spf1 include:mx.ovh.com ~all`
    ([OVH SPF](https://docs.ovhcloud.com/en/guides/web-cloud/domains/dns-zone-spf)).
  - Both includes are needed while anything still sends through OVH, such as
    WordPress mail on the OVH host (an inference from both pages).
- **DKIM:**
  - A unique key per domain, generated in the Admin console after waiting
    "24–72 hours" from when Gmail was turned on. It can take up to 48 hours to
    start working
    ([DKIM](https://knowledge.workspace.google.com/admin/security/set-up-dkim)).
- **DMARC:**
  - SPF and/or DKIM must already be in place. Allow 48 hours after them. Start
    with a `p=none` policy and a `rua` reporting address. One record per domain
    ([DMARC](https://knowledge.workspace.google.com/admin/security/set-up-dmarc)).
- **Where to edit the records:**
  - OVH's MX guide requires that "the domain name concerned uses the OVHcloud
    configuration (i.e. OVHcloud DNS servers)". Otherwise the records are edited
    wherever the nameservers point
    ([OVH MX](https://docs.ovhcloud.com/en/guides/web-cloud/domains/dns-zone-mx)).
  - If `jukkai.fr`'s nameservers are at Cloudflare, records go in the Cloudflare
    dashboard. MX and TXT records there are always DNS-only, never proxied
    ([Cloudflare: Google Workspace records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/set-up-google-workspace/),
    [proxy status](https://developers.cloudflare.com/dns/proxy-status/)).
  - **Which provider hosts DNS for each domain is an open fact** (see the last
    section).
- **Old OVH mailboxes after the MX change.** **Unverified:** no OVH page states
  it. The IMAP host (`ssl0.ovh.net` etc.) does not depend on the domain's MX, so
  the mailboxes should stay reachable over IMAP for a final delta import while
  the OVH email service stays subscribed. New mail simply stops arriving there.
  OVH's MX page only warns that wrong MX records can stop mail being delivered.

## 9. Devices

- **Account setup.** Apple Mail sets up a Google account automatically from the
  address and password
  ([Apple: add account](https://support.apple.com/en-us/102619), published
  2026-05-07). For Workspace, iOS/macOS Mail must use "Sign in with Google"
  (OAuth). Thunderbird users must "Remove your Google Account, re-add it, and
  configure it to use IMAP with OAuth"
  ([LSA → OAuth](https://knowledge.workspace.google.com/admin/sync/transition-from-less-secure-apps-to-oauth),
  [Gmail in other clients](https://support.google.com/mail/answer/7126229?hl=en)).
  Gmail allows up to 15 email clients per account (same Gmail page).
- **Sending from aliases on Apple devices.**
  - **Unverified:** no Apple page documents sending from a Workspace alias or
    send-as address in iOS Mail with a Google account.
  - Apple documents choosing among _accounts_ in the From field.
  - Gmail's own app reflects Gmail settings, but Gmail Help documents choosing
    the From address only on a computer ("click the From line")
    ([Send mail as](https://support.google.com/mail/answer/22370?hl=en)).
  - Test both on the actual devices.
- **An iPad that receives but cannot send.**
  - Apple advises checking the Outbox and the password, then confirming "your
    email account settings with your email provider", and removing and re-adding
    the account
    ([Apple: can't send](https://support.apple.com/en-us/102556), published
    2026-09-15).
  - For MX Plan, the outgoing server must be filled in even though iOS marks it
    "optional": `ssl0.ovh.net`, 465 SSL, with authentication using the full
    address
    ([MX Plan iOS](https://docs.ovhcloud.com/en/guides/web-cloud/email-and-collaborative-solutions/mx-plan/how-to-configure-ios)).
  - The actual cause on Laura's iPad is **unverified**. It needs a device
    check, though it matters less once the iPad uses the Google account.

## 10. Labels and filters for onboarding

- **Filters** can label, archive (skip the Inbox), star, forward or delete. They
  apply to new mail and can be exported and imported as XML
  ([filters](https://support.google.com/mail/answer/6579?hl=en)).
- **Sorting by receiving address.** A filter on `deliveredto:info@jukkai.fr` or
  `list:` can apply an `info` label and skip the Inbox
  ([search operators](https://support.google.com/mail/answer/7190?hl=en)).
- **Categories.** The Default inbox type sorts mail into Primary, Social,
  Promotions, Updates and Forums. Custom categories are not possible. A filter
  can route a sender to a category. New-mail notifications fire only for Primary
  ([categories](https://support.google.com/mail/answer/3094499?hl=en)).
- **Admin-pushed filters.** No Admin console setting for pushing filters or
  labels was found. The Gmail API `settings.filters` resource can create filters
  programmatically, which takes development work
  ([Gmail API filters](https://developers.google.com/workspace/gmail/api/guides/filter_settings),
  updated 2026-09-10). In practice: build the filters once in one account,
  export the XML, and import it in the other.

## 11. Administration without an extra licence

- **Licences are needed for services.** "A user must have a license for Google
  Workspace before they can use Gmail, Google Drive, or any other Google
  Workspace tool"
  ([licensing](https://knowledge.workspace.google.com/admin/billing/how-licensing-works)).
- **A Workspace organisation can add Cloud Identity Free.** It does so via
  Billing → Buy or upgrade → Cloud Identity
  ([add CI licences](https://docs.cloud.google.com/identity/docs/how-to/add-cloud-identity-licenses)).
  - New users then get a free Cloud Identity licence. Turning off automatic
    Workspace licensing keeps them unpaid
    ([auto-licensing off](https://docs.cloud.google.com/identity/docs/how-to/turn-off-automatic-google-workspace-licensing-during-setup)).
  - Google's Cloud docs refer to "Google Workspace or Cloud Identity super admin
    accounts"
    ([super admin best practices](https://docs.cloud.google.com/resource-manager/docs/super-admin-best-practices)).
  - **Unverified:** that a Cloud Identity Free user _inside a Workspace
    organisation_ can be super admin and use the full Admin console. The parts
    are documented separately but no page states the combination. Test it, or
    ask Google support.
- **Google's admin recommendations**
  ([admin security](https://knowledge.workspace.google.com/admin/users/security-best-practices-for-administrator-accounts)):
  - "Your organization should have more than one super administrator account,
    each managed by a separate individual".
  - Don't use a super admin account for daily work: give each super admin "their
    own super admin account and a separate account for daily activities".
  - Use 2-Step Verification (ideally security keys), add recovery options, and
    keep backup codes.
  - Self-recovery for super admins is off by default for new customers. Recovery
    without another super admin may require proving control of the domain's DNS.
- **External invoice recipient.** An external address, such as Martin's personal
  Gmail, can be a member of a group such as `admin@` and receive its mail once
  external members are allowed (section 3).
  - `admin@` is a reserved word: it can only be created as a group's primary
    address, in the Admin console, not as a group alias
    ([reserved words](https://knowledge.workspace.google.com/admin/groups/words-that-cant-be-used-in-group-addresses)).
  - Today `admin@jukkai.fr` is Crystelle's user alias. An address cannot exist
    as both an alias and an account
    ([aliases](https://knowledge.workspace.google.com/admin/users/add-or-delete-an-alternate-email-address-email-alias)),
    so the alias would have to be removed first. That this also applies to
    groups is **unverified**, but expected.

## 12. Reading a personal mailbox alongside Gmail

- **Gmail on the web.** "After the first quarter of 2026, this feature no
  longer supports new users. Existing users can still use the feature until
  January 2027". This covers both "Check mail from other accounts" (POP) and
  Gmailify. Mail already synced stays
  ([Gmailify and POP](https://support.google.com/mail/answer/16604719?hl=en)).
- **Timeline** (on the third-party changes page): notice in Q3 2026,
  restrictions on new configurations in Q3–Q4 2026, full removal of
  third-party "Send as", Gmailify and POP in January 2027. Gmail Help still
  offers a one-time import of third-party mail on the web
  ([third-party changes](https://support.google.com/mail/answer/17101213?hl=en)).
- **What stays available:**
  - **Gmail mobile app (Android, iPhone, iPad):** can add non-Google accounts,
    automatically or manually as "Other (IMAP)", up to 5 addresses, with an
    "All inboxes" view
    ([Gmail app accounts](https://support.google.com/mail/answer/6078445?hl=en)).
  - **Apple Mail:** can add any IMAP account
    ([Apple: add account](https://support.apple.com/en-us/102619)).
  - **Other routes:** the personal provider's own webmail or app, a desktop
    client such as Thunderbird, or automatic forwarding from the personal
    provider into Gmail
    ([third-party changes](https://support.google.com/mail/answer/17101213?hl=en)).
- **Desktop Gmail on the web** will have no native ongoing sync of another
  mailbox after January 2027. Forwarding moves the personal mail into the work
  mailbox.

## Implications for the open design questions

**Interpretation by the agent, not a decision.** It is built on the facts
above. Assumptions are named.

- **What two licences can do:**
  - Each of Crystelle and Laura gets one mailbox.
  - `info@` and `etudes@` work as free groups with both of them as members.
    Shared reply history is not needed, so a plain email group is enough. A
    collaborative inbox is optional.
  - Both can reply as `info@` or `etudes@` from Gmail once "Send mail as" is set
    up and the group accepts external posts.
  - `admin@` can stay Crystelle's alias (only she receives it). It could become
    a group created in the Admin console if Martin also needs those invoices.
  - What two licences cannot give: a mailbox for a third person, or a Jukkai
    sending identity for anyone outside the two.
- **For `info@`, set spam handling to "Post suspicious messages to the group".**
  Otherwise the held-message behaviour risks delaying password resets and Revit
  codes. Expect some "via info@" rewriting for senders with strict DMARC.
- **Intern options, roughly in order of fit:**
  1. **External member plus own address.** The intern receives `etudes@` mail
     by email and writes from a personal address with Reply-To `etudes@`.
     It costs nothing, and replies land in the group (Laura sees them). Its
     limits: no Jukkai From address, and the Reply-To behaviour must be tested.
  2. **Temporary licensed user on the Flexible plan**, deleted at the end of the
     placement. It is the only option with a real Jukkai sending identity
     (as itself and as `etudes@`). It costs about €8–16 per placement on
     Starter, but **only if the subscription is Flexible**: on Annual, the added
     licence stays until renewal.
  3. **Laura sends on the intern's behalf** from `etudes@`. It costs nothing and
     is manual.
  - **Not viable on current documentation:** personal Gmail "Send mail as",
    SMTP relay, delegation to an outsider, Cloud Identity Free, guests or
    visitors, or Groups "post as group" by an external member.
- **Old addresses:**
  - A **user alias domain** keeps `studioterrasson.fr` working with no per-address
    work, but only for local parts that exist on `jukkai.fr`. If primaries
    become names, `ct@`/`lc@` at the old domain depend on unverified mirroring
    of user aliases. It also creates every other mirrored address, wanted or not.
  - A **secondary domain** with explicit aliases is more predictable for this
    case: `ct@`/`lc@` on the users, and `info@`/`etudes@`/`contact@` on the
    groups.
  - Both are free and both need the `studioterrasson.fr` MX moved to Google.
    That ends delivery to the OVH mailboxes, while the WordPress site's web
    records are unaffected.
- **Privacy and absence cover.** Delegation exposes Laura's whole mailbox. A
  narrower default would be Laura's own vacation responder plus a filter that
  forwards chosen mail. Admin address maps or Vault (Plus only) are
  admin-imposed and should be agreed openly first.
- **Migration.**
  - Import `lc` and `ct` one-to-one; their folders become labels.
  - For `info@` and `etudes@` archives: either import them many-to-one into an
    owner's mailbox, or first move them into a single named OVH folder so they
    land under one label. The second is the agent's suggestion; untested.
  - Run a delta import after the MX change while OVH is still subscribed.
- **Personal mailbox.** Crystelle's personal mailbox, if it leaves Thunderbird,
  is best read in the Gmail or Apple Mail mobile apps or the provider's webmail.
  Gmail-web POP fetching is ending.

## Facts Martin must check in the accounts

- **Workspace:** edition, plan (Flexible or Annual) and renewal date, current
  licence count, and whether automatic licensing is on.
- **Admins:** who holds super admin now, and whether a second super admin exists
  (Martin's own account?).
- **Groups for Business:** whether it is on, and the current sharing settings
  for external members, incoming external email and access.
- **DNS host of `jukkai.fr`:** OVH or Cloudflare nameservers? The site is on
  Cloudflare Pages, but the nameservers are not confirmed. Also check whether
  Jukkai's existing MX, SPF and DKIM are already correct.
- **DNS host of `studioterrasson.fr`,** what else uses that zone (the WordPress
  site and any mail it sends), and whether the domain is verified in Workspace
  yet.
- **OVH offer for `studioterrasson.fr` mail:** MX Plan (possibly bundled with the
  web hosting), Zimbra, Email Pro or Exchange. This sets the IMAP host and server
  number, and whether the mailboxes stay alive after mail moves.
- **OVH mailboxes:** the exact list (`ct`, `lc`, `info`, `contact`, the exact
  spelling of `etudes`), their sizes, and any existing OVH redirections or
  aliases.
- **CREAD school forward:** the target is `ct@studioterrasson.fr`. It keeps
  working only if that address still delivers after cutover.
- **Accounts registered with old addresses:** Revit/Autodesk, Calendly, Karlia,
  suppliers and banks.
- **Devices:** iOS/iPadOS versions, and the current outgoing-server settings on
  Laura's iPad.
- **Personal mailbox:** Crystelle's provider and how she reads it today.
