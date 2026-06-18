# Architecture

## Directory Structure

```
app/                          # Next.js App Router
├── layout.tsx                # Root layout: fonts, metadata, JSON-LD
├── page.tsx                  # Home: hero, projects, experience, contact
├── robots.ts                 # Auto-generated robots.txt
├── sitemap.ts                # Auto-generated sitemap.xml
├── opengraph-image.tsx        # Dynamic OG image generation
├── globals.css               # Tailwind v4 + design tokens
├── (page)/                   # Each route is a folder
│   ├── page.tsx              # Route component (server-rendered)
│   ├── loading.tsx           # Route-specific loading skeleton
│   └── error.tsx             # Route-specific error boundary
└── api/
    ├── chat/                 # Gemini AI chat endpoint
    ├── contact/              # Contact form (Resend + Turnstile)
    ├── csp-report/           # CSP violation report collector
    ├── cv/                   # Resume PDF delivery
    ├── monitor/              # Uptime monitoring endpoint
    ├── visit/                # Visitor tracking (IP → country → Sanity)
    └── visitors/             # Aggregated visitor stats

components/                   # React components by feature
├── ui/                       # Atomic UI primitives (badge, turnstile, etc.)
├── hero/                     # Hero section with tech orbits
├── sections/                 # Page section components (forge, persona, etc.)
├── effects/                  # Canvas/WebGL effects (space background, ripples)
├── chat/                     # Infernape AI chat drawer
├── analytics/                # Visitor panel, tracker, context
└── layout/                   # Navbar, footer, shared shell

lib/                          # Pure utilities (no JSX)
├── sanity/                   # Sanity client, queries, schemas, write helpers
├── env.ts                    # Zod env schema, build-time validation
├── rate-limit.ts             # Upstash + in-memory rate limiter
├── cors.ts                   # CORS origin check helpers
├── session.ts                # AES-CBC session encrypt/decrypt
├── utils.ts                  # cn() Tailwind class merge
├── fonts.ts                  # next/font configuration
├── tech-icons.tsx            # SVG icon components for tech stack
└── tech-stack.tsx            # Tech stack display component

data/                         # Static/fallback data
├── index.ts                  # Re-exports all modules
├── navigation.ts             # Nav links
├── site.ts                   # Site-wide config
├── json-ld.ts                # Structured data (JSON-LD)
├── page-meta.ts              # Per-page metadata
├── forge-categories.ts       # Skill categories
├── persona.ts                # Profile fallback data
├── award.ts / credentials.ts  # Credentials fallback
├── gallery.ts                # Gallery fallback
├── contact.ts                # Contact info fallback
└── tech-rings.ts             # 3D orbit icon definitions

tests/                        # Test suite
├── lib/                      # Utility tests (Vitest)
├── components/               # Component tests (Vitest + Testing Library)
└── e2e/                      # Playwright e2e tests

types/                        # TypeScript interfaces
├── index.ts                  # NavItem, SocialLink, Skill, Project,
                              # Experience, Testimonial, PortfolioData,
                              # Sanity document types

hooks/                        # Shared React hooks
└── use-outside-click.tsx

public/                       # Static assets served at /
├── hero.webp / hero.png      # Hero image
├── og-image.png              # Open Graph image (1200×630)
├── Salah_Uddin_Selim.pdf     # Downloadable CV
├── favicon.svg               # Site favicon
├── manifest.webmanifest      # PWA manifest
└── infernape-icon.png        # AI chat assistant avatar

proxy.ts                      # Edge middleware: CSP nonces, security headers

vercel.json                   # Vercel deployment config
next.config.ts                # Next.js configuration
```

## Data Flow

```
Sanity CMS  ──GROQ──►  lib/sanity/fetch.ts  ──►  app/(page)/page.tsx  ──►  components/
                           ▲                        │
                           │                    [revalidate: 3600]
                           │                        │
                        Sanity Client           ISR cache
                     (lib/sanity/client.ts)

Static Data (data/)  ◄── Used as fallback when Sanity is unavailable
```

All content originates from Sanity CMS via GROQ queries defined in `lib/sanity/fetch.ts`. Pages use ISR (`revalidate: 3600`) so content updates within an hour without a rebuild. The `data/` directory provides static fallbacks when the Sanity dataset is unreachable (e.g., during local development without tokens).

## Security Model

### Edge Middleware (`proxy.ts`)

- CSP with per-request nonces via `crypto.randomUUID()`
- `strict-dynamic` for trusted script chains
- All standard security headers (HSTS, XFO, XSS, COOP, CORP, Permissions-Policy)
- CSP violations sent to `POST /api/csp-report`

### Input Validation (`lib/env.ts`)

- Zod schema validates every environment variable at build time
- Fails the build in production if required vars are missing

### Rate Limiting (`lib/rate-limit.ts`)

- Upstash Redis rate limiter when credentials are set
- Falls back to in-memory `Map` with periodic cleanup
- Per-IP sliding window, configurable per endpoint

### CORS (`lib/cors.ts`)

- Restricted to `NEXT_PUBLIC_SITE_URL` and Vercel production domain
- Strict `same-origin` policy for API routes

### API Routes

- Content-Type verification on all POST endpoints
- Zod schemas for request body validation
- Generic error messages (no stack traces leaked)
- HTML output escaping (contact form)

## Architectural Decisions

### ADR-01: Edge Middleware over Next.js Config Headers

**Context**: Security headers could be set in `next.config.ts` or `vercel.json`.
**Decision**: Use `proxy.ts` (Next.js Edge Middleware) as the single source.
**Rationale**: Middleware can generate per-request nonces, which is impossible in static config files. The matcher excludes static assets and the monitor endpoint.
**Consequence**: All routes become dynamic (server-rendered) instead of statically pre-rendered.

### ADR-02: Sanity as Single Source with Static Fallbacks

**Context**: Content lives in Sanity CMS, but the site must work during development.
**Decision**: Fetch content via GROQ at runtime, fall back to `data/` module.
**Rationale**: Eliminates the need for a local Sanity dataset during development. Static data matches the Sanity schema shape.
**Consequence**: Feature parity between dev and prod. Updates to Sanity propagate via ISR.

### ADR-03: Nonce-based CSP over Hash-based

**Context**: Need to allow inline Next.js scripts without `'unsafe-inline'`.
**Decision**: Use per-request nonces via edge middleware.
**Rationale**: Next.js automatically applies the `x-nonce` response header to its inline scripts. Nonces are simpler than maintaining a hash manifest for every script.
**Consequence**: Every request gets a unique nonce, preventing replay attacks.

### ADR-04: Optional Upstash with In-Memory Fallback

**Context**: Rate limiting must work in all environments.
**Decision**: Use `@upstash/ratelimit` when Redis credentials exist, otherwise an in-memory `Map`.
**Rationale**: Zero-config for local development. Production setups can add free-tier Upstash Redis for distributed rate limiting.
**Consequence**: In-memory limiting resets on serverless cold starts and doesn't share state across regions.

### ADR-05: Vitest over Jest for Unit Testing

**Context**: Need a modern test runner compatible with Next.js and ESM.
**Decision**: Vitest with jsdom environment.
**Rationale**: Native TypeScript + ESM support, same API as Jest, faster execution, built-in coverage.
**Consequence**: No Jest config needed. Tests live in `tests/` mirroring the source structure.

### ADR-06: Conventional Commits with Husky Hooks

**Context**: Need consistent commit history for changelog generation.
**Decision**: commitlint enforces Conventional Commits via husky pre-commit hook.
**Rationale**: Standardized messages enable automated changelogs, version bumps, and semantic release in the future.
**Consequence**: Commits that don't match the pattern are rejected at the hook level.
