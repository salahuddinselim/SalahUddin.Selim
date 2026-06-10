"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Menu, X, MessageCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { InfernapeChat } from "@/components/chat/infernape-chat"

const navItems = [
  { label: "PROJECTS", href: "/projects" },
  { label: "CREDENTIALS", href: "/credentials" },
  { label: "FORGE", href: "/forge" },
  { label: "PERSONA", href: "/persona" },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={cn(
          "fixed top-5 left-1/2 z-50 flex items-center justify-between",
          "-translate-x-1/2 w-[95%] max-w-[1240px] rounded-full",
          "border border-white/10 bg-[#0B1220]/80 backdrop-blur-[28px] shadow-[0_40px_120px_rgba(0,0,0,0.18)]",
          "transition-all duration-300",
          scrolled ? "py-2 px-4" : "py-3 px-5",
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-3 rounded-full px-3 py-2 transition-all duration-200 hover:bg-white/5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300 shadow-[0_0_24px_rgba(0,217,255,0.08)]">
            <Home size={18} />
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.32em] text-white/90">
            salahuddin.dev
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.20em] transition-all duration-200",
                  isActive
                    ? "text-cyan-300 bg-cyan-400/10"
                    : "text-white/75 hover:bg-white/5 hover:text-white",
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(0,217,255,0.6)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setChatOpen(true)}
            className="hidden md:inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.20em] text-cyan-200 transition-all duration-200 hover:border-cyan-300/30 hover:bg-cyan-400/10"
          >
            <MessageCircle size={14} />
            INFERNAPE
          </button>

          <motion.button
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-200 hover:bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[82px] left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-[1100px]"
          >
            <nav className="rounded-3xl border border-white/10 bg-[#0B1220]/95 p-4 backdrop-blur-2xl shadow-2xl">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-200",
                        isActive
                          ? "text-cyan-300 bg-cyan-400/10"
                          : "text-white/75 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(0,217,255,0.6)] shrink-0" />
                        )}
                        {item.label}
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
