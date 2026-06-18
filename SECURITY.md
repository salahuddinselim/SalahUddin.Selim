# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

Only the latest release receives security updates.

## Reporting a Vulnerability

If you discover a security vulnerability, please report it privately. **Do not open a public issue.**

Send details to salahuddinselim@protonmail.com with the following information:

- Type of vulnerability (e.g., XSS, CSRF, information disclosure)
- Steps to reproduce
- Affected version(s)
- Impact description
- Any suggested remediation (optional)

You will receive an acknowledgement within 48 hours, and we will work on a fix before publicly disclosing the issue.

## What to Expect

1. **Acknowledgement**: Within 48 hours of your report.
2. **Triage**: We assess severity and impact within 5 business days.
3. **Fix**: A patch is developed and tested. Timeline depends on severity.
4. **Release**: The fix is deployed. You will be notified when it ships.
5. **Disclosure**: We coordinate public disclosure after the fix is live.

## Security Measures

This project implements the following security controls:

- **CSP with nonces** — every request gets a unique nonce; `strict-dynamic` prevents script injection.
- **Input validation** — all user input validated with Zod schemas on the server.
- **Rate limiting** — per-IP sliding window on all POST endpoints.
- **HTML escaping** — contact form output is escaped before email rendering.
- **CORS restriction** — API routes accept requests only from the known origin.
- **No secrets in client bundle** — server-only env vars are never `NEXT_PUBLIC_`-prefixed.
- **Secure headers** — HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP, CORP set on every response.
- **Session encryption** — AES-CBC-256 with random IV for any future auth needs.
- **CSP reporting** — violations are collected at `/api/csp-report` for monitoring.
