"use client"

import { useState, useEffect, useRef, startTransition } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
import { LiquidRipple } from "@/components/ui/liquid-ripple"
import { ChatButton } from "@/components/layout/chat-button"
import { navItems, siteName, chatLabel } from "@/data"

const InfernapeChat = dynamic(
  () => import("@/components/chat/infernape-chat").then((m) => m.InfernapeChat),
  { ssr: false },
)

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLElement>(null)
  const mobileToggleRef = useRef<HTMLButtonElement>(null)
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 })
  const [headerHeight, setHeaderHeight] = useState(72)
  const scrollDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scrolledRef = useRef(false)
  const glowFrameRef = useRef<number | null>(null)
  const glowPendingRef = useRef<{ x: number; y: number; opacity: number } | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollDebounceRef.current) {
        clearTimeout(scrollDebounceRef.current)
      }
      scrollDebounceRef.current = setTimeout(() => {
        const next = window.scrollY > 80
        if (next === scrolledRef.current) return
        scrolledRef.current = next
        startTransition(() => setScrolled(next))
      }, 80)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollDebounceRef.current) clearTimeout(scrollDebounceRef.current)
    }
  }, [])

  useEffect(() => {
    if (!headerRef.current) return
    const observer = new ResizeObserver(([entry]) => {
      setHeaderHeight(entry.contentRect.height)
    })
    observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const toggleButton = mobileToggleRef.current
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    const firstLink = mobileMenuRef.current?.querySelector("a")
    firstLink?.focus()
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
      toggleButton?.focus()
    }
  }, [mobileOpen])

  useEffect(() => {
    return () => {
      if (glowFrameRef.current !== null) {
        cancelAnimationFrame(glowFrameRef.current)
      }
    }
  }, [])

  return (
    <>
      <motion.header
        ref={headerRef}
        onMouseMove={(e) => {
          const rect = headerRef.current?.getBoundingClientRect()
          if (!rect) return
          glowPendingRef.current = {
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
            opacity: 1,
          }
          if (glowFrameRef.current !== null) return
          glowFrameRef.current = requestAnimationFrame(() => {
            glowFrameRef.current = null
            const next = glowPendingRef.current
            if (!next) return
            startTransition(() => setGlow(next))
          })
        }}
        onMouseLeave={() => {
          glowPendingRef.current = { ...glow, opacity: 0 }
          if (glowFrameRef.current !== null) return
          glowFrameRef.current = requestAnimationFrame(() => {
            glowFrameRef.current = null
            const next = glowPendingRef.current
            if (!next) return
            startTransition(() => setGlow(next))
          })
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        style={{ WebkitBackdropFilter: "blur(18px)" }}
        className={cn(
          "fixed top-3 sm:top-5 left-1/2 z-50 flex items-center justify-between",
          "-translate-x-1/2 w-[96%] sm:w-[95%] max-w-[1240px]",
          "rounded-full",
          "border border-white/10 bg-white/[0.06] backdrop-blur-[18px] shadow-[0_8px_32px_rgba(0,0,0,0.2)]",
          "transition-all duration-300",
          scrolled ? "py-1.5 sm:py-2 px-3 sm:px-4" : "py-2 sm:py-3 px-3 sm:px-5",
        )}
      >
        {/* Mouse glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
          style={{
            opacity: glow.opacity,
            background: `radial-gradient(160px circle at ${glow.x}% ${glow.y}%, rgba(0,217,255,0.20), transparent 80%)`,
          }}
        />
        <Link
          href="/"
          aria-label="SALAHUDDIN.DEV"
          onClick={() => {
            setMobileOpen(false)
            if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className="flex items-center gap-2 sm:gap-3 rounded-full px-2 sm:px-3 py-2 transition-all duration-200 hover:bg-white/5 shrink-0"
        >
          <span className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-cyan-400/30 shadow-[0_0_24px_rgba(0,217,255,0.08)]">
            <Image
              src="/hero.webp"
              alt="Salah Uddin Selim"
              fill
              sizes="40px"
              priority
              className="object-cover"
            />
          </span>
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.32em] text-white/90 hidden sm:inline">
            {siteName}
          </span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-0.5 lg:gap-1 overflow-x-auto scrollbar-none"
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                title={`${item.label}: ${item.description}`}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3 lg:px-4 py-2 lg:py-2 text-xs lg:text-sm font-semibold uppercase tracking-[0.15em] lg:tracking-[0.20em] transition-all duration-200 overflow-hidden whitespace-nowrap",
                  isActive
                    ? "text-white/90 bg-white/[0.06] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80",
                )}
              >
                <LiquidRipple>{item.label}</LiquidRipple>
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400/60"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <ChatButton onClick={() => setChatOpen(true)} label={chatLabel} />

          <motion.button
            ref={mobileToggleRef}
            className="flex md:hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-200 hover:bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-label="Close navigation menu"
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            style={{ top: headerHeight + 16 }}
            className="fixed left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-[1100px]"
          >
            <nav
              ref={mobileMenuRef}
              id="mobile-menu"
              className="rounded-3xl border border-white/10 bg-[#0B1220]/95 p-4 backdrop-blur-2xl shadow-2xl max-h-[75dvh] overflow-y-auto"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={14} />
                  <span className="text-[10px] font-mono">Close</span>
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      title={`${item.label}: ${item.description}`}
                      aria-label={item.label}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "rounded-2xl px-4 min-h-[44px] flex items-center text-sm font-semibold uppercase tracking-wider transition-all duration-200",
                        isActive
                          ? "text-white/90 bg-white/[0.06] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                          : "text-white/50 hover:bg-white/5 hover:text-white/80",
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(0,217,255,0.6)] shrink-0" />
                        )}
                        <span className="flex flex-col items-start">
                          <span>{item.label}</span>
                          <span className="text-[9px] font-mono font-normal tracking-normal text-white/30 uppercase">
                            {item.description}
                          </span>
                        </span>
                      </span>
                    </Link>
                  )
                })}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <InfernapeChat open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  )
}
