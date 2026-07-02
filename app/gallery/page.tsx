import type { Metadata } from "next"
import nextDynamic from "next/dynamic"
import { getGalleryImages } from "@/lib/sanity/fetch"
import { pageMeta } from "@/data"

export const metadata: Metadata = pageMeta.gallery
export const dynamic = "force-static"

const GallerySection = nextDynamic(
  () => import("@/components/sections/gallery-section").then((mod) => mod.GallerySection),
  { loading: () => <div className="min-h-[400px] animate-pulse bg-white/5 rounded-2xl m-8" /> },
)

export default async function GalleryPage() {
  const images = await getGalleryImages().catch(() => [])
  return (
    <main className="min-h-screen pt-28">
      <GallerySection images={images} />
    </main>
  )
}
