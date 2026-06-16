"use client"

import { createContext, useContext, useState, useCallback, lazy, Suspense, type ReactNode } from "react"

const VisitorPanel = lazy(() => import("./visitor-panel").then(m => ({ default: m.VisitorPanel })))

interface VisitorContextType {
  openPanel: () => void
  closePanel: () => void
}

const VisitorContext = createContext<VisitorContextType>({
  openPanel: () => {},
  closePanel: () => {},
})

export function useVisitorPanel() {
  return useContext(VisitorContext)
}

export function VisitorPanelProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openPanel = useCallback(() => setOpen(true), [])
  const closePanel = useCallback(() => setOpen(false), [])

  return (
    <VisitorContext.Provider value={{ openPanel, closePanel }}>
      {children}
      <Suspense fallback={null}>
        <VisitorPanel open={open} onClose={closePanel} />
      </Suspense>
    </VisitorContext.Provider>
  )
}
