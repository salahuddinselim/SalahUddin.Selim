"use client"

import { useRef, useEffect, type ReactNode, type MouseEvent, type TouchEvent } from "react"
import { cn } from "@/lib/utils"

interface LiquidRippleProps {
  children: ReactNode
  className?: string
  color?: string
}

function getPos(
  e: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>,
  el: HTMLElement,
) {
  const rect = el.getBoundingClientRect()
  if ("touches" in e) {
    const t = e.touches[0] ?? (e as unknown as TouchEvent).changedTouches[0]
    return { x: t.clientX - rect.left, y: t.clientY - rect.top }
  }
  return { x: e.clientX - rect.left, y: e.clientY - rect.top }
}

function drawRipple(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string,
) {
  const ctx = canvas.getContext("2d")!
  const start = performance.now()
  const duration = 550
  const dpr = window.devicePixelRatio

  function frame(now: number) {
    const elapsed = now - start
    const t = Math.min(elapsed / duration, 1)
    const ease = 1 - Math.pow(1 - t, 3)
    const radius = Math.max(1, ease * Math.max(canvas.width, canvas.height) * 1.2)
    const alpha = 1 - ease

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const gradient = ctx.createRadialGradient(x * dpr, y * dpr, 0, x * dpr, y * dpr, radius)
    gradient.addColorStop(0, color.replace(")", `, ${alpha * 0.55})`))
    gradient.addColorStop(0.5, color.replace(")", `, ${alpha * 0.2})`))
    gradient.addColorStop(1, color.replace(")", ", 0)"))
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(x * dpr, y * dpr, radius, 0, Math.PI * 2)
    ctx.fill()

    if (t < 1) requestAnimationFrame(frame)
    else ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  requestAnimationFrame(frame)
}

export function LiquidRipple({ children, className, color = "rgba(0, 217, 255" }: LiquidRippleProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  function handlePointerDown(
    e: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>,
  ) {
    const el = containerRef.current
    const canvas = canvasRef.current
    if (!el || !canvas) return
    const pos = getPos(e, el)
    drawRipple(canvas, pos.x, pos.y, color)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = containerRef.current
    if (!canvas || !parent) return

    const resize = () => {
      const dpr = window.devicePixelRatio
      const w = parent.offsetWidth
      const h = parent.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    return () => ro.disconnect()
  }, [])

  return (
    <span
      ref={containerRef}
      onPointerDown={handlePointerDown}
      className={cn("relative inline-flex overflow-hidden", className)}
    >
      {/* Glossy highlight */}
      <span
        className="pointer-events-none absolute top-[3px] left-[12%] right-[12%] h-[35%] rounded-full z-[2]"
        style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, transparent 100%)",
        }}
      />
      {/* Ripple canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[1] rounded-full"
      />
      <span className="relative z-[3] flex items-center gap-2">{children}</span>
    </span>
  )
}
