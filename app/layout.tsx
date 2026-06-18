import type { Metadata } from 'next'
import { headers } from 'next/headers'
import './globals.css'
import { fontVariables } from '@/lib/fonts'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/Footer'
import { VisitorPanelProvider } from '@/components/analytics/visitor-context'
import { VisitTracker } from '@/components/analytics/visit-tracker'
import { SpaceBackgroundWrapper } from '@/components/effects/space-background-wrapper'
import { AnalyticsWrapper } from '@/components/analytics/analytics-wrapper'
import { ShowOnMainSite } from '@/components/layout/shell-provider'
import { siteUrl, siteConfig, jsonLd } from "@/data"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [siteConfig.author],
  icons: { icon: siteConfig.icon },
  manifest: siteConfig.manifest,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.ogDescription,
    type: 'website',
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: siteUrl,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.ogDescription,
    images: [siteConfig.twitterImage],
  },
  robots: siteConfig.robots,
  other: {
    'google-site-verification': siteConfig.googleSiteVerification,
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get("x-nonce") ?? ""
  return (
    <html lang="en" className={`${fontVariables} dark`} data-scroll-behavior="smooth" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://id5e9a8v.apicdn.sanity.io" />
          <link rel="preconnect" href="https://challenges.cloudflare.com" />
          <link rel="dns-prefetch" href="https://id5e9a8v.apicdn.sanity.io" />
          <link rel="dns-prefetch" href="https://challenges.cloudflare.com" />
        </head>
      <body className="min-h-screen bg-[#050816] text-foreground antialiased relative overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-accent focus:text-white focus:text-sm focus:font-semibold focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          Skip to main content
        </a>
        <script
          nonce={nonce}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <style>{`html{background:#050816;color:#fff;scroll-behavior:smooth;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}body{margin:0;font-family:var(--font-body-family),system-ui,sans-serif;line-height:1.5;background:#050816;color:#fff;min-height:100vh}body,button,textarea,input,select{font:inherit}a{color:#00d9ff;text-decoration:none}img{max-width:100%;display:block}button{font:inherit}.hero-content{display:flex;flex-direction:column;align-items:center;text-align:center;width:100%;max-width:900px;margin-inline:auto;padding-inline:1rem}.hero-subtitle{font-size:.875rem;font-weight:500;letter-spacing:.2em;margin-bottom:1.5rem;color:#94a3b8}.hero-title{font-weight:800;color:#fff;line-height:1;letter-spacing:0;max-width:100%;word-break:break-word}.hero-role{font-size:1rem;color:#00d9ff;font-weight:500;white-space:nowrap}.hero-copy{font-size:1rem;color:#94a3b8;line-height:1.75;max-width:700px;margin-inline:auto}.hero-stagger>.stagger-item{opacity:0;animation:heroFadeUp .6s ease-out forwards}.hero-stagger>.stagger-item:nth-child(1){animation-delay:.3s}.hero-stagger>.stagger-item:nth-child(2){animation-delay:.45s}.hero-stagger>.stagger-item:nth-child(3){animation-delay:.6s}.hero-stagger>.stagger-item:nth-child(4){animation-delay:.75s}.hero-stagger>.stagger-item:nth-child(5){animation-delay:.9s}.hero-actions-stagger>.hero-btn-group{opacity:0;animation:heroFadeUp .5s ease-out forwards}.hero-actions-stagger>.hero-btn-group:nth-child(1){animation-delay:.8s}.hero-actions-stagger>.hero-btn-group:nth-child(2){animation-delay:.92s}.animate-role-in{animation:heroRoleIn .3s ease-out}.animate-large-role-in{animation:heroLargeRoleIn .5s ease-out}.animate-dropdown-in{animation:dropdownIn .15s ease-out}@keyframes heroFadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@keyframes heroRoleIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes heroLargeRoleIn{from{opacity:0;transform:translateY(40px);filter:blur(8px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}@keyframes dropdownIn{from{opacity:0;transform:translateY(-8px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}@keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}`}</style>
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
