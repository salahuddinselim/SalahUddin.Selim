# Salah Uddin Selim — Portfolio

[![Live Site](https://img.shields.io/badge/Live-salah--uddin--selim.vercel.app-8B5CF6?style=flat-square)](https://salah-uddin-selim.vercel.app)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=flat-square&logo=sanity&logoColor=white)](https://sanity.io)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

Dark, sci-fi themed portfolio featuring an AI chat assistant, real-time visitor analytics, 3D interactive elements, and a space-themed visual identity.

## Quick Start

```bash
git clone https://github.com/salahuddinselim/SalahUddin.Selim.git
cd SalahUddin.Selim
cp .env.example .env.local    # then fill in your keys
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Environment variables are validated at build time by `lib/env.ts` using Zod. See `.env.example` for every required and optional key.

## Project Structure

```
├── app/            # Next.js App Router — pages, layouts, API routes
├── components/     # React components organized by feature
├── data/           # Static content (fallback data when Sanity is unavailable)
├── hooks/          # Shared React hooks
├── lib/            # Pure utilities, Sanity client, security helpers
├── types/          # TypeScript interfaces for all entities
├── tests/          # Vitest unit tests + Playwright e2e tests
├── public/         # Static assets (CV, OG image, favicon, webmanifest)
├── cv/             # Resume PDF source files
└── images/         # Image assets
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed design decisions.

## Scripts

| Script               | Purpose                            |
| -------------------- | ---------------------------------- |
| `npm run dev`        | Start development server           |
| `npm run build`      | Production build                   |
| `npm run start`      | Start production server            |
| `npm run lint`       | ESLint check                       |
| `npm run lint:fix`   | ESLint auto-fix                    |
| `npm run format`     | Prettier check                     |
| `npm run format:fix` | Prettier write                     |
| `npm run typecheck`  | TypeScript `--noEmit` check        |
| `npm test`           | Run Vitest unit tests              |
| `npm run test:watch` | Vitest watch mode                  |
| `npm run test:e2e`   | Run Playwright e2e tests           |
| `npm run analyze`    | Build with bundle analyzer         |
| `npm run knip`       | Detect unused dependencies/exports |
| `npm run sanity`     | Start local Sanity Studio          |
| `npm run lhci`       | Run Lighthouse CI audit locally    |

## Deployment

Pushes to `main` are automatically deployed to Vercel. Set the same environment variables from `.env.example` in the Vercel project dashboard.

For manual deployment:

```bash
vercel --prod
```

## License

**All Rights Reserved.** This code is proprietary — see [LICENSE](LICENSE). The repository is public for portfolio and demonstration purposes only; it is not open source, and no permission is granted to copy, reuse, or redistribute this code or design.
