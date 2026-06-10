import {
  Globe, Code2, Trophy, Link2, Terminal, Database, Server, Cpu,
  Wrench, Cog, Layers, Box, Blocks, Puzzle, Gamepad2, Monitor,
  Smartphone, Wifi, Radio, Cloud, HardDrive, Zap, Flame, Atom,
  Beaker, Book, Folder, GitBranch, type LucideIcon,
} from "lucide-react"

export const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  code: Code2,
  trophy: Trophy,
  link: Link2,
  terminal: Terminal,
  database: Database,
  server: Server,
  cpu: Cpu,
  wrench: Wrench,
  cog: Cog,
  layers: Layers,
  box: Box,
  blocks: Blocks,
  puzzle: Puzzle,
  gamepad: Gamepad2,
  monitor: Monitor,
  smartphone: Smartphone,
  wifi: Wifi,
  radio: Radio,
  cloud: Cloud,
  harddrive: HardDrive,
  zap: Zap,
  flame: Flame,
  atom: Atom,
  beaker: Beaker,
  book: Book,
  folder: Folder,
  git: GitBranch,
  python: Terminal,
  java: Cpu,
  javascript: Code2,
  php: Server,
  cpp: Box,
  arduino: Cpu,
  iot: Wifi,
}

export function getSocialIcon(iconName?: string): LucideIcon {
  if (!iconName) return Link2
  const key = iconName.toLowerCase()
  return iconMap[key] ?? Link2
}

export function getSkillIcon(iconName?: string): LucideIcon {
  if (!iconName) return Code2
  const key = iconName.toLowerCase()
  return iconMap[key] ?? Code2
}
