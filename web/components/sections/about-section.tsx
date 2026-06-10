"use client"

import { motion } from "framer-motion"
import { User, GraduationCap, Briefcase, Target, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const aboutData = {
  name: "Salah Uddin Selim",
  role: "Senior Full-Stack Engineer",
  avatar: "",
  aboutCards: [
    {
      icon: User,
      title: "Who I Am",
      description:
        "A passionate software engineer with over 8 years of experience building scalable web applications, AI systems, and cross-platform solutions. I thrive at the intersection of engineering and innovation.",
    },
    {
      icon: GraduationCap,
      title: "Education",
      description:
        "B.Sc. in Computer Science & Engineering. Specialized in Software Engineering, AI/ML, and Distributed Systems with consistent academic excellence.",
    },
    {
      icon: Briefcase,
      title: "Experience Summary",
      description:
        "8+ years shipping production code across fintech, healthcare, and SaaS. Led teams of 5-12 engineers, architected microservices handling 10M+ requests/day.",
    },
    {
      icon: Target,
      title: "Career Goal",
      description:
        "To build intelligent, user-centric systems that solve real problems — combining full-stack engineering with AI to create products that make a difference.",
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
                "bg-[rgba(17,24,39,0.65)] backdrop-blur-[16px]",
                "border border-[rgba(0,217,255,0.1)]",
                "shadow-[0_0_30px_rgba(0,217,255,0.04)]",
              )}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-accent/30 to-accent-secondary/30 border-2 border-accent/20 flex items-center justify-center mb-4">
                  <User size={44} className="text-accent/60" />
                </div>
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
