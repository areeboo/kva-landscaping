# KVA Landscaping — Review Checklist

**57 raw findings from 4 agents → 38 deduped items** organized by theme. Pick by number — I'll apply the picks.

Effort: **XS** <15min · **S** 30–60min · **M** 1–3h · **L** >3h
Confidence: agents reported almost all as **High** or **Med**; cluster confidence shown.

---

## ⚠️ Conflicts with your earlier direction (3 items — agents didn't know)

Agents flagged these as wins, but you explicitly removed owner-name + Class A earlier today. **Skip unless you've changed your mind:**

| # | Conflict | Agent finding |
|---|---|---|
| ~~A~~ | Add "Class A Licensed VA" back to hero trust strip + chip | design-04, design-12 (Class A is a category-leading differentiator NoVA competitors use to dominate) |
| ~~B~~ | Re-attribute About quote to "Victor Amaya, Owner" | conv-11 (named-owner trust is a documented conversion lever) |
| ~~C~~ | Add Victor / crew portrait in About section | design-13 (competitors use crew portraits to humanize) |

If you want to revisit either: agents argue *strongly* that "Class A Licensed" is the single most-cited differentiator NoVA competitors use, and that anonymous brand-voice quotes carry less weight than named-owner ones. Your call.

---

## 🔥 Tier 1 — Quick wins (XS effort, High confidence)

| # | Item | Why | Source |
|---|---|---|---|
| 1 | Drop misleading "168+ **five-star** reviews" → "165+ reviews · 4.7★ avg" everywhere (hero trust strip + Reviews headline) | Thumbtack's 158 are 4.6, not 5 — overclaim risks credibility if skeptic verifies | conv-08, design-03 |
| 2 | Change hero primary CTA from "Get a Free Estimate" → "Free On-Site Walk-Through" + microcopy "Senior crew lead, real number, ~1-business-day response" | Mirrors process step 1 verbatim, more differentiated than generic competitor CTAs | design-12 |
| 3 | Lift the buried "Have us walk the property — free" footnote in Services into a real secondary CTA button | High-intent low-friction path for "not sure" buyers — currently typeset as a footnote | conv-07 |
| 4 | Promote response-time copy from "within one business day" → "Usually replies within an hour during business hours" on form pill + hero subhead | Brand brief documents real ~1hr Thumbtack response; speed-to-lead triples conversion vs. 5min | conv-01 |
| 5 | Rename form service checkboxes to mirror customer language ("Paver patio or walkway (new or re-level)", "Mulch + bed cleanup", etc.) instead of slash-joined internal labels | Reviews repeatedly use these exact phrases; matching language reduces hesitation | conv-03 |
| 6 | Add `sms:` link next to `tel:` in EstimateForm contact block + helper text "Text or call is fine" | 5/7 Google reviews praise communication; success copy already promises text-or-call | conv-12 |
| 7 | Make Top Pro 2025 badge a real link to Thumbtack profile + add tooltip "Awarded to ~3% of Thumbtack pros" | Currently looks self-claimed; external verifiability is a trust lever | conv-06 |
| 8 | Hero subhead bump: drop `text-kva-cream/85` → 100%, deepen hero gradient to `from-kva-ink/85 via-kva-ink/65` | Subhead washes into bright-grass photo on hero | conv-13 |
| 9 | Drop "Three honest steps. / No surprises." → plainer "Estimate → Plan → Build" or "How a KVA job goes" | "No surprises" is the corporate-defensive register brand brief explicitly rules out | design-08 |
| 10 | Cut one of the two duplicate pinging-dot animations (keep on hero, drop in EstimateForm) | Same animation in two places becomes a tic; brand brief says motion should be subtle | design-10 |
| 11 | Update portfolio image alts in content.json to include city+service ("Freshly mowed striped lawn in Sterling, VA — KVA Landscaping") | Currently only 1 of 4 alts has city; local-cue alts help image SEO | seo-09 |
| 12 | Add canonical `image[]` array to JSON-LD (hero + 4 portfolio + logo) instead of single string | Schema.org/Google rich-result docs prefer arrays for businesses | seo-04 |
| 13 | Add `GeoCircle` (geoMidpoint + 10mi radius) + `City[]` to `areaServed` in JSON-LD; drop non-standard `PostalCodeSpecification` | Current schema fails Schema.org spec; cities are stronger ranking signal than ZIPs | seo-02 |
| 14 | Bump page `<title>` from brand-first to intent-first: "Landscaping in Sterling, VA — Lawn Care, Patios & Design \| KVA" | All ranking competitors front-load city+service; brand belongs at end for non-brand queries | seo-07 |
| 15 | Promote Footer column h4 headings to h3 (heading-order Lighthouse + Axe failure, only WCAG bug site-wide) | Page skips h2 → h4 with no h3; screen-reader rotor jumps confusingly | a11y-03 |
| 16 | Add focus-visible ring to Portfolio mosaic tiles, Nav links, and tel CTA (forest/gold ring like primary CTA already has) | WCAG 2.4.7 fail — keyboard users can't see focus on dark hero | a11y-06, a11y-07 |
| 17 | Wrap `html { scroll-behavior: smooth }` in `@media (prefers-reduced-motion: no-preference)` | WCAG 2.3.3 + MDN guidance — one-line fix | perf-04 |
| 18 | Remove `Geist_Mono` import + `--font-kva-mono` (declared but unused anywhere) | Saves one font preload + ~25–40 KB woff2 per page load | perf-05 |
| 19 | Replace deprecated `priority` prop on hero Image with `preload` + explicit `fetchPriority="high"` | Lighthouse LCPDiscovery insight failed fetchpriority check; load delay 497ms dominant LCP | perf-01 |
| 20 | Tighten hero Image `sizes="100vw"` → breakpoint-capped expression + drop quality 85→75 | Currently downloads 4K JPEG candidate on 390px screen | perf-02 |
| 21 | Tighten color-contrast: bump `text-kva-cream/60` → `/75` and `--kva-stone` from L0.52 → L0.42 | Two AAA fails near AA edge (4.6:1); push to AAA 7:1 for homeowner audience | a11y-08 |
| 22 | Bump Portfolio lightbox close button h-10 → h-11 (40px → 44px, safer tap target on phones with notch) | Apple HIG / Material both 44px; current is mobile escape route | a11y-09 |

---

## 🎨 Tier 2 — Brand & content polish (S effort)

| # | Item | Why | Source |
|---|---|---|---|
| 23 | Crop the brick-home-shrubs portfolio photo to remove parked cars / trash bins / mailbox in frame | Currently breaks editorial premium feel; brand brief: "warm, natural" framing | design-02 |
| 24 | Restructure portfolio mosaic to 2×2 grid (or before/after pair + 2-up) — current 1-big-3-thumb layout leaves dead grid space on desktop AND collapses on mobile | Only 4 photos; asymmetry reads "they ran out of work" | design-05, design-15 |
| 25 | Build a labeled Before/After pair from lawn-before + lawn-after — Portfolio H2 promises "Real before and after" but layout doesn't deliver | Data tagged in content.json; visual UI doesn't show the relationship | design-06 |
| 26 | Reduce italic-gold H2 accent overuse — currently every section H2 uses it, becomes a tic. Keep for Hero + 1-2 marquee sections only | Brand brief: serif accent should be expressive, not formulaic | design-11 |
| 27 | Collapse 8 background-color flips to 3-tone rhythm (cream paper everywhere except Process forest + EstimateForm ink); use hairline divider for Portfolio/Footer | Page reads as banded stripes vs intentional rhythm | design-14 |
| 28 | Wrap app in `<MotionConfig reducedMotion="user">` in app/layout.tsx (one-line fix, strips transform animation for users with OS preference) | WCAG 2.3.3 — currently zero reduced-motion handling across 8 motion-using sections | a11y-01 |
| 29 | Add autoComplete + inputMode to all form inputs (name="name", phone="tel"+inputMode="tel", email="email"+inputMode="email", address="street-address") | WCAG 1.3.5 + mobile keyboards switch correctly | a11y-04 |
| 30 | Wire form errors with aria-describedby + aria-invalid (currently error text not associated with input for screen readers) | WCAG 3.3.1 + 4.1.3 | a11y-05 |
| 31 | Bump body text contrast: drop `/90` and `/70` opacity modifiers on text-kva-stone in Services + ServiceArea (pushes some sub-AA at ~4.0:1) | WCAG 2.2 AA requires 4.5:1 | design-09 |
| 32 | Drop address field from required → optional, change label to "Property address or ZIP" + add helper "Street or just a ZIP is fine — we'll confirm when we call" | Each extra required field cuts completion 5-10%; Thumbtack asks ZIP not full address | conv-05 |
| 33 | Conditionally hide "Snow plowing (seasonal)" between Apr 1 – Oct 1 (or rename "for next winter") | May-listing irrelevant options dilutes form curation | conv-10 |
| 34 | Internal-link each Service card via `href="/services/{slug}"` + add "Learn more about {service title} →" anchor (pairs with Tier 3 #36) | Required for topical-authority crawl + sets up service pages | seo-11 |
| 35 | Bump `app/sitemap.ts` to derive entries from content.json so future service/location URLs auto-include | Currently only ships home URL — sitemap will silently lag launch | seo-08 |

---

## 🏗️ Tier 3 — Bigger structural lifts (M effort)

| # | Item | Why | Source |
|---|---|---|---|
| 36 | Add photo (or full-bleed cover image) to each Service card instead of just a Lucide icon | Buyers shop landscape by photo; competitors all use service-tile photography | design-07 |
| 37 | Add per-city localized prose (1–2 sentences) under each city card in ServiceArea ("Mowing routes through Cascades, Sugarland Run, and Countryside; paver patios behind the older split-levels off Algonkian Pkwy") | Independence Landscape ranks because of named-neighborhood prose; current pills are interchangeable | seo-10 |
| 38 | Add 6–8 question FAQ section to home (estimate turnaround, service radius, snow availability, paver cost range, lawn frequency, payment) + emit `FAQPage` JSON-LD | Reston Pavers, O'Grady's, Outdoor Lifestyles all run FAQ on ranking service pages; surfaces in AI Overviews | seo-05 |
| 39 | Add native `<dialog>` element for Portfolio lightbox (gets focus trap + ESC + backdrop click + inert background for free) | Current div-based modal has no focus trap, no focus restore on close, no inert background | a11y-02 |
| 40 | Re-export brick-home-shrubs.jpg at ≤1600px (currently 233KB, 3× next-largest) + add tighter `sizes="(max-width: 1024px) 100vw, 480px"` on About | Below-fold heavy image + over-wide srcset; both perf wins | perf-03 |
| 41 | Add `Service` JSON-LD block per offering with `provider`, `serviceType`, `areaServed`, `category` (instead of generic Offer wrappers) | Differentiator for AI Overviews / Gemini per local-mighty 2026 guide | seo-03 |
| 42 | Add photo upload field to estimate form (`<input type="file" multiple accept="image/*">`) + Resend email attachment in submit-estimate action | Form currently promises "(photos welcome)" with no upload — friction or "email separately" assumption | conv-04 |
| 43 | Add mobile sticky bottom-bar with `[📞 Call] [Get Estimate]` after Hero + show phone icon in mobile header | 70% home-services search is mobile; header phone is `display:none` <640px currently | conv-02 |
| 44 | Optional scarcity cue near EstimateForm: "Patio + walkway jobs usually booked 2-3 weeks out — call to hold a slot" **(only if Victor confirms it's true)** | Real constraint paired with response speed; brand brief prohibits invented scarcity | conv-09 |
| 45 | Expand About body with one paragraph on "what 9 years in Loudoun has taught us" (clay soil, freeze-thaw, HOA approval, etc.) | Homepage is ~600 words; ranking competitor pages run 800–2,800. Add content competitors can't (because they're regional/franchised) | seo-14 |

---

## 🌐 Tier 4 — Multi-page / off-site (L effort + off-site)

| # | Item | Why | Source |
|---|---|---|---|
| 46 | Ship `/services/[slug]` + `/locations/[city]` page templates and the first 6 pages: paver-patios-leesburg-va, lawn-care-herndon-va, landscape-design-ashburn-va, hardscape-loudoun-county-va, snow-removal-sterling-va, sterling-va | Single-page architecture loses every city×service SERP; ranking competitors all have dedicated pages | seo-01 |
| 47 | **(Off-site / launch checklist)** Once domain live: add website URL to GBP + mirror Services in GBP to match the 6 in content.json | GBP `website: null` per scrape; "website alignment" is top-5 GBP ranking signal per 2026 guides | seo-06 |
| 48 | **(Off-site / launch +30d)** Push 30-day project for owner: respond to all unaddressed Google reviews (only 3/7 have responses), upload 20+ project photos to GBP. Add "Leave a Google review" CTA on Reviews section + 7-day post-job email automation | 158 Thumbtack reviews don't help Google ranking; GBP signals weight 32% of local SEO | seo-13 |
| 49 | Reconcile NAP phone consistency: pick canonical phone (recommend (571) 308-3932 = GBP-listed), update Yelp to match, add a single `<address>` block to Footer | BrightLocal lists NAP consistency as ranking factor; current Yelp alt (571) 316-0293 diverges | seo-12 |

---

## Summary

- **Tier 1 (quick wins):** 22 items — all XS effort, mostly High confidence. Realistic to ship in one afternoon.
- **Tier 2 (polish):** 13 items — S effort, ~1 day total.
- **Tier 3 (lifts):** 10 items — M effort, ~3–5 days.
- **Tier 4 (multi-page):** 4 items — L effort + some off-site, separate sprint.
- **Conflicts:** 3 items superseded by your earlier no-Victor / no-Class-A direction.

**How to approve:** Reply with picks — e.g., "do Tier 1, plus 23 25 28 from Tier 2." Or "all of 1-22, plus 28, 32, 38." I'll execute small ones inline and dispatch Codex Mode 1 for the bigger lifts.
