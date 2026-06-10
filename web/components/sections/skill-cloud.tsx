"use client"

import { useMemo, useRef, useState, useEffect } from "react"
import { IconCloud } from "@/components/ui/icon-cloud"

interface SkillItem {
  name: string
  category: string
  initials: string
}

const skills: SkillItem[] = [
  { name: "OOP", category: "Foundations", initials: "OOP" },
  { name: "Data Structures", category: "Foundations", initials: "DS" },
  { name: "Algorithms", category: "Foundations", initials: "ALG" },
  { name: "Complexity Analysis", category: "Foundations", initials: "CA" },
  { name: "Linear Algebra", category: "Foundations", initials: "LA" },
  { name: "Probability", category: "Foundations", initials: "PR" },
  { name: "Numerical Methods", category: "Foundations", initials: "NM" },
  { name: "Comp. Organization", category: "Foundations", initials: "CO" },
  { name: "Python", category: "Languages", initials: "PY" },
  { name: "TypeScript", category: "Languages", initials: "TS" },
  { name: "JavaScript", category: "Languages", initials: "JS" },
  { name: "Git", category: "Languages", initials: "GIT" },
  { name: "GitHub", category: "Languages", initials: "GH" },
  { name: "LangChain", category: "AI/ML", initials: "LC" },
  { name: "HuggingFace", category: "AI/ML", initials: "HF" },
  { name: "Scikit-Learn", category: "AI/ML", initials: "SK" },
  { name: "Pandas", category: "AI/ML", initials: "PD" },
  { name: "NumPy", category: "AI/ML", initials: "NP" },
  { name: "XGBoost", category: "AI/ML", initials: "XB" },
  { name: "Jupyter", category: "AI/ML", initials: "JP" },
  { name: "Plotly", category: "AI/ML", initials: "PL" },
  { name: "Power BI", category: "AI/ML", initials: "PB" },
  { name: "TensorFlow", category: "AI/ML", initials: "TF" },
  { name: "Next.js", category: "Tools", initials: "NX" },
  { name: "React", category: "Tools", initials: "RC" },
  { name: "Node.js", category: "Tools", initials: "ND" },
  { name: "Redis", category: "Tools", initials: "RD" },
  { name: "PostgreSQL", category: "Tools", initials: "PG" },
  { name: "MongoDB", category: "Tools", initials: "MO" },
  { name: "Docker", category: "Tools", initials: "DK" },
]

const categoryColors: Record<string, string> = {
  Foundations: "#8B5CF6",
  Languages: "#00D9FF",
  "AI/ML": "#22C55E",
  Tools: "#F97316",
}

function buildSvg(skill: SkillItem): React.ReactNode {
  const color = categoryColors[skill.category] || "#00D9FF"
  const isThreeLetter = skill.initials.length >= 3
  const fontSize = isThreeLetter ? "32" : "38"
  
  // Create a glow effect SVG filter
  return (
    <svg
      key={skill.name}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={`glow-${skill.initials}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={`grad-${skill.initials}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      
      {/* Outer glow ring */}
      <circle 
        cx="50" 
        cy="50" 
        r="50" 
        fill={`${color}08`} 
        stroke={color}
        strokeWidth="0.5"
        opacity="0.6"
      />
      
      {/* Main badge circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="46" 
        fill={`url(#grad-${skill.initials})`}
        stroke={color} 
        strokeWidth="3"
        filter={`url(#glow-${skill.initials})`}
        opacity="0.95"
      />
      
      {/* Text with better sizing and shadow */}
      <text
        x="50"
        y="52"
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontSize={fontSize}
        fontFamily="monospace"
        fontWeight="bold"
        letterSpacing="0.5"
        style={{ textShadow: `0 0 10px ${color}40`, filter: `drop-shadow(0 0 2px ${color}60)` }}
      >
        {skill.initials}
      </text>
    </svg>
  )
}

export function SkillCloud() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState(500)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const s = entry.contentRect.width
        // Constrain size between min and max for responsive behavior
        const constrained = Math.max(300, Math.min(s, 600))
        if (constrained > 0) setSize(constrained)
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const icons = useMemo(() => skills.map(buildSvg), [])

  return (
    <div className="relative w-full max-w-[700px] mx-auto px-2 sm:px-4" ref={containerRef}>
      <div className="aspect-[4/5] w-full">
        <IconCloud icons={icons} width={size} height={Math.round(size * 1.35)} containerRef={containerRef} />
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-white/20">
          ⊕ Drag to rotate
        </span>
      </div>
    </div>
  )
}
