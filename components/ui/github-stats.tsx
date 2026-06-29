"use client"

import { useRef, useState, useEffect } from "react"
import { GitFork, Star, BookOpen, Users } from "lucide-react"
import { motion } from "framer-motion"

interface GitHubUser {
  public_repos: number
  followers: number
  following: number
}

interface GitHubRepo {
  stargazers_count: number
  forks_count: number
}

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

const GITHUB_USERNAME = "salahuddinselim"

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

function ErrorCard({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-12 text-center">
      <p className="text-sm text-white/50">Failed to load GitHub stats</p>
      <button
        onClick={onRetry}
        className="mt-3 rounded-lg bg-white/[0.06] px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:bg-white/[0.1] hover:text-white/90"
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
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
          next: { revalidate: 3600 },
        }),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
          next: { revalidate: 3600 },
        }),
      ])

      if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error")

      const userData: GitHubUser = await userRes.json()
      const reposData: GitHubRepo[] = await reposRes.json()

      const total_stars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0)
      const total_forks = reposData.reduce((acc, repo) => acc + repo.forks_count, 0)

      const result: GitHubStats = {
        public_repos: userData.public_repos,
        total_stars,
        total_forks,
        followers: userData.followers,
      }

      cacheRef.current = { data: result, ts: Date.now() }
      setStats(result)
    } catch {
      setError(true)
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

      {error && <ErrorCard onRetry={fetchStats} />}

      {stats &&
        !error &&
        statItems.map((item, i) => <StatCard key={item.label} {...item} index={i} />)}
    </div>
  )
}
