"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, MapPin, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover"
import type { GalleryImageData } from "@/lib/sanity/fetch"
import { gallerySectionCopy, spanClasses } from "@/data"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function GallerySection({ images }: { images: GalleryImageData[] }) {
  return (
    <section className="relative min-h-screen px-4 sm:px-6 md:px-8 pb-24 max-w-[1340px] mx-auto">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-6"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.25em] text-white/40 transition-all duration-200 hover:text-cyan-400/60"
        >
          <ArrowLeft size={12} />
          {gallerySectionCopy.backLabel}
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div variants={headerVariants} initial="hidden" animate="visible" className="mb-10">
        <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-cyan-400/40 mb-3">
          {gallerySectionCopy.eyecatch}
        </p>
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            My{" "}
            <span className="text-cyan-300 drop-shadow-[0_0_20px_rgba(0,217,255,0.3)]">
              {gallerySectionCopy.heading}
            </span>
          </h1>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-mono text-white/50">
            <ImageIcon size={12} />
            {images.length}
          </span>
        </div>
        <p className="text-sm font-mono text-white/50 tracking-[0.15em]">
          {gallerySectionCopy.subtitle}
        </p>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[200px] gap-3 sm:gap-4"
      >
        {images.map((img, idx) => (
          <motion.div
            key={img.title + idx}
            variants={{
              hidden: { opacity: 0, y: 16, scale: 0.96 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.4, ease: "easeOut" as const },
              },
            }}
            className={cn(
              "relative overflow-hidden rounded-2xl",
              "border border-white/[0.06] bg-white/[0.02]",
              "shadow-[0_4px_20px_rgba(0,0,0,0.2)]",
              spanClasses[img.span ?? "square"],
            )}
          >
            <DirectionAwareHover
              imageUrl={img.image}
              alt={img.caption ?? img.title}
              className="h-full w-full"
            >
              {img.location && (
                <p className="mb-1 flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-cyan-300/80">
                  <MapPin size={10} />
                  {img.location}
                </p>
              )}
              <p className="text-sm font-semibold drop-shadow-lg">{img.caption ?? img.title}</p>
            </DirectionAwareHover>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
