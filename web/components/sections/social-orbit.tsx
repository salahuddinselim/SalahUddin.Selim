"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link2, X, Mail, AtSign, UserRound, Code2 } from "lucide-react"
import { FaFacebook, FaInstagram } from "react-icons/fa"
import { cn } from "@/lib/utils"

interface SocialNode {
  id: string
  icon: React.ReactNode
  href: string
  label: string
}

const socialNodes: SocialNode[] = [
  {
    id: "email",
    icon: <Mail size={18} />,
    href: "mailto:salahuddin@example.com",
    label: "Email",
  },
  {
    id: "github",
    icon: <Code2 size={18} />,
    href: "https://github.com/salahuddin",
    label: "GitHub",
  },
  {
    id: "linkedin",
    icon: <UserRound size={18} />,
    href: "https://linkedin.com/in/salahuddin",
    label: "LinkedIn",
  },
  {
    id: "facebook",
    icon: <FaFacebook size={16} />,
    href: "https://facebook.com/salahuddin",
    label: "Facebook",
  },
  {
    id: "instagram",
    icon: <FaInstagram size={16} />,
    href: "https://instagram.com/salahuddin",
    label: "Instagram",
  },
  {
    id: "twitter",
    icon: <AtSign size={18} />,
    href: "https://twitter.com/salahuddin",
    label: "Twitter",
  },
]

export function SocialOrbit() {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 320, height: 320 }}
    >
      {/* Animated rings */}
      <motion.div
        animate={{
          rotate: 360,
          opacity: open ? 0.6 : 0,
          scale: open ? 1 : 0.8,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute rounded-full border border-accent/20 pointer-events-none"
        style={{ width: 220, height: 220 }}
      />
      <motion.div
        animate={{
          rotate: -360,
          opacity: open ? 0.4 : 0,
          scale: open ? 1 : 0.8,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="absolute rounded-full border border-accent-secondary/15 pointer-events-none"
        style={{ width: 280, height: 280 }}
      />

      {/* Center button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        animate={{
          boxShadow: open
            ? "0 0 30px rgba(0, 217, 255, 0.25), 0 0 60px rgba(0, 217, 255, 0.1)"
            : "0 0 0px rgba(0, 217, 255, 0)",
        }}
        className={cn(
          "relative z-10 w-14 h-14 rounded-full",
          "bg-[rgba(10,10,15,0.8)] backdrop-blur-[20px]",
          "border-2",
          "flex items-center justify-center",
          "transition-colors duration-300",
          open
            ? "border-accent/50 bg-accent/10"
            : "border-white/10 hover:border-accent/30",
        )}
      >
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-accent"
        >
          {open ? <X size={20} /> : <Link2 size={20} />}
        </motion.div>

        {!open && (
          <motion.span
            className="absolute inset-0 rounded-full border border-accent/20"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.button>

      {/* Social nodes */}
      {socialNodes.map((node, i) => {
        const angle = (i / socialNodes.length) * Math.PI * 2 - Math.PI / 2
        const radius = 130
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <motion.a
            key={node.id}
            href={node.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={false}
            animate={{
              x: open ? x : 0,
              y: open ? y : 0,
              opacity: open ? 1 : 0,
              scale: open ? 1 : 0.3,
            }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 24,
              delay: open
                ? i * 0.04 + 0.1
                : (socialNodes.length - 1 - i) * 0.03,
            }}
            whileHover={{
              scale: 1.15,
              borderColor: "rgba(0, 217, 255, 0.5)",
              boxShadow: "0 0 25px rgba(0, 217, 255, 0.15)",
            }}
            className={cn(
              "absolute w-11 h-11 rounded-full",
              "bg-[rgba(10,10,15,0.75)] backdrop-blur-[12px]",
              "border border-white/10",
              "flex items-center justify-center",
              "text-white/70 hover:text-accent",
              "transition-colors duration-200",
            )}
            style={{ marginLeft: -22, marginTop: -22 }}
            title={node.label}
          >
            {node.icon}

            <AnimatePresence>
              {open && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-[calc(100%+8px)] text-xs text-muted font-body whitespace-nowrap pointer-events-none"
                >
                  {node.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.a>
        )
      })}
    </div>
  )
}
