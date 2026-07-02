"use client"

import { useCallback } from "react"
import { TagCloud } from "@/components/ui/tag-cloud"
import { TECH_STACK } from "@/lib/tech-stack"

const categoryColors: Record<string, string> = {
  languages: "#00D9FF",
  frontend: "#8B5CF6",
  backend: "#22C55E",
  iot: "#F97316",
  tools: "#EAB308",
}

interface SkillCloudProps {
  onCategorySelect?: (category: string) => void
}

export function SkillCloud({ onCategorySelect }: SkillCloudProps) {
  const handleTagClick = useCallback(
    (category: string) => {
      onCategorySelect?.(category)
    },
    [onCategorySelect],
  )

  const skills = TECH_STACK.map((item) => ({
    name: item.name,
    category: item.category,
    brandColor: item.brandColor,
    textColor: item.textColor,
    logoSvg: <item.icon />,
  }))

  return <TagCloud items={skills} categoryColors={categoryColors} onTagClick={handleTagClick} />
}
