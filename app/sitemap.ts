import type { MetadataRoute } from "next"
import { s as base } from "@/data/site"
import { getProjects } from "@/lib/sanity/fetch"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projects: Awaited<ReturnType<typeof getProjects>> = []
  try {
    projects = await getProjects()
  } catch (error) {
    console.error("Failed to load projects for sitemap:", error)
  }

  const projectUrls: MetadataRoute.Sitemap = projects
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }))

  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...projectUrls,
    {
      url: `${base}/credentials`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${base}/forge`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/persona`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/api/cv`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ]
}
