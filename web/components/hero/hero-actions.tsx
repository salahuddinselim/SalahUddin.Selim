"use client"

import { motion } from "framer-motion"
import { FolderKanban, FileText, Send } from "lucide-react"
import { cn } from "@/lib/utils"

const buttons = [
  { label: "Portfolio", icon: FolderKanban, href: "#projects" },
  { label: "Resume & CV", icon: FileText, href: "/resume.pdf" },
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
  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="flex flex-wrap items-center justify-center gap-4 mt-10"
    >
      {buttons.map((btn, i) => {
        const Icon = btn.icon
        const isExternal = btn.href.startsWith("http") || btn.href.endsWith(".pdf")

        return (
          <motion.a
            key={btn.label}
            href={btn.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
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
