"use client"

import { useEffect, useId, useRef } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { MapPin, X } from "lucide-react"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover"
import { cn } from "@/lib/utils"
import type { GalleryImageData } from "@/lib/sanity/fetch"
import { spanClasses, galleryCategoryColors, getGallerySpan } from "@/data"

const modalTransition = {
  type: "spring" as const,
  stiffness: 380,
  damping: 35,
}

const tileVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
}

interface GalleryTileProps {
  image: GalleryImageData
  activeImage: GalleryImageData | null
  setActiveImage: (image: GalleryImageData | null) => void
}

export function GalleryTile({ image, activeImage, setActiveImage }: GalleryTileProps) {
  const ref = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)
  const id = useId()
  const active = activeImage?._id === image._id
  const color = galleryCategoryColors[image.category ?? ""] ?? "#00D9FF"

  useEffect(() => {
    if (!active) return

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveImage(null)
    }
    window.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
      previouslyFocusedRef.current?.focus()
    }
  }, [active, setActiveImage])

  useOutsideClick(ref, () => setActiveImage(null))

  return (
    <>
      {/* Backdrop and modal share one AnimatePresence so they fade/collapse
          together on close, matching project-card.tsx's modal. */}
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 z-[60] grid place-items-center px-4">
            <motion.div
              key={`overlay-${image._id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60"
            />

            {/* No backdrop-blur here -- this box is the layoutId shared
                element that resizes between the tile and the full modal;
                see project-card.tsx / CLAUDE.md for why. */}
            <motion.div
              layoutId={`gallery-${image._id}-${id}`}
              ref={ref}
              role="dialog"
              aria-modal="true"
              aria-label={image.caption ?? image.title}
              transition={modalTransition}
              className="relative z-10 w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-[rgba(15,21,35,0.98)] border border-[rgba(0,217,255,0.15)] shadow-[0_0_40px_rgba(0,217,255,0.08)] sm:rounded-3xl overflow-hidden"
            >
              {/* z-[70], not z-50, since the fixed navbar (and its mobile
                  menu button) is also z-50 -- see project-card.tsx. */}
              <motion.button
                ref={closeButtonRef}
                key={`close-${image._id}-${id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="flex absolute top-3 right-3 z-[70] items-center justify-center bg-white/15 rounded-full h-11 w-11 text-white/80 hover:text-white hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 transition-colors"
                onClick={() => setActiveImage(null)}
                aria-label="Close image"
              >
                <X size={18} />
              </motion.button>

              <div className="relative w-full h-80 sm:h-96 shrink-0 bg-black/20">
                <Image
                  src={image.image}
                  alt={image.caption ?? image.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 600px"
                  priority
                  className="object-contain"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="p-4 space-y-2"
              >
                {image.category && (
                  <span
                    className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-[0.15em]"
                    style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}30` }}
                  >
                    {image.category}
                  </span>
                )}
                <p className="font-heading font-semibold text-foreground text-base">
                  {image.caption ?? image.title}
                </p>
                {image.location && (
                  <p className="flex items-center gap-1.5 text-xs font-mono text-cyan-300/70">
                    <MapPin size={12} />
                    {image.location}
                  </p>
                )}
              </motion.div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <motion.div
        layout
        layoutId={`gallery-${image._id}-${id}`}
        variants={tileVariants}
        exit={{ opacity: 0, y: 16, scale: 0.96, transition: { duration: 0.25 } }}
        whileHover={{ y: -2 }}
        transition={modalTransition}
        onClick={() => setActiveImage(active ? null : image)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setActiveImage(active ? null : image)
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={active}
        aria-label={`View ${image.caption ?? image.title} full size`}
        className={cn(
          "group relative overflow-hidden rounded-2xl cursor-pointer",
          "border border-white/[0.06] bg-white/[0.02]",
          "shadow-[0_4px_20px_rgba(0,0,0,0.2)]",
          "hover:border-cyan-400/20 transition-colors duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50",
          spanClasses[getGallerySpan(image)],
        )}
      >
        <DirectionAwareHover
          imageUrl={image.image}
          alt={image.caption ?? image.title}
          className="h-full w-full"
        >
          {image.location && (
            <p className="mb-1 flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-cyan-300/80">
              <MapPin size={10} />
              {image.location}
            </p>
          )}
          <p className="text-sm font-semibold drop-shadow-lg">{image.caption ?? image.title}</p>
        </DirectionAwareHover>
      </motion.div>
    </>
  )
}
