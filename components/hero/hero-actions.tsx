"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Send, Eye, Download } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonData = [
  { label: "Resume & CV", icon: FileText },
  { label: "Get In Touch", icon: Send, href: "#contact" },
]

const variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.8 + i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
}

export function HeroActions() {
  const [cvOpen, setCvOpen] = useState(false)
  const cvRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (cvRef.current && !cvRef.current.contains(e.target as Node)) {
        setCvOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="flex flex-wrap items-center justify-center gap-4 mt-10"
    >
      {buttonData.map((btn, i) => {
        const Icon = btn.icon

        if (btn.label === "Resume & CV") {
          return (
            <div key={btn.label} ref={cvRef} className="relative">
              <motion.button
                type="button"
                onClick={() => setCvOpen((o) => !o)}
                custom={i}
                variants={variants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "group relative inline-flex items-center gap-2.5",
                  "px-6 py-3 rounded-full text-sm font-medium font-body",
                  "bg-[rgba(10,10,15,0.6)] backdrop-blur-[12px]",
                  "border border-[rgba(0,217,255,0.15)]",
                  "text-foreground",
                  "transition-shadow duration-300",
                  "hover:border-accent/40",
                  "hover:shadow-[0_0_20px_rgba(0,217,255,0.15),0_0_40px_rgba(0,217,255,0.05)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                )}
              >
                <Icon size={16} className="shrink-0 text-accent" />
                <span>{btn.label}</span>
              </motion.button>

              <AnimatePresence>
                {cvOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 rounded-xl overflow-hidden bg-[rgba(10,10,15,0.9)] backdrop-blur-[20px] border border-white/10 shadow-xl z-50"
                  >
                    <a
                      href="/api/cv"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setCvOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Eye size={16} className="text-accent" />
                      Preview CV
                    </a>
                    <a
                      href="/api/cv"
                      download="Salah_Uddin_Selim.pdf"
                      onClick={() => setCvOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5"
                    >
                      <Download size={16} className="text-accent" />
                      Download CV
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        }

        return (
          <motion.a
            key={btn.label}
            href={btn.href}
            custom={i}
            variants={variants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "group relative inline-flex items-center gap-2.5",
              "px-6 py-3 rounded-full text-sm font-medium font-body",
              "bg-[rgba(10,10,15,0.6)] backdrop-blur-[12px]",
              "border border-[rgba(0,217,255,0.15)]",
              "text-foreground",
              "transition-shadow duration-300",
              "hover:border-accent/40",
              "hover:shadow-[0_0_20px_rgba(0,217,255,0.15),0_0_40px_rgba(0,217,255,0.05)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            )}
          >
            <Icon size={16} className="shrink-0 text-accent" />
            <span>{btn.label}</span>
          </motion.a>
        )
      })}
    </motion.div>
  )
}
