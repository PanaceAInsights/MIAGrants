# Funding Compass

A verified directory of grants, accelerators and investors for Australian clinician-researchers and academic founders working in melanoma, skin cancer, medtech, biotech and health AI.

**181 entries. Compiled August 2026.** Every entry carries an eligibility verdict for an Australian applicant, a current status, and an honest note about what it will and will not fund.

---

## Deployment

The site is served by GitHub Pages from this repository, at:

```
https://panaceainsights.github.io/MIAGrants/
```

Deployment is automatic. Pages serves the site from the `gh-pages` branch, and `.github/workflows/publish.yml` mirrors the working branch there on every push. Editing a file and pushing is the whole workflow; the site updates in about a minute. Progress is under the **Actions** tab.

Treat `gh-pages` as generated output. Never edit it directly, since each publish overwrites it.

### Generate the real QR code

```bash
python3 make-qr.py https://panaceainsights.github.io/MIAGrants/
```

This writes `qr-code.png`, formatted for projection: pure black on white, error correction level M, four-module quiet zone, no logo. Drop it into slide 17 of the deck and print the URL beneath it as a fallback.

If `qrcode` is not installed: `pip install "qrcode[pil]"`.

### Check it on a phone

Open the site on a phone before the talk. Scan the QR from about the distance of a back row. If it fails, increase the size on the slide rather than adding error correction.

---

## Optional: a shorter URL

`panaceainsights.github.io/MIAGrants` is long to print on a slide. Two options:

- **A custom domain.** Add a file named `CNAME` containing your domain, for example `funding.yagizaksoy.com`, then point a CNAME DNS record at `panaceainsights.github.io`. Enable **Enforce HTTPS** in Pages settings once the certificate provisions.
- **A repository named `PanaceAInsights.github.io`.** That serves at `https://panaceainsights.github.io/` with no subpath, though it uses up your one user-level Pages site.

---

## What is in here

```
index.html            Overview, headline findings, how to use
grants.html           85 non-dilutive schemes, filterable
accelerators.html     41 programs and incubators, filterable
investors.html        55 VCs, angels, university funds, corporate VC
deadlines.html        Every future dated deadline, ordered by urgency
playbook.html         The decision guide, including the prosecution cliff
methodology.html      Sources, corrections and what could not be verified
assets/
  style.css           Design system, light and dark
  app.js              Shared search, filter and sort engine
  data-grants.js      Grant entries
  data-accelerators.js
  data-investors.js
make-qr.py            QR code generator for the slide
.nojekyll             Tells GitHub Pages to serve files as-is
grants-standalone.html  The Grants page as a single self-contained file, CSS
                        and data inlined. Useful offline or on a USB stick
.github/workflows/publish.yml        Mirrors the site to gh-pages on push
```

---

## Editing the data

All content lives in the three `assets/data-*.js` files. Each entry is a plain object, so no build step and no dependencies. To add or change an entry, edit the file, commit and push. Pages redeploys automatically in about a minute.

The shared schema:

| Field | Purpose |
|---|---|
| `n` | Name of the scheme, program or fund |
| `org` | Funder, operator or fund type |
| `cat` | Category, which becomes a filter chip |
| `verdict` | `DIRECT`, `OPEN`, `PARTNER`, `WARM INTRO`, `LOCAL ENTITY`, `CHANGING` or `CLOSED` |
| `amount` | Cheque size or grant range, always with a currency prefix |
| `timing` | Deadline or status. A parseable date like `22 Sep 2026` appears on the Deadlines page |
| `urgent` | `1` marks it as closing soon, which turns the card border red |
| `stage` | Optional. Research, translation, company, and so on |
| `model` | Optional, accelerators. Equity, non-dilutive, training |
| `access` | Optional, investors. How to approach |
| `note` | The substance. What it funds, the catch, the eligibility gate |
| `tags` | Array. Becomes filter chips where two or more entries share a tag |
| `url` | Official page. Makes the card title a link |

**Two rules worth keeping.** Every dollar figure carries `A$` or `US$`, because the directory mixes both. And no figure goes in unless it comes from a primary source, with the entry saying "not published" rather than guessing when the funder does not publish one.

---

## Keeping it current

This directory decays. Several schemes changed status in the twelve months before it was compiled: NHMRC Development Grants paused, the Industry Growth Program paused, MTPConnect became AUScelerate, LaunchVic and Breakthrough Victoria merged into Innovation Victoria, and NIH abolished foreign subawards.

A sensible review cadence is quarterly for deadlines, and annually for everything else. The `methodology.html` page lists what could not be verified, which is the natural place to start a review.

---

## Verdict codes

| Code | Meaning for an Australian applicant |
|---|---|
| **DIRECT** | Your institution or company can be the prime applicant |
| **OPEN** | Genuine open door: a portal, form or published contact |
| **PARTNER** | You can join, usually unfunded or capped, but cannot lead |
| **WARM INTRO** | Real but gated. No cold-approach path exists |
| **LOCAL ENTITY** | Requires incorporating in the funder's jurisdiction. A subsidiary is often not enough |
| **CHANGING** | Status shifts on a known date |
| **CLOSED** | Not available. Listed because it is commonly assumed to be open |

---

## Licence and disclaimer

Content compiled from public sources, August 2026. General information only, and not legal, financial or investment advice. The author is not a patent attorney and not a financial adviser. Verify eligibility, amounts and deadlines directly with each funder before acting.

Compiled by Dr Yagiz Alp Aksoy, Senior Research Fellow, The Daffodil Centre, University of Sydney.
