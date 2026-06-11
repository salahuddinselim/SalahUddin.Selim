import type { IconType } from "react-icons"
import { FaJava } from "react-icons/fa"
import {
  SiC,
  SiCplusplus,
  SiExpress,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiOpenjdk,
  SiPython,
  SiStreamlit,
} from "react-icons/si"

export type TechTier = "Core" | "Working" | "Learning"

export interface TechStackItem {
  name: string
  category: "languages" | "frontend" | "backend"
  brandColor: string
  textColor?: string
  icon: IconType
  tier: TechTier
  lastUsed: string
  projects: Array<{ label: string; href: string }>
}

export const TECH_STACK: TechStackItem[] = [
  {
    name: "C",
    category: "languages",
    brandColor: "#A8B9CC",
    icon: SiC,
    tier: "Core",
    lastUsed: "May 2026",
    projects: [{ label: "DSA Problem Sets", href: "/projects" }],
  },
  {
    name: "C++",
    category: "languages",
    brandColor: "#00599C",
    icon: SiCplusplus,
    tier: "Core",
    lastUsed: "May 2026",
    projects: [{ label: "Algorithm Visualizer", href: "/projects" }],
  },
  {
    name: "Java",
    category: "languages",
    brandColor: "#F89820",
    icon: FaJava,
    tier: "Core",
    lastUsed: "June 2026",
    projects: [{ label: "Desktop Management Tool", href: "/projects" }],
  },
  {
    name: "JavaScript",
    category: "languages",
    brandColor: "#F7DF1E",
    textColor: "#F8FAFC",
    icon: SiJavascript,
    tier: "Core",
    lastUsed: "June 2026",
    projects: [{ label: "Portfolio Frontend", href: "/projects" }],
  },
  {
    name: "Node.js",
    category: "backend",
    brandColor: "#339933",
    icon: SiNodedotjs,
    tier: "Core",
    lastUsed: "June 2026",
    projects: [{ label: "API Integrations", href: "/projects" }],
  },
  {
    name: "Express",
    category: "backend",
    brandColor: "#D1D5DB",
    icon: SiExpress,
    tier: "Core",
    lastUsed: "June 2026",
    projects: [{ label: "REST Backend", href: "/projects" }],
  },
  {
    name: "Python",
    category: "languages",
    brandColor: "#3776AB",
    icon: SiPython,
    tier: "Core",
    lastUsed: "June 2026",
    projects: [{ label: "Automation Scripts", href: "/projects" }],
  },
  {
    name: "Streamlit",
    category: "frontend",
    brandColor: "#FF4B4B",
    icon: SiStreamlit,
    tier: "Working",
    lastUsed: "April 2026",
    projects: [{ label: "Analytics Dashboard", href: "/projects" }],
  },
  {
    name: "SQL",
    category: "backend",
    brandColor: "#00758F",
    icon: SiMysql,
    tier: "Core",
    lastUsed: "June 2026",
    projects: [{ label: "Project Data Layer", href: "/projects" }],
  },
  {
    name: "JavaFX",
    category: "frontend",
    brandColor: "#EA2D2E",
    icon: SiOpenjdk,
    tier: "Working",
    lastUsed: "March 2026",
    projects: [{ label: "Desktop UI Client", href: "/projects" }],
  },
]

