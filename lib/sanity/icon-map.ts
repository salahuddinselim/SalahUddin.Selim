import type { FC, SVGProps } from "react"
import { Globe, Code2, Trophy, Link2, type LucideIcon } from "lucide-react"
import {
  FaKaggle,
  FaPython,
  FaJava,
  FaPhp,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaBootstrap,
  FaLinux,
  FaDocker,
  FaFigma,
  FaGithub,
  FaFlask,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import {
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiArduino,
  SiMysql,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiIntellijidea,
  SiDjango,
  SiNodedotjs,
  SiJquery,
} from "react-icons/si"

type IconComponent = LucideIcon | FC<SVGProps<SVGSVGElement>>

export const iconMap: Record<string, IconComponent> = {
  globe: Globe,
  code: Code2,
  trophy: Trophy,
  link: Link2,
  python: FaPython,
  java: FaJava,
  javascript: SiJavascript,
  typescript: SiTypescript,
  php: FaPhp,
  cpp: SiCplusplus,
  arduino: SiArduino,
  iot: SiArduino,
  git: FaGitAlt,
  github: FaGithub,
  mysql: SiMysql,
  html: FaHtml5,
  html5: FaHtml5,
  css: FaCss3Alt,
  css3: FaCss3Alt,
  react: FaReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  bootstrap: FaBootstrap,
  linux: FaLinux,
  docker: FaDocker,
  figma: FaFigma,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  firebase: SiFirebase,
  intellij: SiIntellijidea,
  flask: FaFlask,
  django: SiDjango,
  nodejs: SiNodedotjs,
  node: SiNodedotjs,
  jquery: SiJquery,
  kaggle: FaKaggle,
  twitter: FaXTwitter,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
}

export function getSocialIcon(iconName?: string): IconComponent {
  if (!iconName) return Link2
  const key = iconName.toLowerCase()
  return iconMap[key] ?? Link2
}

export function getSkillIcon(iconName?: string): IconComponent {
  if (!iconName) return Code2
  const key = iconName.toLowerCase()
  return iconMap[key] ?? Code2
}
