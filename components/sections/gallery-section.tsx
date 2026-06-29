"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, MapPin, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { getGalleryImages, type GalleryImageData } from "@/lib/sanity/fetch"
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

export function GallerySection() {
  const [images, setImages] = useState<GalleryImageData[]>([])

  useEffect(() => {
    getGalleryImages()
      .then(setImages)
      .catch(() => {})
  }, [])

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
        <p className="text-sm font-mono text-white/25 tracking-[0.15em]">
          {gallerySectionCopy.subtitle}
        </p>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4"
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
              "group relative overflow-hidden rounded-2xl",
              "border border-white/[0.06] bg-white/[0.02]",
              "shadow-[0_4px_20px_rgba(0,0,0,0.2)]",
              spanClasses[img.span ?? "square"],
            )}
          >
            <div className="relative h-full w-full">
              <Image
                src={img.image}
                alt={img.caption ?? img.title}
                width={img.width ?? 1200}
                height={img.height ?? 900}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                quality={65}
                loading="lazy"
                className={cn(
                  "h-full w-full object-cover transition-all duration-500",
                  "group-hover:scale-105 group-hover:brightness-110",
                )}
              />
              {/* Gradient overlay */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent",
                  "opacity-60 transition-opacity duration-300",
                  "group-hover:opacity-90",
                )}
              />
              {/* Location badge */}
              {img.location && (
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/40 backdrop-blur-sm px-2 py-0.5 text-[10px] font-mono text-white/50 border border-white/10 transition-all duration-300 group-hover:bg-cyan-400/20 group-hover:text-cyan-300/80 group-hover:border-cyan-400/30">
                    <MapPin size={10} />
                    {img.location}
                  </span>
                </div>
              )}
              {/* Caption — visible on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-semibold text-white drop-shadow-lg">
                  {img.caption ?? img.title}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
