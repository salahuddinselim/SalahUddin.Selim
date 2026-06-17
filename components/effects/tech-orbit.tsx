"use client"

import { useMemo, useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { IconType } from "react-icons"
import { TECH_STACK } from "@/lib/tech-stack"

const ringConfig = [
  { indices: [0, 1, 2], radius: 130, duration: 40, dir: 1 },
  { indices: [3, 4, 5, 6], radius: 225, duration: 55, dir: -1 },
  { indices: [7, 8, 9], radius: 320, duration: 68, dir: 1 },
]

interface CardConfig {
  name: string
  Icon: IconType | null
  iconColor: string
  ringIndex: number
  startAngle: number
  radius: number
  duration: number
  direction: number
}

export function TechOrbit() {
  const [scale, setScale] = useState(1)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLowPower, setIsLowPower] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      setIsMobile(window.matchMedia("(max-width: 768px), (pointer: coarse)").matches)
      if (w < 640) setScale(0.35)
      else if (w < 768) setScale(0.5)
      else if (w < 1024) setScale(0.7)
      else if (w < 1280) setScale(0.85)
      else setScale(1)
    }
    const detectPower = () => setIsLowPower((navigator.hardwareConcurrency || 8) <= 4)
    handleResize()
    detectPower()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleChange = () => setReducedMotion(media.matches)
    handleChange()
    media.addEventListener("change", handleChange)
    return () => media.removeEventListener("change", handleChange)
  }, [])

  const cards = useMemo<CardConfig[]>(() => {
    const result: CardConfig[] = []
    for (const ring of ringConfig) {
      const count = ring.indices.length
      ring.indices.forEach((techIndex, i) => {
        const startAngle = (i / count) * Math.PI * 2
        result.push({
          name: TECH_STACK[techIndex].name,
          Icon: TECH_STACK[techIndex].icon,
          iconColor: TECH_STACK[techIndex].brandColor,
          ringIndex: ringConfig.indexOf(ring),
          startAngle,
          radius: ring.radius,
          duration: ring.duration,
          direction: ring.dir,
        })
      })
    }
    return result
  }, [])

  if (isMobile || isLowPower) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <style>{`
        @keyframes orbit-spin-clockwise { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-spin-counter { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>
      <div
        style={{ transform: `scale(${scale})` }}
        className="relative"
      >
        {cards.map((card) => {
          const startAngleDeg = (card.startAngle * 180) / Math.PI

          return (
            <div
              key={card.name}
              className="absolute pointer-events-auto"
              style={{
                width: 80,
                height: 80,
                marginLeft: -40,
                marginTop: -40,
                top: "50%",
                left: "50%",
                animation: reducedMotion
                  ? "none"
                  : `orbit-spin-${card.direction === 1 ? "clockwise" : "counter"} ${card.duration}s linear infinite`,
                transformOrigin: "50% 50%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  transform: `rotate(${startAngleDeg}deg) translateY(-${card.radius}px) rotate(-${startAngleDeg}deg)`,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    animation: reducedMotion
                      ? "none"
                      : `orbit-spin-${card.direction === 1 ? "counter" : "clockwise"} ${card.duration}s linear infinite`,
                    transformOrigin: "50% 50%",
                  }}
                >
                  <motion.div
                    className="flex flex-col items-center justify-center gap-1 w-full h-full rounded-[16px] cursor-pointer"
                    style={{
                      background: "var(--glass-badge-bg)",
                      backdropFilter: "blur(var(--glass-badge-blur))",
                      WebkitBackdropFilter: "blur(var(--glass-badge-blur))",
                      border: "1px solid var(--glass-badge-border)",
                    }}
                    whileHover={{
                      scale: 1.1,
                      borderColor: "rgba(0, 217, 255, 0.3)",
                      boxShadow: "0 0 30px rgba(0, 217, 255, 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {card.Icon ? (
                      <card.Icon
                        width={24}
                        height={24}
                        className="shrink-0"
                        style={{ color: card.iconColor }}
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-accent/70">{card.name[0]}</span>
                      </div>
                    )}
                    <span
                      className="text-[9px] font-medium leading-tight text-center text-white/80"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {card.name}
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
