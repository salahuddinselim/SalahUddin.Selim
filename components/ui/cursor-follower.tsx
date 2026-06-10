"use client"

import { useEffect, useRef } from "react"

export function CursorFollower() {
  const glowRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const posRef = useRef({ x: -200, y: -200 })
  const targetRef = useRef({ x: -200, y: -200 })

  useEffect(() => {
    let mounted = true

    const handleMouse = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }

    function lerp() {
      if (!mounted) return
      const p = posRef.current
      const t = targetRef.current
      p.x += (t.x - p.x) * 0.12
      p.y += (t.y - p.y) * 0.12

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${p.x - 50}px, ${p.y - 50}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${p.x - 20}px, ${p.y - 20}px)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${p.x - 3}px, ${p.y - 3}px)`
      }

      rafRef.current = requestAnimationFrame(lerp)
    }

    window.addEventListener("mousemove", handleMouse, { passive: true })
    window.addEventListener("touchmove", handleTouch, { passive: true })
    rafRef.current = requestAnimationFrame(lerp)

    return () => {
      mounted = false
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("mousemove", handleMouse)
      window.removeEventListener("touchmove", handleTouch)
    }
  }, [])

  return (
    <>
      {/* Glow */}
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 100,
          height: 100,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99997,
          willChange: "transform",
          background: "radial-gradient(circle, rgba(0,217,255,0.07) 0%, transparent 65%)",
          filter: "blur(4px)",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 999998,
          willChange: "transform",
          backdropFilter: "blur(4px) saturate(150%)",
          WebkitBackdropFilter: "blur(4px) saturate(150%)",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 0 12px rgba(0,217,255,0.06)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 7,
            left: 9,
            width: 10,
            height: 3,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.40)",
            filter: "blur(1.5px)",
            transform: "rotate(-20deg)",
          }}
        />
      </div>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 999999,
          willChange: "transform",
          background: "rgba(0,217,255,0.9)",
          boxShadow: "0 0 6px rgba(0,217,255,0.6)",
        }}
      />
    </>
  )
}
