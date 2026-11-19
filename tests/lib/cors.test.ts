import { describe, it, expect } from "vitest"
import { isSameOrigin, requireSameOrigin } from "@/lib/cors"

function req(origin?: string): Request {
  const headers: Record<string, string> = { "Content-Type": "application/json" }
  if (origin) headers["origin"] = origin
  return new Request("https://salah-uddin-selim.vercel.app/api/test", { headers })
}

describe("isSameOrigin (lenient — GET routes)", () => {
  it("allows requests with no Origin header", () => {
    expect(isSameOrigin(req())).toBe(true)
  })

  it("allows the production Vercel URL", () => {
    expect(isSameOrigin(req("https://salah-uddin-selim.vercel.app"))).toBe(true)
  })

  it("rejects a cross-origin attacker domain", () => {
    expect(isSameOrigin(req("https://evil.com"))).toBe(false)
  })

  it("rejects a subdomain of the production domain", () => {
    expect(isSameOrigin(req("https://sub.salah-uddin-selim.vercel.app"))).toBe(false)
  })

  it("rejects http:// version of the production domain", () => {
    expect(isSameOrigin(req("http://salah-uddin-selim.vercel.app"))).toBe(false)
  })
})

describe("requireSameOrigin (strict — POST routes)", () => {
  it("rejects requests with no Origin header (direct API calls)", () => {
    expect(requireSameOrigin(req())).toBe(false)
  })

  it("allows the production Vercel URL", () => {
    expect(requireSameOrigin(req("https://salah-uddin-selim.vercel.app"))).toBe(true)
  })

  it("rejects a cross-origin attacker domain", () => {
    expect(requireSameOrigin(req("https://evil.com"))).toBe(false)
  })

  it("rejects a null origin (sandboxed iframe attack)", () => {
    expect(requireSameOrigin(req("null"))).toBe(false)
  })

  it("rejects an empty string origin", () => {
    expect(requireSameOrigin(req(""))).toBe(false)
  })
})
