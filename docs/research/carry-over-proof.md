# Studio Terrasson carry-over proof: inventory

- **Status:** Research findings, not a selection. This file inventories what
  studioterrasson.fr publishes as proof. Choosing projects belongs to _Shape the
  Architecture slice_. Nothing here is approved Jukkai content.
- **Question:** [#140](https://github.com/martinmoradi/jukkai/issues/140), under map
  [#139](https://github.com/martinmoradi/jukkai/issues/139).
- **Sources:**
  - Primary: the [old-site crawl](../reference/studioterrasson/index.md), captured
    2026-06-13 (each `*/content.md`).
  - Live: studioterrasson.fr fetched 2026-10-08 for the facts the crawl lacks. That
    covers prestations headings 4 to 6 and the UNAID paragraph, logo filenames,
    srcset and original image dimensions, the mentions légales photo credits, and a
    caption cross-check. Facts from the live site carry the tag **(live)**.
  - Archive (2026-10-08): the full site backup and Imagify's pre-compression
    originals, browsable on Storage under
    `originals/projects/old-website/site-2026-10-08/`, plus the received project
    batches under `originals/projects/received/`. Findings in
    [§4](#4-archive-review-credits-originals-and-image-quality).
  - Project masters (2026-10-11): the photographs copied from Crystelle's server
    project folders, under `media/projects/` on Storage
    ([project masters](../../media/README.md#project-masters)). They supersede
    the October archive's image findings where the two disagree; see
    [§5](#5-project-masters-update).
- **Crawl gap found:** the crawl's text extraction drops Elementor elements that
  animate into view. On prestations it lost the headings for steps 4 to 6 and the
  whole UNAID paragraph. On `/professionnel/` it lost 3 of the 13 project cards. On
  all 25 project pages, the caption text in the crawl matches the live page word for
  word. For full page text, prefer the archive's `page.md` files over the crawl.

## Headline counts

| Item                                            | Count                                                                                                                         |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Project pages                                   | 25 (12 particulier, 13 professionnel)                                                                                         |
| Distinct project images                         | 176 (81 particulier, 95 professionnel). No image appears on two pages                                                         |
| Images whose filename credits C. Ablain         | 30, on 5 professionnel pages. Watermarks and EXIF show far more ([§4](#4-archive-review-credits-originals-and-image-quality)) |
| Caption length                                  | particulier 72–131 words; professionnel 64–109 words                                                                          |
| Largest file per page                           | 1329 to 2560 px on the long edge                                                                                              |
| Client logos on « Ils nous ont fait confiance » | 19                                                                                                                            |
| Wall clients that also have a project page      | 8 (SECIB, My Digital School, Monnier, La Marébaudière, L'Atelier, Crechendo, Bakelite, ABE)                                   |
| Project client with no logo on the wall         | 1 (Restaurant Le Capri, _Waouh_)                                                                                              |
| Project pages sharing identical text            | 2 (_Caractère_ and _Pop Color_: same SECIB caption, different photo sets)                                                     |

## 1. Project pages

**How the columns were counted:**

- **Words** counts the project text only, excluding the title and the client line. It
  includes the subheadings (_Astuce(s) de pro_, _Matériaux_, _Concept
  architectural_). Nav, footer, the « Continuez de rêver » links and the wall are
  excluded.
- **Images** counts the distinct gallery files in the page body. WordPress size,
  `-scaled` and `-rotated` variants are merged. The site logo, the 300×150 project
  miniatures and the wall logos are excluded. On 17 pages the share image
  (`og:image`) is a file the gallery does not show (a `-carre`/`-vertical` crop,
  or the miniature on _Maison Secrète_); it is not counted.
- **Largest** is the pixel size of the biggest file available for any image on the
  page **(live)**: the full-size upload or the widest srcset entry, read from the
  file header. **Range** gives the long edge of the smallest and largest image on
  the page.
- **Ablain** counts the gallery files with `c.ablain` in the filename.

### Particulier (`/particulier/…`)

No particulier caption names a client or a location; the two location hints below come from meta or alt text.

| Title                 | Path                                 | Type as stated (source)                                                                                    | Words | Images | Largest   | Long-edge range | Ablain |
| --------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ----: | -----: | --------- | --------------- | -----: |
| Arrondir les Angles   | `/particulier/arrondir-les-angles/`  | pavillon des années 1980 (caption)                                                                         |   104 |      9 | 2048×1487 | 1330–2048       |      0 |
| Belle Époque          | `/particulier/belle-epoque/`         | maison 1930, Art Déco; steel véranda-type extension, kitchen (caption, meta)                               |   123 |      8 | 1329×886  | 1329            |      0 |
| Jardin Intérieur      | `/particulier/jardin-interieur/`     | maison des années 2000 (caption)                                                                           |    78 |      7 | 1512×2016 | 1500–2016       |      0 |
| Maison Secrète        | `/particulier/maison-secrete/`       | not stated (living and dining room)                                                                        |   131 |      9 | 1875×2560 | 2016–2560       |      0 |
| Sa Majesté l'Escalier | `/particulier/sa-majeste-lescalier/` | not stated (staircase, kitchen)                                                                            |   119 |      8 | 1512×2016 | 2016–2048       |      0 |
| Tournesol             | `/particulier/tournesol/`            | windowless entrance; dwelling not stated (caption)                                                         |   108 |      4 | 1512×2016 | 800–2016        |      0 |
| Tout en Lumière       | `/particulier/tout-en-lumiere/`      | maison, « rénovation lourde » (caption); filenames read `renovation-maison-extension-rennes-…-archibien-N` |   104 |      5 | 2048×1366 | 1300–2048       |      0 |
| Turn Around           | `/particulier/turn-around/`          | maison des années 80 (caption)                                                                             |   109 |      6 | 2048×1566 | 1300–2048       |      0 |
| Vivre grand           | `/particulier/vivre-grand/`          | maison néo-bretonne (caption); « près de Rennes » (meta)                                                   |   105 |      6 | 2048×1506 | 1300–2048       |      0 |
| Voir Rouge            | `/particulier/voir-rouge/`           | maison (caption)                                                                                           |   103 |      6 | 1329×886  | 1300–1329       |      0 |
| Wood Loft             | `/particulier/wood-loft/`            | maison néo-bretonne (caption); one image alt says « à Plélan Le Grand »                                    |   129 |      7 | 886×1329  | 1329            |      0 |
| Zig Zag Wizz          | `/particulier/zig-zag-wizz/`         | not stated (séjour in filenames)                                                                           |    72 |      6 | 1920×2560 | 1500–2560       |      0 |

Every particulier caption has the same shape: an intro paragraph, then _Astuce(s) de
pro_ and _Matériaux_. The 800 px image on Tournesol is `tournesol-carre.jpg`
(800×800).

### Professionnel (`/professionnel/…`)

The client line is quoted as the page prints it, typos included.

| Title                | Path                                   | Client line (verbatim)                                  | Words | Images | Largest   | Long-edge range | Ablain |
| -------------------- | -------------------------------------- | ------------------------------------------------------- | ----: | -----: | --------- | --------------- | -----: |
| Bleu de Prusse       | `/professionnel/bleu-de-prusse/`       | MICRO-CRÈCHE CRECHENDO – CESSON-SÉVIGNÉ (35)            |   107 |      5 | 2048×1499 | 1300–2048       |      0 |
| Cabane en Bois       | `/professionnel/cabane-en-bois/`       | MY DIGITAL SCHOOL – ECOLE DE COMPTABILITÉ – RENNES (35) |    64 |      5 | 886×1329  | 1300–1329       |      0 |
| Caractère            | `/professionnel/caractere/`            | SECIB IMMOBILIER – RENNES (35)                          |    72 |      7 | 886×1329  | 1300–1329       |      6 |
| De Vert et de Bois   | `/professionnel/de-vert-et-de-bois/`   | MICRO-CRÈCHE CRECHENDO – LA MÉZIÈRE (35)                |    67 |      8 | 1329×886  | 1300–1329       |      7 |
| En Silence           | `/professionnel/en-silence/`           | MY DIGITAL SCHOOL – ECOLE MULIMÉDIA – RENNES (35)       |    64 |      6 | 1329×886  | 1301–1329       |      0 |
| Géométrie Invariable | `/professionnel/geometrie-invariable/` | SOCIÉTÉ ATELIER BOUVIER ENVIRONNEMENT – PACÉ (35)       |    68 |      9 | 1512×2016 | 2016            |      0 |
| La Fonderie          | `/professionnel/la-fonderie/`          | RESTAURANT L'ATELIER – VILLEDIEU LES POÊLES (50)        |    96 |      7 | 2048×1366 | 1300–2048       |      0 |
| Menthe à l'Eau       | `/professionnel/menthe-a-leau/`        | MICRO-CRÉCHE CRECHENDO – RENNES (35)                    |    76 |      4 | 1500×2112 | 1608–2112       |      0 |
| Orange Dynamique     | `/professionnel/orange-dynamique/`     | BAKELITE ARCHITECTURE – VERN SUR SEICHE (35)            |    75 |      6 | 1329×886  | 1300–1329       |      5 |
| Pause Bretonne       | `/professionnel/pause-bretonne/`       | HOTEL LA MARÉBAUDIÈRE – VANNES (56)                     |    72 |     11 | 1772×1181 | 1300–1772       |      2 |
| Plein les Yeux       | `/professionnel/plein-les-yeux/`       | MONNIER CONCEPTION SHOWROOM – TINTÉNIAC (35)            |   109 |      9 | 1920×2560 | 1500–2560       |      0 |
| Pop Color            | `/professionnel/pop-color/`            | SECIB IMMOBILIER – RENNES (35)                          |    72 |     11 | 1329×886  | 1300–1329       |     10 |
| Waouh                | `/professionnel/waouh/`                | RESTAURANT LE CAPRI – FOUGÈRES (35)                     |   100 |      7 | 1329×886  | 1134–1329       |      0 |

Observations:

- Each professionnel caption has the same shape: the client line, an intro
  paragraph, then _Concept architectural_.
- _Caractère_ and _Pop Color_ carry the same client line and the same 72-word
  caption, but show different photo sets (`c.ablain_60xx–61xx` and
  `c.ablain_31xx–33xx`).
- _Cabane en Bois_ names My Digital School in its caption, yet its image files and
  its miniature are named `ihecf-…`.
- _Géométrie Invariable_ images are named `conception-dinterieur-hall-dimmeuble-abe-N`.
  Its client line names Atelier Bouvier Environnement.
- The _Waouh_ caption names the restaurant's owner.
- The `/professionnel/` hub lists all 13 projects **(live)**. The crawl showed only 10. `/particulier/` lists all 12.

### Photographer credit

- **Filenames:** 30 gallery files credit the photographer in their names: 25 as
  `c.ablain_NNNN` (_Caractère_, _De Vert et de Bois_, _Pause Bretonne_, _Pop Color_)
  and 5 as `conception-de-bureaux-bakelite-architecture-photo-c.ablain-N`
  (_Orange Dynamique_). No caption or alt text credits a photographer. Filenames
  undercount: watermarks burned into the images credit her on particulier pages
  too ([§4](#4-archive-review-credits-originals-and-image-quality)).
- **Credit list (live):** the mentions légales page lists « Crédits photos » as
  Studio Crystelle Terrasson, Caroline Ablain (`https://www.carolineablain.com`) and
  Julie Colombel.
- **Other filenames:** no filename can be matched to Julie Colombel. The remaining
  files have descriptive names or camera-style names (`img_NNNN`), with no credit.

## 2. « Ils nous ont fait confiance » client-logo wall

The wall is a carousel of 19 PNG logos, and its order rotates. It appears on all
13 professionnel project pages and on the `/professionnel/` hub. It does not appear
on the home page, on prestations, on `/particulier/`, on any particulier project
page or on any other crawled page. The hub introduces it with: « Depuis 2012, ils nous font confiance :
rénovation, relookage, restructuration partielle ou complète, décoration… ».

The crawl gives the alt text. The filenames are from the live page. The
**Basis** column says what each classification rests on:

- _project page_: the old site's own text.
- _name_: general knowledge of an organisation with that name. The logo itself
  does not confirm that it is the same organisation.
- _uncertain_: an unconfirmed classification.
- _records_: Crystelle's server project folders or received batches, confirmed by
  Martin on 2026-10-11 ([§5](#5-project-masters-update)).

|   # | Alt text (crawl)              | File **(live)**                   | Client                              | Sector                                        | Basis                                                                                                                                                                      |
| --: | ----------------------------- | --------------------------------- | ----------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   1 | Université Rennes 1 (logo) 01 | `universite_rennes_1_logo-01.png` | Université de Rennes 1              | education                                     | records: the tiers-lieu shoot (2026)                                                                                                                                       |
|   2 | My Digital School 01          | `my-digital-school-01.png`        | My Digital School                   | education                                     | project pages _Cabane en Bois_, _En Silence_                                                                                                                               |
|   3 | Ihcef                         | `ihcef.png`                       | IHECF                               | education                                     | records: the server folder `ihecf` holds one 2019 shoot covering both _En Silence_ and _Cabane en Bois_, with IHECF signage in frame; both captions name My Digital School |
|   4 | Aftec 01                      | `aftec-01.png`                    | AFTEC                               | education (uncertain)                         | name, uncertain                                                                                                                                                            |
|   5 | Crechendo                     | `crechendo.png`                   | Crechendo (micro-crèches)           | childcare                                     | project pages _Bleu de Prusse_, _De Vert et de Bois_, _Menthe à l'Eau_                                                                                                     |
|   6 | Neotoa 01                     | `neotoa-01.png`                   | Neotoa                              | social housing                                | name                                                                                                                                                                       |
|   7 | Marignan 01                   | `marignan-01.png`                 | Marignan                            | property development (uncertain)              | name, uncertain                                                                                                                                                            |
|   8 | Pigeault 01                   | `pigeault-01.png`                 | Pigeault                            | property development (uncertain)              | name, uncertain                                                                                                                                                            |
|   9 | Secib Logo 01                 | `secib-logo-01.png`               | SECIB Immobilier                    | offices/services (real-estate agency offices) | project pages _Caractère_, _Pop Color_                                                                                                                                     |
|  10 | Bakelite 01                   | `bakelite-01.png`                 | Bakelite Architecture               | offices/services (architecture practice)      | project page _Orange Dynamique_                                                                                                                                            |
|  11 | Abe 01                        | `abe-01.png`                      | ABE (Atelier Bouvier Environnement) | offices/services                              | project page _Géométrie Invariable_, matched through its `…-abe-N` filenames                                                                                               |
|  12 | 1000ty Services [récupéré] 01 | `1000ty-services-recupere-01.png` | 1000ty Services                     | offices/services (uncertain)                  | name only, uncertain                                                                                                                                                       |
|  13 | Monnier 01                    | `monnier-01.png`                  | Monnier Conception                  | retail (kitchen and bath showroom)            | project page _Plein les Yeux_                                                                                                                                              |
|  14 | Tapis Chic 01                 | `tapis-chic-01.png`               | Tapis Chic                          | retail (rug showroom)                         | records: received 2021 showroom snapshots                                                                                                                                  |
|  15 | La Marebaudiere               | `la-marebaudiere.png`             | Hôtel La Marébaudière               | hospitality                                   | project page _Pause Bretonne_                                                                                                                                              |
|  16 | L Atelier 01                  | `l_atelier-01.png`                | Restaurant L'Atelier                | hospitality                                   | project page _La Fonderie_                                                                                                                                                 |
|  17 | Dometlux 01                   | `dometlux-01.png`                 | Dometlux                            | other/unknown                                 | name only                                                                                                                                                                  |
|  18 | Chp                           | `chp.png`                         | CHP Saint-Grégoire                  | healthcare (private hospital)                 | records: server folders for a maternity room and a VIP lounge                                                                                                              |
|  19 | Bwood                         | `bwood.png`                       | Bwood                               | building (house builder)                      | records: a 2024 house built for sale (Martin)                                                                                                                              |

**Tally (uncertain in brackets):**

| Sector               | Clients |
| -------------------- | ------- |
| education            | 3 (+1)  |
| childcare            | 1       |
| healthcare           | 1       |
| social housing       | 1       |
| building             | 1       |
| property development | 0 (+2)  |
| offices/services     | 3 (+1)  |
| retail               | 2       |
| hospitality          | 2       |
| other/unknown        | 1       |

Logo files as served are raster PNGs, 445 to 768 px wide (the crawl's
placeholder viewBoxes). Restaurant Le Capri (_Waouh_) has a project page but no
logo on the wall.

## 3. Credential wording on `/prestations/`

The wording below is verbatim from the live page, typos included. The crawl has
the décennale paragraph but neither the heading for step 6 nor the UNAID
paragraph.

### UNAID **(live)**

> Membre Qualifié de l'UNAID n°3505 (Union National des Architectes d'Intérieur,
> Designers).
> Depuis 1978, la mission de l'UNAID est de défendre et promouvoir les
> professionnels de l'architecture d'intérieur, indépendants, à titre individuel ou
> en société.
> Etre membre qualifié garanti à nos clients des compétences professionnelles et une
> méthodologie de travail complète.

- **Membership number:** n°3505.
- **Logo:** `unaid.jpg`, 2048 px wide (alt « Logo de l'Unaid »). The logo itself
  reads « Union Nationale des Architectes d'Intérieur, Designers » and carries no
  number.
- **Where the UNAID appears:** only on prestations, nowhere else in the crawl.

### Décennale (step 6)

The heading and lead-in are **(live)**. The body is in both the crawl and the live
page.

> **6. Assurance décennale**
> Nous vous donnons les garanties dont vous avez besoin
> car vous nous confiez ce qui compte le plus pour vous
>
> En qualité d'Architecte d'Intérieur nous sommes soumis à l'obligation de
> souscrire des assurances, et plus particulièrement une assurance décennale. Cette
> assurance vous protège pendant dix ans contre les malfaçons.
>
> Le défaut de souscription d'une assurance décennale est passible de prison.
>
> Cette assurance couvre les travaux de rénovation ou d'aménagement des espaces
> intérieurs qui touchent à la charpente, aux murs, aux revêtements (carrelage,
> parquet, etc.), ainsi que les travaux sur des éléments liés aux ouvrages de base
> du bâtiment.
>
> La réception des travaux fixe le point de départ des garanties légales
> et le début de votre nouvelle vie !

No insurer, policy number or attestation is published. The image beside the
paragraph (`assurance-decennale-1.jpg`) is an interior photo, not a certificate.

### Process steps

The page opens with « Concevoir des espaces où la vie est douce » and « étape par
étape », and closes with « Travaillons ensemble ».

| Step | Heading (as published)              | Sub-heading         | Side words in sequence | Source   |
| ---: | ----------------------------------- | ------------------- | ---------------------- | -------- |
|    1 | 1. Se rencontrer… sans engagement ! | Comment ça marche ? | écouter                | crawl    |
|    2 | 2. Se laisser surprendre            | L'avant-projet      | inventer, rêver        | crawl    |
|    3 | 3. Se projeter                      | La visualisation    | concevoir              | crawl    |
|    4 | 4. Être accompagné                  | —                   | comprendre             | **live** |
|    5 | 5. Orchestrer vos travaux           | —                   | organiser              | **live** |
|    6 | 6. Assurance décennale              | (lead-in above)     | —                      | **live** |

Steps 2 and 4 also carry « Combien ça coûte ? » fee wording. That wording is out of
scope here; map #139 settles current fees.

## 4. Archive review: credits, originals and image quality

Added 2026-10-08 from the archive source above. Images were reviewed as contact
sheets; received files were matched to old-site images by EXIF capture time, then
checked visually. Which received batch belongs to which private client stays out of
this public repo. Quality tiers are an agent assessment, not a selection: choosing
belongs to [#142](https://github.com/martinmoradi/jukkai/issues/142).
The project masters later superseded the originals findings: see
[§5](#5-project-masters-update).

### Credits

- **Watermarks credit C. Ablain where filenames do not:** _Wood Loft_, _Voir Rouge_
  and _Waouh_ read « CTERRA / © C.ABLAIN » (CTERRA is the studio's former name);
  _En Silence_ and _Cabane en Bois_ read « studioterrasson / © C.Ablain »;
  _Orange Dynamique_ reads « BAKELITE / © C.ABLAIN ».
- **_Belle Époque_ co-credits an architect:** « T.ROCHER / C.TERRASSON / © C.ABLAIN ».
  The old homepage also credits « Typhaine Rocher Architecte / Studio Crystelle
  Terrasson » on a 2017 photo taken at Plélan-le-Grand.
- **Ablain shoot dates (EXIF):** _Pause Bretonne_ 2017-05, _Wood Loft_ 2017,
  _Pop Color_ 2017-12, _Caractère_ 2018-10, _Belle Époque_ 2019-11.
- **Other photographers in received material:** Julie Brichet (Le Capri 2025 and
  the 2026 tiers-lieu, « all rights reserved » in EXIF); Julie Dan, whose 2023 files
  carry the EXIF artist « Julie Lumen » (team shoot, and a 2024 portrait session of
  Crystelle inside the 2024 house, with a burned-in watermark); Sowphoto (2021 team
  photo). The 2024 house's own interior set has no credit metadata.

### Originals and upgrades

| Page                                                                                                            | Best source found                                                                           |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| _Belle Époque_                                                                                                  | Received HD: 29 files up to 6720 px, no watermark; all 9 old images plus about 19 new ones  |
| _Pause Bretonne_                                                                                                | Received HD: 20 files, 5760–6720 px, no watermark; all 11 old images plus 9 new ones        |
| _Pop Color_                                                                                                     | Received set is the same 1329 px files, plus 7 unpublished frames; masters found later (§5) |
| _Arrondir les Angles_                                                                                           | Received phone originals (4032 px, 2023), retouched crops and before/worksite photos        |
| _Caractère_, _Wood Loft_, _Voir Rouge_, _Orange Dynamique_, _De Vert et de Bois_, _Waouh_, the two school pages | 1329 px watermarked web exports in the archive; masters found later (§5)                    |

New material with no old page: the 2025 Le Capri restaurant (professional shoot,
a different project from _Waouh_), a 2024 house with a timber-clad extension and a
2021 rug-showroom fit-out (snapshots only). The masters add more (§5).

### Image quality by page (agent assessment)

- **Professional shoot:** _Belle Époque_, _Wood Loft_, _Voir Rouge_, _Caractère_,
  _Pop Color_, _Orange Dynamique_, _De Vert et de Bois_, _Pause Bretonne_, _Waouh_,
  _En Silence_, _Cabane en Bois_.
- **Decent camera:** _Tout en Lumière_ (5020 px, unwatermarked), _Sa Majesté
  l'Escalier_ (5992 px).
- **Phone or dated:** the other ten pages. Several still hold strong designs worth
  showing at small size (_Géométrie Invariable_, _Jardin Intérieur_, _Maison Secrète_,
  _Arrondir les Angles_).

### Facts that conflict or date the material

- _Belle Époque_: the caption says « maison 1930 »; the legacy portfolio entry says
  an Art Déco « maison 1900 » in Rennes.
- The legacy portfolio places IHECF and My Digital School in Bruz; the captions say
  Rennes. Its Restaurant L'Atelier entry carries Le Capri's text.
- Legacy dates: the La Mézière crèche opened in September 2018, its shell « dessinée
  par Bakelite architectures »; the Cesson crèche in January 2020.
- Every project page was uploaded in March 2023, and no old project is newer than
  about 2022.

### Other material

- `unused-media/` holds team photos (2021, 2023), a kitchen plan with elevations,
  an electrical plan, 3D review and VR photos: possible people and process proof.
- The prestations page's `studioct_a_cozy_living_room…png` looks AI-generated; do
  not reuse it.
- The blog has six generic 2023 articles and three unpublished drafts. Only the
  eco-kitchen article has links ([run 21](seo-runs/021-030.md#21-backlinks--which-relationships-and-old-destinations-merit-preservation)).

## 5. Project masters update

Added 2026-10-11 from the [project masters](../../media/README.md#project-masters):
402 files in 19 batches, reviewed as contact sheets. Crystelle holds usage rights
for all of them; credits still apply (Martin, 2026-10-11). Batches are named here by
old-site title or by a public-safe description, never by their private folder key.
Quality notes are an agent assessment, not a selection.

| Project                                    | Files | Long edge (px) | Shot (EXIF) | Source and quality                                |
| ------------------------------------------ | ----: | -------------- | ----------- | ------------------------------------------------- |
| _Belle Époque_                             |    28 | 5323–6720      | 2019-11     | C. Ablain                                         |
| _Orange Dynamique_ (Bakelite)              |     6 | 6366–6720      | 2019-11     | C. Ablain                                         |
| _Bleu de Prusse_ (Cesson crèche)           |    17 | 3684–4032      | 2020-01     | Phone snapshots                                   |
| _De Vert et de Bois_ (La Mézière crèche)   |     8 | 6720           | 2018-09     | C. Ablain                                         |
| _Sa Majesté l'Escalier_                    |    12 | 4943–5992      | 2021-04     | Camera, no credit; wide, estate-agent style       |
| _Wood Loft_                                |    29 | 3689–5760      | 2017-01     | C. Ablain                                         |
| _Tout en Lumière_                          |    12 | 5020           | 2021-06     | Camera, no credit; wide, estate-agent style       |
| _En Silence_ and _Cabane en Bois_ (IHECF)  |    20 | 6525–6720      | 2019-05     | C. Ablain; one shoot covering both old pages      |
| _Pause Bretonne_ (La Marébaudière)         |    20 | 5760–6720      | 2017-05     | C. Ablain                                         |
| _Voir Rouge_                               |    37 | 5215–6720      | 2017-05     | C. Ablain; a whole house, with bold themed murals |
| _Waouh_ (Le Capri cabaret room)            |     7 | 6720           | 2018-09     | C. Ablain                                         |
| _Arrondir les Angles_                      |    17 | 2571–4032      | 2023-03     | Retouched phone photos of a strong design         |
| _Pop Color_ (SECIB, city centre)           |    17 | 6544–6720      | 2017-12     | C. Ablain                                         |
| _Caractère_ (SECIB, station)               |     7 | 6514–6720      | 2018-10     | C. Ablain                                         |
| Le Capri restaurant, no old page           |    72 | 3856–6016      | 2025-10     | Julie Brichet                                     |
| Université de Rennes 1 tiers-lieu, no page |    45 | 3826–6016      | 2026        | Julie Brichet; © 2026, delivered 2026-10-09       |
| House for the builder Bwood, no page       |    27 | 3543           | 2024        | Camera, no credit; staged for sale                |
| CHP Saint-Grégoire VIP lounge, no page     |    15 | 2067–5184      | 2015–2016   | Phone and compact snapshots                       |
| CHP Saint-Grégoire maternity room, no page |     6 | 4512–5184      | 2018-10     | Compact snapshots                                 |

C. Ablain attributions rest on the watermarks and file names of the old pages
(§1, §4); the masters carry no credit metadata.

### What the masters change

- **Masters exist for every old page in the July keep list** and for _Pop Color_,
  which the archive review had found no upgrade for.
- **Three professional batches have no old page:** the Université de Rennes 1
  tiers-lieu (Crystelle contracted by the university; Martin), the most recent
  work in the archive and a strong professional shoot; and the two CHP
  Saint-Grégoire spaces, whose snapshots support breadth rather than a réalisation.
- **The 2024 house is a builder's project:** Bwood, a house builder on the logo
  wall, built it for a client who meant to sell it (Martin, details unconfirmed).
  The photos are staged for sale. Crystelle's part in it is unconfirmed.

### Facts that conflict or date the material

- **The 2024 house EXIF date is wrong:** the camera clock reads 2016-11, but edits
  are dated March 2024 and the worksite photos January 2024.
- **The first Le Capri shoot is dated 2018-09,** about seven years before the 2025
  shoot. The foundation calls the return « roughly ten years » later; the year of the
  first intervention is unconfirmed. The legacy portfolio describes that work as a
  50-seat cabaret room (« Création de cabaret »).
- **IHECF or My Digital School:** the old captions name My Digital School for both
  school pages; the server folder and the signage in the photos say IHECF. Martin
  goes with IHECF (2026-10-11).
- Capture months hint at delivery years; they do not prove them.

### Process proof

The received batches also hold worksite photos: before and during the works for
_Arrondir les Angles_, and demolition and January 2024 worksite photos for the
2024 house. They can show site follow-up on [Missions](../site/architecture/missions.md).
