"use client"

import { useEffect, useRef, useCallback, useState } from "react"

interface TurnstileProps {
  onVerify: (token: string) => void
  onExpire?: () => void
  onError?: () => void
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
          "error-callback"?: () => void
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

export function Turnstile({ onVerify, onExpire, onError, theme = "dark" }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const loadedRef = useRef(false)
  const widgetIdRef = useRef<string | null>(null)
  const [scriptError, setScriptError] = useState(false)
  const [isNearViewport, setIsNearViewport] = useState(false)
  // Cloudflare's own "unable to connect" fallback (a network failure
  // reaching their challenge servers, distinct from our script failing to
  // load) renders inside the widget's cross-origin iframe -- we can't
  // restyle it, and it ignores `theme`, so it shows up as an un-themed
  // light-gray box inside an otherwise dark form. On error-callback we tear
  // the broken widget down and show our own themed message instead.
  const [widgetError, setWidgetError] = useState(false)
  const stuckTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearStuckTimeout = () => {
    if (stuckTimeoutRef.current) {
      clearTimeout(stuckTimeoutRef.current)
      stuckTimeoutRef.current = null
    }
  }

  const handleError = useCallback(() => {
    clearStuckTimeout()
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.remove(widgetIdRef.current)
    }
    if (containerRef.current) widgetIds.delete(containerRef.current)
    widgetIdRef.current = null
    loadedRef.current = false
    setWidgetError(true)
    onError?.()
  }, [onError])

  const renderWidget = useCallback(() => {
    if (!window.turnstile || !containerRef.current || loadedRef.current) return
    loadedRef.current = true
    setWidgetError(false)
    const id = window.turnstile.render(containerRef.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY!,
      callback: (token: string) => {
        clearStuckTimeout()
        onVerify(token)
      },
      "expired-callback": onExpire,
      "error-callback": handleError,
      theme,
    })
    widgetIdRef.current = id
    widgetIds.set(containerRef.current, id)

    // Cloudflare's error-callback fires on a single failed attempt, but a
    // domain/config mismatch (wrong sitekey for this host) instead makes
    // the widget retry silently forever -- never verifying, never erroring,
    // never telling us anything. Without this, the visitor sees an
    // apparently-blank widget with no way to know the form is unusable.
    // Ten seconds is well past a normal challenge solve/network round trip.
    clearStuckTimeout()
    stuckTimeoutRef.current = setTimeout(() => {
      if (!widgetIdRef.current) return
      handleError()
    }, 10000)
  }, [onVerify, onExpire, theme, handleError])

  // The contact form (and this widget) sits at the bottom of the homepage,
  // but ContactSection was mounting unconditionally on page load -- so the
  // Turnstile script and its widget (which does its own ongoing background
  // challenge/heartbeat work) were loading and running immediately for
  // every visitor, whether or not they ever scroll down to the form.
  // Measured this as a real contributor to idle main-thread cost on the
  // live site. Deferring the script load until the widget is actually
  // near-viewport avoids that cost for the common case of not filling out
  // the contact form.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true)
          observer.disconnect()
        }
      },
      { rootMargin: "300px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isNearViewport) return
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
    s.onerror = () => setScriptError(true)
    document.head.appendChild(s)
    return () => {
      clearStuckTimeout()
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
  }, [renderWidget, isNearViewport])

  return (
    <div>
      <div
        ref={containerRef}
        data-turnstile-widget
        className={widgetError ? "hidden" : undefined}
      />
      {widgetError && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-error/20 bg-error/10 px-4 py-3">
          <p className="text-xs text-error/90 font-body">
            Security check couldn&apos;t connect — check your connection and try again.
          </p>
          <button
            type="button"
            onClick={renderWidget}
            className="shrink-0 text-xs font-medium text-error underline underline-offset-2 hover:text-error/80"
          >
            Retry
          </button>
        </div>
      )}
      {scriptError && (
        <p className="text-xs text-error/90 font-body mt-1">
          Security check failed to load — disable ad blockers and refresh the page.
        </p>
      )}
    </div>
  )
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
