import type { Metadata } from 'next'
import './globals.css'
import { fontVariables } from '@/lib/fonts'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/Footer'
import { VisitorPanelProvider } from '@/components/analytics/visitor-context'
import { VisitTracker } from '@/components/analytics/visit-tracker'
import { SpaceBackground } from '@/components/effects/space-background'
import { ShowOnMainSite } from '@/components/layout/shell-provider'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import { headers } from 'next/headers'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://salah-uddin-selim.vercel.app'
const s = siteUrl.replace(/\/+$/, '')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Salah Uddin Selim | CSE Student & Software Engineer',
    template: '%s | Salah Uddin Selim',
  },
  description:
    'CSE student at UIU (GPA 3.68/4.0) with hands-on experience in full-stack web development, IoT systems, and algorithm design. Built 5 production-quality projects across Java, Python, PHP, C/C++, and Arduino.',
  keywords: ['Salah Uddin Selim', 'CSE', 'UIU', 'full-stack developer', 'software engineer', 'IoT', 'portfolio', 'Bangladesh'],
  authors: [{ name: 'Salah Uddin Selim' }],
  icons: { icon: '/favicon.svg' },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'Salah Uddin Selim | CSE Student & Software Engineer',
    description:
      'CSE student at United International University building intelligent systems with full-stack engineering, IoT, and AI.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Salah Uddin Selim',
    url: siteUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salah Uddin Selim | CSE Student & Software Engineer',
    description:
      'CSE student at United International University building intelligent systems with full-stack engineering, IoT, and AI.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  other: {
    'google-site-verification': 'google08db23e23b4fc7df',
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${s}/#person`,
      name: "Salah Uddin Selim",
      url: s,
      jobTitle: "CSE Student & Software Engineer",
      alumniOf: "United International University",
      award: "6th Runner-Up — UIU Software Project Competition, Spring 2025",
      sameAs: [
        "https://github.com/salahuddinselim",
        "https://linkedin.com/in/salahuddinselim",
        "mailto:sselim223512@bscse.uiu.ac.bd",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${s}/#website`,
      url: s,
      name: "Salah Uddin Selim",
      description:
        "CSE student at UIU (GPA 3.68/4.0) with hands-on experience in full-stack web development, IoT systems, and algorithm design.",
      publisher: { "@id": `${s}/#person` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${s}/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: s },
        { "@type": "ListItem", position: 2, name: "Projects", item: `${s}/projects` },
        { "@type": "ListItem", position: 3, name: "Credentials", item: `${s}/credentials` },
        { "@type": "ListItem", position: 4, name: "Forge", item: `${s}/forge` },
        { "@type": "ListItem", position: 5, name: "Persona", item: `${s}/persona` },
        { "@type": "ListItem", position: 6, name: "Gallery", item: `${s}/gallery` },
      ],
    },
  ],
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get('x-nonce') ?? ''
  return (
    <html lang="en" className={`${fontVariables} dark`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-[#050816] text-foreground antialiased relative overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-accent focus:text-white focus:text-sm focus:font-semibold focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SpaceBackground />
        <SpeedInsights />
        <Analytics />
        <div className="relative z-10" id="main-content">
            <VisitorPanelProvider>
              <ShowOnMainSite>
                <VisitTracker />
                <Navbar />
              </ShowOnMainSite>
              {children}
              <ShowOnMainSite>
                <Footer />
              </ShowOnMainSite>
            </VisitorPanelProvider>
        </div>
      </body>
    </html>
  )
}
