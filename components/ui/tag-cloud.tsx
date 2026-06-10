"use client"

import { useRef, useEffect } from "react"

interface TagItem {
  name: string
  category: string
  initials?: string
}

interface TagCloudProps {
  items: TagItem[]
  categoryColors: Record<string, string>
  activeCategory?: string | null
  className?: string
}

interface Tag3D {
  x: number
  y: number
  z: number
  name: string
  category: string
  color: string
  label: string
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

const BADGE_RADIUS = 22

export function TagCloud({
  items,
  categoryColors,
  activeCategory = null,
  className = "",
}: TagCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef<Tag3D[]>([])
  const rotationRef = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const autoRotateRef = useRef(true)
  const rafRef = useRef(0)
  const sizeRef = useRef({ w: 600, h: 600 })

  useEffect(() => {
    const pts = fibonacciSphere(items.length)
    tagsRef.current = items.map((item, i) => ({
      x: pts[i].x,
      y: pts[i].y,
      z: pts[i].z,
      name: item.name,
      category: item.category,
      color: categoryColors[item.category] || "#00D9FF",
      label: item.initials || item.name.slice(0, 2).toUpperCase(),
    }))
  }, [items, categoryColors])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const dpr = window.devicePixelRatio || 1
    const ctx = canvas.getContext("2d")!
    let isActive = true

    function resize() {
      const c = canvasRef.current
      const el = containerRef.current
      if (!c || !el) return
      const rect = el.getBoundingClientRect()
      sizeRef.current = { w: rect.width, h: rect.height }
      c.width = rect.width * dpr
      c.height = rect.height * dpr
      c.style.width = `${rect.width}px`
      c.style.height = `${rect.height}px`
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(container)

    function rotate(x: number, y: number, z: number, rx: number, ry: number) {
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

    function drawBadge(
      cx: number,
      cy: number,
      radius: number,
      color: string,
      label: string,
      opacity: number,
      scale: number,
    ) {
      const r = radius * scale
      if (r < 2) return

      ctx.save()
      ctx.translate(cx, cy)

      // outer glow ring
      ctx.beginPath()
      ctx.arc(0, 0, r + 3, 0, Math.PI * 2)
      ctx.strokeStyle = color
      ctx.lineWidth = 1
      ctx.globalAlpha = opacity * 0.3
      ctx.stroke()

      // badge fill
      const grad = ctx.createRadialGradient(0, -r * 0.3, 0, 0, 0, r)
      grad.addColorStop(0, `${color}30`)
      grad.addColorStop(1, `${color}08`)
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.globalAlpha = opacity * 0.9
      ctx.fillStyle = grad
      ctx.fill()

      // badge border
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.globalAlpha = opacity * 0.7
      ctx.stroke()

      // inner glow
      ctx.shadowColor = color
      ctx.shadowBlur = 10 * scale

      // label text
      const fontSize = Math.max(9, Math.round(11 * scale))
      ctx.fillStyle = color
      ctx.globalAlpha = opacity
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.font = `700 ${fontSize}px "DM Mono", ui-monospace, monospace`
      ctx.fillText(label, 0, 1)

      ctx.restore()
    }

    function render() {
      if (!isActive) return
      const { w, h } = sizeRef.current
      const radius = Math.min(w, h) * 0.38
      const rot = rotationRef.current

      ctx.clearRect(0, 0, w * dpr, h * dpr)
      ctx.save()
      ctx.scale(dpr, dpr)

      const cx = w / 2
      const cy = h / 2

      const sorted = tagsRef.current
        .map((tag) => {
          const r = rotate(tag.x, tag.y, tag.z, rot.x, rot.y)
          return { ...tag, rx: r.x, ry: r.y, rz: r.z }
        })
        .sort((a, b) => a.rz - b.rz)

      for (const tag of sorted) {
        const sx = cx + tag.rx * radius
        const sy = cy + tag.ry * radius
        const scale = (tag.rz + 1) / 2
        const opacity = Math.max(0.1, Math.min(1, 0.35 + scale * 0.65))
        const isInactive = activeCategory && tag.category !== activeCategory

        drawBadge(
          sx,
          sy,
          BADGE_RADIUS,
          tag.color,
          tag.label,
          isInactive ? opacity * 0.15 : opacity,
          isInactive ? scale * 0.5 : scale,
        )
      }

      // center dot
      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx.fillStyle = "#00D9FF"
      ctx.shadowColor = "#00D9FF"
      ctx.shadowBlur = 20
      ctx.fill()

      ctx.restore()
      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    let animFrame: number
    function step() {
      if (autoRotateRef.current && !isDragging.current) {
        rotationRef.current.y += 0.004
        rotationRef.current.x += 0.001
      }
      animFrame = requestAnimationFrame(step)
    }
    animFrame = requestAnimationFrame(step)

    const handleDown = (x: number, y: number) => {
      isDragging.current = true
      autoRotateRef.current = false
      lastPos.current = { x, y }
    }

    const handleMove = (x: number, y: number) => {
      if (!isDragging.current) return
      const dx = x - lastPos.current.x
      const dy = y - lastPos.current.y
      rotationRef.current.y += dx * 0.006
      rotationRef.current.x += dy * 0.006
      lastPos.current = { x, y }
    }

    const handleUp = () => {
      isDragging.current = false
      setTimeout(() => { autoRotateRef.current = true }, 2000)
    }

    const onMouseDown = (e: MouseEvent) => handleDown(e.clientX, e.clientY)
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
    const onMouseUp = () => handleUp()

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) handleDown(e.touches[0].clientX, e.touches[0].clientY)
    }
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) handleMove(e.touches[0].clientX, e.touches[0].clientY)
    }
    const onTouchEnd = () => handleUp()

    canvas.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    canvas.addEventListener("touchstart", onTouchStart, { passive: true })
    canvas.addEventListener("touchmove", onTouchMove, { passive: true })
    canvas.addEventListener("touchend", onTouchEnd, { passive: true })

    return () => {
      isActive = false
      cancelAnimationFrame(rafRef.current)
      cancelAnimationFrame(animFrame)
      ro.disconnect()
      canvas.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      canvas.removeEventListener("touchstart", onTouchStart)
      canvas.removeEventListener("touchmove", onTouchMove)
      canvas.removeEventListener("touchend", onTouchEnd)
    }
  }, [activeCategory])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
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
