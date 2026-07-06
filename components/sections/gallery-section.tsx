"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { GalleryTile } from "@/components/sections/gallery-tile"
import type { GalleryImageData } from "@/lib/sanity/fetch"
import { gallerySectionCopy, galleryCategoryColors } from "@/data"

function getCategoryColor(cat: string): string {
  return galleryCategoryColors[cat] ?? "#00D9FF"
}

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
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeImage, setActiveImage] = useState<GalleryImageData | null>(null)

  const categories = useMemo(() => {
    return [
      { id: "All", count: images.length },
      ...Array.from(new Set(images.map((img) => img.category).filter(Boolean) as string[])).map(
        (cat) => ({
          id: cat,
          count: images.filter((img) => img.category === cat).length,
        }),
      ),
    ]
  }, [images])

  const filtered = useMemo(() => {
    return activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory)
  }, [images, activeCategory])

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
      <motion.div variants={headerVariants} initial="hidden" animate="visible" className="mb-8">
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

      {/* Category Filters */}
      {categories.length > 1 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id
            const color = cat.id === "All" ? "#00D9FF" : getCategoryColor(cat.id)
            return (
              <motion.button
                key={cat.id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, ease: "easeOut" as const },
                  },
                }}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id)
                  setActiveImage(null)
                }}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-[0.15em] transition-all duration-200",
                  isActive
                    ? "border shadow-[0_0_15px_rgba(0,217,255,0.06)]"
                    : "border border-white/[0.06] text-white/35 hover:text-white/70 hover:border-white/10",
                )}
                style={
                  isActive
                    ? { borderColor: `${color}40`, backgroundColor: `${color}10`, color }
                    : undefined
                }
              >
                {cat.id}
                <span className={cn("tabular-nums", isActive ? "opacity-80" : "text-white/50")}>
                  {cat.count}
                </span>
              </motion.button>
            )
          })}
        </motion.div>
      )}

      {/* Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[200px] gap-3 sm:gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((img) => (
            <GalleryTile
              key={img._id}
              image={img}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
