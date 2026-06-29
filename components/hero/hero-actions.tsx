"use client"

import { useState, useRef, useEffect } from "react"
import { FileText, Send, Eye, Download } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonData = [
  { label: "Resume & CV (PDF, 2025)", icon: FileText },
  { label: "Get In Touch", icon: Send, href: "#contact" },
]

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
    <div className="hero-actions-stagger flex flex-wrap items-center justify-center gap-4 mt-10">
      {buttonData.map((btn, i) => {
        const Icon = btn.icon

        if (btn.label === "Resume & CV (PDF, 2025)") {
          return (
            <div key={btn.label} ref={cvRef} className="hero-btn-group relative">
              <button
                type="button"
                onClick={() => setCvOpen((o) => !o)}
                aria-expanded={cvOpen}
                aria-controls="cv-dropdown"
                className={cn(
                  "group relative inline-flex items-center gap-2.5",
                  "w-full sm:w-auto justify-center",
                  "px-6 py-3 rounded-full text-sm font-medium font-body",
                  "bg-[rgba(10,10,15,0.6)] backdrop-blur-[12px]",
                  "border border-[rgba(0,217,255,0.15)]",
                  "text-foreground",
                  "transition-all duration-300",
                  "hover:border-accent/40 hover:scale-105",
                  "hover:shadow-[0_0_20px_rgba(0,217,255,0.15),0_0_40px_rgba(0,217,255,0.05)]",
                  "active:scale-95",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                )}
              >
                <Icon size={16} className="shrink-0 text-accent" />
                <span>{btn.label}</span>
                <span className="flex items-center justify-center w-5 h-5 rounded-md bg-accent/10 text-accent ml-0.5">
                  <Download size={10} />
                </span>
              </button>

              {cvOpen && (
                <div
                  id="cv-dropdown"
                  role="menu"
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 rounded-xl overflow-hidden bg-[rgba(10,10,15,0.9)] backdrop-blur-[20px] border border-white/10 shadow-xl z-50 animate-dropdown-in"
                >
                  <a
                    href="/api/cv"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setCvOpen(false)}
                    role="menuitem"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:bg-white/10"
                  >
                    <Eye size={16} className="text-accent" />
                    Preview CV
                  </a>
                  <a
                    href="/api/cv"
                    download="Salah_Uddin_Selim.pdf"
                    onClick={() => setCvOpen(false)}
                    role="menuitem"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5 focus-visible:outline-none focus-visible:bg-white/10"
                  >
                    <Download size={16} className="text-accent" />
                    Download CV
                  </a>
                </div>
              )}
            </div>
          )
        }

        return (
          <a
            key={btn.label}
            href={btn.href}
            className={cn(
              "hero-btn-group group relative inline-flex items-center gap-2.5",
              "w-full sm:w-auto justify-center",
              "px-6 py-3 rounded-full text-sm font-medium font-body",
              "bg-accent text-white font-semibold",
              "border border-accent",
              "shadow-[0_0_20px_rgba(0,217,255,0.2)]",
              "transition-all duration-300",
              "hover:bg-accent/90 hover:scale-105",
              "hover:shadow-[0_0_30px_rgba(0,217,255,0.35),0_0_60px_rgba(0,217,255,0.1)]",
              "active:scale-95",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            )}
          >
            <Icon size={16} className="shrink-0" />
            <span>{btn.label}</span>
          </a>
        )
      })}
    </div>
  )
}
