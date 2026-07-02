# Phase 0 kickoff prompt

Open a fresh, strong-model context (Claude or Fable 5 as grill-partner). Load only:
`docs/method.md`, the five docs in `docs/source-material/` (including
`decision-log.md`), and this prompt. Do not load `docs/reference/studioterrasson/` in
Phase 0 — the one crawl fact you need (public-claims discrepancy) is inlined in
`method.md`. Then paste the prompt below.

---

You are running **Phase 0** of the method in `docs/method.md`. Read that file in full
first, then the five docs in `docs/source-material/`. Your job is to adjudicate one
strategic contradiction and produce a canonical foundation, not to fill a template.

**Do not start from scratch, and do not relitigate closed calls.** First produce a
short delta: what the source material already settles versus what is still open,
stale, or contradictory. Treat `decision-log.md` as closed decisions (one site,
jukkai.fr, "Jukkai by Crystelle Terrasson", no ecommerce/catalogue, migration
requirements) — do not reopen them without new evidence; note them as settled. Grill
me only on the genuinely open set.

**Public-claims check:** reconcile the canonical public claims (the live site says
"30 années" and "2 architectes," the brand docs say 14 years) using the facts inlined
in `method.md` plus the decision log. Do not open the studioterrasson crawl for this.

**Then grill me, hard and one branch at a time.** Refuse vague answers. Resolve each
branch before moving on. Spend the most time on the center-of-gravity decision in
`method.md`: the two-layer split (commercial/site-architecture center = interior
architecture; brand/experience center = Jukkai) and its tiebreak rule. Do not accept
Crystelle's emotional weighting of the galerie as the structural answer for the
website. Apply the tiebreak rule to concrete slots (homepage hero, H1, title tag,
primary CTA, nav order, primary tracked event); if you cannot, that is a gap to force,
not defer.

**Work the Phase 0 decision agenda** in `method.md` ("Phase 0 decides"): primary and
secondary website jobs, brand/name architecture, audience priority, offer
architecture, SEO posture, shop promise, proof bank, public French language.

**When a question can only be answered by Crystelle, stop and log it** to
`docs/questions-for-crystelle.md`, bucketed by what it blocks (sitemap / copy /
launch / later). Do not guess her answer.

**Do not stall on the deferred set.** These do not block the sitemap and belong in the
"later" bucket: exact art-buyer persona, three-year art-shop economics, full event
calendar, full artist lineup, future client portal.

The external `product-marketing` skill, if installed, is an output **adapter** only,
not the driver. Let this agenda lead.

**When the open items are resolved, synthesize into `docs/foundation.md`** — the
canonical, versioned source of truth — using a clear structure (drop SaaS-irrelevant
sections). Also finalize the bucketed `docs/questions-for-crystelle.md`. Output only
those two files. Keep going until there are no unbolted joints.

A separate cold critic pass (different context, different model) will attack
`foundation.md` afterward. You are not that pass; do not self-critique in place, just
produce the strongest foundation you can.
