"use client"

import { useMemo, useEffect, useState } from "react"

function det(index: number, offset = 0): number {
  const x = Math.sin(index * 12345.6789 + offset * 9876.54321) * 10000
  return x - Math.floor(x)
}

const rings = [
  { size: 500, duration: 60, clockwise: true },
  { size: 700, duration: 100, clockwise: false },
  { size: 900, duration: 140, clockwise: true },
  { size: 1200, duration: 180, clockwise: false },
]

export function OrbitalSystem() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLowPower, setIsLowPower] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px), (pointer: coarse)")
    const update = () => setIsMobile(media.matches)
    const detectPower = () => setIsLowPower((navigator.hardwareConcurrency || 8) <= 4)
    update()
    detectPower()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  const bodies = useMemo(
    () =>
      rings.map((ring, ringIndex) =>
        Array.from({ length: 3 }, (_, bodyIndex) => ({
          angle: det(ringIndex * 10 + bodyIndex) * 360,
          offset: det(ringIndex * 10 + bodyIndex, 1) * 4 + 2,
        })),
      ),
    [],
  )

  if (isMobile || isLowPower) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {rings.map((ring, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: ring.size,
            height: ring.size,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: `0 0 30px rgba(0, 217, 255, 0.04), inset 0 0 30px rgba(0, 217, 255, 0.02)`,
            animation: `orbit-spin-${ring.clockwise ? "clockwise" : "counter"} ${ring.duration}s linear infinite`,
          }}
        >
          {bodies[i].map((body, j) => (
            <div
              key={j}
              className="absolute rounded-full"
              style={{
                width: body.offset,
                height: body.offset,
                top: `${-body.offset / 2}px`,
                left: "50%",
                marginLeft: `${-body.offset / 2}px`,
                background:
                  j === 0
                    ? "rgba(0, 217, 255, 0.6)"
                    : j === 1
                      ? "rgba(139, 92, 246, 0.4)"
                      : "rgba(255, 255, 255, 0.3)",
                boxShadow:
                  j === 0
                    ? "0 0 6px rgba(0, 217, 255, 0.4)"
                    : j === 1
                      ? "0 0 4px rgba(139, 92, 246, 0.3)"
                      : "0 0 2px rgba(255, 255, 255, 0.2)",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
