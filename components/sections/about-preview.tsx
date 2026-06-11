"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { User, ArrowUpRight, MapPin, GraduationCap, Code2 } from "lucide-react"
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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(74% 54% at 20% 14%, rgba(0, 217, 255, 0.14), transparent 69%), radial-gradient(66% 52% at 82% 82%, rgba(139, 92, 246, 0.13), transparent 72%)",
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
                "bg-[rgba(10,15,30,0.58)] backdrop-blur-[14px]",
                "border border-[rgba(148,163,184,0.2)]",
                "shadow-[0_0_30px_rgba(0,217,255,0.06)]",
              )}
            >
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="relative w-full h-full">
                  <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(0,217,255,0.6)] animate-scanner" />
                </div>
              </div>
              <Image
                src="/hero.png"
                alt="Salah Uddin Selim"
                fill
                className="object-cover"
                sizes="288px"
              />
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
              CSE Student & Software Engineer
            </p>
            <p className="text-muted font-body leading-relaxed max-w-xl">
              CSE student at United International University (GPA 3.68/4.0) with hands-on experience in full-stack web
              development, IoT systems, and algorithm design. Built 5 production-quality projects across Java, Python, PHP,
              C/C++, and Arduino. Award-winning project (6th Runner-Up, UIU Spring 2025).
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted font-body">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-accent" />
                Dhaka, Bangladesh
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap size={14} className="text-accent" />
                UIU · CSE · 3.68 GPA
              </span>
              <span className="flex items-center gap-1.5">
                <Code2 size={14} className="text-accent" />
                Java · Python · PHP · Arduino
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
