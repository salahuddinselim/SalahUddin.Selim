"use client"

import { useEffect, useMemo, useState } from "react"
import { TECH_STACK, type TechStackItem } from "@/lib/tech-stack"

// The hero text column caps at max-w-[900px] (450px half-width). Each ring's
// radius must clear that with real margin, not just exceed it slightly,
// since the icon itself adds another 22px on top of the number. These were
// verified against live screenshots at multiple rotation phases (the 3/9
// o'clock positions are the tightest case) -- the previous orbiting rings
// were removed entirely because they didn't clear this and drifted over the
// headline/subheading.
const INNER_RADIUS = 560
const OUTER_RADIUS = 760
const INNER_ITEMS = TECH_STACK.slice(0, 8)
const OUTER_ITEMS = TECH_STACK.slice(8)
const DURATION_S = 90
const OUTER_DURATION_S = 130

function det(index: number, offset = 0): number {
  const x = Math.sin(index * 12345.6789 + offset * 9876.54321) * 10000
  return x - Math.floor(x)
}

function useRoomFor(minWidth: number, minHeight: number) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const roomy = window.matchMedia(`(min-width: ${minWidth}px) and (min-height: ${minHeight}px)`)
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
  }, [minWidth, minHeight])

  return enabled
}

function Ring({
  items,
  radius,
  durationS,
  direction,
}: {
  items: TechStackItem[]
  radius: number
  durationS: number
  direction: "clockwise" | "counter"
}) {
  const placed = useMemo(
    () =>
      items.map((tech, i) => ({
        tech,
        startAngle: (i / items.length) * 360 + det(i, radius) * 6,
      })),
    [items, radius],
  )
  const counterDirection = direction === "clockwise" ? "counter" : "clockwise"

  return (
    <>
      {placed.map(({ tech, startAngle }) => {
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
              animation: `orbit-spin-${direction} ${durationS}s linear infinite`,
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
                transform: `rotate(${startAngle}deg) translateY(-${radius}px) rotate(-${startAngle}deg)`,
              }}
            >
              {/* Counter-rotates at the same speed so the icon itself stays
                  upright while its position orbits. */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  animation: `orbit-spin-${counterDirection} ${durationS}s linear infinite`,
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
    </>
  )
}

export function HeroTechRing() {
  // Inner ring (8 icons): most desktop/laptop screens.
  const innerEnabled = useRoomFor(1440, 800)
  // Outer ring (the remaining 11 icons, all of TECH_STACK together with the
  // inner ring): only on genuinely wide monitors. At OUTER_RADIUS=760 the
  // ring is 1520px across -- showing it on a cramped viewport would clip
  // hard or crowd the inner ring, so it stays gated well above the inner
  // ring's own threshold instead of sharing it.
  const outerEnabled = useRoomFor(1800, 900)

  if (!innerEnabled) return null

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      aria-hidden
    >
      <Ring
        items={INNER_ITEMS}
        radius={INNER_RADIUS}
        durationS={DURATION_S}
        direction="clockwise"
      />
      {outerEnabled && (
        <Ring
          items={OUTER_ITEMS}
          radius={OUTER_RADIUS}
          durationS={OUTER_DURATION_S}
          direction="counter"
        />
      )}
    </div>
  )
}
