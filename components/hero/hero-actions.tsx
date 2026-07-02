"use client"

import { useState, useRef, useEffect } from "react"
import { motion, type Variants } from "framer-motion"
import { FileText, Eye, Download, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const fadeUp: Variants = {
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export function HeroActions() {
  const [cvOpen, setCvOpen] = useState(false)
  const cvRef = useRef<HTMLDivElement>(null)
  const cvButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (cvRef.current && !cvRef.current.contains(e.target as Node)) {
        setCvOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  useEffect(() => {
    if (!cvOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCvOpen(false)
        cvButtonRef.current?.focus()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [cvOpen])

  return (
    <motion.div
      variants={fadeUp}
      initial={false}
      animate="show"
      className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 w-full max-w-lg mx-auto px-4 sm:px-0"
    >
      <a
        href="#contact"
        className={cn(
          "btn-hero",
          "w-full sm:w-auto min-h-[48px] sm:min-h-[52px] min-w-0 sm:min-w-[200px]",
          "tracking-wide hover:scale-[1.04] active:scale-[0.97]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]",
        )}
        aria-label="Get in touch with Salah Uddin Selim"
      >
        Get In Touch
        <ArrowRight size={20} />
      </a>

      <div ref={cvRef} className="relative w-full sm:w-auto">
        <button
          ref={cvButtonRef}
          type="button"
          onClick={() => setCvOpen((o) => !o)}
          aria-expanded={cvOpen}
          aria-controls="cv-dropdown"
          aria-label="View or download resume"
          className={cn(
            "inline-flex items-center justify-center gap-2.5",
            "w-full sm:w-auto min-h-[48px] sm:min-h-[52px] min-w-0 sm:min-w-[180px]",
            "px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl",
            "bg-transparent text-white/80",
            "text-sm sm:text-base font-semibold font-body",
            "border-2 border-white/20",
            "transition-all duration-300",
            "hover:bg-white/5 hover:text-white hover:border-white/40 hover:scale-[1.03]",
            "active:scale-[0.97]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]",
          )}
        >
          <FileText size={18} />
          Resume &amp; CV
        </button>

        {cvOpen && (
          <div
            id="cv-dropdown"
            role="menu"
            className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-xl overflow-hidden bg-[rgba(10,10,15,0.95)] backdrop-blur-[20px] border border-white/10 shadow-xl z-[60] animate-dropdown-in"
          >
            <a
              href="/api/cv"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setCvOpen(false)}
              role="menuitem"
              className="flex items-start gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:bg-white/10"
            >
              <Eye size={16} className="text-accent mt-0.5 shrink-0" />
              <span className="flex flex-col">
                Preview CV
                <span className="text-xs text-white/60 font-normal">Opens in a new tab</span>
              </span>
            </a>
            <a
              href="/api/cv"
              download="Salah_Uddin_Selim.pdf"
              onClick={() => setCvOpen(false)}
              role="menuitem"
              className="flex items-start gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5 focus-visible:outline-none focus-visible:bg-white/10"
            >
              <Download size={16} className="text-accent mt-0.5 shrink-0" />
              <span className="flex flex-col">
                Download CV
                <span className="text-xs text-white/60 font-normal">
                  Saves the PDF to your device
                </span>
              </span>
            </a>
          </div>
        )}
      </div>
    </motion.div>
  )
}
