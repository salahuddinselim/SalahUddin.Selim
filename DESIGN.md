---
name: Salah Uddin Selim — Portfolio
description: A dark sci-fi "Cosmic OS" — a futuristic instrument panel for a personal portfolio, built to prove engineering craft through its own visual system.
colors:
  bg-void: "#050816"
  bg-nebula: "#0b1120"
  bg-card: "rgba(17, 24, 39, 0.65)"
  ink-primary: "#ffffff"
  ink-muted: "#c8d8e8"
  accent-cyan: "#00d9ff"
  accent-violet: "#8b5cf6"
  signal-success: "#22c55e"
  signal-warning: "#eab308"
  signal-error: "#ef4444"
  border-hairline: "rgba(255, 255, 255, 0.06)"
  border-cyan: "rgba(0, 217, 255, 0.2)"
  border-violet: "rgba(139, 92, 246, 0.2)"
typography:
  display:
    fontFamily: "var(--font-heading), Poppins, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "var(--font-heading), Poppins, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "var(--font-heading), Poppins, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "var(--font-body), Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "var(--font-code), JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.05em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "40px"
  full: "9999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  6: "24px"
  8: "32px"
  12: "48px"
  16: "64px"
  24: "96px"
components:
  button-primary:
    backgroundColor: "{colors.accent-cyan}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.accent-cyan}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
  button-hero:
    backgroundColor: "#ffffff"
    textColor: "#050816"
    rounded: "{rounded.lg}"
    padding: "12px 32px"
  card-project:
    backgroundColor: "{colors.bg-card}"
    rounded: "{rounded.2xl}"
    padding: "16px"
  badge-glass:
    backgroundColor: "rgba(255, 255, 255, 0.06)"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.full}"
---

# Design System: Salah Uddin Selim — Portfolio

## 1. Overview

**Creative North Star: "The Cosmic OS"**

This is not a portfolio dressed up with a space theme — it's an instrument panel that happens to hold a portfolio. Every surface reads as a pane in a dark control system: near-black voids, hairline borders, glass-panel cards, and a single cyan signal color doing the work of drawing the eye. The nebula glow and starfield aren't wallpaper; they're the ambient hum of a system that's alive. Futuristic, immersive, bold — the visual identity is the pitch, proof that the person who built this can make motion, glassmorphism, and depth behave under real engineering discipline (fps-capped canvases, compositor-aware blur, viewport-gated third-party scripts) rather than dragging the page down.

The system explicitly rejects the generic SaaS-template look — no cream/sand backgrounds, no gradient text, no hero-metric blocks, no tiny uppercase eyebrows scaffolding every section. It also rejects the overly corporate agency-portfolio register (stock-photo safe, forgettable) and gimmicky 3D-tech-demo sites where effects overwhelm the content they're supposed to frame. Everything here is legible first, spectacular second.

**Key Characteristics:**

- Near-black void background (`#050816`) with a secondary nebula tone (`#0b1120`) for layered depth, never a lighter "card gray"
- One accent does the signaling: cyan (`#00d9ff`) for primary actions, focus, and links; violet (`#8b5cf6`) reserved for secondary/complementary accents, never competing with cyan for attention
- Glass-panel surfaces: translucent dark backgrounds (`rgba(17,24,39,0.65)`) with backdrop blur and a barely-visible hairline border, not opaque flat cards
- Generous, large-radius geometry (16–40px) on containers; small radius (6–10px) on tight controls — nothing is sharp-cornered
- Monospace type appears only where it signals "system data": labels, tags, code, stats — never body copy

## 2. Colors

A near-black void punctuated by exactly one loud signal color; every other hue is either a muted text tone or a rare secondary accent.

### Primary

- **Signal Cyan** (`#00d9ff`): the system's single loud color. Primary buttons, links, focus rings, active states, hover glows. If something is interactive or wants attention, it's cyan — nothing else competes for this role.

### Secondary

- **Nebula Violet** (`#8b5cf6`): the system's second voice, used sparingly for secondary accents, gradients-adjacent moments, and to distinguish a "second signal" from cyan's primary one (e.g. link hover color shifts from cyan to violet).

### Neutral

- **Void Black** (`#050816`): the base background of the entire site — deep, cold, near-black navy, not pure `#000`.
- **Nebula Navy** (`#0b1120`): the secondary background layer, used to create depth between stacked sections without introducing a new hue.
- **Glass Panel** (`rgba(17, 24, 39, 0.65)`): the translucent card/container surface — always paired with backdrop blur and a hairline border, never opaque.
- **Signal White** (`#ffffff`): primary text and the sole exception to "cyan is the only loud color" — reserved for the `.btn-hero` above-the-fold CTA, where white reads as higher-contrast against a cyan-saturated hero than cyan-on-cyan would.
- **Muted Ice** (`#c8d8e8`): secondary/muted text — body copy that isn't the primary read, captions, metadata.
- **Hairline Border** (`rgba(255, 255, 255, 0.06)`): the default border on virtually every panel — nearly invisible, present only to separate surfaces at a glance.

### Named Rules

**The One Signal Rule.** Cyan (`#00d9ff`) is the only color allowed to mean "click me" or "this is active." Violet, success-green, and warning-yellow carry their own distinct meanings (secondary accent, success state, caution state) and must never substitute for cyan's role.

**The Glass, Not Gray Rule.** Container surfaces are never a flat opaque gray. They are the void background showing through a translucent, blurred panel (`rgba(17,24,39,0.65)` + `backdrop-blur`) with a hairline border. A solid `#1a1a1a`-style card is a violation of the system.

## 3. Typography

**Display/Heading Font:** var(--font-heading) with Poppins, system-ui fallback
**Body Font:** var(--font-body) with Inter, system-ui fallback
**Label/Mono Font:** var(--font-code) with JetBrains Mono fallback

**Character:** A geometric sans (Poppins) for headings against a humanist sans (Inter) for body — confident, technical headlines over comfortably readable prose — with monospace reserved as the system's "readout" voice for tags, stats, and code.

### Hierarchy

- **Display** (700, `clamp(2.25rem, 6vw, 4.5rem)`, line-height 1.05, letter-spacing -0.02em): the hero headline only, per the strict type scale (48px hero baseline).
- **Headline** (600, 1.875rem/30px, line-height 1.15): section titles.
- **Title** (600, 1.25rem/20px, line-height 1.3): card titles, subheadings — the scale's documented 20px subheading step.
- **Body** (400, 1rem/16px, line-height 1.5): the scale's strict 16px body baseline. Cap prose at 65–75ch via `.max-w-readable` (680px).
- **Label** (500, 0.75rem/12px, letter-spacing 0.05em, monospace): tags, badges, stat readouts — the system's "instrument panel" voice.

### Named Rules

**The Strict Scale Rule.** The type scale is fixed at 16px body / 20px subheading / 32px heading / 48px hero — documented directly in `app/globals.css`. Don't introduce arbitrary in-between sizes; use the existing `--text-*` steps.

## 4. Elevation

Depth comes from layered translucency and glow, not drop shadows in the conventional sense. Flat, opaque cards with a soft gray shadow would read as generic SaaS; this system instead stacks void → nebula → glass-panel backgrounds and uses colored glow (cyan/violet box-shadow at low opacity) as the primary depth signal on interactive states.

### Shadow Vocabulary

- **Ambient card shadow** (`--shadow-md`: `0 4px 6px -1px rgba(0,0,0,0.4), 0 2px 4px -2px rgba(0,0,0,0.3)`): default resting elevation for glass panels — dark and diffuse, not a light gray shadow.
- **Cyan interaction glow** (`0 0 25px rgba(0,217,255,0.25)` on `.btn-primary:hover`, `0 0 20px rgba(0,217,255,0.1)` on `.btn-secondary:hover`): the signature hover treatment — the accent color glowing outward rather than a shadow darkening.
- **Hero glow** (`0 0 30px rgba(255,255,255,0.15)`, growing to `0 0 50px rgba(255,255,255,0.3)` on hover): the white `.btn-hero`'s equivalent glow, scaled up for its above-the-fold prominence.
- **Modal glow** (`0 0 40px rgba(0,217,255,0.08)`): the expanded project-detail modal's ambient cyan bloom, distinguishing it as the "focused" layer above the grid.

### Named Rules

**The Glow-Over-Shadow Rule.** Interactive elevation is communicated with colored glow (accent-tinted `box-shadow` at low opacity), not by darkening a gray shadow. A hover state that only deepens a shadow, with no color, is under-designed for this system.

## 5. Components

### Buttons

- **Shape:** `border-radius: 16px` (`--radius-lg`) across all three variants — no sharp corners.
- **Primary:** solid cyan (`#00d9ff`) background, white text, cyan border; padding `12px 24px`. The default call-to-action everywhere except the hero.
- **Secondary:** transparent background, cyan text, translucent cyan border (`rgba(0,217,255,0.25)`); padding `10px 20px`. Paired with primary for secondary actions.
- **Hero (one-off exception):** solid white background, void-black text, white border, white glow shadow; padding `12px 32px`. Reserved exclusively for the single above-the-fold hero CTA where cyan-on-cyan would fail contrast — not to be reused elsewhere.
- **Hover/Focus:** all variants brighten and gain a colored glow on hover (`box-shadow`, not just background darkening); `:focus-visible` gets a 2px cyan outline with 2px offset, matching the system-wide WCAG-AA-visible focus ring.

### Chips / Tags

- **Style:** monospace label text, `rounded-full`, low-opacity accent-tinted background (e.g. `bg-accent/10`) with a matching low-opacity accent border (e.g. `border-accent/10`) — the tag reads as a system readout, not a flat pill.
- **State:** hover brightens border/background opacity slightly; skill-category pills additionally swap their own category color (`--cat-color`) into background/border/icon on hover.

### Cards / Containers

- **Corner Style:** large radius, 24–32px (`rounded-2xl`/`rounded-3xl`) on project cards and modals; 10–16px on tighter nested elements (thumbnails, list rows).
- **Background:** the glass-panel token (`rgba(17,24,39,0.65)`) with `backdrop-blur(16px)`, never an opaque flat color.
- **Shadow Strategy:** ambient dark shadow at rest; accent glow on hover/expanded state (see Elevation).
- **Border:** hairline white border (`rgba(255,255,255,0.06)`) at rest; shifts to a translucent cyan border (`rgba(0,217,255,0.15)`) when the card is the expanded/focused modal state.
- **Internal Padding:** 16px (`space-4`) standard card padding.

### Inputs / Fields

- **Style:** dark translucent background matching the glass-panel token, hairline border, `--radius-md`/`--radius-lg` corners.
- **Focus:** cyan `focus-visible` ring (2px, 2px offset) — identical treatment to buttons and links, keeping the "cyan = interactive" rule consistent across all controls.

### Navigation

- **Style:** fixed, `z-50` navbar sitting above all page content. Links use body/label typography with cyan hover-color shift (never underline). Mobile menu opens as an overlay; anything meant to render above the navbar (modals, dialogs) must use `z-[60]`/`z-[70]`, never `z-40`/`z-50`, to avoid the documented click-blocking bug where a modal's close button landed under the mobile menu button.

### Signature Component: Expandable Project Card

A `layoutId`-shared Framer Motion card that morphs in place from a compact grid item into a full-detail modal (an Aceternity-style `ExpandableCard` pattern). At rest it's a glass-panel card with a thumbnail, title, and monospace tag row; expanded, it becomes a near-opaque panel (`rgba(15,21,35,0.98)`) with a cyan-tinted border and glow — deliberately dropping the translucency/blur mid-transition since `backdrop-filter: blur()` on a resizing element forces an expensive re-blur every frame. The solid-background swap during resize is a performance rule, not a visual inconsistency.

## 6. Do's and Don'ts

### Do:

- **Do** use `#00d9ff` cyan as the only "this is interactive/active" signal color across the entire site.
- **Do** build containers as translucent glass panels (`rgba(17,24,39,0.65)` + blur + hairline border), never flat opaque gray cards.
- **Do** use colored glow (`box-shadow` in the accent hue at low opacity) for hover/elevation states instead of plain darkening shadows.
- **Do** cap body prose at 65–75ch and reserve monospace type for labels, tags, stats, and code — never for body copy.
- **Do** cap fps and viewport-gate any continuous canvas/animation loop or third-party script; every visual effect must earn its frame budget, per the system's own performance discipline.
- **Do** swap to a solid/near-opaque background on any `backdrop-filter: blur()` element while it's actively resizing (e.g. the expandable project card).

### Don't:

- **Don't** introduce cream/sand/warm-neutral backgrounds, gradient text, hero-metric blocks, or tiny uppercase eyebrow labels — the generic SaaS-template look this system explicitly rejects.
- **Don't** design toward a safe, stock-photo, indistinguishable-from-every-freelancer agency-portfolio look. The cosmic identity exists specifically to avoid blending in.
- **Don't** let visual effects overwhelm content or usability — no gimmicky 3D-tech-demo excess; every effect must serve legibility first.
- **Don't** use `.btn-hero`'s white-on-void styling anywhere except the single above-the-fold hero CTA.
- **Don't** place any colored `border-left`/`border-right` accent stripe on cards or list items — not part of this system's vocabulary.
- **Don't** stack `z-40`/`z-50` on anything meant to render above the fixed navbar; use `z-[60]`/`z-[70]` or it will be visually and functionally trapped underneath it.
- **Don't** skip the `prefers-reduced-motion` fallback on new animated or canvas-driven components — the system already disables all animation/transition duration globally under that media query, and new components must respect it, not bypass it with inline styles.
