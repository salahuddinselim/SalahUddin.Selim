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
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
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

const seoItems = [
  { label: "Robots", status: "ACTIVE" as const },
  { label: "Sitemap", status: "ACTIVE" as const },
  { label: "Favicon", status: "ACTIVE" as const },
  { label: "OG Image", status: "ACTIVE" as const },
]

export function MonitorSection() {
  const [dbLatency, setDbLatency] = useState(236)
  const [serverLatency, setServerLatency] = useState(44)
  const [uptime, setUptime] = useState(475)
  const [heapUsed, setHeapUsed] = useState(21)
  const [heapTotal] = useState(24)
  const [rss, setRss] = useState(101)
  const [memEfficiency, setMemEfficiency] = useState(88)
  const [load1, setLoad1] = useState(0.0)
  const [load5, setLoad5] = useState(0.0)
  const [diagnosticsRunning, setDiagnosticsRunning] = useState(false)

  const tick = useCallback(() => {
    setDbLatency((p) => Math.max(80, Math.min(400, p + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 8))))
    setServerLatency((p) => Math.max(10, Math.min(120, p + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 4))))
    setHeapUsed((p) => Math.max(14, Math.min(30, p + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2))))
    setRss((p) => Math.max(80, Math.min(130, p + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 4))))
    setMemEfficiency((p) => Math.max(78, Math.min(96, p + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3))))
    setLoad1((p) => Math.round(Math.max(0, Math.min(5, p + (Math.random() - 0.5) * 0.2)) * 100) / 100)
    setLoad5((p) => Math.round(Math.max(0, Math.min(5, p + (Math.random() - 0.5) * 0.1)) * 100) / 100)
  }, [])

  useEffect(() => {
    const interval = setInterval(tick, 3500)
    return () => clearInterval(interval)
  }, [tick])

  useEffect(() => {
    const interval = setInterval(() => setUptime((p) => p + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  const runDiagnostics = () => {
    if (diagnosticsRunning) return
    setDiagnosticsRunning(true)
    setTimeout(() => setDiagnosticsRunning(false), 3000)
  }

  return (
    <section className="relative min-h-screen px-4 sm:px-6 md:px-8 pb-24 max-w-[1340px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className="mb-10"
      >
        {/* Status + Title row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {/* Status indicator */}
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,217,255,0.6)]" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400/70">
                SYSTEM LIVE
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              System{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 drop-shadow-[0_0_20px_rgba(0,217,255,0.25)]">
                Spectrum
              </span>
            </h1>
            <p className="mt-2 text-xs font-mono tracking-[0.2em] text-white/25">
              Real-time diagnostics · salahuddin.dev infrastructure
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
            <RefreshCw
              size={12}
              className={cn(diagnosticsRunning && "animate-spin")}
            />
            {diagnosticsRunning ? "Scanning..." : "Run Diagnostics"}
          </button>
        </div>
      </motion.div>

      {/* === ROW 1: Real-Time Metrics === */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
      >
        {/* System Health — large left card */}
        <motion.div
          variants={cardVariants}
          className="md:col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
        >
          <div className="flex items-start justify-between mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">
              SYSTEM HEALTH
            </span>
            <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-[0.2em] text-cyan-300">
              EXCELLENT
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

        {/* Right column: Latency cards */}
        <div className="flex flex-col gap-4">
          <motion.div
            variants={cardVariants}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
          >
            <div className="flex items-center gap-2 mb-3">
              <Database size={14} className="text-blue-400" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">
                DB LATENCY
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
                {dbLatency}
              </motion.span>
              <span className="text-sm font-mono text-white/30">ms</span>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
          >
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className="text-cyan-400" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">
                SERVER LATENCY
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </span>
              <motion.span
                key={serverLatency}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white tabular-nums"
              >
                {serverLatency}
              </motion.span>
              <span className="text-sm font-mono text-white/30">ms</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Uptime card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-4"
      >
        <motion.div
          variants={cardVariants}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
        >
          <div className="flex items-center gap-2 mb-2">
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
      </motion.div>

      {/* === ROW 2: Architecture & Memory === */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
      >
        {/* Tech Stack */}
        <motion.div
          variants={cardVariants}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">
            TECHNICAL STACK
          </span>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              { label: "Next.js", value: "16.2.7" },
              { label: "React", value: "19.2.4" },
              { label: "Node", value: "24.14.1" },
              { label: "Env", value: "PRODUCTION" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3"
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
                  {item.label}
                </p>
                <p className="mt-1.5 text-sm font-mono font-semibold text-white/80">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Memory Usage */}
        <motion.div
          variants={cardVariants}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">
            MEMORY USAGE
          </span>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { label: "Heap Used", value: heapUsed, unit: "MB" },
              { label: "Heap Total", value: heapTotal, unit: "MB" },
              { label: "RSS", value: rss, unit: "MB" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-white/25">
                  {item.label}
                </p>
                <motion.p
                  key={`${item.label}-${item.value}`}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-lg font-bold text-white tabular-nums"
                >
                  {item.value}
                </motion.p>
                <p className="text-[10px] font-mono text-white/20">{item.unit}</p>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/30">
                Memory Efficiency
              </span>
              <span className="text-[11px] font-mono tabular-nums text-cyan-300">
                {memEfficiency}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                key={memEfficiency}
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${memEfficiency}%` }}
                transition={{ duration: 0.6, ease: "easeOut" as const }}
              />
            </div>
          </div>
          <div className="mt-4 flex gap-6">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-white/20">
                LOAD AVG 1m
              </span>
              <span className="ml-2 text-xs font-mono tabular-nums text-white/50">{load1.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-white/20">
                LOAD AVG 5m
              </span>
              <span className="ml-2 text-xs font-mono tabular-nums text-white/50">{load5.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* === ROW 3: Metrics & Optimization === */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Content Metrics */}
        <motion.div
          variants={cardVariants}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">
            CONTENT METRICS
          </span>
          <div className="mt-5 grid grid-cols-3 gap-4">
            {[
              { label: "Projects", value: "8", icon: HardDrive },
              { label: "Credentials", value: "3", icon: FileText },
              { label: "Skills", value: "30", icon: Zap },
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

        {/* SEO Health */}
        <motion.div
          variants={cardVariants}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
        >
          <div className="flex items-start justify-between mb-5">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">
              SEO HEALTH
            </span>
            <span className="inline-flex items-baseline gap-0.5 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-0.5 text-sm font-bold text-cyan-300 tabular-nums">
              100
              <span className="text-[10px] font-mono text-cyan-300/60">/100</span>
            </span>
          </div>
          <div className="space-y-3">
            {seoItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  {item.label === "Robots" && <Search size={13} className="text-white/30" />}
                  {item.label === "Sitemap" && <Globe size={13} className="text-white/30" />}
                  {item.label === "Favicon" && <ImageIcon size={13} className="text-white/30" />}
                  {item.label === "OG Image" && <ImageIcon size={13} className="text-white/30" />}
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
