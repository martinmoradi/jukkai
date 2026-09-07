# No teaser: the website ships directly

The Teaser Landing Page will not be built. The public website goes live with a
useful first selection of content, then improves through later releases. `main`
remains the integration branch and `production` the production release pointer,
with deliberate manual promotion (ADR-0001). `launch/teaser` was retired unused.

Crystelle's printed QR targets `https://jukkai.fr/c/crystelle`, a permanent pointer
redirecting to her Contact Card Page. Printed paths are permanent once cards exist;
only their targets may change. The Contact Card Page and working homepage release
together; its implementation alone does not establish production readiness.

## September 7 amendment

Martin confirmed a magazine-driven first website in about a week, followed by
content and transition work toward the official October opening. The practice has
already moved into its Châteaugiron office. Homepage plus a general contact page is
a working release preference; exact page scope and design remain open.

The former instruction that teaser-related lead capture, consent infrastructure
and backend foundation carry over unchanged is superseded. Full-stack work is
outside the foreseeable scope. No API, database, newsletter signup or Portal is a
website launch prerequisite. A later effort must scope any such feature afresh.

The old Studio Terrasson site initially stays available with a banner inviting
visitors to Jukkai. Website publication, old-domain migration and business/profile
transition have separate readiness conditions. See
[current delivery](../operations/current-delivery.md).
