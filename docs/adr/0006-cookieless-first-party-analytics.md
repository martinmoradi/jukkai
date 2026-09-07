# Cookieless First-Party Analytics

Jukkai measures the public site with Cloudflare Web Analytics: a beacon script on each page, no cookies, no cross-site identifiers, and no visitor profile. Because nothing is stored on or read from the visitor's device and no personal data is used to build a profile, the site does not carry a consent banner. Adding any analytics tool that stores identifiers, tracks visitors across sites, or feeds an advertising platform reopens this decision and brings the consent banner with it — do not stack one onto the existing beacon without a new ADR.

Cloudflare Pages can inject the beacon itself when Web Analytics is enabled on the project. Jukkai retains the existing `CloudflareAnalytics` component instead so the measured surface is visible in the repository. Use this one installation method: leave automatic injection off. The site token is public by design — it appears in page source — but it is environment-specific, so it comes from `PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` in the Cloudflare Pages build settings and is named in `.env.example`. With no token configured the beacon is absent. When additional pages arrive, include the component once in their shared layout. Local and preview builds should omit the production token so development visits do not mix with production measurements.

On 2026-09-07, Martin chose ordinary website analytics for the Contact Card Page. Measure **contact-page views**, filtered to `/contact/crystelle/`. The business card is its intended distribution channel, so these views are a useful indication of use, not an exact count of QR scans or people. Shared links, reloads and blocked beacons limit that interpretation. Cloudflare Web Analytics does not record query strings or support custom events; it cannot distinguish scans through `src=card-crystelle` or confirm saved contacts. The previous attribution promise was incorrect, and the unused tag has been removed from the redirect target. See Cloudflare's [FAQ](https://developers.cloudflare.com/web-analytics/faq/) and [filter dimensions](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/).

**The cards have been sent to print.** The encoded URL remains `https://jukkai.fr/c/crystelle`, and its `/c/crystelle` source path is permanent. It continues to 302-redirect to `/contact/crystelle/`; this correction changes only the destination's query string, not the printed QR payload or artwork.

This decision covers audience measurement only. Product analytics, session recording, and A/B tooling are deliberately not adopted; revisit when the site has enough traffic and enough decisions riding on it that page-level counts stop answering the question.

## Production release check

Repository tests verify the configured and unconfigured beacon and the generated redirect. They do not prove that deployed analytics collects data. Before release:

1. Obtain the Web Analytics token for `jukkai.fr` using manual installation. For a proxied site, choose **Enable with JS Snippet installation** in Manage Site; do not enable automatic injection as well.
2. Set `PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` in the Pages **production** build environment. Promote the contact page together with the working homepage as planned; the next build embeds the token.
3. Open the printed URL and verify its 302 destination is the working Contact Card Page.
4. Check that the deployed page contains exactly one beacon script and sends a successful measurement request when visited without an analytics blocker.
5. Confirm data appears in Web Analytics when filtering by production host and `/contact/crystelle/`. Report it as contact-page views.

The production token and collection remain unverified until this deployment check is performed. [Cloudflare setup documentation](https://developers.cloudflare.com/web-analytics/get-started/).
