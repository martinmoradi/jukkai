# How a marketing website's content / SEO / sitemap layer gets made

Notes on the professional process, then the same thing collapsed to a solo/small
scale.

Read this from bottom to top. The bottom is what the dev/designer actually opens
and uses. Each row upward is "what had to be written first for this to make sense."

```
CODE (the built site)
  ↑ depends on
VISUAL DESIGN (comps, design system)
  ↑
WIREFRAMES (layout, hierarchy, no styling)
  ↑
── the "layer" you asked about ──
SITEMAP + PAGE CONTENT + SEO METADATA
  ↑
CONTENT STRATEGY + INFORMATION ARCHITECTURE + KEYWORD→PAGE MAPPING
  ↑
MESSAGING FRAMEWORK (value prop, key messages, voice/tone)
  ↑
AUDIENCE RESEARCH + KEYWORD RESEARCH + COMPETITIVE ANALYSIS
  ↑
BUSINESS GOALS + BRAND / POSITIONING STRATEGY
```

Each level, with the artifact produced and who owns it in an agency.

**1. Business goals + positioning (top).** What is this company, what does it sell,
what is the one job of the site? Lead generation, direct sales, signups,
credibility for a niche audience. Produces a **project brief** and often a
**positioning statement**. Owner: strategist / founder. Everything below inherits
from this. If the goal is "generate qualified leads," that decision is still
visible three layers down in which pages exist and what each CTA says.

**2. Audience + keyword + competitive research.** Who are we talking to (personas),
what do they actually type into Google (keyword research), what do competitors rank
for and say (competitive teardown). Artifacts: **persona docs**, a **keyword
research spreadsheet** (terms, volume, difficulty, intent), a **competitive
matrix**. Owners: strategist + SEO specialist. First point where SEO enters, and it
enters early, not as a final polish.

**3. Messaging framework.** Distills research into the words the brand will actually
use: the core value proposition, three to five key messages, proof points, and
voice/tone rules. Often called a **message house** or **messaging matrix**. Owner:
brand/content strategist. This is what stops every page from being written in a
different voice.

**4. Information architecture + keyword mapping → the sitemap.** The pivotal step.
The **sitemap** is the child of two parents:

- _IA_ (user/business logic): what pages must exist and how they nest so a human
  can navigate.
- _SEO keyword mapping_: each valuable search intent from step 2 gets assigned a
  page (one page owns one primary keyword/intent). SEO literally adds pages that
  pure IA would not think of, for example a page per service or per city.

So the sitemap is not just a navigation tree. It is a negotiated list of pages
where every page has a reason to exist (a job for the user + a search intent it
targets). Artifact: **sitemap diagram** plus a **page inventory / content
matrix** (page → purpose → primary keyword → target audience → key message →
CTA).

**5. Content + SEO metadata (the deliverables).** The copywriter writes the actual
page copy against that matrix, so each page already knows its job, its keyword, and
its message before a word is written. In parallel the SEO layer gets specified per
page: title tags, meta descriptions, URL slugs, heading structure, internal links,
structured data/schema, redirects. Artifacts: **content docs** (often one per page)
and an **on-page SEO spec** (frequently the same spreadsheet as the content matrix,
extended with metadata columns).

**6. Wireframes → design → code.** Only now does layout happen, and it happens with
real content in hand so the design serves the words instead of guessing at them.
Then visual design, then build.

Key insight: **content, SEO, and sitemap are not three separate things done in
parallel. They are three faces of the same strategy work, sequenced.** SEO shapes
which pages exist (sitemap) and how each is written (content). The sitemap is the
hinge between strategy and production.

## The same thing at small scale

Collapse the roles (one person plays strategist, SEO, writer, designer, dev) and
collapse the artifacts (documents become sections of one note), but do not skip the
layers. A solo/freelance version of the whole chain fits on one or two pages:

1. **One paragraph of goal + audience.** "This site sells X to Y. Success = they do
   Z." That is your positioning + persona.
2. **A short keyword list.** Even 30 minutes in a free keyword tool. Note the
   handful of terms worth a page each. That is your keyword research, and it decides
   your pages.
3. **Three key messages.** The value prop and two or three things you must
   communicate. That is your messaging framework.
4. **A sitemap sketch.** A bulleted page tree. Each bullet gets a one-line "job of
   this page + keyword it targets." That is your IA + keyword mapping in one move.
5. **Write the copy in a plain doc, one section per page,** using the message list
   so voice stays consistent. Add a title tag and meta description line at the top
   of each. That is content + SEO metadata.
6. **Then wireframe/design, then build.**

Same order, same dependencies, roughly a tenth of the paperwork. The discipline
that survives shrinking is: decide why each page exists and what it says before you
open the design tool, and let keyword intent plus business goal jointly decide the
page list. What changes with scale is only how many named documents and named
people sit between "business goal" and "developer opens the file."

## The one artifact worth internalizing: the content matrix

Content, SEO, and sitemap physically meet in one spreadsheet, the **page inventory
/ content matrix**. It is the most transferable tool from the professional process
to solo work. One row per page, roughly these columns:

| Column             | What it holds                             |
| ------------------ | ----------------------------------------- |
| Page               | The page name                             |
| URL slug           | The final path, e.g. `/services/branding` |
| Purpose            | The one job this page does                |
| Primary keyword    | The single search intent this page owns   |
| Secondary keywords | Supporting terms                          |
| Audience / persona | Who this page is for                      |
| Key message        | Which message-house message it carries    |
| Primary CTA        | The one action you want                   |
| Title tag          | ~60 chars, keyword near the front         |
| Meta description   | ~155 chars, written to earn the click     |
| Status             | Draft / review / final                    |

Fill the left half first (that is strategy and IA), then the right half (that is
content and SEO). When every row is complete, the developer and designer have
everything they need, and nothing on the site exists without a reason.
