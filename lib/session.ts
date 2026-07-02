const SESSION_COOKIE_NAME = "__session"
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

export interface SessionPayload {
  userId?: string
  role?: string
  [key: string]: unknown
}

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 32) {
    const isLocalDev = process.env.NODE_ENV === "development" && !process.env.VERCEL_ENV
    if (!isLocalDev) {
      throw new Error("SESSION_SECRET must be at least 32 characters")
    }
    return "dev-secret-min-32-chars-long!!"
  }
  return secret
}

async function encrypt(payload: SessionPayload): Promise<string> {
  const secret = getSessionSecret()
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret.padEnd(32, "0").slice(0, 32)),
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"],
  )
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encoded = encoder.encode(JSON.stringify(payload))
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded)
  const combined = new Uint8Array(iv.length + new Uint8Array(encrypted).length)
  combined.set(iv, 0)
  combined.set(new Uint8Array(encrypted), iv.length)
  return Buffer.from(combined).toString("base64url")
}

async function decrypt(token: string): Promise<SessionPayload | null> {
  try {
    const secret = getSessionSecret()
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret.padEnd(32, "0").slice(0, 32)),
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"],
    )
    const combined = new Uint8Array(Buffer.from(token, "base64url"))
    const iv = combined.slice(0, 12)
    const ciphertext = combined.slice(12)
    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext)
    return JSON.parse(new TextDecoder().decode(decrypted)) as SessionPayload
  } catch {
    return null
  }
}

export async function createSession(payload: SessionPayload): Promise<string> {
  return encrypt({ ...payload, iat: Date.now(), exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000 })
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  const payload = await decrypt(token)
  if (!payload) return null
  if (Date.now() > (payload.exp as number)) return null
  return payload
}

export function sessionCookieOptions(): {
  name: string
  options: {
    httpOnly: boolean
    secure: boolean
    sameSite: "strict"
    path: string
    maxAge: number
  }
} {
  return {
    name: SESSION_COOKIE_NAME,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    },
  }
}
