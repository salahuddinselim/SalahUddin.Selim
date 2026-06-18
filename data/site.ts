export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://salah-uddin-selim.vercel.app"

export const s = siteUrl.replace(/\/+$/, "")

export const siteConfig = {
  name: "Salah Uddin Selim",
  title: "Salah Uddin Selim | CSE Student & Software Engineer",
  titleTemplate: "%s | Salah Uddin Selim",
  description:
    "CSE student at UIU (GPA 3.68/4.0) with hands-on experience in full-stack web development, IoT systems, and algorithm design. Built 5 production-quality projects across Java, Python, PHP, C/C++, and Arduino.",
  ogDescription:
    "CSE student at United International University building intelligent systems with full-stack engineering, IoT, and AI.",
  keywords: [
    "Salah Uddin Selim",
    "CSE",
    "UIU",
    "full-stack developer",
    "software engineer",
    "IoT",
    "portfolio",
    "Bangladesh",
  ],
  author: { name: "Salah Uddin Selim" },
  icon: "/favicon.svg",
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
  googleSiteVerification: "google08db23e23b4fc7df",
  locale: "en_US",
  ogImage: { url: "/og-image.png", width: 1200, height: 630 },
  twitterImage: "/og-image.png",
}
