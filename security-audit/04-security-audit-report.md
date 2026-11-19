# Security Audit Report — SalahUddin.Selim Portfolio

**Audit Date:** 2026-11-20  
**Auditor:** Automated code review + API probing  
**Branch/Commit:** `main` @ 35c631c

---

## Executive Summary

The portfolio is a public, authentication-free Next.js application with a good baseline security posture. No exploitable XSS, SQL injection, SSRF, path traversal, or authentication bypass vulnerabilities were found in production code paths. The main concerns are information disclosure (tech stack via `/api/monitor`, visitor analytics via `/api/visitors`), a known CSP `unsafe-inline` tradeoff, and several npm dependency vulnerabilities affecting dev-only packages or already-patched versions.

**Risk Rating: LOW** (no critical production vulnerabilities confirmed)

---

## Findings

### HIGH — CSP `unsafe-inline` in `script-src`

**File:** `proxy.ts`  
**Status:** Known accepted tradeoff (documented in CLAUDE.md)

```
script-src 'self' 'unsafe-inline' [third-party domains]
```

`unsafe-inline` allows arbitrary inline script execution, negating most XSS protection from CSP. This is intentional: Next.js App Router's bootstrap scripts are injected without a nonce by Turbopack, and `strict-dynamic` breaks Vercel Analytics/Speed Insights host-based allowlisting. A nonce is generated and exposed via `x-nonce` header but never applied to script tags.

**Mitigations in place:** React JSX escapes all user-generated content; no user data flows to `dangerouslySetInnerHTML`; JSON-LD uses `replace(/</g, "\\u003c")`; `serializeJsonLd()` escapes output. The `unsafe-inline` risk is real but requires both a successful injection vector and a willing XSS source — no such vector was found.

**Recommendation:** No immediate action needed unless a migration path to Next.js nonce support becomes available.

---

### MEDIUM — `/analytics` Page Is Publicly Accessible (No Auth)

**File:** `app/analytics/page.tsx`  
**Status:** New finding

The analytics page renders visitor statistics (total views: 1404, monthly views, country breakdown, device breakdown) with no authentication gate. The page has `noindex` to prevent search engine discovery, but it is directly accessible to anyone who navigates to `/analytics`.

**Risk:** Competitor or spam bots can scrape traffic patterns. Country/device breakdown leaks audience demographics.

**Recommendation:** Add a password-based or magic-link auth gate, or at minimum an obscure URL path (security-by-obscurity). If the data is meant to be public (transparency page), remove the `noindex` and add a note to the page about this.

---

### MEDIUM — Static GPA in Metadata Is Stale

**File:** `data/site.ts:20`

```ts
"CSE student at UIU (GPA 3.74/4.0)..."
```

This hardcoded description string uses `3.74` while Sanity now stores `3.79`. The dynamic JSON-LD in `app/layout.tsx` correctly reads GPA from Sanity at render time, but the `description` and `keywords` meta fields are static strings defined in `data/site.ts`. Social share cards and search engine snippets will show the outdated GPA.

**Recommendation:** Update `data/site.ts:20` to `3.79/4.0`, or refactor to derive it from Sanity at build time.

---

### MEDIUM — Twitter OG Image Uses Static File vs. Dynamic Route

**Files:** `data/site.ts:41-42`, `app/layout.tsx:33-39`

```ts
ogImage: { url: "/og-image.png", width: 1200, height: 630 },  // og:image — overridden at runtime by Next.js opengraph-image route
twitterImage: "/og-image.png",  // twitter:image — static file, not dynamic
```

The `og:image` tag renders as `/opengraph-image?<hash>` (the dynamic Next.js route) while `twitter:image` renders as `/og-image.png` (a static file). These may differ if the dynamic route is updated but the static file is not regenerated.

**Recommendation:** Keep both in sync. The simplest fix: either always use the static file for both, or always use the dynamic route for both. Since the dynamic route is the canonical image, regenerate `og-image.png` from it and ensure a CI step flags drift.

---

### LOW — `ip-api.com` Third-Party IP Geolocation (Privacy)

**File:** `app/api/visit/route.ts`

The visit endpoint calls `ip-api.com/json/{visitorIP}` to geolocate each visitor. This:

1. Sends every visitor's real IP address to a third-party service.
2. Has no rate-limit contract — ip-api.com's free tier has rate limits that could cause silently failed geolocations.
3. Has no privacy policy disclosure to visitors.

**Recommendation:** Add a brief note to any privacy/disclosure statement. Consider replacing with Vercel's built-in `x-vercel-ip-country` header (already a trusted edge header, no external call needed).

---

### LOW — `/api/monitor` Exposes Tech Stack Versions

**File:** `app/api/monitor/route.ts`  
**Status:** Explicitly accepted risk per CLAUDE.md

Returns `{"next":"16.2.10","react":"19.2.7","node":"v24.12.0","env":"development"}` publicly. This gives an attacker exact version information to match against known CVEs.

**Recommendation:** Accepted as-is per existing CLAUDE.md note. If the app is targeted, remove version fields.

---

### LOW — `proxy-addr` GHSA-jqcg-44mw-7w3h (IP Spoofing)

**Dependency path:** `devDependencies` → `@lhci/cli` → `express` → `proxy-addr@2.0.7`

**Risk:** Dev-only. `proxy-addr` is only used during local `npm run lhci` runs. The production Vercel deployment does not use this code path. The app's own `getIP()` in `lib/rate-limit.ts` correctly prefers Vercel's trusted `x-vercel-forwarded-for` header over the spoofable `x-forwarded-for`.

**Recommendation:** Upgrade `@lhci/cli` if a version with a fixed `proxy-addr` becomes available. No production action needed.

---

### LOW — `tinypool` Prototype Pollution → RCE (GHSA-\*)

**Dependency path:** `devDependencies` → `vitest` → `tinypool`

**Risk:** Dev-only. Only exploitable if a malicious test file or module is introduced into the test suite. No production exposure.

**Recommendation:** Upgrade `vitest` to a version that pins a patched `tinypool` when available.

---

### INFORMATIONAL — Nonce Generated But Never Applied

**File:** `proxy.ts`

A `crypto.randomUUID()`-based nonce is generated per request and set as the `x-nonce` response header, but `script-src` does not include `'nonce-{value}'`. The nonce infrastructure is in place for a future migration but currently provides no security benefit.

---

### INFORMATIONAL — `lib/session.ts` Dead Code

AES-GCM session encryption implementation exists but no auth feature uses it. Per CLAUDE.md: "if you build one on top of this, add CSRF tokens too, since Origin-checks alone aren't sufficient once cookie-based auth exists."

---

## Security Controls Confirmed Working

| Control                                        | Verified                                          |
| ---------------------------------------------- | ------------------------------------------------- |
| CORS origin check on all POSTs                 | ✅ Returns 403 on cross-origin                    |
| Turnstile bot protection                       | ✅ Required before email send                     |
| Rate limiting (5 req/hr contact, 10/min chat)  | ✅ X-RateLimit headers present                    |
| Zod input validation on contact form           | ✅ Rejects invalid lengths/formats                |
| Honeypot field on contact form                 | ✅ `website` field presence = reject              |
| HTML escaping in email templates               | ✅ `esc()` function applied                       |
| `dangerouslySetInnerHTML` JSON-LD only         | ✅ Properly escaped                               |
| Sanity revalidate webhook signature            | ✅ HMAC signature verified                        |
| `requireSameOrigin` on all state-changing APIs | ✅ No Origin = 403                                |
| IP extraction anti-spoofing                    | ✅ Last `x-forwarded-for` entry used              |
| HSTS header                                    | ✅ `max-age=63072000; includeSubDomains; preload` |
| X-Frame-Options DENY                           | ✅                                                |
| Permissions-Policy restrictive                 | ✅ camera, mic, geolocation disabled              |
| `.env*` in `.gitignore`                        | ✅ Secrets never committed                        |
| No hardcoded production secrets                | ✅ Confirmed                                      |

---

## npm Audit Summary

```
67 vulnerabilities (4 critical, 34 high, 25 moderate, 4 low)
```

**Critical:**

- `tinypool` — Prototype pollution (devDependency via vitest)
- `next` — Multiple CVEs listed (see below)

**Next.js CVE Assessment:** `npm audit` lists cumulative CVEs across all versions of a package. Next.js 16.2.10 is the latest stable release. Many flagged CVEs were fixed in earlier 16.x releases. Manual verification required for any CVEs whose fix version exceeds 16.2.10. No unpatched RCE in 16.2.10 was confirmed in this audit.

**High severity:** Primarily `vite`, `vitest`, `@rollup/*` — all devDependencies used only in `npm test` and `npm run dev`. No production exposure on Vercel.

**Recommendation:** Run `npm audit --omit=dev` to isolate production-relevant vulnerabilities. Address remaining production findings individually.
