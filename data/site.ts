const PRODUCTION_FALLBACK_URL = "https://salah-uddin-selim.vercel.app"

// Guard against NEXT_PUBLIC_SITE_URL being left as a localhost value in a
// deployed environment (e.g. copied from .env.local into Vercel by mistake) —
// that would leak into OpenGraph/canonical URLs and break link previews.
const isDeployed = process.env.VERCEL === "1" || process.env.NODE_ENV === "production"
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL
const isLocalhost = configuredUrl?.includes("localhost")

export const siteUrl =
  configuredUrl && !(isDeployed && isLocalhost) ? configuredUrl : PRODUCTION_FALLBACK_URL

export const s = siteUrl.replace(/\/+$/, "")

export const siteConfig = {
  name: "Salah Uddin Selim",
  title: "Salah Uddin Selim | BSc Graduate in CSE & Aspiring Data Analyst",
  titleTemplate: "%s | Salah Uddin Selim",
  description:
    "BSc graduate in Computer Science & Engineering from UIU (GPA 3.79/4.0, graduated Nov 2026) with hands-on experience in full-stack web development, IoT systems, and algorithm design. Built 5 production-quality projects across Java, Python, PHP, C/C++, and Arduino.",
  ogDescription:
    "BSc graduate in Computer Science & Engineering from United International University (Nov 2026), aspiring data analyst with a background in full-stack engineering, IoT, and AI.",
  keywords: [
    "Salah Uddin Selim",
    "Sala Uddin Selim",
    "Salauddin Selim",
    "CSE",
    "UIU",
    "BSc Computer Science",
    "data analyst",
    "full-stack developer",
    "IoT",
    "portfolio",
    "Bangladesh",
    "UIU graduate",
    "computer science graduate",
  ],
  author: { name: "Salah Uddin Selim" },
  icon: "/favicon-32.png",
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
  googleSiteVerification: "google08db23e23b4fc7df",
  locale: "en_US",
  ogImage: { url: "/og-image.png", width: 1200, height: 630 },
  twitterImage: "/opengraph-image",
}
