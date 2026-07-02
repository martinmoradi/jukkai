## studioterrasson.fr — Full Year 2025

> **June 8, 2026 note:** This audit was written before the final Jukkai name decision. It remains the
> baseline SEO/performance evidence for the case study, but every current migration recommendation
> should point to `jukkai.fr`, not `megalaya.fr`.

**Prepared for:** Crystelle Terrasson, Studio Crystelle Terrasson  
**Prepared by:** Martin Moradi  
**Date:** March 2026  
**Data sources:** Google Search Console (March 2025 - March 2026), Google Analytics GA4 (January - December 2025)

---

## Executive Summary

This audit examines 12 months of search and analytics data for studioterrasson.fr, the website of Studio Crystelle Terrasson, a 14-year interior architecture practice based in Vern-sur-Seiche, near Rennes.

The core finding is simple: the website works as a validation tool for people who already know Crystelle's name. It does not work as an acquisition tool for people who don't. Of 305 search queries tracked in Google Search Console, only 11 generated any clicks. 93% of those clicks came from branded searches, meaning people already looking for "Crystelle Terrasson" or "Studio Terrasson" by name. For non-branded commercial queries like "architecte d'intérieur rennes," the site appears in Google results but ranks on pages 4 through 6, where no one clicks.

The site does generate traffic from referred prospects arriving through organic search, direct visits, and external links. GA4 recorded 387 contact page views over the year, which indicates interest but should not be read as 387 enquiries — the key event tracked is simply reaching the contact page, not submitting a form. Actual conversion volume is unknown and certainly lower. The referral-based business model has sustained the studio for 14 years without SEO. The question this audit answers is: what would it take to add organic acquisition on top of that existing foundation?

This document is structured in three parts:

1. **Current State Analysis:** what the data says about traffic, visibility, and user behavior
2. **Diagnosis:** what is working, what is broken, and why
3. **Original strategy for megalaya.fr:** tiered recommendations for the new site. Current target is jukkai.fr.

---

## Part 1: Current State Analysis

### 1.1 Search Visibility (Google Search Console)

Google Search Console tracks how studioterrasson.fr appears in Google search results. It reports four metrics: impressions (how often the site appeared in results), clicks (how often someone clicked through), CTR (click-through rate), and average position (where the site appeared in the results page).

**Overview — 12 months of web search data:**

| Metric                        | Value   |
| ----------------------------- | ------- |
| Total impressions             | ~21,000 |
| Total clicks                  | 402     |
| Overall CTR                   | 2.4%    |
| Average position              | 33      |
| Unique queries tracked        | 305     |
| Queries that generated clicks | 11      |
| Queries with zero clicks      | 294     |

An average position of 33 means the site typically appears on page 3 or 4 of Google results. A CTR of 2.4% is low but expected at that position depth. The critical number is 11 out of 305: only 3.6% of the queries the site appears for actually drive any traffic.

#### Branded vs. Non-Branded Queries

The most important split in the query data:

| Category                                          | Queries | Clicks | Impressions |
| ------------------------------------------------- | ------- | ------ | ----------- |
| Branded (contains "terrasson," "crystelle," etc.) | 21      | 132    | 1,177       |
| Non-branded (everything else)                     | 284     | 10     | 10,609      |

Branded searches account for 93% of all clicks despite representing only 10% of total impressions. These are queries like "studio crystelle terrasson" (74 clicks, position 2.3), "crystelle terrasson" (27 clicks, position 1.4), and "studio terrasson" (22 clicks, position 1.7). The site ranks #1 or #2 for all of them. This is the referral pipeline working as intended: someone hears the name, Googles it, finds the site.

Non-branded searches tell the opposite story. The site generates over 10,000 impressions for queries it never converts. Here are the most significant:

**"Architecte d'intérieur rennes" cluster:**

| Query                                   | Impressions | Clicks | Position |
| --------------------------------------- | ----------- | ------ | -------- |
| architecte d'intérieur rennes           | 792         | 2      | 53       |
| architecte interieur rennes             | 583         | 1      | 48       |
| architecte d'intérieur rennes tarif     | 459         | 5      | 12       |
| architecte d interieur rennes           | 332         | 0      | 44       |
| architecte d intérieur rennes           | 308         | 0      | 55       |
| architectes d'intérieur rennes          | 210         | 0      | 59       |
| architecte d intérieur rennes tarif     | 185         | 0      | 9        |
| agence d'architecture intérieure rennes | 231         | 0      | 36       |

Combined, this cluster represents roughly 3,100 impressions per year and 8 clicks. The average position across variants hovers between 35 and 55, meaning pages 4 through 6. The one exception is the "tarif" variant, which appears near position 9-12. This cluster represents the primary commercial opportunity for the new site.

**"Cuisine écologique" cluster:**

| Query                                | Impressions | Clicks | Position |
| ------------------------------------ | ----------- | ------ | -------- |
| cuisine écologique                   | 1,697       | 0      | 49       |
| aménagement cuisine écologique       | 1,518       | 0      | 25       |
| cuisine ecologique                   | 1,307       | 0      | 41       |
| comment avoir une cuisine ecologique | 223         | 0      | 32       |

This cluster generates over 4,700 impressions and zero clicks. These come from a blog post on the site that Google has indexed but that ranks too low to drive traffic. The search demand exists, but the content never reached competitive positions.

#### Pages in Search Results

| Page                               | Clicks | Impressions | CTR   | Position |
| ---------------------------------- | ------ | ----------- | ----- | -------- |
| Homepage (/)                       | 354    | 6,705       | 5.3%  | 28       |
| /prestations/                      | 14     | 2,551       | 0.6%  | 46       |
| /contact/                          | 8      | 1,311       | 0.6%  | 10       |
| /concevoir-une-cuisine-ecologique/ | 7      | 5,317       | 0.1%  | 39       |
| /particulier/belle-epoque/         | 7      | 852         | 0.8%  | 28       |
| /7-regles-dor-cuisine-moderne/     | 6      | 760         | 0.8%  | 32       |
| All other pages                    | 6      | ~4,500      | ~0.1% | 30-55    |

The homepage captures 88% of all clicks. No other page drives meaningful traffic from search. The blog posts ("concevoir une cuisine écologique" and "7 règles d'or cuisine moderne") generate thousands of impressions but convert almost none of them into visits.

### 1.2 Website Traffic (Google Analytics)

Google Analytics tracks what happens after someone reaches the site. Where Search Console shows the journey to the site, Analytics shows the journey through it.

**A note on conversion tracking:** The key event configured in GA4 for this site is a contact page view — meaning any visit to the /contact/ page counts as a "key event." This is not the same as a form submission, a phone call, or an email sent. It measures intent to contact, not confirmed contact. The actual number of enquiries generated by the site is unknown and certainly lower than the key event count. All "key event" figures in this report should be read as contact page views, an indicator of interest, not a measure of confirmed leads.

**Total traffic — January to December 2025:**

| Metric                          | Value      |
| ------------------------------- | ---------- |
| Total sessions                  | 2,420      |
| Sessions per week (average)     | ~46        |
| Engaged sessions                | 1,290      |
| Overall engagement rate         | 53%        |
| Average engagement time         | 46 seconds |
| Key events (contact page views) | 387        |
| Session-to-contact-page rate    | 16%        |

387 contact page views per year translates to roughly 7.4 per week. For context, this means about 16% of sessions include a visit to the contact page. This is a useful engagement signal — it shows that a meaningful share of visitors are interested enough to look for contact information. But without form submission tracking, it is impossible to say how many of those 387 visits resulted in actual enquiries. Industry benchmarks for contact form completion rates on service business websites typically range from 10% to 30% of contact page visitors, which would place actual enquiries somewhere between roughly 40 and 115 per year. This is a rough estimate, not a data point.

#### Traffic Sources

| Source / Medium           | Sessions | Share | Engagement Rate | Avg. Time | Key Events (contact page views) |
| ------------------------- | -------- | ----- | --------------- | --------- | ------------------------------- |
| google / organic          | 939      | 38.8% | 64.8%           | 1m 04s    | 223                             |
| (direct) / (none)         | 754      | 31.2% | 40.1%           | 29s       | 89                              |
| facebook.com / referral   | 117      | 4.8%  | 65.0%           | 3s        | 6                               |
| qwant.com / organic       | 112      | 4.6%  | 13.4%           | 5s        | 1                               |
| bing / organic            | 102      | 4.2%  | 75.5%           | 1m 06s    | 25                              |
| pinterest (combined)      | 97       | 4.0%  | ~40%            | ~20s      | 0                               |
| linktr.ee / referral      | 44       | 1.8%  | 70.5%           | 1m 13s    | 5                               |
| pagesjaunes.fr / referral | 32       | 1.3%  | 53.1%           | 39s       | 3                               |
| ecosia.org / organic      | 28       | 1.2%  | 78.6%           | 1m 59s    | 6                               |

Key observations:

**Google organic is the largest single source**, driving 939 sessions and 223 contact page views (58% of all key events). These are primarily branded searches as confirmed by Search Console data.

**Non-Google search engines matter more than expected.** Qwant (112 sessions), Bing (102), and Ecosia (28) together contribute 242 sessions. That is 20% of all organic search traffic that Google Search Console does not track. Bing and Ecosia visitors show exceptionally high engagement (75-79% engagement rate, over 1 minute on site). Qwant traffic is anomalous, with 13% engagement and 5-second average time, suggesting bot or low-quality traffic.

**Direct traffic is the second largest channel** at 754 sessions. This typically includes bookmarked visits, typed URLs, and referral traffic where the source was lost. Engagement is lower (40%) and time is shorter (29 seconds), consistent with returning visitors doing quick checks rather than deep exploration.

**Linktr.ee traffic is small but high quality.** 44 sessions with 70% engagement and over a minute on site. These are people clicking through from Crystelle's Instagram bio. Five of them viewed the contact page. Per-session, this is one of the most engaged sources.

**Pinterest drives browsers, not buyers.** 97 sessions combined across pinterest.com and fr.pinterest.com, zero contact page views. People arrive for visual inspiration and leave.

**Pages Jaunes still works.** 32 sessions, 53% engagement, 3 contact page views. People searching directory listings for interior architects are high-intent.

#### Landing Pages

Where people enter the site:

| Landing Page                             | Sessions | Key Events (contact page views) |
| ---------------------------------------- | -------- | ------------------------------- |
| / (homepage)                             | 1,442    | 260                             |
| /particulier/wood-loft                   | 274      | 0 (bot traffic)                 |
| /particulier                             | 153      | 5                               |
| (not set)                                | 133      | 0                               |
| /contact                                 | 97       | 97                              |
| /prestations                             | 84       | 3                               |
| /particulier/belle-epoque                | 64       | 2                               |
| /realisations (redirect to /particulier) | 56       | 0                               |
| /professionnel                           | 24       | 2                               |
| /conseils                                | 22       | 1                               |
| /7-regles-dor-cuisine-moderne            | 14       | 0                               |
| /concevoir-une-cuisine-ecologique        | 12       | 0                               |

**The homepage carries the site.** 60% of all sessions land there. It generates 260 of 387 contact page views. 18% of homepage sessions include a visit to the contact page, which is a solid engagement signal for a service business.

**The /contact page key events are circular.** The 97 sessions landing directly on /contact generate 97 key events by definition — landing on the contact page triggers the key event. This does not mean 97 people submitted an enquiry. It means 97 people arrived directly on the contact page, likely from a Google result or a direct link.

**The /particulier/wood-loft anomaly:** 274 sessions but only 5 active users and 0.6 seconds average engagement. This is bot or spam traffic, not real visitors. It can be disregarded.

**Blog posts as landing pages generate zero contact page views.** "Cuisine écologique" landed 12 sessions with zero contact page views. "7 règles d'or" landed 14 sessions, also zero. The content strategy does not contribute to business outcomes.

#### User Journey

Path exploration data from GA4 shows the typical visitor journey:

The dominant path is **Homepage > Contact** (22 of 113 tracked sessions moved directly from homepage to contact). This is a one-step journey: people arrive, scan the page, and look for contact information. They already know enough from the referral to decide quickly.

The second most common path is **Homepage > Prestations** (17 sessions), where visitors review the service offering and pricing before some continue to contact or portfolio pages.

The third path runs through **Homepage > Particulier** (8 sessions), where visitors explore residential project work.

The average visitor makes a decision within 1-2 pages. The engagement time on the homepage is 64 seconds. Most people who will look for contact information do so without deep browsing.

A notable finding: 11 sessions showed visitors hitting a 404 error page directly from the homepage, indicating broken internal links in the navigation. This is a minor but fixable issue.

#### Devices (Search Console)

| Device  | Clicks | Impressions | CTR  | Avg. Position |
| ------- | ------ | ----------- | ---- | ------------- |
| Desktop | 268    | 10,993      | 2.4% | 38.5          |
| Mobile  | 128    | 6,096       | 2.1% | 25.9          |
| Tablet  | 6      | 69          | 8.7% | 10.8          |

Desktop accounts for two-thirds of clicks. This is unusual for a consumer-facing local business and likely reflects the demographics of the audience (50-65 year old homeowners on desktop computers) and the nature of branded search (people at a desk looking up someone they were referred to). Mobile impressions are significant, however, and mobile average position (25.9) is better than desktop (38.5), meaning the site actually appears higher in mobile results despite getting fewer clicks.

#### Geography

95% of traffic and 95% of active users come from France. Belgium (16 users), Canada (14), and Italy (11) are minor secondary sources, likely French-speaking expatriates. International impressions from countries like Brazil, Russia, and India in the Search Console data are noise from generic "cuisine écologique" queries appearing in global results with no commercial value.

#### Weekly Trends

Active users per week ranged from 11 to 66 across the year. The pattern shows mild seasonal variation with slightly higher traffic in spring (March-May) and autumn (September-November), consistent with renovation planning cycles. There is a noticeable dip in summer (July-August) and around the Christmas period.

New users closely track active users, confirming that nearly all visitors are first-time, which is expected for a referral-driven service business with no repeat-visit reason on the site.

---

## Part 2: Diagnosis

### What Is Working

**The referral-to-validation pipeline is effective.** Someone hears about Crystelle, searches her name, finds the site, and explores it. The branded search rankings are excellent (positions 1-2), and 18% of homepage sessions include a visit to the contact page. While we cannot confirm how many of those contact page views led to actual enquiries, the engagement pattern is clear: referred visitors arrive, spend a meaningful amount of time (64 seconds on the homepage), and a significant share navigate to the contact page. This pipeline does not need fixing. It needs to be preserved through the domain migration.

**The homepage does its job as a landing page.** 64 seconds of average engagement and the dominant path data showing Homepage > Contact as the primary journey confirm that the homepage gives referred visitors enough confidence to take the next step. The combination of project visuals, pricing transparency on the prestations page, and the UNAID credential builds trust efficiently.

**External profiles contribute real traffic.** Linktr.ee, Pages Jaunes, and Facebook collectively drive 193 sessions and 14 contact page views. These are small numbers individually but they represent high-intent visitors from diverse entry points. The ecosystem around the website (social bios, directories, referral links) is doing useful work.

**Non-Google search engines are a meaningful channel.** Bing and Ecosia together deliver 130 sessions with some of the highest engagement rates on the site (75-79%). These search engines follow 301 redirects, so the migration path protects this traffic automatically.

### What Is Broken

**Organic acquisition is effectively non-existent.** 284 non-branded queries generated only 10 clicks in a full year. The site is invisible for the primary commercial query cluster ("architecte d'intérieur rennes"), ranking at positions 35-55. For a 14-year-old domain with legitimate authority in the field, this is a significant missed opportunity.

**Conversion tracking does not measure actual business outcomes.** The key event is a contact page view, not a form submission, phone call, or email. This means the 387 key events and the 16% session-to-contact-page rate describe navigation behaviour, not lead generation. We do not know how many real enquiries the site produces. For the new site, proper conversion tracking (form submissions, click-to-call, click-to-email) should be a launch requirement, not an afterthought.

**The content strategy failed.** Blog posts targeting "cuisine écologique" and "cuisine moderne" generated thousands of impressions but zero contact page views. They rank too low to drive traffic, and the traffic they do attract does not engage with the rest of the site. The topics were reasonable, but the execution lacked the SEO fundamentals needed to compete: keyword optimization in headings, internal linking, topical authority signals, and content depth.

**The site architecture is not optimized for search.** Key findings:

- The prestations page (the primary service page) never uses the phrase "architecte d'intérieur" in any heading. Its H1 is "Concevoir des espaces où la vie est douce." Google cannot match this to commercial search queries.
- Portfolio pages are named with creative project titles ("Belle Époque," "Wood Loft," "Zig Zag Wizz") that carry no search value. A page called "Belle Époque" tells Google nothing about interior architecture in Rennes.
- The word "Rennes" appears almost exclusively in the page title tag and footer. The body content does not reinforce geographic relevance.
- The URL structure uses generic paths (/prestations/, /particulier/) instead of keyword-rich paths (/architecte-interieur-rennes/, /projets-renovation-rennes/).

**Technical SEO is neglected.** The decision log notes a broken robots.txt, a mobile LCP of 12.4 seconds, FCP of 7.9 seconds, 516kb of unused JavaScript, and 183kb of unused CSS. Even with WordPress and WP Rocket, the site fails basic performance standards. These technical issues compound the content and structural problems.

**There are broken links on the site.** 60 views of the 404 page in Analytics and 11 sessions where users hit a 404 directly from the homepage indicate navigation elements pointing to pages that no longer exist.

### Why It Ranks Where It Ranks

To understand the position 53 ranking for "architecte d'intérieur rennes," it helps to look at what is actually ranking on page 1. A live search for this term returns:

**Directories and aggregators** (Houzz, Pages Jaunes) with massive domain authority and thousands of inbound links. A single studio site cannot compete with these on domain strength alone. They occupy the map pack and several organic positions.

**Competitor studios** that have built their sites explicitly around this keyword. The names ranking on page 1 include IDKREA, Nolwenn Kevell, Le Coup de Crayon, Notes de Styles, Krealoft, Gaële Boutaud, and Et Maintenant Design. Several of them are smaller practices than Studio Crystelle Terrasson. Some launched more recently. But their sites share a common playbook:

1. Page titles contain "Architecte d'intérieur Rennes" verbatim
2. H1 headings repeat the keyword
3. URLs contain the keyword (/architecte-dinterieur-rennes/)
4. Body content mentions "Rennes" and "architecte d'intérieur" repeatedly and naturally throughout
5. Client testimonials reference the city and specific project types
6. Long-form content explains services in keyword-rich, accessible language
7. Several mention nearby communes and "la région rennaise" to capture geographic variants

Note: Nolwenn Kevell is based in Le Rheu, not Rennes. Notes de Styles covers "Rennes, Cesson-Sévigné et toute la région rennaise." These practices claim the Rennes territory by naming it, the same way Crystelle could claim it from Vern-sur-Seiche (and soon Châteaugiron). There is nothing unusual or dishonest about this. It is standard practice for any business serving a metropolitan area.

studioterrasson.fr does none of these things consistently. The prestations page, which is the closest equivalent to a service page, has an H1 that reads "Concevoir des espaces où la vie est douce." The word "architecte" does not appear in any heading on the page. "Rennes" appears only in the title tag and footer. The portfolio pages are named with creative project titles ("Belle Époque," "Wood Loft," "Zig Zag Wizz") that carry zero search value.

The site was designed as a portfolio showcase with creative flair, not as an SEO-optimized service page. This is not a criticism of the design intent. It is a factual explanation of the ranking outcome.

The encouraging part: the domain is 14 years old, it has legitimate backlinks from directories and social profiles, and Google clearly associates it with interior architecture in Rennes (hence the thousands of impressions). The authority foundation exists. What is missing is the on-page signal that tells Google "this page is the answer to that query."

---

## Part 3: Original Strategy For Megalaya.fr

_Superseded target: use jukkai.fr for current execution. The strategic recommendations still apply._

### Context

The new website will live on megalaya.fr, with studioterrasson.fr redirecting via 301. It will house both the interior architecture studio and the Megalaya art space under one digital presence. The primary website audiences are private interior design clients and B2B clients. The art audience is served through Instagram and the physical space; on the website, Megalaya functions as a brand signal, not a shop.

The strategic goal is to preserve the existing referral validation pipeline while building a new organic acquisition channel that brings in prospects who do not yet know Crystelle's name.

**An important reality about the domain change:** megalaya.fr is a new domain with no history, no backlinks, and no authority in Google's eyes. The 301 redirects from studioterrasson.fr will transfer some of the old domain's authority over time, but this is not instant and not complete. Google's documentation states that 301 redirects pass "most" ranking signals, but there is typically a transitional period of weeks to months where rankings fluctuate. Since the existing organic traffic is almost entirely branded (people searching for "Crystelle Terrasson" by name), the practical risk is low: Google will quickly learn that megalaya.fr is the new home for branded queries. The non-branded rankings (already on pages 4-6) may shift during transition but they generate near-zero traffic anyway. The real SEO opportunity for megalaya.fr is not in preserving old rankings but in building new ones from scratch with proper foundations.

### Tier 1: Migration Foundations (Pre-Launch)

These are non-negotiable. Skipping any of them risks losing the existing pipeline.

**1.1 Page-by-page 301 redirect map**

Every indexed URL on studioterrasson.fr must redirect to its equivalent on megalaya.fr. This is not just a domain-level redirect. Each page needs its own mapping:

| Old URL                                              | New URL                                      |
| ---------------------------------------------------- | -------------------------------------------- |
| studioterrasson.fr/                                  | megalaya.fr/                                 |
| studioterrasson.fr/prestations/                      | megalaya.fr/[service page equivalent]        |
| studioterrasson.fr/contact/                          | megalaya.fr/contact/                         |
| studioterrasson.fr/particulier/                      | megalaya.fr/projets/[residential equivalent] |
| studioterrasson.fr/particulier/belle-epoque/         | megalaya.fr/projets/belle-epoque/            |
| studioterrasson.fr/concevoir-une-cuisine-ecologique/ | megalaya.fr/conseils/[equivalent or gone]    |
| (all other indexed pages)                            | (corresponding new pages or closest match)   |

Pages that are being removed in the redesign should redirect to the most relevant parent page, not to the homepage.

**1.2 Google Search Console and GA4 setup**

- Verify megalaya.fr in Search Console on day one (it takes weeks for data to start flowing)
- Create a new GA4 property for megalaya.fr
- **Set up proper conversion tracking from day one.** The key event must be a form submission, not a page view. If the contact page includes a phone number or email link, track click-to-call and click-to-email as separate events. This is the single most important measurement improvement over the current site. Without it, the new site will have the same blind spot: visible traffic data but no reliable way to measure whether the site is actually generating business.
- Implement UTM parameters on Linktree, social bios, and directory links to track referral sources cleanly
- Keep the studioterrasson.fr GA4 property accessible as a historical baseline

**1.3 Google Business Profile**

- Update the business name to "Megalaya by Crystelle Terrasson" (or "Megalaya, Architecte d'intérieur" depending on naming strategy)
- Update the website URL to megalaya.fr
- Update the address to the new Châteaugiron location
- Ensure the profile is fully completed: services, hours, photos, description containing "architecte d'intérieur," "Rennes," "Châteaugiron," and "Ille-et-Vilaine"
- Actively request Google reviews from recent clients. Reviews are one of the strongest local ranking signals.

**1.4 External profile updates**

Update the website URL on all external platforms within the first week of launch:

- Linktree (44 sessions, 5 contact page views in 2025)
- Pages Jaunes (32 sessions, 3 contact page views)
- Facebook page
- Instagram bio
- LinkedIn company page
- Houzz profile
- Pinterest profile
- Any other directories where the studio is listed

These will not redirect automatically through the 301. They need manual updates.

### Tier 2: On-Page SEO Foundations (Launch)

These are structural decisions that should be baked into the new site from the beginning. They cost nothing extra to implement during development but are extremely difficult to retrofit later.

**2.1 Service page optimization**

The new site needs at least one page that explicitly targets "architecte d'intérieur rennes" and related queries. This does not mean keyword stuffing. It means:

- Page title: "Architecte d'intérieur Rennes & Châteaugiron | Megalaya by Crystelle Terrasson"
- H1: "Architecte d'intérieur à Rennes" (or a natural variant)
- URL: /architecte-interieur-rennes/ (or similar)
- Body content: a clear description of who Crystelle is, what the studio does, what types of projects it handles, and where it operates. Written in natural language, mentioning Rennes, the Rennes metropolitan area, Châteaugiron, and Ille-et-Vilaine where it makes sense.
- The UNAID qualification, the eco-responsible label, 14 years of experience, and the neuro-architecture training should all appear on this page. These are differentiators that also serve as trust signals.
- Client testimonials that mention the city and the project type (e.g., "renovation of a period home in Rennes")

This page can coexist with the brand-forward homepage. The homepage is for people who already know her name. The service page is for people who don't yet know her name but are looking for what she does.

**2.2 Portfolio page structure**

Portfolio projects should have two layers of naming:

- A creative name for the brand experience (e.g., "Belle Époque")
- A descriptive subtitle and URL for search (e.g., "Rénovation maison années 30 / Rennes" with URL /projets/renovation-maison-annees-30-rennes/)

Each project page should include a short description that naturally mentions the project type, location, scope, and any notable features. This is not about writing for robots. It is about writing in a way that helps both Google and a prospective client understand what they are looking at.

**2.3 Meta titles and descriptions**

Every page needs a unique, descriptive meta title and description. The current site uses the same format across all pages ("X - Studio Terrasson - Architecture Intérieure | Rennes"), which wastes the opportunity to target specific queries on different pages.

Guidelines for the new site:

- Homepage: brand-focused, includes "Crystelle Terrasson" and "architecte d'intérieur"
- Service page: keyword-focused, includes "architecte d'intérieur Rennes"
- Portfolio pages: project-type focused, includes location
- Blog/advice pages: topic-focused, includes the primary query being targeted

**2.4 Technical SEO baseline**

The current site has severe technical issues (12.4s LCP, broken robots.txt). The new Next.js build should resolve most of these, but the following should be verified at launch:

- Core Web Vitals passing on mobile (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- Valid robots.txt allowing search engine crawling
- XML sitemap submitted to Search Console
- Clean HTML with proper heading hierarchy (single H1 per page, logical H2/H3 nesting)
- Image optimization (WebP format, lazy loading, descriptive alt text)
- Mobile-first responsive design
- HTTPS with no mixed content
- Proper canonical tags on all pages
- Schema markup for LocalBusiness, with address, phone, and service area

### Tier 3: Growth Actions (Post-Launch, Months 1-6)

These are the actions that build organic acquisition over time. They require ongoing effort but are where the real opportunity lives.

**3.1 Local content strategy**

Instead of generic blog posts about "cuisine écologique" (a national topic with heavy competition), produce content that ties to Crystelle's actual territory and expertise:

- Project case studies with before/after, process description, and location context ("Comment nous avons repensé cet appartement haussmannien dans le centre de Rennes")
- Guides tied to local context ("Rénover une maison bretonne : les contraintes spécifiques à connaître")
- Content about working with an interior architect, answering the questions people actually ask ("Combien coûte un architecte d'intérieur à Rennes ?", "Quelle est la différence entre un architecte d'intérieur et un décorateur ?")

This type of content serves three purposes: it targets long-tail search queries with local intent, it builds topical authority around interior architecture in Rennes, and it gives referred prospects additional material to deepen their trust.

**3.2 Google Business Profile management**

Post project photos regularly. Respond to all reviews. Publish Google Posts with project updates or news. The map pack (the three local results that appear above organic results for local queries) is often more valuable than position 1 in organic results for local searches. An active, well-reviewed GBP profile is the fastest path to visibility for "architecte d'intérieur rennes."

**3.3 Internal linking**

Build deliberate internal links between related pages. The service page should link to relevant portfolio projects. Portfolio projects should link back to the service page and to the contact page. Blog content should link to portfolio pieces that illustrate the concepts discussed. This helps Google understand the relationship between pages and distributes ranking authority across the site.

**3.4 Directory and citation consistency**

Ensure the business name, address, and phone number (NAP) are consistent across all directories and profiles. Inconsistent NAP data confuses Google's local search algorithm. With the move from Vern-sur-Seiche to Châteaugiron, every listing needs updating.

### Tier 4: Long-Term Authority Building (Months 6-18)

**4.1 Backlink development**

The current site has links from Houzz, social profiles, and presumably some directories. The new site should pursue additional quality backlinks:

- Local press coverage (TENDANCE magazine, Melle ADELE, local media around the Megalaya opening)
- Guest contributions to design or architecture publications
- Partnerships with complementary local businesses (artisans, contractors, real estate agents) who might link from their sites
- The UNAID membership directory

Each quality backlink from a relevant source strengthens the domain's authority for local searches.

**4.2 Content expansion**

Once the foundational content is performing, expand into adjacent topics: home renovation advice, material selection guides, working with contractors, navigating building permits in Rennes. Each piece should target a specific search query and link internally to service and portfolio pages.

**4.3 The Megalaya content angle**

Megalaya creates a unique content opportunity that no competitor has. Content about the intersection of art and interior design, artist spotlights, exhibition coverage, and the philosophy of integrating art into living spaces positions Crystelle in a different category entirely. This content may not drive high-volume search traffic, but it builds a distinctive brand presence that differentiates her from every other "architecte d'intérieur rennes" page that reads the same way.

---

## Summary of Priorities

| Priority | Action                                                     | Impact                     | Effort         |
| -------- | ---------------------------------------------------------- | -------------------------- | -------------- |
| Critical | 301 redirect map                                           | Preserves existing traffic | Medium         |
| Critical | Search Console + GA4 setup with proper conversion tracking | Enables measurement        | Low            |
| Critical | Google Business Profile update                             | Local visibility           | Low            |
| Critical | External profile URL updates                               | Preserves referral traffic | Low            |
| High     | Service page with keyword optimization                     | Organic acquisition        | Medium         |
| High     | Portfolio page restructuring                               | Search visibility + trust  | Medium         |
| High     | Technical SEO baseline                                     | Crawlability + performance | Built into dev |
| Medium   | Local content strategy                                     | Long-tail acquisition      | Ongoing        |
| Medium   | GBP active management                                      | Map pack visibility        | Ongoing        |
| Medium   | Internal linking structure                                 | Authority distribution     | Medium         |
| Lower    | Backlink development                                       | Domain authority           | Ongoing        |
| Lower    | Content expansion                                          | Topical authority          | Ongoing        |
| Lower    | Megalaya content angle                                     | Differentiation            | Ongoing        |

---

## A Note for Crystelle

This audit contains a lot of technical detail, but the takeaway is straightforward.

Your website has been doing its job for the clients who already know your name. When someone hears about you and Googles "Crystelle Terrasson," they find your site, they look at your work, and they look for how to contact you. That works, and it will continue to work on the new site.

What the website has never done is bring you clients who do not yet know you exist. When someone in Rennes searches for "architecte d'intérieur" on Google, your site appears on page 5 or 6 of results. No one looks that far. Your competitors who appear on page 1 are not necessarily better architects. They simply built their websites in a way that Google understands and rewards.

One honest note: the current site tracks whether someone visits the contact page, not whether they actually send a message. So while the data shows 387 contact page visits this year, the real number of enquiries is lower — we just do not know by how much. The new site will fix this by tracking actual form submissions, so we will have a clear picture from day one.

The new Megalaya website can do both. It can be the bold, distinctive, artful space that reflects who you are. And it can also speak Google's language in the right places, so that people searching for exactly what you do can actually find you. These two goals do not conflict. The homepage and the brand experience stay yours. A few well-structured pages underneath handle the rest.

---

_End of audit._
