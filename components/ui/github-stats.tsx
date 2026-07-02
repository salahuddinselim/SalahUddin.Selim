"use client"

import { useRef, useState, useEffect } from "react"
import { GitFork, Star, BookOpen, Users } from "lucide-react"
import { motion } from "framer-motion"

interface GitHubStats {
  public_repos: number
  total_stars: number
  total_forks: number
  followers: number
}

interface StatItem {
  label: string
  value: number
  icon: React.ReactNode
}

const LAST_KNOWN_STATS_KEY = "github-stats:last-known"

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-lg bg-white/[0.04] animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-16 rounded bg-white/[0.04] animate-pulse" />
          <div className="h-6 w-20 rounded bg-white/[0.04] animate-pulse" />
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, index }: StatItem & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
      className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:shadow-[0_0_24px_-4px_rgba(255,255,255,0.04)]"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-white/[0.04] text-white/70 transition-colors duration-300 group-hover:text-white/90">
          {icon}
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/50">{label}</p>
          <p className="mt-0.5 text-2xl font-semibold tracking-tight text-white/90">
            {value.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function ErrorCard({ onRetry, isStale }: { onRetry: () => void; isStale: boolean }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-4 text-center">
      <p className="text-xs text-white/40">
        {isStale
          ? "Showing last known stats — couldn't refresh from GitHub"
          : "Failed to load GitHub stats"}
      </p>
      <button
        onClick={onRetry}
        className="mt-1 rounded-lg bg-white/[0.06] px-3 py-1.5 text-[11px] font-medium text-white/70 transition-colors hover:bg-white/[0.1] hover:text-white/90"
      >
        Retry
      </button>
    </div>
  )
}

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const cacheRef = useRef<{ data: GitHubStats; ts: number } | null>(null)

  async function fetchStats() {
    const now = Date.now()
    const cached = cacheRef.current
    if (cached && now - cached.ts < 3600 * 1000) {
      setStats(cached.data)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(false)

    try {
      const res = await fetch("/api/github-stats")
      if (!res.ok) throw new Error("GitHub stats route error")

      const result: GitHubStats = await res.json()

      cacheRef.current = { data: result, ts: Date.now() }
      setStats(result)
      try {
        localStorage.setItem(LAST_KNOWN_STATS_KEY, JSON.stringify(result))
      } catch {
        // localStorage unavailable (private browsing, etc.) — non-critical
      }
    } catch {
      setError(true)
      try {
        const raw = localStorage.getItem(LAST_KNOWN_STATS_KEY)
        if (raw) setStats(JSON.parse(raw))
      } catch {
        // no last-known stats available — will show the plain error state
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const statItems: StatItem[] = stats
    ? [
        {
          label: "Public Repos",
          value: stats.public_repos,
          icon: <BookOpen className="size-5" />,
        },
        {
          label: "Total Stars",
          value: stats.total_stars,
          icon: <Star className="size-5" />,
        },
        {
          label: "Total Forks",
          value: stats.total_forks,
          icon: <GitFork className="size-5" />,
        },
        {
          label: "Followers",
          value: stats.followers,
          icon: <Users className="size-5" />,
        },
      ]
    : []

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {loading && Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}

      {!loading && error && !stats && <ErrorCard onRetry={fetchStats} isStale={false} />}

      {!loading &&
        stats &&
        statItems.map((item, i) => <StatCard key={item.label} {...item} index={i} />)}

      {!loading && error && stats && <ErrorCard onRetry={fetchStats} isStale />}
    </div>
  )
}
