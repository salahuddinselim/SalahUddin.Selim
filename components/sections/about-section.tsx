"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { User, GraduationCap, Briefcase, Target, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const aboutData = {
  name: "Salah Uddin Selim",
  role: "CSE Student & Software Engineer",
  avatar: "/hero.png",
  aboutCards: [
    {
      icon: User,
      title: "Who I Am",
      description:
        "A passionate CSE student at United International University with hands-on experience in full-stack web development, IoT systems, and algorithm design. I thrive at building intelligent, impactful solutions.",
    },
    {
      icon: GraduationCap,
      title: "Education",
      description:
        "B.Sc. in Computer Science & Engineering at UIU (GPA 3.68/4.00). Completed 112/137 credits. Awarded 6th Runner-Up at UIU Software Project Competition, Spring 2025.",
    },
    {
      icon: Briefcase,
      title: "Experience Summary",
      description:
        "Built 5 production-quality projects across Java, Python, PHP, C/C++, and Arduino. Includes a Multilevel Puzzle Game (award-winning), Tournament Management System, IoT Fish Pond Monitor, AI Voice Assistant, and Cricket Player Information System.",
    },
    {
      icon: Target,
      title: "Career Goal",
      description:
        "To build scalable, impactful solutions as a software engineer or researcher — combining full-stack engineering, IoT, and AI to solve real-world problems.",
    },
  ],
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full py-24 sm:py-32 px-4"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(74% 54% at 18% 12%, rgba(0, 217, 255, 0.14), transparent 69%), radial-gradient(66% 52% at 84% 80%, rgba(139, 92, 246, 0.13), transparent 72%)",
        }}
      />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Info size={20} className="text-accent" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground">
            About Me
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        >
          {/* Left — Profile Card */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-2"
          >
            <div
              className={cn(
                "relative w-full aspect-[3/4] rounded-2xl overflow-hidden group",
                "bg-[rgba(10,15,30,0.58)] backdrop-blur-[14px]",
                "border border-[rgba(148,163,184,0.2)]",
                "shadow-[0_0_30px_rgba(0,217,255,0.06)]",
              )}
            >
              {aboutData.avatar ? (
                <Image
                  src={aboutData.avatar}
                  alt={aboutData.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="w-full h-full bg-gradient-to-br from-accent/30 to-accent-secondary/30 flex items-center justify-center" />
                </div>
              )}

              {/* Scanner line */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="relative w-full h-full">
                  <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(0,217,255,0.6)] animate-scanner" />
                </div>
              </div>
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyan-400/40 rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-400/40 rounded-br-2xl" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-16">
                <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
                  {aboutData.name}
                </h3>
                <p className="text-sm text-accent font-body font-medium">
                  {aboutData.role}
                </p>
              </div>
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                  "shadow-[inset_0_0_40px_rgba(0,217,255,0.06)]",
                )}
              />
            </div>
          </motion.div>

          {/* Right — Info Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aboutData.aboutCards.map((card, i) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.title}
                  variants={cardVariants}
                  custom={i}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={cn(
                    "group rounded-2xl p-5 cursor-default",
                    "bg-[rgba(17,24,39,0.65)] backdrop-blur-[16px]",
                    "border border-[rgba(255,255,255,0.06)]",
                    "hover:border-accent/20",
                    "transition-all duration-300",
                    "hover:shadow-[0_0_30px_rgba(0,217,255,0.06)]",
                    i >= 2 ? "sm:col-span-1" : "",
                  )}
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <h3 className="text-base font-heading font-semibold text-foreground mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted font-body leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
