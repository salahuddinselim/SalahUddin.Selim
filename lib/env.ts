import { z } from "zod"

const envSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1, "NEXT_PUBLIC_SANITY_PROJECT_ID is required"),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1, "NEXT_PUBLIC_SANITY_DATASET is required"),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().default("2025-01-01"),
  NEXT_PUBLIC_TURNSTILE_SITEKEY: z.string().min(1, "NEXT_PUBLIC_TURNSTILE_SITEKEY is required"),
  NEXT_PUBLIC_SITE_URL: z.string().url("NEXT_PUBLIC_SITE_URL must be a valid URL").optional(),

  SANITY_API_TOKEN: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().min(1, "TURNSTILE_SECRET_KEY is required"),
  RESEND_API_KEY: z.string().optional(),
  CONTACT_EMAIL: z.string().email("CONTACT_EMAIL must be a valid email").optional(),
  GEMINI_API_KEY: z.string().optional(),
  GOOGLE_API_KEY: z.string().optional(),

  UPSTASH_REDIS_REST_URL: z.string().url("UPSTASH_REDIS_REST_URL must be a valid URL").optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  VERCEL_ENV: z.string().optional(),
  VERCEL_URL: z.string().optional(),
})

export type Env = z.infer<typeof envSchema>

export function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env)
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors
    console.error("\n❌ Environment variable validation failed:\n")
    for (const [key, messages] of Object.entries(errors)) {
      for (const msg of messages!) {
        console.error(`   ${key}: ${msg}`)
      }
    }
    if (process.env.NODE_ENV === "production") {
      process.exit(1)
    }
    console.error("\n⚠️  Build continuing in development mode — some features may not work.\n")
  }
  return parsed.data ?? ({} as Env)
}
