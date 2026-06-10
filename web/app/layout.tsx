import type { Metadata } from 'next'
import './globals.css'
import { fontVariables } from '@/lib/fonts'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/Footer'
import { VisitorPanelProvider } from '@/components/analytics/visitor-context'

export const metadata: Metadata = {
  title: 'Salah Uddin Selim | Senior Full-Stack Engineer',
  description:
    'Senior Full-Stack Engineer with 8+ years of experience building scalable web applications, AI systems, and cross-platform solutions. Specializing in React, Next.js, Node.js, and AI engineering.',
  openGraph: {
    title: 'Salah Uddin Selim | Senior Full-Stack Engineer',
    description:
      'Senior Full-Stack Engineer with 8+ years of experience building scalable web applications, AI systems, and cross-platform solutions.',
    type: 'website',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontVariables} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-bg text-foreground antialiased">
        <VisitorPanelProvider>
          <Navbar />
          {children}
          <Footer />
        </VisitorPanelProvider>
      </body>
    </html>
  )
}
