# Application Inventory — SalahUddin.Selim Portfolio

**Audit Date:** 2026-11-20  
**Auditor:** Claude Sonnet 4.6 (automated) + manual code review  
**Commit:** 35c631c (`chore: pre-audit commit`)

---

## Application Overview

| Property         | Value                                             |
| ---------------- | ------------------------------------------------- |
| Application Type | Personal portfolio / static-first Next.js web app |
| Framework        | Next.js 16.2.10 (App Router, Turbopack)           |
| Runtime          | React 19.2.7, Node.js v24.12.0                    |
| Language         | TypeScript (strict mode)                          |
| Styling          | Tailwind CSS v4                                   |
| CMS              | Sanity (project `id5e9a8v`, dataset `production`) |
| Hosting          | Vercel (production)                               |
| Authentication   | None (public portfolio)                           |
| Deployment       | Vercel via GitHub Actions CI                      |

---

## Routes & Endpoints

### Public Pages

| Route                 | Type                     | CMS Data                                                       |
| --------------------- | ------------------------ | -------------------------------------------------------------- |
| `/`                   | Server Component         | Profile, projects, experience, education, social links, skills |
| `/projects`           | Server Component         | All projects                                                   |
| `/projects/[slug]`    | Server Component (ISR)   | Per-project detail                                             |
| `/credentials`        | Server Component         | Credentials/certifications                                     |
| `/gallery`            | Server Component         | Gallery images                                                 |
| `/persona`            | Server Component         | GitHub activity + profile                                      |
| `/forge`              | Server Component         | Skills                                                         |
| `/analytics`          | Static (force-static)    | Upstash Redis visitor stats                                    |
| `/studio/[[...tool]]` | Sanity Studio (embedded) | —                                                              |

### API Routes

| Endpoint            | Method | Auth                                  | Purpose                          |
| ------------------- | ------ | ------------------------------------- | -------------------------------- |
| `/api/contact`      | POST   | Origin check + Turnstile + rate limit | Send contact form email          |
| `/api/chat`         | POST   | Origin check + rate limit             | Gemini-powered portfolio chat    |
| `/api/visit`        | POST   | Origin check                          | Record visitor (IP geo + device) |
| `/api/visitors`     | GET    | None                                  | Public analytics data            |
| `/api/cv`           | GET    | None                                  | Download CV/resume               |
| `/api/github-stats` | GET    | None                                  | Proxied GitHub stats (cached 1h) |
| `/api/monitor`      | GET    | None                                  | App health + tech stack info     |
| `/api/revalidate`   | POST   | Sanity webhook signature              | ISR cache invalidation           |
| `/api/csp-report`   | POST   | None                                  | CSP violation logging            |

### Special Routes

| Route              | Purpose                         |
| ------------------ | ------------------------------- |
| `/opengraph-image` | Dynamic OG image (1200×630 PNG) |
| `/sitemap.xml`     | Auto-generated sitemap          |
| `/robots.txt`      | Crawl directives                |

---

## External Dependencies (Production)

| Service               | Purpose                       | Data Sent                    |
| --------------------- | ----------------------------- | ---------------------------- |
| Sanity CDN            | CMS content                   | None (read-only fetches)     |
| Vercel                | Hosting / Edge Functions      | Full request context         |
| Upstash Redis         | Visit counter + rate limiting | IP address (hashed), country |
| Resend                | Transactional email           | Contact form data            |
| Cloudflare Turnstile  | Bot protection                | Browser challenge tokens     |
| Google Gemini         | AI chat (`@google/genai`)     | Chat messages (scoped)       |
| ip-api.com            | IP geolocation                | Visitor IP address           |
| Vercel Analytics      | Page analytics                | Anonymous usage data         |
| Vercel Speed Insights | Performance metrics           | Core Web Vitals              |

---

## Security Infrastructure

| Control          | Implementation                                                        |
| ---------------- | --------------------------------------------------------------------- |
| CSP              | `proxy.ts` middleware; `unsafe-inline` necessary (Next.js constraint) |
| CORS             | `lib/cors.ts` — `requireSameOrigin` on all state-changing POSTs       |
| Rate Limiting    | `lib/rate-limit.ts` — Upstash Redis or in-memory fallback             |
| Input Validation | Zod schemas on contact/chat endpoints                                 |
| Bot Protection   | Cloudflare Turnstile on contact form                                  |
| Security Headers | HSTS, X-Frame-Options, CSP, Permissions-Policy, CORP, COOP            |
| XSS Prevention   | `esc()` HTML-escaping in email HTML; React JSX rendering elsewhere    |

---

## Dead Code / Unused Features

| File             | Status                                                          |
| ---------------- | --------------------------------------------------------------- |
| `lib/session.ts` | AES-GCM session encryption — dead code, no auth feature uses it |
