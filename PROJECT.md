# Supply Chain Canada — West · Website Project Documentation

> **Maintainer:** Supply Chain Canada — West · info.ab@supplychaincanada.com  
> **Live URL:** https://www.supplychainprograms.ca  
> **Repository:** github.com/supplychaincanadawest/WestWebsite  
> **Last updated:** May 2026

---

## Table of Contents

1. [The Ambition](#1-the-ambition)
2. [How We Approached It](#2-how-we-approached-it)
3. [Infrastructure & Stack](#3-infrastructure--stack)
4. [Domain Architecture](#4-domain-architecture)
5. [Page Inventory](#5-page-inventory)
6. [Feature Inventory](#6-feature-inventory)
7. [Design System](#7-design-system)
8. [Analytics & Tracking](#8-analytics--tracking)
9. [SEO Strategy](#9-seo-strategy)
10. [Build System](#10-build-system)
11. [Workflow: How Changes Get to Production](#11-workflow-how-changes-get-to-production)
12. [Content & Asset Management](#12-content--asset-management)
13. [External Integrations](#13-external-integrations)
14. [Future Expansion Scope](#14-future-expansion-scope)

---

## 1. The Ambition

Supply Chain Canada — West is the regional institute of Supply Chain Canada, serving 2,500+ procurement, logistics, and operations professionals across Alberta and British Columbia. The national body has its own web presence. What was missing was a **Western Canada-specific digital home** — somewhere that speaks to the regional community, promotes the flagship conference, and gives the institute its own identity that feels distinct from (but clearly connected to) the national brand.

The goals were:

- **Conference-first.** The West Futures Conference (October 2, 2026 at River Cree Resort, Edmonton) is the institute's primary revenue event and community gathering point. The entire site is built to support registrations, sponsor conversations, and speaker interest.
- **Association credibility.** The site needed to communicate the legitimacy of the institute — its board, mandate, scope, and connection to a 100+ year-old national body — so that both practitioners and sponsors feel confident engaging.
- **Low operational overhead.** The team is lean. The site cannot require a developer on standby to update a price, swap a logo, or add a speaker. Everything that changes frequently either auto-updates or is trivial to edit.
- **Zero ongoing cost.** Free tier Vercel handles hosting. No servers, no managed databases, no subscriptions beyond the domain.
- **Future-proofable.** The architecture is simple HTML/CSS/JS, meaning tools, calendars, and member resources can be layered on without re-platforming.

---

## 2. How We Approached It

### Structural philosophy

Every page has a single job. The home page converts visitors into registrants or leads. The about page establishes trust. The conference page closes the sale. The events page teases the broader calendar and captures newsletter interest.

We avoided a CMS entirely. A CMS would introduce dependencies, subscriptions, security surface area, and friction for a site where content changes are infrequent and the team is technical enough to edit a file directly. Plain HTML is perfectly readable, version-controlled, and fast.

### Design language

The brand is Supply Chain Canada — West, which means it borrows the national palette (red #ED1C24, near-black) but needs enough regional identity to feel like its own thing. We used **Barlow Condensed** (a compressed grotesque) for all display and heading type — it's high-impact, reads as "authority" at large sizes, and compresses elegantly on mobile. Body copy uses Barlow. Timestamps and monospaced labels use JetBrains Mono.

Dark mode is supported everywhere. Most supply chain professionals work on laptops in offices and appreciate a dark option. The toggle persists across sessions via localStorage.

### How the chatbot fits in

The "Ask West" bot (floating button, bottom-right) is a fully **offline rules engine** — no API calls, no backend, no cost. It has a knowledge base of ~30 topics covering the conference, membership, speakers, pricing, venue, refunds, CPD credits, career advice, logistics, tariffs, AI, ESG, and Western Canada geography. The fallback response connects any unanswered question back to the conference. It functions as a 24/7 concierge that never goes down and costs nothing to run.

### How sponsorship and representation logos work

Logos are self-managing. There are two folders:

- `assets/sponsors/` — logos of organizations that paid to sponsor West Futures
- `assets/Company Representation/` — logos of organizations that have sent delegates to past conferences

Dropping a logo file into either folder and pushing to GitHub triggers a Vercel build that runs `scripts/generate-manifest.js`, which scans both folders and writes a `manifest.json` listing every image. The carousels and grids on the site fetch these manifests at runtime and render whatever is there. No code changes needed when logos are added or removed.

---

## 3. Infrastructure & Stack

```
┌─────────────────────────────────────────────────────────────────────┐
│  Domain Registrar (supplychainprograms.ca + all redirect domains)   │
│  DNS: CNAME → cname.vercel-dns.com                                  │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Vercel (serverless static hosting, free tier)                      │
│  • Automatic HTTPS (Let's Encrypt)                                  │
│  • Global CDN edge network                                          │
│  • Build hook: node scripts/generate-manifest.js                    │
│  • cleanUrls: true (removes .html extensions)                       │
│  • Cache headers: 1-year for assets, no-cache for HTML              │
│  • Vercel Web Analytics + Speed Insights (built-in)                 │
│  • Preview deployments on every PR branch                           │
└───────────────────────────┬─────────────────────────────────────────┘
                            │ deploys from
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│  GitHub (supplychaincanadawest/WestWebsite)                         │
│  • Main branch = production                                         │
│  • Feature branches → PR → Vercel preview → merge → live           │
│  • Claude Code (AI) connected to repo via GitHub integration        │
│  • All changes tracked, reversible, auditable                       │
└─────────────────────────────────────────────────────────────────────┘
                            │ references
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│  National SCC (supplychaincanada.com)                               │
│  • Registration portal: abportal.supplychaincanada.com              │
│  • Membership portal: supplychaincanada.com/membership              │
│  • All payments, registrations, and member accounts handled there   │
│  • This site is pure frontend — no auth, no database                │
└─────────────────────────────────────────────────────────────────────┘
```

### Why this stack

| Factor | Why it works here |
|--------|------------------|
| **Cost** | Vercel free tier is sufficient. No servers to manage, no database bills, no CDN subscriptions. |
| **Performance** | Static HTML served from edge nodes globally. No server-side rendering latency. Lighthouse scores consistently 90+. |
| **Reliability** | No backend = nothing to go down. Vercel has 99.99% uptime SLA even on free tier. |
| **Security** | No database, no auth surface, no backend. HSTS + security headers set in vercel.json. |
| **Workflow** | GitHub → Vercel integration means every push auto-deploys. Preview URLs on every PR. |
| **Reversibility** | Git history means any change can be reverted in seconds. |

---

## 4. Domain Architecture

The primary domain is **supplychainprograms.ca**, registered with a domain registrar. All other related domains are also registered at the same registrar and forward via DNS redirect to the primary.

```
supplychainprograms.ca          ← primary (Vercel CNAME)
sccwest.ca                      ← redirects to supplychainprograms.ca
supplychainwest.ca              ← redirects to supplychainprograms.ca
[any other registered variants] ← redirects to supplychainprograms.ca
```

Domain forwarding is configured at the registrar level (HTTP 301 redirects), so visitors reaching any variant URL land on the canonical domain. This protects brand consistency and consolidates SEO authority to one domain.

**DNS configuration for primary domain:**
- A record or CNAME pointing to `cname.vercel-dns.com` (Vercel's DNS target)
- Vercel handles SSL certificate provisioning automatically via Let's Encrypt

**Email:**
- `info.ab@supplychaincanada.com` — general inquiries
- `thoang@supplychaincanada.com` — sponsorship and speaking
- Both are national SCC email accounts, not hosted on this domain

---

## 5. Page Inventory

### `index.html` — Home

**Purpose:** Convert first-time visitors into conference registrants or email leads. Establish the institute's identity in the Western Canada supply chain community.

**Sections:**
| Section | What it does |
|---------|-------------|
| Topbar | Persistent announcement bar: Early Bird pricing deadline + register link |
| Nav | Fixed header: Logo, About / Events dropdowns, Membership + Register CTAs |
| Ticker | Marquee strip: conference stats, event date, early bird reminder — always visible |
| Hero | Main headline, subtext, 4 stat pills (date, venue, attendees, CPD), 3 CTAs |
| Stats grid | 4 numbers: 2,500+ members, 15+ speakers, 300+ attendees, 10 CPD credits |
| Spotlight | Video embed (2025 recap), conference overview, 4-column facts |
| About strip | Brief "who we are" + link to about.html |
| Why Attend | 3 cards: Intelligence, Network, Credentials — value proposition |
| Testimonials | 7-card horizontal auto-scroll carousel, pauses on hover/touch |
| Sponsors carousel | Auto-loads from `assets/sponsors/manifest.json`, infinite scroll |
| Company Representation carousel | Auto-loads from `assets/Company Representation/manifest.json`, grayscale, slower scroll |
| Final CTA | "Be in the room" — 3 buttons + email lead capture form |
| Footer | 4-column: Institute / Conference / Connect + contact info |
| Mobile CTA bar | Fixed bottom: countdown timer (d/h/m/s) + Register button |
| Ask West bot | Floating bottom-right chatbot |

---

### `about.html` — About

**Purpose:** Establish credibility and explain the institute's mandate, governance, and contact details.

**Sections:**
| Section | What it does |
|---------|-------------|
| Hero | Headline + swimlane strip explaining regional vs. national scope |
| Mandate (01) | 3 pillars: Advance the profession / Convene the network / Support national mission |
| Leadership (02) | Board of Directors image (full Canva design) |
| Contact (03) | Two cards: General (PO Box, phone, email) + Sponsorship/Speaking (Thuy) |

---

### `events.html` — Events

**Purpose:** Surface the conference as the flagship event; tease the broader 2026 calendar; capture newsletter subscribers.

**Sections:**
| Section | What it does |
|---------|-------------|
| Hero | Breadcrumb, heading, "all eyes on Oct 2" subtext |
| Flagship event card | Video, date overlay, meta grid, Conference Site + Register buttons |
| Coming Soon grid | 4 cards: Supply Chain Week BC / Chapter Mixers / Awards Gala / Member Briefings |
| Subscribe CTA | Email capture + lead form (notify-me variant) |

---

### `events/futures-conference-2026.html` — Conference

**Purpose:** Full conference detail page. The primary conversion page. Everything a potential attendee, sponsor, or speaker needs to make a decision.

**Sections:**
| Section | What it does |
|---------|-------------|
| Topbar | Early Bird banner |
| Hero | Video background, countdown to Oct 2, meta pills, 3 CTA buttons |
| Trust strip | 5 stats: 300+ attendees, 30+ sponsors, 10 CPD, 2nd annual, 1 day |
| About the Conference | Paragraph + 3-column benefits grid |
| 2025 Recap | Embedded video with play overlay |
| Focus Areas | 6 theme cards (Resilience / Sustainability / Tech / Talent / Trade / Cost) |
| Speakers | 3D flip cards: front = photo/name/title, back = full bio + topic, auto-scroll bio |
| Agenda | Time-tagged session list, 8 items from 7:30 AM to 5:00 PM |
| Premier Sponsors | Auto-loads all logos from `assets/sponsors/`, white-bg tiles grid |
| Company Representation | Auto-loads 115 logos from `assets/Company Representation/`, tier-sorted |
| Sponsorship CTA | Dark section: value prop + "Become a sponsor" / "Request prospectus" |
| Venue | River Cree Resort card + photo, hotel rate, Air Canada promo code, group bundles |
| Pricing | 3 tiers: Student $399 / Member $649 (EB) → $799 / Non-Member $799 (EB) → $999; auto-updates at midnight June 1 |
| Thuy card | Contact card for Thuy Hoang (sponsorship + speaking) |
| FAQ | 10 accordion items covering registration, CPD, refunds, hotel, Air Canada, groups, speakers |
| Final CTA | Register prompt + email lead form |
| Convince Your Boss | Button opens native email client with pre-composed approval request email |

---

## 6. Feature Inventory

### Navigation & Chrome (`site-chrome.js`)

- **Fixed topbar** — announcement bar with Early Bird deadline; height tracked dynamically via ResizeObserver so nav sits flush below it on all screen sizes
- **Desktop nav** — logo, About/Events with dropdowns, Membership (ghost), Register (solid red)
- **Mobile drawer** — full-screen slide-out on burger tap; closes on Escape, link click, or outside tap
- **Mobile CTA bar** — fixed bottom, visible only on mobile: countdown timer + Register button
- **Scroll progress bar** — 3px red gradient bar at top tracks reading progress
- **Dark mode toggle** — moon/sun icon, persists via `localStorage['scc-theme']`
- **Reveal animations** — Intersection Observer triggers fade-in + slide-up on scroll for all `.reveal` elements
- **Smooth anchor scroll** — click any `#anchor` link, page scrolls with offset accounting for topbar + nav height

### Countdown Timers

Two timers on the site:
1. **Conference countdown** (conference page hero) — counts down to October 2, 2026 at 8:00 AM MDT
2. **Early Bird countdown** (mobile CTA bar on all pages) — counts down to May 31, 2026 at 11:59 PM MDT

Both display `d / h / m / s` and update every second.

### Auto-Pricing Update

On the conference page, pricing automatically updates at midnight June 1, 2026 MDT:
- Member: $649 → $799
- Non-Member: $799 → $999
- Student stays at $399

No manual update needed. Logic runs client-side via `Date.now()` comparison.

### Sponsor & Logo Carousels

**Home page — Sponsors carousel:**
- Fetches `assets/sponsors/manifest.json`
- Renders logos in white-bg tiles, infinite horizontal scroll at 40s/cycle
- Full colour on hover; grayscale default

**Home page — Company Representation carousel:**
- Fetches `assets/Company Representation/manifest.json`
- Smaller tiles, grayscale/45% opacity, 110s/cycle (slower, more ambient)
- Visually distinct from sponsor carousel (sponsors paid; company rep is recognition)

**Conference page — Premier Sponsors grid:**
- Same manifest as sponsor carousel
- Displayed as a static responsive grid, white tiles, hover lift

**Conference page — Company Representation grid:**
- 115 logos, tier-sorted (major brands: RBC, Rogers, Shell, Microsoft, IBM, Air Canada float to top)
- White-bg tiles maintained in dark mode

### Speaker Flip Cards

3D CSS flip cards for confirmed speakers:
- Front: Photo, name, title, org, "▸ Bio" cue
- Back: Full bio text, role, topic — auto-scrolls at 0.4px/frame when flipped
- Touch: tap anywhere except the bio to flip; scroll the bio without flipping back
- Hover (desktop): flips automatically on hover

### Ask West Chatbot

Fully offline rules engine, no API:
- ~30 knowledge-base topics
- Categories: conference content, pricing, venue, speakers, agenda, CPD, membership, career/jobs, networking, sponsorship, tariffs, AI, ESG, talent, procurement, logistics, Western Canada geography
- Fallback routes any unanswered question back to the conference as the answer
- "Convince My Boss" chip generates a pre-composed approval email via `mailto:`
- Markdown rendering (bold, links, bullet lists)
- Quick-action chips for common questions
- Persists conversation within session

### Convince Your Boss (conference page)

Button triggers native OS email client:
- Pre-fills subject: `Approval Request — Attending the 2026 West Futures Conference (Oct 2, Edmonton)`
- Pre-fills full draft body with ROI bullet points
- Placeholder markers `[MANAGER'S NAME]` / `[YOUR NAME]` / `[YOUR TITLE]` for personalisation
- Works on Gmail, Outlook, Apple Mail, any mailto-capable client

### Lead Capture Form (`lead-form.js`)

Reusable `<div data-scc-lead>` component, three variants:
- `card` — white card with red border (used on events pages)
- `cta` — red gradient (used in final CTA section)
- `strip` — inline horizontal (used in tight spaces)

Collects: name, email, phone, org, notes. Submits via `mailto:info.ab@supplychaincanada.com`. No backend required.

---

## 7. Design System

### Typography

| Role | Font | Weight | Style |
|------|------|--------|-------|
| Display / headings | Barlow Condensed | 700–900 | Uppercase |
| Body copy | Barlow | 300–600 | Normal |
| Labels / mono | JetBrains Mono | 400–500 | Uppercase, tracked |

### Colour Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--red` | `#ED1C24` | Primary brand, buttons, accents |
| `--red-deep` | `#C41019` | Button hover |
| `--orange` | `#F47A20` | Gradient accent |
| `--gold` | `#F0B429` | Highlights, stars |
| `--ink` | `#1A1B1F` | Heading text (light mode) |
| `--muted` | `#5A5552` | Secondary text |
| `--line` | `#E7E3E1` | Borders, dividers |
| `--soft` | `#F7F4F0` | Card backgrounds |
| `--white` | `#FFFFFF` | Page background |

Dark mode inverts `--white`, `--soft`, `--paper`, `--ink`, `--muted`, `--line`. Red, orange, gold stay constant.

### Button Classes

| Class | Appearance | Use |
|-------|-----------|-----|
| `.pill-btn.solid` | Red fill, white text | Primary CTA |
| `.pill-btn.ghost` | Transparent, red border | Secondary CTA |
| `.pill-btn.ghost-light` | Transparent, white border | On dark backgrounds |
| `.pill-btn.solid-light` | White fill, dark text (#0A0B0C) | On red/coloured backgrounds |

### Layout

- `.wrap` — max-width 1440px, auto side margins, 40px horizontal padding (20px mobile)
- CSS Grid and Flexbox throughout — no float layouts
- Responsive via `clamp()` for fluid typography and `auto-fill`/`auto-fit` grid columns

---

## 8. Analytics & Tracking

### Vercel Analytics (built-in, free)

Present on all four pages:
```html
<script defer src="/_vercel/insights/script.js"></script>
```
Tracks: page views, unique visitors, referrers, device type, browser, country.
Dashboard: vercel.com → project → Analytics tab.

### Vercel Speed Insights (built-in, free)

```html
<script defer src="/_vercel/speed-insights/script.js"></script>
```
Tracks: Core Web Vitals (LCP, CLS, FID/INP), per-page performance over time.

### Google Search Console

Registered and verified. Tracks:
- Search queries driving traffic to the site
- Click-through rates from Google search results
- Indexing status for all pages
- Core Web Vitals from Google's perspective
- Sitemap submission and processing status

### No Third-Party Trackers

No Google Analytics UA/GA4, no Facebook Pixel, no LinkedIn Insight Tag. All tracking is first-party (Vercel) or Google's search-side view (Search Console). No cookies are set by this site.

---

## 9. SEO Strategy

### Domain & URL structure

- Primary domain: `supplychainprograms.ca`
- Clean URLs: `/about` not `/about.html` (Vercel `cleanUrls: true`)
- No trailing slashes: `/events` not `/events/`
- All redirect domains 301 → primary to consolidate authority

### On-page SEO

Every page has:
- Unique `<title>` and `<meta name="description">`
- Canonical `<link rel="canonical">` pointing to primary domain
- Open Graph tags (title, description, image, URL) for social sharing
- Twitter card (`summary_large_image`)
- Geo meta tags (region CA-AB, coordinates for Edmonton)
- `robots` meta: `index, follow`

### Structured data (JSON-LD)

| Page | Schema types |
|------|-------------|
| index.html | Organization, LocalBusiness, WebSite, BreadcrumbList, FAQPage |
| about.html | AboutPage, Organization (with parentOrganization) |
| events.html | BreadcrumbList |
| futures-conference-2026.html | Event, FAQPage, BreadcrumbList |

The **Event schema** on the conference page includes start/end datetime, location (River Cree Resort), organizer, and pricing offers — enabling Google rich results for the event in search.

### Sitemap & robots.txt

- `/sitemap.xml` — lists all pages, cached 24h
- `/robots.txt` — standard allow-all configuration
- Both submitted to Google Search Console

### Performance (SEO signal)

- Static HTML from CDN edge = fast TTFB
- Images use `loading="lazy"` (defer off-screen images)
- Scripts use `defer` (don't block parse)
- Assets cached 1 year immutable (repeat visitors load instantly)
- Fonts preconnected (`<link rel="preconnect">`)

---

## 10. Build System

The only build step is `scripts/generate-manifest.js`, which runs on every Vercel deploy:

```js
// For each of: assets/sponsors/ and assets/Company Representation/
// 1. Read directory
// 2. Filter for image files (.png .jpg .jpeg .webp .svg)
// 3. Write manifest.json: { "logos": ["file1.png", ...] }
```

This is what makes logo management zero-code:
1. Drop a logo file into `assets/sponsors/` or `assets/Company Representation/`
2. Push to GitHub
3. Vercel triggers a build → manifest regenerates → carousel/grid updates

No npm, no bundler, no transpiler. The site is plain HTML/CSS/JS and runs as-is in any browser.

---

## 11. Workflow: How Changes Get to Production

```
1. Claude Code (AI) or human developer makes changes on a feature branch
        ↓
2. Branch pushed to GitHub → Vercel auto-creates a Preview deployment
        ↓
3. Preview URL shared for review (e.g., west-website-git-feature-branch.vercel.app)
        ↓
4. Pull Request opened → CI check runs (Vercel Preview Comments bot confirms deploy)
        ↓
5. PR merged to main
        ↓
6. Vercel detects merge → runs build (generate-manifest.js) → deploys to production
        ↓
7. Live at supplychainprograms.ca within ~30 seconds
```

**Claude Code integration:** Claude Code (Anthropic's AI coding assistant) is connected to this repository via the GitHub integration. It can read code, make changes on feature branches, open PRs, and monitor CI — allowing non-developer team members to describe what they want in plain language and have changes committed, reviewed, and merged.

---

## 12. Content & Asset Management

### What lives in the repo (and therefore needs a push to update)

| File | What changes |
|------|-------------|
| `index.html` | Home page copy, testimonials, stats |
| `about.html` | Board image, mandate copy, contact details |
| `events.html` | Upcoming event cards |
| `events/futures-conference-2026.html` | Speaker bios, agenda, pricing, FAQ |
| `assets/site-chrome.js` | Nav links, topbar message, footer copy, contact URLs |

### What auto-updates (drop file + push, no code change)

| Asset | Where to drop the file |
|-------|----------------------|
| Sponsor logos | `assets/sponsors/` |
| Company representation logos | `assets/Company Representation/` |

Logo formats accepted: `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`

### Speaker photos

Stored in `assets/speakers/`:
- `mark-parsons.jpg` (ATB Financial Chief Economist)
- `ian-gonzalez.jpg` (SC&P Analytics)
- `siobhan-chinnery.jpg` (Bee Grateful Management)

To add a new speaker: add photo to `assets/speakers/`, add their entry to the `speakers` array in `futures-conference-2026.html`.

### Board of Directors image

`assets/Board of Directors - SCC West.png` — the full Canva design. Replace this file to update the leadership section on about.html.

---

## 13. External Integrations

| Service | URL / Code | Purpose |
|---------|-----------|---------|
| Registration portal | `abportal.supplychaincanada.com` | All conference registrations, payments, attendee management |
| National SCC | `supplychaincanada.com` | Membership applications, SCMP designation, national programs |
| Vercel Analytics | `/_vercel/insights/script.js` | Page views, traffic sources |
| Vercel Speed Insights | `/_vercel/speed-insights/script.js` | Core Web Vitals |
| Google Search Console | Registered externally | Search visibility, indexing, clicks |
| Air Canada | Promo code: `YQ6XKBC1` | 15% off flights to YEG, Sept 30 – Oct 4, 2026 |
| Video CDN | `sc1.cwasylishen.workers.dev` | Conference recap video (Cloudflare Workers) |
| Google Fonts | `fonts.googleapis.com` | Barlow Condensed, Barlow, JetBrains Mono |
| River Cree Hotel | `1-844-425-2733` | Conference hotel rate $189/night (Oct 1–2) |

---

## 14. Future Expansion Scope

The current site covers the conference and association identity. Below are planned and potential extensions — all buildable on the same zero-cost static architecture.

### Near-term (2026)

- **Supply Chain Week BC** — dedicated event page (parallel to the Futures Conference page) once dates and venue are confirmed
- **Awards Gala page** — details for the 2026 Gala embedded in the Futures Conference evening program
- **Speaker profiles** — individual `/speakers/[name].html` pages with full bio, session details, and LinkedIn
- **Chapter events calendar** — rolling list of AB and BC chapter mixers with registration links

### Medium-term

- **Professional Development hub** — page listing SCMP designation requirements, study resources, national CPD calendar, and links to the SCC national learning portal
- **Member resources section** — gated or ungated library of supply chain reports, templates, and briefings from national SCC
- **Sponsor prospectus page** — interactive / downloadable sponsorship deck with tier details, ROI case study, and direct contact form
- **Past conference archive** — photo galleries, recap videos, and slide libraries from previous West Futures years

### Longer-term

- **Supply chain tools** — lightweight browser-based tools useful to practitioners: carbon footprint estimators, supplier risk checkers, CPD credit trackers, salary benchmarks
- **Job board integration** — curated supply chain roles in Western Canada, posted by member organizations
- **Event API feed** — machine-readable events feed that chapter websites and member newsletters can pull from
- **Multi-language support** — French content for national alignment and BC's francophone community

### Architecture notes for expansion

All of the above can be built as additional static HTML pages on the same repo/domain, or as separate pages loaded from external sources via `fetch()`. The site does not need a backend to add any of these features. If form data collection beyond `mailto:` is needed in the future, Vercel offers form handling (Vercel Forms) that works with the existing static setup, or a service like Formspree can be dropped in with a single line of HTML.

The chatbot (`convince-bot.js`) is designed to be extended: adding a new topic is one object in the `KB` array. As the institute's programming expands, the bot's knowledge base can grow without any infrastructure changes.

---

*This document is version-controlled alongside the codebase. Update it when significant structural changes are made to the site, infrastructure, or product direction.*
