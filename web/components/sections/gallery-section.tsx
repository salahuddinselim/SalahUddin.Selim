"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, MapPin, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface GalleryImage {
  id: number
  src: string
  alt: string
  caption: string
  location: string
  span: "square" | "vertical" | "horizontal" | "large"
}

const images: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1717501218636-a390f9ac5957?w=600&q=80",
    alt: "Neon cityscape at night",
    caption: "Dhaka Nightscape",
    location: "Dhaka, BD",
    span: "horizontal",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1558486012-817176f84c6d?w=600&q=80",
    alt: "Code on a dark monitor",
    caption: "Late Night Session",
    location: "Home Lab",
    span: "vertical",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
    alt: "Developer workspace",
    caption: "The Workstation",
    location: "Dhaka, BD",
    span: "square",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    alt: "AI data visualization",
    caption: "AI Model Training",
    location: "Cloud Lab",
    span: "square",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    alt: "Code editor",
    caption: "Architecture Design",
    location: "VS Code",
    span: "horizontal",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80",
    alt: "Abstract tech pattern",
    caption: "Binary Horizon",
    location: "Generative Art",
    span: "large",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&q=80",
    alt: "Holographic interface",
    caption: "UI Hologram",
    location: "IIT Patna",
    span: "vertical",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=600&q=80",
    alt: "Electronics workbench",
    caption: "Hardware Lab",
    location: "Innovation Hub",
    span: "square",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80",
    alt: "Camera lens",
    caption: "Through the Lens",
    location: "Chittagong, BD",
    span: "horizontal",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80",
    alt: "Data matrix",
    caption: "Data Streams",
    location: "Cloud Server",
    span: "square",
  },
]

const spanClasses: Record<GalleryImage["span"], string> = {
  square: "col-span-1 row-span-1",
  vertical: "col-span-1 row-span-2",
  horizontal: "col-span-2 row-span-1",
  large: "col-span-2 row-span-2",
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

export function GallerySection() {
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
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.25em] text-white/20 transition-all duration-200 hover:text-cyan-400/60"
        >
          <ArrowLeft size={12} />
          Back to Home
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-cyan-400/40 mb-3">
          VISUAL ARCHIVE
        </p>
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            My{" "}
            <span className="text-cyan-300 drop-shadow-[0_0_20px_rgba(0,217,255,0.3)]">
              Gallery
            </span>
          </h1>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-mono text-white/40">
            <ImageIcon size={12} />
            {images.length}
          </span>
        </div>
        <p className="text-sm font-mono text-white/25 tracking-[0.15em]">
          Academics · Creations · Moments
        </p>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4"
      >
        {images.map((img) => (
          <motion.div
            key={img.id}
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
              spanClasses[img.span],
            )}
          >
            <div className="relative h-full w-full">
              <img
                src={img.src}
                alt={img.alt}
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
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-black/40 backdrop-blur-sm px-2 py-0.5 text-[10px] font-mono text-white/50 border border-white/10 transition-all duration-300 group-hover:bg-cyan-400/20 group-hover:text-cyan-300/80 group-hover:border-cyan-400/30">
                  <MapPin size={10} />
                  {img.location}
                </span>
              </div>
              {/* Caption — visible on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-semibold text-white drop-shadow-lg">
                  {img.caption}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
