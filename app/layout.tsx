import type { Metadata } from 'next'
import './globals.css'
import { fontVariables } from '@/lib/fonts'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/Footer'
import { VisitorPanelProvider } from '@/components/analytics/visitor-context'
import { VisitTracker } from '@/components/analytics/visit-tracker'
import { SpaceBackground } from '@/components/effects/space-background'
import { CursorFollower } from '@/components/ui/cursor-follower'
import { ShowOnMainSite } from '@/components/layout/shell-provider'

const baseUrl = 'https://salahuddin.dev'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Salah Uddin Selim | CSE Student & Software Engineer',
    template: '%s | Salah Uddin Selim',
  },
  description:
    'CSE student at UIU (GPA 3.68/4.0) with hands-on experience in full-stack web development, IoT systems, and algorithm design. Built 5 production-quality projects across Java, Python, PHP, C/C++, and Arduino.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Salah Uddin Selim | CSE Student & Software Engineer',
    description:
      'CSE student at United International University building intelligent systems with full-stack engineering, IoT, and AI.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Salah Uddin Selim',
    url: baseUrl,
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
  alternates: { canonical: baseUrl },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontVariables} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#050816] text-foreground antialiased relative overflow-x-hidden">
        <SpaceBackground />
        <CursorFollower />
        <div className="relative z-10">
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
