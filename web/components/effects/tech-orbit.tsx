"use client"

import { useMemo, useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ReactIcon,
  NextjsIcon,
  TypeScriptIcon,
  NodejsIcon,
  DockerIcon,
  PythonIcon,
  GitIcon,
  TailwindIcon,
  JavaIcon,
  MySQLIcon,
  SpringBootIcon,
  OpenAIIcon,
  LangChainIcon,
} from "@/lib/tech-icons"

const technologies = [
  { name: "React", icon: ReactIcon },
  { name: "Next.js", icon: NextjsIcon },
  { name: "TypeScript", icon: TypeScriptIcon },
  { name: "Node.js", icon: NodejsIcon },
  { name: "Docker", icon: DockerIcon },
  { name: "Python", icon: PythonIcon },
  { name: "Git", icon: GitIcon },
  { name: "Tailwind", icon: TailwindIcon },
  { name: "Java", icon: JavaIcon },
  { name: "MySQL", icon: MySQLIcon },
  { name: "Spring Boot", icon: SpringBootIcon },
  { name: "OpenAI", icon: OpenAIIcon },
  { name: "LangChain", icon: LangChainIcon },
]

const ringConfig = [
  { indices: [0, 1, 2, 3], radius: 130, duration: 40, dir: 1 },
  { indices: [4, 5, 6, 7, 8], radius: 230, duration: 55, dir: -1 },
  { indices: [9, 10, 11, 12], radius: 330, duration: 70, dir: 1 },
]

function orbitKeyframes(
  radius: number,
  startAngle: number,
  direction: number,
  steps = 180,
) {
  const xs: number[] = []
  const ys: number[] = []
  for (let i = 0; i <= steps; i++) {
    const angle = startAngle + direction * (i / steps) * Math.PI * 2
    xs.push(Math.cos(angle) * radius)
    ys.push(Math.sin(angle) * radius)
  }
  return { xs, ys }
}

interface CardConfig {
  name: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  ringIndex: number
  startAngle: number
  radius: number
  duration: number
  direction: number
}

export function TechOrbit() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w < 640) setScale(0.35)
      else if (w < 768) setScale(0.5)
      else if (w < 1024) setScale(0.7)
      else if (w < 1280) setScale(0.85)
      else setScale(1)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const cards = useMemo<CardConfig[]>(() => {
    const result: CardConfig[] = []
    for (const ring of ringConfig) {
      const count = ring.indices.length
      ring.indices.forEach((techIndex, i) => {
        const startAngle = (i / count) * Math.PI * 2
        result.push({
          name: technologies[techIndex].name,
          Icon: technologies[techIndex].icon,
          ringIndex: ringConfig.indexOf(ring),
          startAngle,
          radius: ring.radius,
          duration: ring.duration,
          direction: ring.dir,
        })
      })
    }
    return result
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <div
        style={{ transform: `scale(${scale})` }}
        className="relative"
      >
        {cards.map((card) => {
          const { xs, ys } = orbitKeyframes(
            card.radius,
            card.startAngle,
            card.direction,
          )

          return (
            <motion.div
              key={card.name}
              className="absolute pointer-events-auto"
              style={{
                width: 80,
                height: 80,
                marginLeft: -40,
                marginTop: -40,
                top: "50%",
                left: "50%",
              }}
              animate={{
                x: xs,
                y: ys,
              }}
              transition={{
                duration: card.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <motion.div
                className="flex flex-col items-center justify-center gap-1 w-full h-full rounded-[16px] cursor-pointer"
                style={{
                  background: "rgba(17, 24, 39, 0.65)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
                whileHover={{
                  scale: 1.1,
                  borderColor: "rgba(0, 217, 255, 0.3)",
                  boxShadow: "0 0 30px rgba(0, 217, 255, 0.2)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <card.Icon
                  width={28}
                  height={28}
                  className="shrink-0"
                />
                <span
                  className="text-[9px] font-medium leading-tight text-center text-white/80"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {card.name}
                </span>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
