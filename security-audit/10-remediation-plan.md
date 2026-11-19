# Remediation Plan — SalahUddin.Selim Portfolio

**Date:** 2026-11-20  
**Priority:** P1 (fix now) → P2 (fix this sprint) → P3 (fix when convenient) → Accepted

---

## P1 — Fix Immediately

### VUL-003: Stale GPA in `data/site.ts`

**Action:** Update `data/site.ts:20` — change `GPA 3.74/4.0` to `GPA 3.79/4.0` in the description string.

**Files to change:** `data/site.ts`  
**Risk of change:** Near zero — static string replacement  
**Test:** `npm run build` + verify `<meta name="description">` in page source

---

## P2 — Fix This Sprint

### VUL-002: `/analytics` Page Has No Authentication

**Options:**

1. **Add an HTTP basic auth middleware** — simple, deploy-time secret in env
2. **Move to a secret URL path** (e.g. `/dashboard-xk9p2`) — security-by-obscurity, easy
3. **Document as intentional public transparency page** — remove noindex, add a "Public analytics" note

If the data is private, Option 1 or 2. If transparency is the goal, Option 3.

**Recommended:** Option 2 (rename route) until a proper auth system is built.

---

### VUL-004: Twitter OG Image vs Dynamic OG Route

**Action:** Set `twitterImage` in `data/site.ts` to also use the dynamic route, or ensure `og-image.png` is regenerated whenever `opengraph-image.tsx` changes.

**Files to change:** `data/site.ts:42`  
**Simplest fix:**

```ts
twitterImage: "/opengraph-image",
```

Next.js will serve the dynamic route at that path with proper cache headers.

---

### VUL-005: ip-api.com Privacy Disclosure

**Action:** Replace ip-api.com call in `/api/visit` with Vercel's trusted edge header `x-vercel-ip-country` (already available on Vercel, no external call needed).

**Files to change:** `app/api/visit/route.ts`

**Before:**

```ts
const geoRes = await fetch(`http://ip-api.com/json/${ip}`)
```

**After:**

```ts
const country = req.headers.get("x-vercel-ip-country") ?? "Unknown"
// No external call needed
```

This eliminates the third-party dependency, removes privacy concern, and improves performance.

---

## P3 — Fix When Convenient

### VUL-007/008: DevDependency Vulnerabilities

**Action:** `npm update vitest @lhci/cli` when patched versions are available. Run `npm audit --omit=dev` to confirm zero production-tier vulnerabilities.

---

## Accepted — No Action

| ID      | Reason                                                                     |
| ------- | -------------------------------------------------------------------------- |
| VUL-001 | Next.js App Router + Turbopack cannot use nonces; `unsafe-inline` required |
| VUL-006 | `/api/monitor` exposure intentional per CLAUDE.md; monitor UI shows it     |
| VUL-009 | Nonce infrastructure kept for future migration                             |
| VUL-010 | Dead code; will be activated or removed when auth feature is built         |
