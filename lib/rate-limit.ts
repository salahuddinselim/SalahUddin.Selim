type RateLimitFn = (identifier: string) => Promise<{ success: boolean; remaining: number; reset: number }>

interface InMemoryEntry {
  count: number
  resetAt: number
}

function createInMemoryLimiter(max: number, windowMs: number): RateLimitFn {
  const store = new Map<string, InMemoryEntry>()
  const cleanup = setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store) {
      if (now > entry.resetAt) store.delete(key)
    }
  }, 60_000)
  if (cleanup.unref) cleanup.unref()

  return async (identifier: string) => {
    const now = Date.now()
    const entry = store.get(identifier)
    if (!entry || now > entry.resetAt) {
      store.set(identifier, { count: 1, resetAt: now + windowMs })
      return { success: true, remaining: max - 1, reset: now + windowMs }
    }
    entry.count++
    if (entry.count > max) {
      return { success: false, remaining: 0, reset: entry.resetAt }
    }
    return { success: true, remaining: max - entry.count, reset: entry.resetAt }
  }
}

export interface RateLimitConfig {
  max: number
  windowMs: number
}

const limiters = new Map<string, RateLimitFn>()

function getIP(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  )
}

export async function checkRateLimit(
  request: Request,
  name: string,
  config: RateLimitConfig,
) {
  let limiter = limiters.get(name)
  if (!limiter) {
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

    if (redisUrl && redisToken) {
      try {
        const { Ratelimit } = await import("@upstash/ratelimit")
        const { Redis } = await import("@upstash/redis")

        const redis = new Redis({ url: redisUrl, token: redisToken })
        const ratelimit = new Ratelimit({
          redis,
          limiter: Ratelimit.slidingWindow(config.max, `${config.windowMs}ms`),
          prefix: `ratelimit:${name}`,
          analytics: true,
        })
        limiter = async (identifier: string) => {
          const result = await ratelimit.limit(identifier)
          return {
            success: result.success,
            remaining: result.remaining,
            reset: result.reset,
          }
        }
      } catch {
        limiter = createInMemoryLimiter(config.max, config.windowMs)
      }
    } else {
      limiter = createInMemoryLimiter(config.max, config.windowMs)
    }
    limiters.set(name, limiter)
  }

  const ip = getIP(request)
  return limiter(ip)
}
