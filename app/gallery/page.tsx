import type { Metadata } from "next"
import { GallerySection } from "@/components/sections/gallery-section"

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Visual archive of Salah Uddin Selim's academic life, creations, and memorable moments.",
  openGraph: {
    title: "Gallery | Salah Uddin Selim",
    description:
      "Visual archive of Salah Uddin Selim's academic life, creations, and memorable moments.",
  },
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen pt-28">
      <GallerySection />
    </main>
  )
}
