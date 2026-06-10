"use client"

import { motion } from "framer-motion"
import { User, ArrowUpRight, MapPin, Calendar, Code2 } from "lucide-react"
import { cn } from "@/lib/utils"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
}

export function AboutPreview() {
  return (
    <section id="about-preview" className="relative w-full py-24 sm:py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <User size={20} className="text-accent" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground">
            About Me
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Photo */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="lg:col-span-2 flex justify-center"
          >
            <div
              className={cn(
                "relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden",
                "bg-[rgba(17,24,39,0.65)] backdrop-blur-[16px]",
                "border border-[rgba(0,217,255,0.1)]",
                "shadow-[0_0_30px_rgba(0,217,255,0.04)]",
                "flex items-center justify-center",
              )}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/30 to-accent-secondary/30 border-2 border-accent/20 flex items-center justify-center">
                  <User size={40} className="text-accent/60" />
                </div>
                <p className="text-sm text-accent/70 font-body">+ Photo</p>
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="lg:col-span-3 space-y-5"
          >
            <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground">
              Salah Uddin Selim
            </h3>
            <p className="text-lg text-accent font-body font-medium">
              Senior Full-Stack Engineer
            </p>
            <p className="text-muted font-body leading-relaxed max-w-xl">
              A passionate software engineer with over 8 years of experience building scalable
              web applications, AI systems, and cross-platform solutions. I thrive at the
              intersection of engineering and innovation, crafting products that make a real
              impact.
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted font-body">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-accent" />
                Bangladesh
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-accent" />
                8+ years experience
              </span>
              <span className="flex items-center gap-1.5">
                <Code2 size={14} className="text-accent" />
                Full-Stack · AI · Cloud
              </span>
            </div>

            <a
              href="/persona"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium font-body bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 hover:shadow-[0_0_25px_rgba(0,217,255,0.12)] transition-all duration-300"
            >
              Visit Persona
              <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
