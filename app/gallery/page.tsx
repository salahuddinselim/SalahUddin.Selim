import type { Metadata } from "next"
import { GallerySection } from "@/components/sections/gallery-section"
import { getGalleryImages } from "@/lib/sanity/fetch"
import { pageMeta } from "@/data"

export const metadata: Metadata = pageMeta.gallery
export const dynamic = "force-static"

export default async function GalleryPage() {
  const images = await getGalleryImages().catch(() => [])
  return (
    <main className="min-h-screen pt-28">
      <GallerySection images={images} />
    </main>
  )
}
