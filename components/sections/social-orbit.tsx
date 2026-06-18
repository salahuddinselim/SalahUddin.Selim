"use client"

import { useState, useEffect } from "react"
import { Link2, X, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { getSocialLinks, getProfile } from "@/lib/sanity/fetch"
import { getSocialIcon } from "@/lib/sanity/icon-map"

interface SocialNode {
  id: string
  icon: React.ReactNode
  href: string
  label: string
}

export function SocialOrbit() {
  const [open, setOpen] = useState(false)
  const [socialLinks, setSocialLinks] = useState<SocialNode[]>([])
  const defaultEmail = ["sselim223512", "bscse.uiu.ac.bd"].join("@")
  const [email, setEmail] = useState(defaultEmail)

  useEffect(() => {
    getProfile()
      .then((p) => { if (p.email) setEmail(p.email) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    getSocialLinks()
      .then((links) => {
        const nodes: SocialNode[] = links
          .filter((l) => l.url && l.name)
          .map((l) => {
            const Icon = getSocialIcon(l.icon)
            return {
              id: l.name.toLowerCase().replace(/\s+/g, "-"),
              icon: <Icon size={16} />,
              href: l.url,
              label: l.name,
            }
          })
        setSocialLinks(nodes)
      })
      .catch(() => setSocialLinks([]))
  }, [])

  const emailNode: SocialNode = {
    id: "email",
    icon: <Mail size={18} />,
    href: `mailto:${email}`,
    label: "Email",
  }

  const allNodes = [emailNode, ...socialLinks]

  return (
    <div
      className="relative flex items-center justify-center max-w-[320px] w-full"
      style={{ aspectRatio: "1/1" }}
    >
      <style>{`
        @keyframes soc-ring-inner { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes soc-ring-outer { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes soc-pulse { 0%{transform:scale(1);opacity:.4} 50%{transform:scale(1.15);opacity:0} 100%{transform:scale(1);opacity:.4} }
        @keyframes soc-tooltip { from{opacity:0;transform:translateX(-5px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      <div
        style={{
          opacity: open ? 0.6 : 0,
          scale: open ? 1 : 0.8,
          transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1), scale 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
        className="absolute rounded-full border border-accent/20 pointer-events-none"
      >
        <div
          className="rounded-full"
          style={{
            width: 220, height: 220,
            animation: "soc-ring-inner 60s linear infinite",
          }}
        />
      </div>

      <div
        style={{
          opacity: open ? 0.4 : 0,
          scale: open ? 1 : 0.8,
          transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s, scale 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s",
        }}
        className="absolute rounded-full border border-accent-secondary/15 pointer-events-none"
      >
        <div
          className="rounded-full"
          style={{
            width: 280, height: 280,
            animation: "soc-ring-outer 60s linear infinite",
          }}
        />
      </div>

      <button
        aria-label={open ? "Close social links" : "Open social links"}
        onClick={() => setOpen(!open)}
        style={{
          boxShadow: open
            ? "0 0 30px rgba(0, 217, 255, 0.25), 0 0 60px rgba(0, 217, 255, 0.1)"
            : "0 0 0px rgba(0, 217, 255, 0)",
          transition: "box-shadow 0.4s cubic-bezier(0.16,1,0.3,1), scale 0.2s",
        }}
        className={cn(
          "relative z-10 w-14 h-14 rounded-full",
          "bg-[rgba(10,10,15,0.8)] backdrop-blur-[20px]",
          "border-2",
          "flex items-center justify-center",
          "transition-colors duration-300",
          "hover:scale-105 active:scale-[0.93]",
          open
            ? "border-accent/50 bg-accent/10"
            : "border-white/10 hover:border-accent/30",
        )}
      >
        <div
          style={{
            rotate: open ? "90deg" : "0deg",
            transition: "rotate 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
          className="text-accent"
        >
          {open ? <X size={20} /> : <Link2 size={20} />}
        </div>

        {!open && (
          <span
            className="absolute inset-0 rounded-full border border-accent/20"
            style={{ animation: "soc-pulse 2.5s ease-in-out infinite" }}
          />
        )}
      </button>

      {allNodes.map((node, i) => {
        const angle = (i / allNodes.length) * Math.PI * 2 - Math.PI / 2
        const radius = 130
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        const delay = open
          ? i * 0.04 + 0.1
          : (allNodes.length - 1 - i) * 0.03

        return (
          <a
            key={node.id}
            href={node.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              transform: `translate(${open ? x : 0}px, ${open ? y : 0}px) scale(${open ? 1 : 0.3})`,
              opacity: open ? 1 : 0,
              transition: `transform ${open ? 0.4 : 0.3}s cubic-bezier(0.16,1,0.3,1) ${delay}s, opacity ${open ? 0.3 : 0.2}s ease ${delay}s`,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              marginLeft: -22,
              marginTop: -22,
            }}
            className={cn(
              "absolute w-11 h-11 rounded-full",
              "bg-[rgba(10,10,15,0.75)] backdrop-blur-[12px]",
              "flex items-center justify-center",
              "text-white/70",
              "transition-colors duration-200",
              "hover:text-accent hover:scale-110 hover:border-[rgba(0,217,255,0.5)] hover:shadow-[0_0_25px_rgba(0,217,255,0.15)]",
            )}
            title={node.label}
          >
            {node.icon}

            {open && (
              <span
                className="absolute left-[calc(100%+8px)] text-xs text-muted font-body whitespace-nowrap pointer-events-none"
                style={{ animation: "soc-tooltip 0.15s ease-out" }}
              >
                {node.label}
              </span>
            )}
          </a>
        )
      })}
    </div>
  )
}
