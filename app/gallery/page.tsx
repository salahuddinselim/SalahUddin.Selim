import type { Metadata } from "next"
import { GallerySection } from "@/components/sections/gallery-section"
import { pageMeta } from "@/data"

export const metadata: Metadata = pageMeta.gallery

export default function GalleryPage() {
  return (
    <main className="min-h-screen pt-28">
      <GallerySection />
    </main>
  )
}
