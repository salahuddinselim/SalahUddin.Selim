"use client"

import Image from "next/image"
import { useRef, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Direction = "top" | "bottom" | "left" | "right"

// atan2 of the pointer's offset from center, quantized to 4 quadrants,
// tells us which edge the cursor entered from so the image/text can slide
// in from the opposite side -- the "direction aware" part of the effect.
function getEnterDirection(event: React.MouseEvent<HTMLDivElement>, el: HTMLDivElement): Direction {
  const { width: w, height: h, left, top } = el.getBoundingClientRect()
  const x = event.clientX - left - (w / 2) * (w > h ? h / w : 1)
  const y = event.clientY - top - (h / 2) * (h > w ? w / h : 1)
  const angle = Math.round((Math.atan2(y, x) / 1.57079633 + 5) % 4)
  return (["top", "right", "bottom", "left"] as const)[angle] ?? "left"
}

const imageVariants = {
  initial: { x: 0, y: 0 },
  exit: { x: 0, y: 0 },
  top: { y: 20 },
  bottom: { y: -20 },
  left: { x: 20 },
  right: { x: -20 },
}

const textVariants = {
  initial: { x: 0, y: 0, opacity: 0 },
  exit: { x: 0, y: 0, opacity: 0 },
  top: { y: -20, opacity: 1 },
  bottom: { y: 2, opacity: 1 },
  left: { x: -2, opacity: 1 },
  right: { x: 20, opacity: 1 },
}

interface DirectionAwareHoverProps {
  imageUrl: string
  alt: string
  children: ReactNode
  className?: string
  imageClassName?: string
  childrenClassName?: string
  priority?: boolean
  sizes?: string
}

export function DirectionAwareHover({
  imageUrl,
  alt,
  children,
  className,
  imageClassName,
  childrenClassName,
  priority,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
}: DirectionAwareHoverProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [direction, setDirection] = useState<Direction>("left")

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    setDirection(getEnterDirection(event, ref.current))
  }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "group/hover relative w-full h-full overflow-hidden rounded-2xl bg-transparent",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          className="relative h-full w-full"
          initial="initial"
          whileHover={direction}
          exit="exit"
        >
          <div className="absolute inset-0 z-10 hidden bg-black/40 transition duration-500 group-hover/hover:block" />
          <motion.div
            variants={imageVariants}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative h-full w-full"
          >
            <Image
              src={imageUrl}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              className={cn("object-contain", imageClassName)}
            />
          </motion.div>
          <motion.div
            variants={textVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn("absolute bottom-4 left-4 z-20 text-white", childrenClassName)}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
