"use client"

import { useEffect, useRef, useCallback } from "react"

interface TurnstileProps {
  onVerify: (token: string) => void
  onExpire?: () => void
  theme?: "light" | "dark" | "auto"
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        opts: {
          sitekey: string
          callback: (token: string) => void
          "expired-callback"?: () => void
          theme?: string
        },
      ) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
    onTurnstileLoad?: () => void
  }
}

// Per-instance widget tracking — no shared global state
const widgetIds = new WeakMap<HTMLDivElement, string>()

export function Turnstile({ onVerify, onExpire, theme = "dark" }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const loadedRef = useRef(false)
  const widgetIdRef = useRef<string | null>(null)

  const renderWidget = useCallback(() => {
    if (!window.turnstile || !containerRef.current || loadedRef.current) return
    loadedRef.current = true
    const id = window.turnstile.render(containerRef.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY!,
      callback: onVerify,
      "expired-callback": onExpire,
      theme,
    })
    widgetIdRef.current = id
    widgetIds.set(containerRef.current, id)
  }, [onVerify, onExpire, theme])

  useEffect(() => {
    const container = containerRef.current
    if (window.turnstile) {
      renderWidget()
      return
    }
    window.onTurnstileLoad = renderWidget
    const s = document.createElement("script")
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad"
    s.async = true
    s.defer = true
    document.head.appendChild(s)
    return () => {
      if (container) {
        const wid = widgetIds.get(container)
        if (wid && window.turnstile) {
          window.turnstile.remove(wid)
          widgetIds.delete(container)
        }
      }
      widgetIdRef.current = null
      loadedRef.current = false
      window.onTurnstileLoad = undefined
    }
  }, [renderWidget])

  return <div ref={containerRef} data-turnstile-widget />
}

export function resetTurnstile() {
  // Find any active widget by scanning the DOM — no global state needed
  const container = document.querySelector("[data-turnstile-widget]")
  if (!container) return
  const wid = widgetIds.get(container as HTMLDivElement)
  if (wid && window.turnstile) {
    window.turnstile.reset(wid)
  }
}
