import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent, act } from "@testing-library/react"
import { Turnstile } from "@/components/ui/turnstile"

type RenderOpts = {
  callback: (token: string) => void
  "expired-callback"?: () => void
  "error-callback"?: () => void
}

describe("Turnstile", () => {
  let renderOpts: RenderOpts
  let renderMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.useFakeTimers()

    // jsdom has no IntersectionObserver; fire it as immediately intersecting
    // so the widget mounts synchronously in tests.
    class MockIntersectionObserver {
      constructor(private cb: IntersectionObserverCallback) {}
      observe() {
        this.cb([{ isIntersecting: true } as IntersectionObserverEntry], this as never)
      }
      disconnect() {}
    }
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver)

    renderMock = vi.fn((_el: HTMLElement, opts: RenderOpts) => {
      renderOpts = opts
      return "widget-1"
    })
    ;(window as unknown as { turnstile: unknown }).turnstile = {
      render: renderMock,
      remove: vi.fn(),
      reset: vi.fn(),
    }
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    delete (window as unknown as { turnstile?: unknown }).turnstile
  })

  it("renders the widget container and calls window.turnstile.render", () => {
    render(<Turnstile onVerify={vi.fn()} />)
    expect(renderMock).toHaveBeenCalledTimes(1)
  })

  it("shows the themed fallback and calls onError when error-callback fires", () => {
    const onError = vi.fn()
    render(<Turnstile onVerify={vi.fn()} onError={onError} />)

    act(() => {
      renderOpts["error-callback"]?.()
    })

    expect(onError).toHaveBeenCalledTimes(1)
    expect(screen.getByText(/couldn.t connect/i)).toBeInTheDocument()
  })

  it("triggers the stuck-widget fallback after 10s with no callback", () => {
    render(<Turnstile onVerify={vi.fn()} />)

    act(() => {
      vi.advanceTimersByTime(10_000)
    })

    expect(screen.getByText(/couldn.t connect/i)).toBeInTheDocument()
  })

  it("does not trigger the stuck-widget fallback if verified before 10s", () => {
    const onVerify = vi.fn()
    render(<Turnstile onVerify={onVerify} />)

    act(() => {
      renderOpts.callback("a-real-token")
    })
    act(() => {
      vi.advanceTimersByTime(10_000)
    })

    expect(onVerify).toHaveBeenCalledWith("a-real-token")
    expect(screen.queryByText(/couldn.t connect/i)).not.toBeInTheDocument()
  })

  it("re-renders the widget when Retry is clicked after an error", () => {
    render(<Turnstile onVerify={vi.fn()} />)

    act(() => {
      renderOpts["error-callback"]?.()
    })
    fireEvent.click(screen.getByText(/retry/i))

    expect(renderMock).toHaveBeenCalledTimes(2)
  })
})
