import { s } from "./site"
import type { SocialLinkData } from "@/lib/sanity/fetch"

export const fallbackContactEmail = "selimsalahuddin19@gmail.com"
const fallbackGpaText = "GPA 3.74/4.0"

// Social profile URLs (sameAs) come from Sanity's socialLink documents so this
// stays in sync with what's actually configured in the CMS — no duplicated,
// driftable copies of LinkedIn/Instagram/Facebook/etc. URLs in code.
export function buildJsonLd(socials: SocialLinkData[], email?: string, gpaText?: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${s}/#person`,
        name: "Salah Uddin Selim",
        url: s,
        email: email || fallbackContactEmail,
        jobTitle: "CSE Student & Aspiring Data Analyst",
        alumniOf: "United International University",
        award: "6th Runner-Up — UIU Software Project Competition, Spring 2025",
        sameAs: socials.map((social) => social.url),
      },
      {
        "@type": "WebSite",
        "@id": `${s}/#website`,
        url: s,
        name: "Salah Uddin Selim",
        description: `CSE student at UIU (${gpaText ?? fallbackGpaText}) with hands-on experience in full-stack web development, IoT systems, and algorithm design.`,
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
}
