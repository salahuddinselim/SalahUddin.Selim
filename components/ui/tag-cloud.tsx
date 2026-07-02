"use client"

import { useRef, useEffect } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import type { ReactNode } from "react"
import { getSkillIcon } from "@/lib/sanity/icon-map"

interface TagItem {
  name: string
  category: string
  brandColor?: string
  textColor?: string
  iconName?: string
  logoSvg?: ReactNode | string
  initials?: string
}

interface TagCloudProps {
  items: TagItem[]
  categoryColors: Record<string, string>
  onTagClick?: (category: string, name: string) => void
  className?: string
}

interface Tag3D {
  idx: number
  x: number
  y: number
  z: number
  name: string
  category: string
  color: string
  textColor: string
  label: string
  iconName?: string
}

interface WireframePoint {
  x: number
  y: number
  z: number
}

function fibonacciSphere(count: number): { x: number; y: number; z: number }[] {
  const pts: { x: number; y: number; z: number }[] = []
  const offset = 2 / count
  const increment = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2
    const r = Math.sqrt(1 - y * y)
    const phi = i * increment
    pts.push({ x: Math.cos(phi) * r, y, z: Math.sin(phi) * r })
  }
  return pts
}

function rotate3D(x: number, y: number, z: number, rx: number, ry: number) {
  const cosY = Math.cos(ry)
  const sinY = Math.sin(ry)
  const cosX = Math.cos(rx)
  const sinX = Math.sin(rx)
  const rX = x * cosY - z * sinY
  const rZ = x * sinY + z * cosY
  const rY = y * cosX - rZ * sinX
  const fZ = y * sinX + rZ * cosX
  return { x: rX, y: rY, z: fZ }
}

function generateWireframe(): { rings: WireframePoint[][]; meridians: WireframePoint[][] } {
  const rings: WireframePoint[][] = []
  const latCount = 8
  const lonCount = 12
  const segments = 32

  for (let i = 1; i < latCount; i++) {
    const phi = (i / latCount) * Math.PI
    const ring: WireframePoint[] = []
    for (let j = 0; j <= segments; j++) {
      const theta = (j / segments) * Math.PI * 2
      ring.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      })
    }
    rings.push(ring)
  }

  const meridians: WireframePoint[][] = []
  for (let i = 0; i < lonCount; i++) {
    const theta = (i / lonCount) * Math.PI * 2
    const meridian: WireframePoint[] = []
    for (let j = 0; j <= segments; j++) {
      const phi = (j / segments) * Math.PI
      meridian.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      })
    }
    meridians.push(meridian)
  }

  return { rings, meridians }
}

// Bumped from 0.38/22 -> more items (19, up from 10) on the same sphere
// meant more frequent badge-to-badge overlap at the old spacing.
const SPHERE_RADIUS = 0.44
const BADGE_RADIUS = 19

export function TagCloud({ items, categoryColors, onTagClick, className = "" }: TagCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef<Tag3D[]>([])
  const rotationRef = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const autoRotateRef = useRef(true)
  const rafRef = useRef(0)
  const sizeRef = useRef({ w: 600, h: 600 })
  const wireframeRef = useRef(generateWireframe())
  const iconCanvasesRef = useRef<Map<number, HTMLCanvasElement>>(new Map())
  const iconLoadedRef = useRef<Map<number, boolean>>(new Map())
  const hitRegionsRef = useRef<
    Array<{ x: number; y: number; w: number; h: number; category: string; name: string }>
  >([])
  const hoverRegionRef = useRef<{
    x: number
    y: number
    w: number
    h: number
    category: string
    name: string
  } | null>(null)
  const isHoveringRef = useRef(false)
  const reducedMotionRef = useRef(false)
  const maxFpsRef = useRef(60)
  const isMobileRef = useRef(false)
  const isLowPowerRef = useRef(false)
  const onTagClickRef = useRef(onTagClick)

  useEffect(() => {
    onTagClickRef.current = onTagClick
  }, [onTagClick])

  useEffect(() => {
    const pts = fibonacciSphere(items.length)
    tagsRef.current = items.map((item, i) => ({
      idx: i,
      x: pts[i].x,
      y: pts[i].y,
      z: pts[i].z,
      name: item.name,
      category: item.category,
      color: item.brandColor || categoryColors[item.category] || "#00D9FF",
      textColor: item.textColor || item.brandColor || categoryColors[item.category] || "#E2E8F0",
      label: item.name || item.initials || item.name.slice(0, 2).toUpperCase(),
      iconName: item.iconName,
    }))

    // Pre-render SVG icons to canvases
    iconCanvasesRef.current = new Map()
    iconLoadedRef.current = new Map()
    items.forEach((item, i) => {
      if (!item.iconName && !item.logoSvg) return
      try {
        let svgString = ""
        if (item.logoSvg) {
          svgString =
            typeof item.logoSvg === "string"
              ? item.logoSvg
              : renderToStaticMarkup(<>{item.logoSvg}</>)
        } else {
          const Icon = getSkillIcon(item.iconName)
          if (!Icon) return
          svgString = renderToStaticMarkup(<Icon />)
        }
        const offscreen = document.createElement("canvas")
        offscreen.width = 80
        offscreen.height = 80
        const offCtx = offscreen.getContext("2d")
        if (!offCtx) return
        const img = new Image()
        img.onload = () => {
          offCtx.clearRect(0, 0, 80, 80)
          const pad = 8
          offCtx.drawImage(img, pad, pad, 80 - pad * 2, 80 - pad * 2)
          iconLoadedRef.current!.set(i, true)
        }
        img.onerror = () => iconLoadedRef.current!.set(i, true)
        img.src = "data:image/svg+xml;base64," + btoa(svgString)
        iconCanvasesRef.current.set(i, offscreen)
      } catch {
        // icon rendering failed, will fall back to text
      }
    })
  }, [items, categoryColors])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const dpr = window.devicePixelRatio || 1
    // desynchronized: true was previously set for lower input latency, but its
    // low-latency swap chain intermittently renders a solid black frame on
    // Windows/Chrome when combined with DOM mutations during rAF (the cursor
    // style writes below) -- that's the "black screen on hover" bug. A synced
    // 2d context avoids the flicker; the badges aren't latency-sensitive.
    const ctx = canvas.getContext("2d")!
    let isActive = true
    const { rings, meridians } = wireframeRef.current
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const mobileQuery = window.matchMedia("(max-width: 768px), (pointer: coarse)")
    const setMotionPrefs = () => {
      isMobileRef.current = mobileQuery.matches
      reducedMotionRef.current = reducedMotionQuery.matches
      isLowPowerRef.current = (navigator.hardwareConcurrency || 8) <= 4
      autoRotateRef.current =
        !reducedMotionRef.current && !isHoveringRef.current && !isMobileRef.current
      maxFpsRef.current = reducedMotionRef.current
        ? 12
        : isMobileRef.current
          ? 12
          : isLowPowerRef.current
            ? 24
            : 60
    }
    setMotionPrefs()
    reducedMotionQuery.addEventListener("change", setMotionPrefs)
    mobileQuery.addEventListener("change", setMotionPrefs)

    function resize() {
      const c = canvasRef.current
      const el = containerRef.current
      if (!c || !el) return
      const rect = el.getBoundingClientRect()
      sizeRef.current = { w: rect.width, h: rect.height }
      const cappedDpr = isMobileRef.current
        ? Math.min(dpr, 1)
        : isLowPowerRef.current
          ? Math.min(dpr, 1.5)
          : Math.min(dpr, 2)
      c.width = rect.width * cappedDpr
      c.height = rect.height * cappedDpr
      c.style.width = `${rect.width}px`
      c.style.height = `${rect.height}px`
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(container)

    function drawSphereWireframe(
      radius: number,
      cx: number,
      cy: number,
      rot: { x: number; y: number },
    ) {
      ctx.save()

      // Draw latitude rings
      ctx.strokeStyle = "rgba(0, 242, 254, 0.15)"
      ctx.lineWidth = 1.5

      for (const ring of rings) {
        ctx.beginPath()
        let started = false
        for (const pt of ring) {
          const r = rotate3D(pt.x, pt.y, pt.z, rot.x, rot.y)
          const sx = cx + r.x * radius
          const sy = cy + r.y * radius
          if (r.z < 0.05 && r.z > -0.05 && !started) continue
          if (!started) {
            ctx.moveTo(sx, sy)
            started = true
          } else {
            ctx.lineTo(sx, sy)
          }
        }
        ctx.stroke()
      }

      // Draw longitude meridians
      ctx.strokeStyle = "rgba(0, 242, 254, 0.12)"
      ctx.lineWidth = 1

      for (const meridian of meridians) {
        ctx.beginPath()
        let started = false
        for (const pt of meridian) {
          const r = rotate3D(pt.x, pt.y, pt.z, rot.x, rot.y)
          const sx = cx + r.x * radius
          const sy = cy + r.y * radius
          if (!started) {
            ctx.moveTo(sx, sy)
            started = true
          } else {
            ctx.lineTo(sx, sy)
          }
        }
        ctx.stroke()
      }

      ctx.restore()
    }

    function drawPillBadge(
      cx: number,
      cy: number,
      color: string,
      textColor: string,
      label: string,
      opacity: number,
      scale: number,
      iconCanvas?: HTMLCanvasElement,
      iconLoaded?: boolean,
    ): { width: number; height: number } | null {
      const r = BADGE_RADIUS * scale
      if (r < 3) return null
      const hasIcon = iconCanvas && iconLoaded
      const pillH = r * 1.3
      const fontSize = Math.max(8, Math.round(10 * scale))
      const textApproxW = Math.max(
        fontSize * 2.6,
        Math.min(fontSize * 9.5, label.length * fontSize * 0.58),
      )
      const horizontalPad = pillH * 0.34
      const iconSize = pillH * 0.62
      const gap = pillH * 0.24
      const pillW = hasIcon
        ? horizontalPad + iconSize + gap + textApproxW + horizontalPad
        : horizontalPad + textApproxW + horizontalPad
      const pillR = pillH / 2

      ctx.save()
      ctx.translate(cx, cy)
      ctx.globalAlpha = opacity

      // glassmorphism background — same light glass recipe used site-wide
      // (bg-white/[0.06] equivalent); the old rgba(10,15,30,0.6) dark-navy
      // fill read as a near-solid black chip against the dark starfield,
      // especially for front-facing badges where opacity approaches 1.
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)"

      ctx.beginPath()
      ctx.roundRect(-pillW / 2, -pillH / 2, pillW, pillH, pillR)
      ctx.fill()

      // subtle inner glow overlay
      const grad = ctx.createLinearGradient(0, -pillH / 2, 0, 0)
      grad.addColorStop(0, `${color}12`)
      grad.addColorStop(1, "rgba(255,255,255,0)")
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.roundRect(-pillW / 2, -pillH / 2, pillW, pillH, pillR)
      ctx.fill()

      // pill border
      ctx.strokeStyle = color
      ctx.lineWidth = Math.max(0.8, 1.05 * scale)
      ctx.globalAlpha = opacity * 0.62
      ctx.beginPath()
      ctx.roundRect(-pillW / 2, -pillH / 2, pillW, pillH, pillR)
      ctx.stroke()

      if (hasIcon) {
        // icon on the left
        const iconX = -pillW / 2 + horizontalPad
        const iconY = -iconSize / 2
        ctx.globalAlpha = opacity
        ctx.drawImage(iconCanvas, iconX, iconY, iconSize, iconSize)

        // text on the right of icon
        const textX = iconX + iconSize + gap
        ctx.fillStyle = textColor
        ctx.globalAlpha = opacity
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"
        ctx.font = `600 ${fontSize}px "Inter", "DM Sans", system-ui, sans-serif`
        ctx.fillText(label, textX, 1)
      } else {
        // centered text fallback
        ctx.fillStyle = textColor
        ctx.globalAlpha = opacity
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.font = `600 ${fontSize}px "Inter", "DM Sans", system-ui, sans-serif`
        ctx.fillText(label, 0, 1)
      }

      ctx.restore()
      return { width: pillW, height: pillH }
    }

    let lastFrameTs = 0
    function render(ts: number) {
      if (!isActive) return
      const minFrameGap = 1000 / maxFpsRef.current
      if (ts - lastFrameTs < minFrameGap) {
        rafRef.current = requestAnimationFrame(render)
        return
      }
      lastFrameTs = ts

      const { w, h } = sizeRef.current
      const radius = Math.min(w, h) * SPHERE_RADIUS
      const rot = rotationRef.current
      const currentDpr = canvas!.width / Math.max(1, w)

      // Update rotation
      if (isDragging.current) {
        // Apply velocity from drag
        const vx = velocityRef.current.x
        const vy = velocityRef.current.y
        rotationRef.current.y += vx
        rotationRef.current.x += vy
        // Decay velocity
        velocityRef.current.x *= 0.92
        velocityRef.current.y *= 0.92
      } else if (autoRotateRef.current) {
        rotationRef.current.y += 0.004
        rotationRef.current.x += 0.001
      }

      ctx.clearRect(0, 0, w * currentDpr, h * currentDpr)
      ctx.save()
      ctx.scale(currentDpr, currentDpr)

      const cx = w / 2
      const cy = h / 2

      // Draw wireframe globe behind badges
      drawSphereWireframe(radius, cx, cy, rot)

      // Sort tags by z-depth (back to front)
      const sorted = tagsRef.current
        .map((tag) => {
          const r = rotate3D(tag.x, tag.y, tag.z, rot.x, rot.y)
          return { ...tag, rx: r.x, ry: r.y, rz: r.z }
        })
        .sort((a, b) => a.rz - b.rz)

      // Draw badges -- the sphere always renders every skill at full
      // brightness; category filtering only affects the list below it.
      hitRegionsRef.current = []
      for (const tag of sorted) {
        const sx = cx + tag.rx * radius
        const sy = cy + tag.ry * radius
        const scale = (tag.rz + 1) / 2
        const opacity = Math.max(0.1, Math.min(1, 0.35 + scale * 0.65))

        const iconCanvas = iconCanvasesRef.current.get(tag.idx)
        const iconLoaded = iconLoadedRef.current.get(tag.idx)

        const dims = drawPillBadge(
          sx,
          sy,
          tag.color,
          tag.textColor,
          tag.label,
          opacity,
          scale,
          iconCanvas,
          iconLoaded,
        )
        if (dims) {
          hitRegionsRef.current.push({
            x: sx - dims.width / 2,
            y: sy - dims.height / 2,
            w: dims.width,
            h: dims.height,
            category: tag.category,
            name: tag.name,
          })
        }
      }

      // center glow dot
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = "#00D9FF"
      ctx.shadowColor = "#00D9FF"
      ctx.shadowBlur = 30
      ctx.fill()
      ctx.restore()

      ctx.restore()
      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    const handleDown = (x: number, y: number) => {
      isDragging.current = true
      autoRotateRef.current = false
      velocityRef.current = { x: 0, y: 0 }
      lastPos.current = { x, y }
    }

    const handleMove = (x: number, y: number) => {
      if (!isDragging.current) return
      const dx = x - lastPos.current.x
      const dy = y - lastPos.current.y
      velocityRef.current = { x: dx * 0.006, y: dy * 0.006 }
      rotationRef.current.y += velocityRef.current.x
      rotationRef.current.x += velocityRef.current.y
      lastPos.current = { x, y }
    }

    const handleUp = () => {
      isDragging.current = false
      if (!reducedMotionRef.current && !isHoveringRef.current) {
        autoRotateRef.current = true
      }
    }

    const onMouseDown = (e: MouseEvent) => handleDown(e.clientX, e.clientY)
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
    const onMouseUp = () => handleUp()
    const onMouseEnter = () => {
      isHoveringRef.current = true
      if (!reducedMotionRef.current) autoRotateRef.current = false
    }
    const onMouseLeaveCanvas = () => {
      isHoveringRef.current = false
      hoverRegionRef.current = null
      if (!reducedMotionRef.current) autoRotateRef.current = true
      if (!isDragging.current && containerRef.current) {
        containerRef.current.style.cursor = "grab"
      }
    }
    const onMouseMoveCanvas = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const region =
        [...hitRegionsRef.current]
          .reverse()
          .find((r) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) || null
      hoverRegionRef.current = region
      if (!isDragging.current && containerRef.current) {
        const nextCursor = region ? "pointer" : "grab"
        if (containerRef.current.style.cursor !== nextCursor) {
          containerRef.current.style.cursor = nextCursor
        }
      }
    }
    const onClickCanvas = () => {
      if (hoverRegionRef.current && onTagClickRef.current) {
        onTagClickRef.current(hoverRegionRef.current.category, hoverRegionRef.current.name)
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) handleDown(e.touches[0].clientX, e.touches[0].clientY)
    }
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) handleMove(e.touches[0].clientX, e.touches[0].clientY)
    }
    const onTouchEnd = () => handleUp()

    canvas.addEventListener("mousedown", onMouseDown)
    canvas.addEventListener("mouseenter", onMouseEnter)
    canvas.addEventListener("mouseleave", onMouseLeaveCanvas)
    canvas.addEventListener("mousemove", onMouseMoveCanvas)
    canvas.addEventListener("click", onClickCanvas)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    canvas.addEventListener("touchstart", onTouchStart, { passive: true })
    canvas.addEventListener("touchmove", onTouchMove, { passive: true })
    canvas.addEventListener("touchend", onTouchEnd, { passive: true })

    return () => {
      isActive = false
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      reducedMotionQuery.removeEventListener("change", setMotionPrefs)
      mobileQuery.removeEventListener("change", setMotionPrefs)
      canvas.removeEventListener("mousedown", onMouseDown)
      canvas.removeEventListener("mouseenter", onMouseEnter)
      canvas.removeEventListener("mouseleave", onMouseLeaveCanvas)
      canvas.removeEventListener("mousemove", onMouseMoveCanvas)
      canvas.removeEventListener("click", onClickCanvas)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      canvas.removeEventListener("touchstart", onTouchStart)
      canvas.removeEventListener("touchmove", onTouchMove)
      canvas.removeEventListener("touchend", onTouchEnd)
    }
  }, [items])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ willChange: "transform" }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-xl"
        aria-label="3D skill tag cloud"
      />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
        <span className="text-[10px] font-mono tracking-[0.2em] text-white/15">
          ⊕ DRAG TO ROTATE
        </span>
      </div>
    </div>
  )
}
