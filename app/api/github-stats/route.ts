import { NextResponse } from "next/server"

export const revalidate = 3600

const GITHUB_USERNAME = "salahuddinselim"

interface GitHubUser {
  public_repos: number
  followers: number
}

interface GitHubRepo {
  stargazers_count: number
  forks_count: number
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ])

    if (!userRes.ok || !reposRes.ok) {
      console.error(
        `[github-stats] GitHub API returned non-OK status — user: ${userRes.status}, repos: ${reposRes.status}`,
      )
      return NextResponse.json({ error: "GitHub API error" }, { status: 502 })
    }

    const userData: GitHubUser = await userRes.json()
    const reposData: GitHubRepo[] = await reposRes.json()

    const total_stars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0)
    const total_forks = reposData.reduce((acc, repo) => acc + repo.forks_count, 0)

    return NextResponse.json(
      {
        public_repos: userData.public_repos,
        total_stars,
        total_forks,
        followers: userData.followers,
      },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    )
  } catch (error) {
    console.error("[github-stats] Failed to fetch GitHub stats:", error)
    return NextResponse.json({ error: "Failed to fetch GitHub stats" }, { status: 500 })
  }
}
