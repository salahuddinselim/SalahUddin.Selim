"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { VisitorPanel } from "./visitor-panel"

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
      <VisitorPanel open={open} onClose={closePanel} />
    </VisitorContext.Provider>
  )
}
