import type { Metadata } from 'next'
import './globals.css'
import { fontVariables } from '@/lib/fonts'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/Footer'
import { VisitorPanelProvider } from '@/components/analytics/visitor-context'
import { VisitTracker } from '@/components/analytics/visit-tracker'
import { SpaceBackgroundWrapper } from '@/components/effects/space-background-wrapper'
import { AnalyticsWrapper } from '@/components/analytics/analytics-wrapper'
import { ShowOnMainSite } from '@/components/layout/shell-provider'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <style>{`html{background:#050816;color:#fff;scroll-behavior:smooth;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}body{margin:0;font-family:var(--font-body-family),system-ui,sans-serif;line-height:1.5;background:#050816;color:#fff;min-height:100vh;position:relative;overflow-x:hidden}body,button,textarea,input,select{font:inherit}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.sr-only:focus{position:fixed;top:1rem;left:1rem;z-index:100;width:auto;height:auto;padding:0.5rem 1rem;margin:0;overflow:visible;clip:auto;white-space:normal;border-radius:16px;background:var(--accent,#00d9ff);color:#fff;font-size:.875rem;font-weight:600;outline:2px solid rgba(0,217,255,0.5);outline-offset:2px}a{color:#00d9ff;text-decoration:none}img{max-width:100%;display:block}button{font:inherit}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{top:0;right:0;bottom:0;left:0}.top-5{top:1.25rem}.left-1\\/2{left:50%}.z-10{z-index:10}.z-50{z-index:50}.-translate-x-1\\/2{transform:translateX(-50%)}.flex{display:flex}.inline-flex{display:inline-flex}.hidden{display:none}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.w-full{width:100%}.w-\\[95\\%\\]{width:95%}.max-w-\\[1240px\\]{max-width:1240px}.min-h-screen{min-height:100vh}.overflow-hidden{overflow:hidden}.px-4{padding-left:1rem;padding-right:1rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.pointer-events-none{pointer-events:none}.rounded-full{border-radius:9999px}.border{border:1px solid}.border-white\\/10{border-color:rgba(255,255,255,0.1)}.bg-\\[\\#050816\\]{background:#050816}.bg-\\[\\#0B1220\\]\\/80{background:rgba(11,18,32,0.8)}.text-foreground{color:#fff}.text-sm{font-size:.875rem}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.tracking-\\[0\\.32em\\]{letter-spacing:.32em}.transition-all{transition:all .3s ease}.duration-300{transition-duration:.3s}.text-white\\/90{color:rgba(255,255,255,0.9)}.hero-content{display:flex;flex-direction:column;align-items:center;text-align:center;width:100%;max-width:900px;margin-inline:auto;padding-inline:1rem}.hero-subtitle{font-size:.875rem;font-weight:500;letter-spacing:.2em;margin-bottom:1.5rem;color:#94a3b8}.hero-title{font-weight:800;color:#fff;line-height:1;letter-spacing:0;max-width:100%;word-break:break-word}.hero-role{font-size:1rem;color:#00d9ff;font-weight:500;white-space:nowrap}.hero-copy{font-size:1rem;color:#94a3b8;line-height:1.75;max-width:700px;margin-inline:auto}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}`}</style>
        <SpaceBackgroundWrapper />
        <AnalyticsWrapper />
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
