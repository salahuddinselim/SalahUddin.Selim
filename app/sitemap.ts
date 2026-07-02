import type { MetadataRoute } from "next"
import { s as base } from "@/data/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    {
      url: `${base}/credentials`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${base}/forge`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/persona`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ]
}
