import type { Metadata } from "next"
import { headers } from "next/headers"
import "./globals.css"
import { fontVariables } from "@/lib/fonts"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/Footer"
import { VisitorPanelProvider } from "@/components/analytics/visitor-context"
import { VisitTracker } from "@/components/analytics/visit-tracker"
import { SpaceBackgroundWrapper } from "@/components/effects/space-background-wrapper"
import { AnalyticsWrapper } from "@/components/analytics/analytics-wrapper"
import { ShowOnMainSite } from "@/components/layout/shell-provider"
import { siteUrl, siteConfig, jsonLd } from "@/data"

export const metadata: Metadata = {
  metadataBase: new URL("https://salah-uddin-selim.vercel.app"),
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
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: siteUrl,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.ogDescription,
    images: [siteConfig.twitterImage],
  },
  robots: siteConfig.robots,
  other: {
    "google-site-verification": siteConfig.googleSiteVerification,
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get("x-nonce") ?? ""
  return (
    <html
      lang="en"
      className={`${fontVariables} dark`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://id5e9a8v.apicdn.sanity.io" />
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
        <link rel="dns-prefetch" href="https://id5e9a8v.apicdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://challenges.cloudflare.com" />
      </head>
      <body className="min-h-screen bg-[#050816] text-foreground antialiased relative overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-accent focus:text-white focus:text-sm focus:font-semibold focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          Skip to main content
        </a>
        <style>{`html{background:#050816;color:#fff;scroll-behavior:smooth;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}body{margin:0;font-family:var(--font-body-family),system-ui,sans-serif;line-height:1.5;background:#050816;color:#fff;min-height:100vh}body,button,textarea,input,select{font:inherit}a{color:#00d9ff;text-decoration:none}img{max-width:100%;display:block}button{font:inherit}.animate-role-in{animation:heroRoleIn .3s ease-out}.animate-large-role-in{animation:heroLargeRoleIn .5s ease-out}.animate-dropdown-in{animation:dropdownIn .15s ease-out}@keyframes heroRoleIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}@keyframes heroLargeRoleIn{from{opacity:0;transform:translateY(40px);filter:blur(8px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}@keyframes dropdownIn{from{opacity:0;transform:translateY(-8px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}@keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}`}</style>
        <SpaceBackgroundWrapper />
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
        <AnalyticsWrapper />
        <script
          nonce={nonce}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
