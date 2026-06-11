"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

export function ShowOnMainSite({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  if (pathname.startsWith("/studio")) return null
  return <>{children}</>
}
