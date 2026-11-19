import { describe, it, expect } from "vitest"
import { getIP } from "@/lib/rate-limit"

function req(headers: Record<string, string>): Request {
  return new Request("https://example.com/api/test", { headers })
}

describe("getIP", () => {
  it("prefers x-vercel-forwarded-for (trusted header, unspoofable by client)", () => {
    expect(getIP(req({ "x-vercel-forwarded-for": "1.2.3.4", "x-forwarded-for": "5.6.7.8" }))).toBe(
      "1.2.3.4",
    )
  })

  it("takes the LAST entry of x-forwarded-for to defeat client spoofing", () => {
    // Trusted proxies append to the end; first entry is client-controllable
    expect(getIP(req({ "x-forwarded-for": "10.0.0.1, 10.0.0.2, 1.2.3.4" }))).toBe("1.2.3.4")
  })

  it("ignores a spoofed first x-forwarded-for entry", () => {
    const spoofed = getIP(req({ "x-forwarded-for": "evil-spoof, 1.2.3.4" }))
    expect(spoofed).toBe("1.2.3.4")
    expect(spoofed).not.toBe("evil-spoof")
  })

  it("falls back to x-real-ip when no other header is set", () => {
    expect(getIP(req({ "x-real-ip": "9.9.9.9" }))).toBe("9.9.9.9")
  })

  it("returns 'unknown' when no IP header is present", () => {
    expect(getIP(req({}))).toBe("unknown")
  })

  it("handles a single-entry x-forwarded-for without commas", () => {
    expect(getIP(req({ "x-forwarded-for": "1.2.3.4" }))).toBe("1.2.3.4")
  })

  it("trims whitespace from x-forwarded-for entries", () => {
    expect(getIP(req({ "x-forwarded-for": " 10.0.0.1 , 1.2.3.4 " }))).toBe("1.2.3.4")
  })
})
