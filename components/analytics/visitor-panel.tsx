"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Monitor, Smartphone, Globe, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"

interface VisitorPanelProps {
  open: boolean
  onClose: () => void
}

interface CountryStat {
  name: string
  code: string
  flag: string
  count: number
}

interface DeviceStat {
  name: string
  count: number
}

interface MonthlyStat {
  month: string
  views: number
}

interface VisitorStats {
  totalViews: number
  thisMonthViews: number
  thisMonth: string
  countries: CountryStat[]
  devices: DeviceStat[]
  monthlyHistory: MonthlyStat[]
  lastUpdated: string | null
}

const deviceIcons: Record<string, React.ReactNode> = {
  Windows: <Monitor size={14} />,
  macOS: <Monitor size={14} />,
  Android: <Smartphone size={14} />,
  iOS: <Smartphone size={14} />,
  Linux: <Cpu size={14} />,
  Ubuntu: <Globe size={14} />,
}

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
  const [stats, setStats] = useState<VisitorStats | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) return
    setLoading(true)
    fetch("/api/visitors")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [open])

  const totalViews = stats?.totalViews ?? 0
  const thisMonthViews = stats?.thisMonthViews ?? 0
  const countries = stats?.countries ?? []
  const devices = stats?.devices ?? []
  const maxCountry = Math.max(...countries.map((c) => c.count), 1)
  const maxDevice = Math.max(...devices.map((d) => d.count), 1)

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
                    key={thisMonthViews}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-semibold text-white tabular-nums"
                  >
                    {loading ? "—" : thisMonthViews}
                  </motion.p>
                  <p className="text-[11px] font-mono text-white/20 mt-1">page views</p>
                </div>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-2">
                    ALL TIME
                  </p>
                  <motion.p
                    key={totalViews}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-semibold text-cyan-300 tabular-nums"
                  >
                    {loading ? "—" : totalViews}
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
                {countries.length === 0 ? (
                  <p className="text-xs font-mono text-white/20">No data yet</p>
                ) : (
                  <div className="space-y-3">
                    {countries.map((c) => (
                      <div key={c.code} className="flex items-center gap-3">
                        <span className="w-6 text-base shrink-0">{c.flag}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-mono text-white/70 truncate">
                              {c.name}
                            </span>
                            <span className="text-[11px] font-mono text-white/40 tabular-nums shrink-0 ml-2">
                              {c.count}
                            </span>
                          </div>
                          <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${(c.count / maxCountry) * 100}%` }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                {devices.length === 0 ? (
                  <p className="text-xs font-mono text-white/20">No data yet</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {devices.map((d) => (
                      <div
                        key={d.name}
                        className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-white/40">
                            {deviceIcons[d.name] ?? <Monitor size={14} />}
                          </span>
                          <span className="text-[11px] font-mono text-white/60">{d.name}</span>
                        </div>
                        <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400/80 to-purple-500/80"
                            initial={{ width: 0 }}
                            animate={{ width: `${(d.count / maxDevice) * 100}%` }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-white/30 tabular-nums mt-1 block">
                          {d.count}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
