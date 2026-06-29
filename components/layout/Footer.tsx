"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Eye, Image, Activity } from "lucide-react"
import { useVisitorPanel } from "@/components/analytics/visitor-context"
import { LiquidRipple } from "@/components/ui/liquid-ripple"

const pills = [
  { label: "Visitors", href: null, icon: Eye, action: "panel" as const },
  { label: "Gallery", href: "/gallery", icon: Image, action: "link" as const },
  { label: "Monitor", href: "/analytics", icon: Activity, action: "link" as const },
]

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
}

const pillVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.3 + i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
}

export function Footer() {
  const { openPanel } = useVisitorPanel()

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={containerVariants}
      className="relative w-full bg-[#050608]"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

      <div className="mx-auto flex flex-col items-center justify-between gap-6 px-6 py-8 sm:flex-row sm:px-8 md:px-12 max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,217,255,0.6)]" />
          </span>
          <span className="font-mono text-xs text-white/50">
            &copy; {new Date().getFullYear()} Salah Uddin Selim
          </span>
        </motion.div>

        <div className="flex flex-wrap items-center gap-3">
          {pills.map((pill, i) => {
            const Icon = pill.icon
            const body = (
              <LiquidRipple className="transition-transform duration-200 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-0.5 active:scale-[0.97]">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-200 border bg-cyan-400/[0.04] text-cyan-300/90 shadow-[inset_0_1px_0_rgba(0,217,255,0.1)] hover:shadow-[0_0_25px_rgba(0,217,255,0.2),inset_0_0_20px_rgba(0,217,255,0.06)]"
                  style={{ borderColor: "rgba(0,217,255,0.30)" }}
                >
                  <Icon size={13} />
                  {pill.label}
                </span>
              </LiquidRipple>
            )

            return (
              <motion.div key={pill.label} custom={i} variants={pillVariants}>
                {pill.action === "panel" ? (
                  <button
                    type="button"
                    onClick={openPanel}
                    className="p-0 border-0 bg-transparent cursor-pointer"
                  >
                    {body}
                  </button>
                ) : (
                  <Link href={pill.href!} className="no-underline">
                    {body}
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.footer>
  )
}
