import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://salah-uddin-selim-git-main-sussalahuddin19-8236s-projects.vercel.app"
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/credentials`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/forge`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/persona`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/analytics`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ]
}
