"use client"

import { useRef, useEffect, useState, useCallback, startTransition } from "react"
import { useSpring, useTransform, useMotionValue } from "framer-motion"

function det(index: number, offset = 0): number {
  const x = Math.sin(index * 12345.6789 + offset * 9876.54321) * 10000
  return x - Math.floor(x)
}

interface BigStar {
  x: number
  y: number
  radius: number
  opacity: number
  hue: number
  twinkleSpeed: number
  twinkleDelay: number
}

function generateConstellationStars(width: number, height: number, count: number): BigStar[] {
  const stars: BigStar[] = []
  for (let i = 0; i < count; i++) {
    stars.push({
      x: det(i) * width,
      y: det(i, 1) * height,
      radius: det(i, 2) * 1.2 + 0.6,
      opacity: det(i, 3) * 0.5 + 0.5,
      hue: det(i, 4) < 0.3 ? 40 : det(i, 5) < 0.5 ? 200 : 0,
      twinkleSpeed: det(i, 6) * 2 + 1,
      twinkleDelay: det(i, 7) * Math.PI * 2,
    })
  }
  return stars
}

function buildConstellations(
  stars: BigStar[],
  width: number,
  height: number,
  connectionDistance: number,
) {
  const lines: Array<[number, number, number, number]> = []
  const n = stars.length

  for (let i = 0; i < n; i++) {
    const s = stars[i]
    let firstMinDist = connectionDistance
    let secondMinDist = connectionDistance
    let firstNeighborIndex = -1
    let secondNeighborIndex = -1

    for (let j = 0; j < n; j++) {
      if (i === j) continue
      const t = stars[j]
      const dist = Math.hypot(s.x - t.x, s.y - t.y)
      if (dist < connectionDistance) {
        if (dist < firstMinDist) {
          secondMinDist = firstMinDist
          secondNeighborIndex = firstNeighborIndex
          firstMinDist = dist
          firstNeighborIndex = j
        } else if (dist < secondMinDist) {
          secondMinDist = dist
          secondNeighborIndex = j
        }
      }
    }

    if (firstNeighborIndex !== -1 && i < firstNeighborIndex) {
      lines.push([s.x, s.y, stars[firstNeighborIndex].x, stars[firstNeighborIndex].y])
    }
    if (secondNeighborIndex !== -1 && i < secondNeighborIndex) {
      lines.push([s.x, s.y, stars[secondNeighborIndex].x, stars[secondNeighborIndex].y])
    }
  }
  return lines
}

export function SpaceBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [isLowPower, setIsLowPower] = useState(false)
  const [isInView, setIsInView] = useState(true)
  const [isTabVisible, setIsTabVisible] = useState(true)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20 })
  const offsetX = useTransform(smoothX, [-1, 1], [-8, 8])
  const offsetY = useTransform(smoothY, [-1, 1], [-8, 8])

  const [bigStars, setBigStars] = useState<BigStar[]>([])
  const [constellations, setConstellations] = useState<Array<[number, number, number, number]>>([])

  useEffect(() => {
    if (isReducedMotion) return
    const handleMouse = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      mouseX.set(nx)
      mouseY.set(ny)
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [mouseX, mouseY, isReducedMotion])

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotion = () => setIsReducedMotion(reducedMotionQuery.matches)
    const updatePower = () => setIsLowPower((navigator.hardwareConcurrency || 8) <= 4)

    updateMotion()
    updatePower()

    reducedMotionQuery.addEventListener("change", updateMotion)
    window.addEventListener("resize", updatePower)

    return () => {
      reducedMotionQuery.removeEventListener("change", updateMotion)
      window.removeEventListener("resize", updatePower)
    }
  }, [])

  useEffect(() => {
    const regenerate = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      startTransition(() => setSize({ width: w, height: h }))
      const isMobile = w < 768
      const starCount = isMobile || isReducedMotion || isLowPower ? 40 : 120
      const stars = generateConstellationStars(w, h, starCount)
      startTransition(() => {
        setBigStars(stars)
        setConstellations(
          isMobile || isReducedMotion || isLowPower ? [] : buildConstellations(stars, w, h, 200),
        )
      })
    }

    regenerate()

    let resizeTimeout: ReturnType<typeof setTimeout> | null = null
    const onResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(regenerate, 250)
    }
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
      if (resizeTimeout) clearTimeout(resizeTimeout)
    }
  }, [isReducedMotion, isLowPower])

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        startTransition(() => setIsInView(entry.isIntersecting))
      },
      { threshold: 0.01 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleVisibility = () => {
      startTransition(() => setIsTabVisible(document.visibilityState === "visible"))
    }
    handleVisibility()
    document.addEventListener("visibilitychange", handleVisibility)
    return () => document.removeEventListener("visibilitychange", handleVisibility)
  }, [])

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, offX: number, offY: number) => {
      ctx.clearRect(0, 0, size.width, size.height)

      for (const [x1, y1, x2, y2] of constellations) {
        const dx = x2 - x1
        const dy = y2 - y1
        const len = Math.hypot(dx, dy)
        const alpha = Math.max(0, Math.min(0.15, 0.15 * (1 - len / 200)))
        ctx.beginPath()
        ctx.moveTo(x1 + offX, y1 + offY)
        ctx.lineTo(x2 + offX, y2 + offY)
        ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      const now = Date.now() / 1000
      for (const star of bigStars) {
        const twinkle =
          0.35 + Math.abs(Math.sin(now / star.twinkleSpeed + star.twinkleDelay) * 0.65)
        const alpha = star.opacity * twinkle
        const x = star.x + offX
        const y = star.y + offY

        if (star.hue > 0) {
          ctx.beginPath()
          ctx.arc(x, y, star.radius * 3, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${star.hue}, 80%, 70%, ${alpha * 0.12})`
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(x, y, star.radius, 0, Math.PI * 2)
        const color =
          star.hue > 0 ? `hsla(${star.hue}, 80%, 85%, ${alpha})` : `rgba(255, 255, 255, ${alpha})`
        ctx.fillStyle = color
        ctx.fill()

        if (star.radius > 1.2) {
          ctx.beginPath()
          ctx.arc(x, y, star.radius * 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.08})`
          ctx.fill()
        }
      }
    },
    [bigStars, constellations, size],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || size.width === 0) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // This canvas is mounted once in the root layout and runs on every page
    // for as long as the tab is open, so an uncapped rAF loop (effectively
    // 60fps, more on high-refresh displays) was burning continuous
    // main-thread time on a slow twinkle effect that doesn't need it --
    // measured at 200%+ idle main-thread utilization under throttling, with
    // zero user interaction. Capping the redraw rate cuts that dramatically
    // while looking identical (twinkling is a slow sine wave).
    const shouldAnimate = isInView && isTabVisible && !isReducedMotion
    if (!shouldAnimate) {
      draw(ctx, offsetX.get(), offsetY.get())
      return
    }

    const maxFps = isLowPower ? 15 : 30
    const minFrameGap = 1000 / maxFps
    let lastFrameTs = 0
    let animId: number
    const render = (ts: number) => {
      if (ts - lastFrameTs >= minFrameGap) {
        lastFrameTs = ts
        draw(ctx, offsetX.get(), offsetY.get())
      }
      animId = requestAnimationFrame(render)
    }
    animId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(animId)
  }, [draw, size, offsetX, offsetY, isInView, isTabVisible, isReducedMotion, isLowPower])

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Layer 1: Deep dark gradient background -- single accent hue, no
          second violet glow, so the backdrop reads as calm rather than a
          multi-color light show. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(0, 217, 255, 0.05), transparent), #050816",
        }}
      />

      {/* Layer 2: Big stars + constellation canvas -- the site's one quiet
          signature motion. Shooting stars, nebula glows, and drifting dust
          were removed: four more animated layers stacked on top of this one
          read as unfocused flair rather than a deliberate visual identity. */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        width={size.width}
        height={size.height}
      />
    </div>
  )
}
