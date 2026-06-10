"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Monitor, Smartphone, Globe, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"

interface VisitorPanelProps {
  open: boolean
  onClose: () => void
}

interface CountryStat {
  code: string
  name: string
  flag: string
  percentage: number
}

interface DeviceStat {
  name: string
  icon: React.ReactNode
  percentage: number
}

function randomFluctuation(base: number, variance: number): number {
  return Math.round(base + (Math.random() - 0.5) * variance)
}

const countries: CountryStat[] = [
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", percentage: 42 },
  { code: "US", name: "United States", flag: "🇺🇸", percentage: 18 },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", percentage: 11 },
  { code: "DE", name: "Germany", flag: "🇩🇪", percentage: 8 },
  { code: "CA", name: "Canada", flag: "🇨🇦", percentage: 6 },
  { code: "AU", name: "Australia", flag: "🇦🇺", percentage: 4 },
  { code: "IN", name: "India", flag: "🇮🇳", percentage: 3 },
  { code: "SG", name: "Singapore", flag: "🇸🇬", percentage: 2 },
]

const devices: DeviceStat[] = [
  { name: "Windows", icon: <Monitor size={14} />, percentage: 35 },
  { name: "macOS", icon: <Monitor size={14} />, percentage: 24 },
  { name: "Android", icon: <Smartphone size={14} />, percentage: 18 },
  { name: "iOS", icon: <Smartphone size={14} />, percentage: 12 },
  { name: "Linux", icon: <Cpu size={14} />, percentage: 7 },
  { name: "Ubuntu", icon: <Globe size={14} />, percentage: 4 },
]

const panelVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.04, duration: 0.4, ease: "easeOut" as const },
  }),
}

export function VisitorPanel({ open, onClose }: VisitorPanelProps) {
  const [thisMonth, setThisMonth] = useState(19)
  const [allTime, setAllTime] = useState(712)
  const [countryData, setCountryData] = useState(countries)

  const tick = useCallback(() => {
    setThisMonth((prev) => Math.max(1, prev + (Math.random() > 0.5 ? 1 : -1)))
    setAllTime((prev) => prev + Math.floor(Math.random() * 3))
    setCountryData((prev) =>
      prev.map((c) => ({
        ...c,
        percentage: Math.min(
          100,
          Math.max(1, c.percentage + (Math.random() > 0.6 ? 1 : -1) * (Math.random() > 0.5 ? 1 : 0)),
        ),
      })),
    )
  }, [])

  useEffect(() => {
    if (!open) return
    const interval = setInterval(tick, 4000)
    return () => clearInterval(interval)
  }, [open, tick])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.aside
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
            className={cn(
              "fixed top-0 right-0 z-50 h-full w-full max-w-[420px]",
              "border-l border-white/10",
              "bg-[#050608]/95 backdrop-blur-2xl",
              "shadow-[-20px_0_60px_rgba(0,0,0,0.4)]",
              "overflow-y-auto",
            )}
          >
            <div className="p-6 pb-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400/75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-green-400">
                      LIVE
                    </span>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-white/30">
                    Analytics
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Views Summary */}
              <motion.div
                custom={0}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 gap-3 mb-8"
              >
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-2">
                    THIS MONTH
                  </p>
                  <motion.p
                    key={thisMonth}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-semibold text-white tabular-nums"
                  >
                    {thisMonth}
                  </motion.p>
                  <p className="text-[11px] font-mono text-white/20 mt-1">page views</p>
                </div>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-2">
                    ALL TIME
                  </p>
                  <motion.p
                    key={allTime}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-semibold text-cyan-300 tabular-nums"
                  >
                    {allTime}
                  </motion.p>
                  <p className="text-[11px] font-mono text-white/20 mt-1">total views</p>
                </div>
              </motion.div>

              {/* Countries */}
              <motion.div
                custom={1}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Globe size={13} className="text-white/40" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
                    Audience — Countries
                  </span>
                </div>
                <div className="space-y-3">
                  {countryData.map((c, i) => (
                    <div key={c.code} className="flex items-center gap-3">
                      <span className="w-6 text-base shrink-0">{c.flag}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-mono text-white/70 truncate">
                            {c.name}
                          </span>
                          <span className="text-[11px] font-mono text-white/40 tabular-nums shrink-0 ml-2">
                            {c.percentage}%
                          </span>
                        </div>
                        <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${c.percentage}%` }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Devices & OS */}
              <motion.div
                custom={2}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Monitor size={13} className="text-white/40" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
                    Devices & OS
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {devices.map((d) => (
                    <div
                      key={d.name}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-white/40">{d.icon}</span>
                        <span className="text-[11px] font-mono text-white/60">{d.name}</span>
                      </div>
                      <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400/80 to-purple-500/80"
                          initial={{ width: 0 }}
                          animate={{ width: `${d.percentage}%` }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        />
                      </div>
                      <span className="text-[11px] font-mono text-white/30 tabular-nums mt-1 block">
                        {d.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
