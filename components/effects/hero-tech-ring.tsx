"use client"

import { useEffect, useMemo, useState } from "react"
import { TECH_STACK } from "@/lib/tech-stack"

// Six icons, evenly spaced -- enough to read as "tech stack" without
// crowding the ring. TECH_STACK already leads with Python/SQL/Streamlit for
// the data-analyst positioning, so slicing the front keeps that intact.
const RING_ITEMS = TECH_STACK.slice(0, 6)

// The ring's diameter is 2x this. The previous orbiting rings were removed
// entirely because their icons drifted over the hero headline/subheading at
// real viewport widths. The hero text column caps at max-w-[900px] (450px
// half-width) -- RADIUS must clear that with real margin, not just exceed
// it slightly, since the icon itself has a 22px radius on top of this
// number. 560 leaves ~88px of clear space between the icon's own edge and
// the text column's edge, verified against a live screenshot.
const RADIUS = 560
const DURATION_S = 90

function det(index: number, offset = 0): number {
  const x = Math.sin(index * 12345.6789 + offset * 9876.54321) * 10000
  return x - Math.floor(x)
}

export function HeroTechRing() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Room requirement is deliberate, not decorative: at RADIUS=560 the ring
    // is 1120px across. Below this viewport width it would overlap the
    // centered hero text -- the exact bug that got the original rings
    // removed -- so it simply doesn't render there instead of degrading
    // badly. Height clipping (top/bottom icons on shorter viewports) is
    // safe by comparison -- `overflow-hidden` just hides them, no overlap.
    const roomy = window.matchMedia("(min-width: 1440px) and (min-height: 800px)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => {
      const isLowPower = (navigator.hardwareConcurrency || 8) <= 4
      setEnabled(roomy.matches && !reducedMotion.matches && !isLowPower)
    }
    update()
    roomy.addEventListener("change", update)
    reducedMotion.addEventListener("change", update)
    return () => {
      roomy.removeEventListener("change", update)
      reducedMotion.removeEventListener("change", update)
    }
  }, [])

  const items = useMemo(
    () =>
      RING_ITEMS.map((tech, i) => ({
        tech,
        startAngle: (i / RING_ITEMS.length) * 360 + det(i) * 8,
      })),
    [],
  )

  if (!enabled) return null

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      aria-hidden
    >
      {items.map(({ tech, startAngle }) => {
        const Icon = tech.icon
        return (
          <div
            key={tech.name}
            className="absolute"
            style={{
              width: 44,
              height: 44,
              top: "50%",
              left: "50%",
              marginLeft: -22,
              marginTop: -22,
              animation: `orbit-spin-clockwise ${DURATION_S}s linear infinite`,
              transformOrigin: "50% 50%",
            }}
          >
            {/* Static placement at radius+angle -- this offset is defined in
                the parent's rotating coordinate space, so animating the
                parent's rotation sweeps this fixed offset around a full
                circle. That's the whole orbit mechanism. */}
            <div
              style={{
                width: "100%",
                height: "100%",
                transform: `rotate(${startAngle}deg) translateY(-${RADIUS}px) rotate(-${startAngle}deg)`,
              }}
            >
              {/* Counter-rotates at the same speed so the icon itself stays
                  upright while its position orbits. */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  animation: `orbit-spin-counter ${DURATION_S}s linear infinite`,
                  transformOrigin: "50% 50%",
                }}
              >
                <div
                  className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full"
                  style={{
                    background: "var(--glass-badge-bg)",
                    backdropFilter: "blur(var(--glass-badge-blur))",
                    WebkitBackdropFilter: "blur(var(--glass-badge-blur))",
                    border: "1px solid var(--glass-badge-border)",
                    boxShadow: "var(--glass-badge-shadow)",
                  }}
                  title={tech.name}
                >
                  <Icon size={18} style={{ color: tech.brandColor }} />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
