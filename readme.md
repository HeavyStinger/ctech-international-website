# Ctech International — Design System

**Concept: "Deep space HUD."** A dark-void tech aesthetic — NOT a colorful nebula theme. One accent color (cyan) against near-black, glow instead of drop shadows, sharp/minimal corners, and a shimmering gradient headline as the single signature hero moment. Extracted from the live ctechintl.com "Coming Soon" page; it is the established brand language.

## Company context
- **Ctech International** — web development studio in Belize City, Belize. Solo owner + one graphic designer. Formal brand for a few months; owner has built sites/apps since college.
- **Contact:** +501 606-3532 · info@ctechintl.com · ctechintl.com (currently a Coming Soon placeholder)
- **Services:** website/web-app development, custom builds, hosting (99.9% uptime), custom-domain email, Google Business Profiles, print design (business cards, flyers, posters, banners, billboards, t-shirts). AI Automation is listed but NOT launched — "coming soon".
- **Products (one brand family, three properties):**
  - **Tapt** — NFC smart business cards (digital card, Google-review boosting, digital menus; WiFi-sharing planned)
  - **Tesseract** — premium Linktree alternative, priced under competitors
  - **ctechintl.com** — main site; #1 goal is inbound lead generation; primary CTA "Book a Consultation"
- **Pricing model:** Starter subscription (99 BZD/mo + 100 BZD/yr domain, single tier, Ctech controls the domain) vs. Custom Build (700 BZD one-time + 500 BZD/yr hosting, full ownership). Shown side-by-side in a future "Build Your Site" configurator — **configurator build is deliberately deferred; do not spec its UI until told**.
- **Branding policy:** every site Ctech ships carries a "Powered by Ctech International" footer credit.
- **Sources:** `uploads/Ctech International/ctech-design-system.md` (token extraction from live site) and `uploads/Ctech International/ctech-international.md` (business knowledge base). No Figma, no codebase, no logo files provided.

## No logo
No logo asset was provided. **Do not draw one.** Render "Ctech International" (or "CTECH") in plain Outfit type wherever a mark would go.

## CONTENT FUNDAMENTALS
- **Tone:** confident, direct, premium-minimal. Short declarative lines; the emptiness does the talking.
- **Casing:** Title Case for headlines and buttons ("Book a Consultation"); ALL-CAPS only for small eyebrow labels ("COMING SOON").
- **Voice:** "we/you" — a studio speaking to a client. No jargon walls; plain benefit language ("make it look so cool and nice" energy, professionally phrased).
- **No emoji.** Ever. The HUD aesthetic is emoji-free.
- **Numbers/claims stated flatly:** "99.9% uptime", "99 BZD/month" — no exclamation points.
- **CTA copy:** verbs first — "Book a Consultation", "Build Your Site", "View Portfolio".

## VISUAL FOUNDATIONS
- **Color:** near-black page (`--space-black` #05080F), slightly lifted panels (#080C16), cool slate borders (#1D283A). Cyan #00CCFF is the ONLY accent — never introduce purple/pink/second hues; restraint is what keeps the glow premium instead of gamer-RGB. Text: #F8FAFC primary, #94A3B8 secondary.
- **Type:** Outfit everywhere (headings + body). Hero = 700 weight ~80px with the shimmer gradient (`.shimmer-text`) — ONE per page max. h2/h3 solid `--text-primary` 600–700. Body 400. Eyebrow 16px/400/normal tracking, often ALL-CAPS.
- **Glow, not shadows:** elevation and interactivity are expressed with layered cyan glows (`--glow-cyan`, `--glow-cyan-strong`). No drop shadows.
- **Shape:** buttons 4px radius — never pills. Cards always 12px radius, 1px `--glass-border`, liquid-glass fill.
- **Backgrounds:** flat void. Heroes use the interactive star-field sky (`components/brand/hero.css` + `hero.js`): procedural twinkling stars, subtle mouse parallax, chart-style constellations (Cassiopeia, Lyra, Cygnus + believable fillers) and the hidden 16-star Tesseract asterism — calm, never flashy; constellations brighten softly near the pointer, with rare thin shooting stars. Smaller sections use static `.star-point` dots / `StarField`. No gradient washes beyond the deep-space radial of the sky itself (#02040A → #08111F).
- **Hover states:** surface lifts to `--space-surface-hover` (#0D1220); glows intensify (`--glow-cyan-strong`); borders brighten toward cyan 60%. Transitions ~250ms `--ease-hud`.
- **Press states:** glow tightens, no scale-down bounce.
- **Layout:** generous negative space, especially around heroes — lean into emptiness/void rather than dense layouts.
- **Liquid glass (owner-directed):** cards and panels are frosted glass over the star sky — `--glass-bg` fill, `--glass-blur` (blur + saturate backdrop-filter), 1px `--glass-border`, `--glass-highlight` inset top edge. Glow still carries interactivity. Scrims stay plain semi-transparent space-black.
- **Imagery:** cool-toned, dark; portfolio shots framed inside standard 12px cards.
- **Buttons:** Primary = solid cyan with DARK text (`--on-accent`, never white-on-cyan). Secondary = outline-glow (translucent black fill, 0.8px cyan-50% border, white text, layered glow). One primary per view.

## ICONOGRAPHY
- No icon system exists in the source material; the live page uses none.
- **Intentional addition (flagged):** for prototypes needing icons, use **Lucide** via CDN (thin 1.5–2px strokes match the HUD line weight). Render in `--text-secondary`, cyan when active. No filled icons, no emoji, no unicode dingbats.
- Star-point dots and thin 1px constellation lines are the only native "decoration glyphs".

## Fonts caveat
Outfit is loaded from the Google Fonts CDN (`tokens/fonts.css`) — no font binaries were provided. If offline use is needed, ask the owner for .woff2 files.

## Index
- `styles.css` — global entry (imports all tokens below)
- `tokens/` — colors.css · typography.css · spacing.css · effects.css (glow + shimmer + star-point) · fonts.css
- `guidelines/` — foundation specimen cards
- `components/core/` — Button, IconButton, Badge, Tag, Card
- `components/forms/` — Input, Select, Checkbox, Radio, Switch
- `components/navigation/` — Tabs
- `components/feedback/` — Dialog, Toast, Tooltip
- `components/brand/` — ShimmerHeading, Eyebrow, StarField, hero.css/hero.js (interactive hero sky)
- `ui_kits/homepage/` — full ctechintl.com homepage (sitemap 1.1–1.6): nav, hero + systems panel, value prop, why us, CTA band, plan snapshot, trust row
- `ui_kits/coming-soon/` — hero-only landing (previous iteration, kept for reference)
- `SKILL.md` — agent skill entry point

## Intentional additions
- Standard form/feedback primitives (Input…Toast): no component inventory existed in the source (guidelines-only run); authored to the brand's tokens for the lead-gen site ahead.
- Lucide CDN icons: no icon set defined in source.
- Interactive hero sky (hero.css/hero.js): owner-directed addition replacing the static constellation watermark on heroes; includes the hidden Tesseract brand asterism.
- Shimmer animation on the hero gradient: the source gradient is static; motion added as the "sexy" signature moment — remove `animation` if unwanted.
