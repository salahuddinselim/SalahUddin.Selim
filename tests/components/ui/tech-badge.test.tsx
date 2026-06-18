import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { TechBadge } from "@/components/ui/tech-badge"

describe("TechBadge", () => {
  const defaultProps = {
    name: "React",
    logoSvg: <svg data-testid="logo" />,
    brandColor: "#61DAFB",
  }

  it("renders the name", () => {
    render(<TechBadge {...defaultProps} />)
    expect(screen.getByText("React")).toBeInTheDocument()
  })

  it("renders the logo SVG", () => {
    render(<TechBadge {...defaultProps} />)
    expect(screen.getByTestId("logo")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(<TechBadge {...defaultProps} className="custom-class" />)
    const badge = screen.getByText("React").closest("div")
    expect(badge?.className).toContain("custom-class")
  })

  it("uses brandColor as text color by default", () => {
    render(<TechBadge {...defaultProps} />)
    const label = screen.getByText("React")
    expect(label).toHaveStyle({ color: "#61DAFB" })
  })

  it("renders TechBadgeRow with multiple items", async () => {
    const { TechBadgeRow } = await import("@/components/ui/tech-badge")
    const items = [
      { name: "React", logoSvg: <svg />, brandColor: "#61DAFB" },
      { name: "Vue", logoSvg: <svg />, brandColor: "#4FC08D" },
    ]
    render(<TechBadgeRow items={items} />)
    expect(screen.getByText("React")).toBeInTheDocument()
    expect(screen.getByText("Vue")).toBeInTheDocument()
  })
})
