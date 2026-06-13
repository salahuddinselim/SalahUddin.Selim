import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://salah-uddin-selim-git-main-sussalahuddin19-8236s-projects.vercel.app/sitemap.xml",
  }
}
