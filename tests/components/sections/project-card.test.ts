import { describe, it, expect } from "vitest"
import { repoPathFrom } from "@/components/sections/project-card"

describe("repoPathFrom", () => {
  it("returns null for undefined input", () => {
    expect(repoPathFrom(undefined)).toBeNull()
  })

  it("extracts owner/repo from a normal GitHub URL", () => {
    expect(repoPathFrom("https://github.com/owner/repo")).toBe("owner/repo")
  })

  it("trims leading/trailing slashes", () => {
    expect(repoPathFrom("https://github.com/owner/repo/")).toBe("owner/repo")
  })

  it("returns null for a malformed URL (catch branch)", () => {
    expect(repoPathFrom("not-a-url")).toBeNull()
  })

  it("returns null when pathname is empty", () => {
    expect(repoPathFrom("https://github.com")).toBeNull()
  })
})
