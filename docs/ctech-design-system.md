# Ctech International — Design System
_For use in Claude Design → Claude Code handoff. July 2026._

## Design concept: "Deep space HUD"
Not a colorful nebula theme — a dark-void tech aesthetic. Single accent color (cyan) against near-black, glow instead of drop shadows, sharp/minimal corners, shimmering gradient text as the signature hero moment. This is extracted directly from the live ctechintl.com "Coming Soon" page, so it's already the established brand language — Tapt, Tesseract, and the main site should all read as one family built on these same tokens, even if each product has its own layout.

## Color tokens

| Token | Hex / value | Use |
|---|---|---|
| `space-black` | `#05080F` | Page background |
| `space-surface` | `#080C16` | Card/panel background |
| `space-surface-hover` | `#0D1220` (recommended, not yet on live site) | Hover/elevated state |
| `space-border` | `#1D283A` | Card borders, dividers |
| `text-primary` | `#F8FAFC` | Headings, primary body text |
| `text-secondary` | `#94A3B8` | Muted/secondary text |
| `nebula-cyan` | `#00CCFF` | Primary accent — CTAs, links, glow, active states |
| `nebula-cyan` @ 10% | `rgba(0,204,255,0.1)` | Subtle fills, inset glow |
| `nebula-cyan` @ 50–60% | `rgba(0,204,255,0.5–0.6)` | Borders on outline buttons |

**Rule:** cyan is the *only* accent color. Don't introduce a second bright hue (no purple/pink nebula colors) — the restraint is what makes the glow feel premium instead of gamer-RGB.

## Typography
- **Typeface:** Outfit (Google Font), used for both headings and body — already loaded on the live site
- **Hero heading:** 700 weight, ~80px desktop, shimmering gradient text: `linear-gradient(to right, #FFFFFF 20%, #8A95A5, #FFFFFF, #E2E8F0, #FFFFFF, #8A95A5, #FFFFFF 80%)` clipped to text. Reserve this effect for the single biggest headline on a page — it loses impact if overused on every h2/h3.
- **Section headings (h2/h3):** solid `text-primary`, 600–700 weight, no gradient
- **Body text:** `text-primary` or `text-secondary` depending on hierarchy, 400 weight
- **Eyebrow/label text** (like "COMING SOON"): small, 16px, 400 weight, letter-spacing normal, `text-primary`

## Components

### Buttons — two variants
**Primary (solid):** `nebula-cyan` background, `space-black` text (dark text on bright cyan, not white-on-cyan), minimal/no border-radius for a HUD feel.

**Secondary (outline-glow):** background `rgba(5,8,15,0.5)` (semi-transparent space-black), border `0.8px solid rgba(0,204,255,0.5)`, white text, and a layered glow instead of a flat shadow:
```
box-shadow:
  0 0 15px rgba(0,204,255,0.3),
  0 0 30px rgba(0,204,255,0.2),
  inset 0 0 10px rgba(0,204,255,0.1);
```
Use secondary for lower-emphasis actions ("Book a Consultation" style), primary for the single highest-priority action per view.

### Cards
- Background: `space-surface`
- Border: `1.6px solid space-border`
- Border-radius: `12px`
- No blur/backdrop-filter — flat, crisp edges (consistent with the sharp HUD feel, not glassmorphism)

### Motifs / background texture
- Scattered small star-point marks across dark backgrounds (subtle, low-opacity, non-distracting — decoration, not a full animated starfield)
- Faint circuit/constellation-line watermark patterns are acceptable as large, very-low-opacity background texture behind hero sections
- Glow, not gradients, is the primary way to add visual interest to interactive elements

## Spacing & shape
- Sharp-to-minimal corners on buttons (0–4px) — no pill-shaped buttons
- 12px radius is the standard for cards/panels — keep this consistent everywhere so cards read as a family
- Generous negative space around the hero — the current site leans into emptiness/void rather than dense layouts, which supports the "deep space" feeling

## Cross-product consistency (Tapt, Tesseract, main site)
Apply the same core tokens — background, cyan accent, Outfit typeface, card/button treatment — across all three properties so a user moving between ctechintl.com, Tapt, and Tesseract feels one brand, not three. Each product can still have its own page layout, iconography, and content structure; the shared language should live at the token/component level (colors, type, buttons, cards, glow), not force identical page designs.

## Sitemap (main site — ctechintl.com)
- **Homepage** — hero (shimmer headline + secondary CTA), value prop, snapshot of the configurator
- **Services & tech** — full service list + frameworks/stack used
- **Build your site** — the configurator (Starter vs Custom, live estimate — build deferred, see project handoff note)
- **Portfolio** — past client work
- **Products** — hub linking to Tapt and Tesseract
- **Book a call** — consultation request (primary conversion goal)
- **About** — team, story, mission

Every page footer carries the "Powered by Ctech International" credit per the confirmed branding policy.

## Open items before Claude Design starts
- Confirm `space-surface-hover` and any secondary/tertiary text sizes not yet observed on the live site
- Confirm whether the primary (solid) CTA button also uses 0px radius or something else — was truncated during extraction
- Decide whether Tapt/Tesseract get dedicated sub-pages within ctechintl.com or remain fully separate apps just sharing the visual language
