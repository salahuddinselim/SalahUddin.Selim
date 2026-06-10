# Salah Uddin Selim — Portfolio

A dark, sci-fi-themed portfolio website built with **Next.js 16**, **React 19**, **Sanity CMS**, and **Three.js**. Features an AI chat assistant, 3D interactive elements, real-time visitor analytics, liquid ripple animations, and a space-themed visual identity.

## Tech Stack

| Category        | Technologies                                                                 |
| --------------- | ---------------------------------------------------------------------------- |
| Framework       | Next.js 16.2.7, React 19.2.4, TypeScript 5                                  |
| Styling         | Tailwind CSS v4, Framer Motion 12.40, tw-animate-css                        |
| 3D              | Three.js, @react-three/fiber, @react-three/drei                             |
| CMS             | Sanity 5.29, next-sanity, @sanity/image-url                                 |
| AI              | Google Gemini 2.0 Flash (chat assistant "Infernape")                        |
| Email           | Resend (contact form)                                                        |
| Icons           | Lucide React, React Icons                                                    |
| Animations      | Framer Motion, custom canvas liquid ripple, CSS spring transitions           |

## Getting Started

### Prerequisites

- Node.js 20+
- A Sanity project with dataset configured (see [Sanity docs](https://www.sanity.io/docs))
- Google Gemini API key (for AI chat)
- Resend API key (optional, for contact form)

### Environment Variables

Create `web/.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_TOKEN=your_sanity_token
GEMINI_API_KEY=your_gemini_key
RESEND_API_KEY=your_resend_key
```

> **Security**: All `NEXT_PUBLIC_*` values are safe to expose (they appear in the browser). `SANITY_API_TOKEN`, `GEMINI_API_KEY`, and `RESEND_API_KEY` are server-only — never prefix them with `NEXT_PUBLIC_`.

### Install & Run

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Sanity Studio

```bash
cd web
npm run sanity
```

Opens the Studio at `http://localhost:3333` — manage all content from here.

## Project Structure

```
web/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home — hero, projects, about, experience, contact
│   ├── layout.tsx         # Root layout (navbar, footer, space bg, SEO metadata)
│   ├── robots.ts          # robots.txt
│   ├── sitemap.ts         # sitemap.xml
│   ├── analytics/         # System monitor page
│   ├── projects/          # Full project listing from Sanity
│   ├── credentials/       # Certifications & timeline from Sanity
│   ├── forge/             # Skills & 3D tech cloud from Sanity
│   ├── gallery/           # Bento-grid gallery from Sanity
│   ├── persona/           # Profile, education, social links, GitHub stats
│   ├── studio/            # Embedded Sanity Studio (removed — standalone)
│   └── api/
│       ├── chat/          # Gemini AI chat endpoint
│       ├── contact/       # Resend contact form (HTML-sanitized)
│       ├── visit/         # Visitor tracking (IP → country, device)
│       ├── visitors/      # Aggregated visitor stats from Sanity
│       └── cv/            # Resume PDF delivery from root cv/ folder
├── components/
│   ├── sections/          # Page section components
│   ├── hero/              # Hero with orbits, CTA, typewriter
│   ├── effects/           # SpaceBackground, ShootingStars, Nebula
│   ├── chat/              # Infernape AI chat drawer
│   ├── analytics/         # Visitor panel, context, VisitTracker
│   ├── layout/            # Navbar with mouse-glow, Footer with liquid ripple
│   └── ui/                # LiquidRipple, GitHubStats, CursorFollower
├── lib/
│   ├── sanity/            # Client, fetch, write, schemas (10 types), icon-map
│   ├── data.ts            # Static fallback data
│   ├── tech-icons.tsx     # Tech stack SVG icons
│   ├── fonts.ts           # Poppins, Inter, JetBrains Mono setup
│   └── utils.ts           # cn() classname helper
├── types/                 # TypeScript interfaces
└── public/                # Static assets, OG image, CV
```

## Pages

| Route          | Description                                       | Data Source        |
| -------------- | ------------------------------------------------- | ------------------ |
| `/`            | Home — hero, projects, about, experience, contact | Sanity + static    |
| `/projects`    | Full project portfolio                            | Sanity             |
| `/credentials` | Certifications & achievements timeline            | Sanity             |
| `/forge`       | Skills & 3D Fibonacci skill cloud                 | Sanity             |
| `/gallery`     | Bento-grid gallery                                | Sanity             |
| `/persona`     | Profile, education, social links, GitHub stats    | Sanity + GitHub API |
| `/analytics`   | System diagnostics monitor & load metrics         | Simulated real-time |

## Sanity Schemas

All content managed via Sanity CMS — **10 document types**:

| Schema         | Fields                                                                 |
| -------------- | ---------------------------------------------------------------------- |
| **Profile**    | name, bio, avatar, resume, contact info                                |
| **Project**    | title, description, tech stack, image, links, featured                 |
| **Skill**      | name, category, icon, proficiency                                      |
| **Experience** | company, role, period, description, technologies                       |
| **Education**  | institution, degree, field, GPA, status, abbreviation                  |
| **Credential** | title, issuer, date, category, tags, description                       |
| **Gallery**    | image, caption, location, bento span (square/vertical/horizontal/large) |
| **Social Link**| platform, URL, icon                                                    |
| **Testimonial**| quote, author, avatar, role                                            |
| **Visitor Stats**| auto-tracked: total views, countries, devices, monthly history       |

## Key Features

### Visitor Tracking (Automatic)
- Every page load → `POST /api/visit` → detects IP, geolocates country (ip-api.com), parses device from User-Agent → writes to Sanity
- Visitor panel shows real-time country breakdown, device stats, monthly/all-time views

### Liquid Ripple Buttons
- Canvas-based radial gradient ripple on click (expands from cursor position)
- Glossy highlight bar across top of button
- Spring-based hover transforms (`cubic-bezier(.34,1.56,.64,1)`)
- Used in footer pills and nav links

### Navbar Mouse Glow
- Radial gradient glow follows cursor across the nav bar
- Click ripple on nav links
- Active page indicator with spring animation

### AI Chat Assistant — "Infernape"
- Gemini 2.0 Flash-powered chatbot
- Context-aware answers about projects, skills, education
- Slide-in drawer UI with markdown rendering

### 3D Visual Effects
- **SpaceBackground** — Canvas constellation, nebula glows, shooting stars, floating dust particles
- **Tech Orbit** — Rotating rings of tech icons (React, Python, Docker, etc.)
- **Fibonacci Skill Cloud** — 3D interactive sphere of skills with hover labels

### Glassmorphism UI
- Frosted glass panels with backdrop blur
- Cyan glow borders and shadows
- Spring animations on cards and sections
- Fully responsive (mobile-first)

## Security

- **Server-only env vars**: `SANITY_API_TOKEN`, `GEMINI_API_KEY`, `RESEND_API_KEY` used only in API routes / server modules — never exposed to the client
- **Contact form sanitized**: All user input HTML-escaped before email rendering (prevents XSS injection)
- **CORS**: POST endpoints should be restricted in production (see Deployment section)
- **Live keys NOT in `.env.example`**: Placeholder values only

## SEO

- Per-page `generateMetadata` with unique titles, descriptions, OG tags
- `robots.txt` + `sitemap.xml` auto-generated
- Open Graph + Twitter Card support with OG image
- `metadataBase` + `canonical` URL set
- Semantic HTML headings (h1-h6 hierarchy)
- All pages wrapped in `<main>`

## Deployment

Deploy to Vercel:

```bash
npm run build
vercel --prod
```

Set the same environment variables in your Vercel project dashboard.

### Post-Deployment

1. **OG Image** — Replace `public/og-image.png` with a proper 1200x630 PNG designed in Figma/Canva
2. **Resend Domain** — Verify your custom domain in Resend dashboard (replace `onboarding@resend.dev`)
3. **Rate Limiting** — Add Vercel WAF rules or use `@upstash/ratelimit` for POST endpoints
4. **Monitor Page** — The SEO health card shows simulated data; update or remove it for production
