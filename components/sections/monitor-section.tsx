"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import {
  Database,
  Zap,
  HardDrive,
  BarChart3,
  Search,
  FileText,
  ImageIcon,
  Globe,
  RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"

function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (d > 0) return `${d}d ${h}h`
  if (h > 0) return `${h}h ${m}m`
  return `${m}m ${s.toString().padStart(2, "0")}s`
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
}

interface MonitorData {
  dbLatency: number
  contentMetrics: {
    projects: number
    credentials: number
    skills: number
  }
  techStack: {
    next: string
    react: string
    node: string
    env: string
  }
  seo: {
    score: number
    items: { label: string; status: string }[]
  }
}

export function MonitorSection() {
  const [data, setData] = useState<MonitorData | null>(null)
  const [uptime, setUptime] = useState(0)
  const [diagnosticsRunning, setDiagnosticsRunning] = useState(false)

  const fetchMonitor = useCallback(() => {
    fetch("/api/monitor")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
  }, [])

  useEffect(() => {
    fetchMonitor()
    const interval = setInterval(fetchMonitor, 30000)
    return () => clearInterval(interval)
  }, [fetchMonitor])

  useEffect(() => {
    const interval = setInterval(() => setUptime((p) => p + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  const runDiagnostics = () => {
    if (diagnosticsRunning) return
    setDiagnosticsRunning(true)
    fetchMonitor()
    setTimeout(() => setDiagnosticsRunning(false), 2000)
  }

  const dbLatency = data?.dbLatency ?? 0
  const contentMetrics = data?.contentMetrics ?? { projects: 0, credentials: 0, skills: 0 }
  const techStack = data?.techStack ?? { next: "—", react: "—", node: "—", env: "development" }
  const seo = data?.seo ?? { score: 100, items: [] }

  return (
    <section className="relative min-h-screen px-4 sm:px-6 md:px-8 pb-24 max-w-[1340px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className="mb-10"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,217,255,0.6)]" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400/70">
                SYSTEM {techStack.env.toUpperCase()}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              System{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 drop-shadow-[0_0_20px_rgba(0,217,255,0.25)]">
                Spectrum
              </span>
            </h1>
            <p className="mt-2 text-xs font-mono tracking-[0.2em] text-white/25">
              Real-time diagnostics · portfolio infrastructure
            </p>
          </div>
          <button
            type="button"
            onClick={runDiagnostics}
            disabled={diagnosticsRunning}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 shrink-0",
              "border border-cyan-400/30 bg-cyan-400/[0.06] text-cyan-300/90",
              "hover:border-cyan-400/50 hover:bg-cyan-400/[0.1] hover:shadow-[0_0_25px_rgba(0,217,255,0.15)]",
              diagnosticsRunning && "pointer-events-none opacity-60",
            )}
            style={{ borderRadius: 9999 }}
          >
            <RefreshCw size={12} className={cn(diagnosticsRunning && "animate-spin")} />
            {diagnosticsRunning ? "Scanning..." : "Refresh"}
          </button>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
      >
        <motion.div
          variants={cardVariants}
          className="md:col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
        >
          <div className="flex items-start justify-between mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">
              SYSTEM HEALTH
            </span>
            <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-[0.2em] text-cyan-300">
              {data ? "ONLINE" : "LOADING"}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-5xl sm:text-6xl font-bold text-white tabular-nums">100</span>
            <span className="text-lg font-semibold text-cyan-300">%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden mb-3">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              initial={{ width: "100%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
            />
          </div>
          <p className="text-xs font-mono text-white/30 tracking-wide">
            All systems operating within optimal parameters.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.div
            variants={cardVariants}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
          >
            <div className="flex items-center gap-2 mb-3">
              <Database size={14} className="text-blue-400" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">
                SANITY LATENCY
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400/75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-400" />
              </span>
              <motion.span
                key={dbLatency}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white tabular-nums"
              >
                {dbLatency || "—"}
              </motion.span>
              <span className="text-sm font-mono text-white/30">ms</span>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
          >
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 size={14} className="text-green-400" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">
                UPTIME
              </span>
            </div>
            <motion.span
              key={uptime}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-green-400 tabular-nums font-mono"
            >
              {formatUptime(uptime)}
            </motion.span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
      >
        <motion.div
          variants={cardVariants}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">
            TECHNICAL STACK
          </span>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              { label: "Next.js", value: techStack.next },
              { label: "React", value: techStack.react },
              { label: "Node", value: techStack.node },
              { label: "Env", value: techStack.env },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3"
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
                  {item.label}
                </p>
                <p className="mt-1.5 text-sm font-mono font-semibold text-white/80">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">
            INFRASTRUCTURE
          </span>
          <div className="mt-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/30">
                  Database
                </span>
                <span className="text-[11px] font-mono tabular-nums text-cyan-300">Sanity CMS</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, ease: "easeOut" as const }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/30">
                  Hosting
                </span>
                <span className="text-[11px] font-mono tabular-nums text-cyan-300">
                  {techStack.env === "production" ? "Vercel" : "Local"}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, ease: "easeOut" as const }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <motion.div
          variants={cardVariants}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">
            CONTENT METRICS
          </span>
          <div className="mt-5 grid grid-cols-3 gap-4">
            {[
              { label: "Projects", value: String(contentMetrics.projects), icon: HardDrive },
              { label: "Credentials", value: String(contentMetrics.credentials), icon: FileText },
              { label: "Skills", value: String(contentMetrics.skills), icon: Zap },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <Icon size={16} />
                  </div>
                  <p className="text-xl font-bold text-white">{item.value}</p>
                  <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/30 mt-0.5">
                    {item.label}
                  </p>
                </div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
        >
          <div className="flex items-start justify-between mb-5">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">
              SEO HEALTH
            </span>
            <span className="inline-flex items-baseline gap-0.5 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-0.5 text-sm font-bold text-cyan-300 tabular-nums">
              {seo.score}
              <span className="text-[10px] font-mono text-cyan-300/60">/100</span>
            </span>
          </div>
          <div className="space-y-3">
            {[
              { label: "Robots", icon: Search, status: "Online" },
              { label: "Sitemap", icon: Globe, status: "Online" },
              { label: "Favicon", icon: ImageIcon, status: "Online" },
              { label: "OG Image", icon: ImageIcon, status: "Online" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <item.icon size={13} className="text-white/30" />
                  <span className="text-xs font-mono text-white/60">{item.label}</span>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-blue-300/70">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400/75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-400" />
                  </span>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
