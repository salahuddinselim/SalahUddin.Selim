# Product

## Register

brand

## Users

Mixed audience arriving with different jobs to do on the same visit: recruiters and hiring managers scanning fast for credibility (skills, experience, proof of work), freelance/client leads evaluating trust before reaching out, and developer peers looking for technical depth and code quality signals. The site can't pick one at the expense of the others — it needs a fast credibility scan up top (hero, projects) with technical depth available to those who dig (project detail pages, GitHub stats, credentials).

## Product Purpose

A personal portfolio for Salah Uddin Selim that proves engineering ability through the site itself, not just through claims about it — the "Cosmic OS" dark sci-fi visual identity, the AI chat assistant, real-time visitor analytics, and the performance discipline documented in CLAUDE.md are all part of the pitch. Success looks like: a visitor forms a strong impression of technical craft within the first screen, can self-serve into the depth they need (projects, credentials, CV, contact), and the site never embarrasses that pitch with jank, broken links, or slow load.

## Brand Personality

Futuristic, immersive, bold. The cosmic/space visual identity (starfield background, nebula glow, cyan accent system) is the main event, not a restrained accent — but it must stay in service of readability and usability, never overwhelming the content it's framing. Confident and precise underneath the spectacle: every visual flourish should read as deliberate engineering, not decoration for its own sake.

## Anti-references

- **Generic SaaS template look**: cream/sand backgrounds, hero-metric blocks, gradient text, tiny uppercase eyebrow labels, numbered section markers as default scaffolding — the standard AI-slop tells. This site's whole point is to look unmistakably hand-crafted, not templated.
- **Overly corporate/agency portfolio**: stock-photo energy, safe-to-the-point-of-forgettable, indistinguishable from every other freelancer site. The cosmic identity exists specifically to avoid blending in.
- **Cluttered/gimmicky 3D-tech-demo sites**: effects that exist to show off rather than to serve the content, hurting usability or performance in the process. Every visual effect earns its place per the perf discipline already documented in CLAUDE.md (fps caps, viewport-gating, compositor-layer awareness) — bold and immersive is not a license for jank.

## Design Principles

1. **Spectacle in service of credibility, not instead of it.** The cosmic visual identity is the differentiator, but it must never slow down or obscure the actual proof of skill (projects, experience, code).
2. **Show, don't just tell.** The site's own engineering (visitor analytics, AI chat, perf discipline, CMS-driven content) should double as evidence of the skills being claimed.
3. **Every effect pays rent.** Motion, blur, and glow are part of the brand's expressive palette, but each one is deliberate and profiled — no uncapped loops, no unpromoted blur layers, no decoration that costs real frame budget for no read.
4. **One system, not a template.** Reuse the existing button system, design tokens, and motion patterns already established in `app/globals.css` rather than introducing one-off styles; deviations should be as rare and justified as `.btn-hero`.
5. **Serve the audience that showed up, not the one assumed.** Recruiters, clients, and peers all land on the same pages — design for fast-scan credibility at the top of any page with technical depth available beneath it, not a single persona's ideal path.

## Accessibility & Inclusion

Standard WCAG AA: sufficient color contrast (per the impeccable skill's 4.5:1 body-text / 3:1 large-text baseline), full keyboard navigation, and working `prefers-reduced-motion` fallbacks for animated and canvas-driven effects (starfield, nebula glow, scroll-triggered motion). No unusual constraints beyond that baseline, but given the site leans on continuous canvas/motion effects as part of its identity, reduced-motion alternatives should be treated as a first-class requirement rather than an afterthought.
