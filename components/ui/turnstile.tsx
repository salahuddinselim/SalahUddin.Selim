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
      render: (container: string | HTMLElement, opts: {
        sitekey: string
        callback: (token: string) => void
        "expired-callback"?: () => void
        theme?: string
      }) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
    onTurnstileLoad?: () => void
  }
}

let globalWidgetId: string | null = null

export function Turnstile({ onVerify, onExpire, theme = "dark" }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const loadedRef = useRef(false)

  const renderWidget = useCallback(() => {
    if (!window.turnstile || !containerRef.current || loadedRef.current) return
    loadedRef.current = true
    globalWidgetId = window.turnstile.render(containerRef.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY!,
      callback: onVerify,
      "expired-callback": onExpire,
      theme,
    })
  }, [onVerify, onExpire, theme])

  useEffect(() => {
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
      if (globalWidgetId && window.turnstile) {
        window.turnstile.remove(globalWidgetId)
        globalWidgetId = null
      }
    }
  }, [renderWidget])

  return <div ref={containerRef} />
}

export function resetTurnstile() {
  if (globalWidgetId && window.turnstile) {
    window.turnstile.reset(globalWidgetId)
  }
}
