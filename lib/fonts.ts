import { Poppins, Inter, JetBrains_Mono } from 'next/font/google'

export const fontHeading = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

export const fontBody = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
})

export const fontCode = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-code',
  display: 'swap',
  preload: true,
  fallback: ['monospace'],
})

export const fontVariables = `${fontHeading.variable} ${fontBody.variable} ${fontCode.variable}`
