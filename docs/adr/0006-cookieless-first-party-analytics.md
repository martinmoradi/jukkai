# Cookieless First-Party Analytics

Jukkai measures the public site with Cloudflare Web Analytics: a beacon script on each page, no cookies, no cross-site identifiers, and no visitor profile. Because nothing is stored on or read from the visitor's device and no personal data is used to build a profile, the site does not carry a consent banner. Adding any analytics tool that stores identifiers, tracks visitors across sites, or feeds an advertising platform reopens this decision and brings the consent banner with it — do not stack one onto the existing beacon without a new ADR.

Cloudflare Pages can inject the beacon itself when Web Analytics is enabled on the project. Jukkai renders it from the page instead so the measured surface is visible in the repository and can be reasoned about in review. The site token is public by design — it appears in page source — but it is environment-specific, so it comes from `PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` in the Cloudflare Pages build settings and is named in `.env.example`. With no token configured the beacon is simply absent; a half-configured beacon never ships.

Printed artefacts are attributed with a `src` query tag on their redirect target rather than a separate analytics product, so a Contact Card Page scan is distinguishable from a link click in the same page-view data.

This decision covers audience measurement only. Product analytics, session recording, and A/B tooling are deliberately not adopted; revisit when the site has enough traffic and enough decisions riding on it that page-level counts stop answering the question.
