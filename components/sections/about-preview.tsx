"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Zap, MapPin, GraduationCap, Code2, BarChart3, Cpu, Layers } from "lucide-react"
import { cn } from "@/lib/utils"
import { AwardBadge } from "@/components/sections/award-badge"
import type { EducationData } from "@/lib/sanity/fetch"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
}

const philosophy =
  "To become a data analyst or researcher — combining strong analytical thinking, full-stack engineering, and AI to turn data into real-world impact."

const coreCapabilities = [
  { icon: Code2, label: "Full-Stack Web Dev" },
  { icon: BarChart3, label: "Data Analysis & SQL" },
  { icon: Cpu, label: "IoT & Embedded Systems" },
  { icon: Layers, label: "Algorithm Design" },
]

const CARD_CLASS =
  "rounded-2xl bg-[rgba(17,24,39,0.65)] backdrop-blur-[16px] border border-[rgba(255,255,255,0.06)] p-5 sm:p-6"

export function AboutPreview({ education }: { education: EducationData[] }) {
  const ongoingEducation = education.find((edu) => edu.status === "ongoing")

  return (
    <section id="about-preview" className="relative w-full py-24 sm:py-32 px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(74% 54% at 20% 14%, rgba(0, 217, 255, 0.14), transparent 69%), radial-gradient(66% 52% at 82% 82%, rgba(8, 145, 178, 0.13), transparent 72%)",
        }}
      />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Who I <span className="text-accent">Am</span>
          </h2>
          <div className="h-1 w-14 rounded-full bg-gradient-to-r from-accent/30 to-accent" />
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[minmax(0,auto)]">
          {/* Photo */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="md:col-start-1 md:row-start-1 md:row-span-2"
          >
            <div
              className={cn(
                "relative h-64 md:h-full w-full overflow-hidden rounded-2xl",
                "bg-[rgba(10,15,30,0.58)] border border-[rgba(148,163,184,0.2)]",
              )}
            >
              <Image
                src="/hero.webp"
                alt="Salah Uddin Selim"
                width={768}
                height={960}
                loading="lazy"
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 pt-14">
                <h3 className="text-lg font-semibold tracking-tight text-foreground mb-0.5">
                  Salah Uddin Selim
                </h3>
                <p className="text-sm text-accent font-body font-medium">
                  CSE Student &amp; Aspiring Data Analyst
                </p>
              </div>
            </div>
          </motion.div>

          {/* Philosophy */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={cn(CARD_CLASS, "md:col-start-2 md:col-span-2 md:row-start-1")}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                <Zap size={16} className="text-accent" />
              </div>
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                The Philosophy
              </h3>
            </div>
            <p className="text-base text-muted font-body leading-relaxed max-w-prose">
              {philosophy}
            </p>
          </motion.div>

          {/* Location */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={cn(
              CARD_CLASS,
              "md:col-start-2 md:row-start-2 flex flex-col items-center justify-center text-center gap-2",
            )}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10">
              <MapPin size={16} className="text-accent" />
            </div>
            <p className="text-base font-semibold text-foreground">Dhaka, Bangladesh</p>
            <p className="text-[11px] uppercase tracking-wider text-muted/70">Location</p>
          </motion.div>

          {/* Core Capabilities */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={cn(CARD_CLASS, "md:col-start-3 md:row-start-2 md:row-span-2")}
          >
            <h3 className="text-base font-semibold tracking-tight text-foreground mb-4">
              Core Capabilities
            </h3>
            <div className="space-y-2.5">
              {coreCapabilities.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5"
                >
                  <Icon size={15} className="text-accent shrink-0" />
                  <span className="text-sm font-medium text-foreground/90">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={cn(
              CARD_CLASS,
              "md:col-start-1 md:col-span-2 md:row-start-3 flex flex-col sm:flex-row sm:items-center gap-4",
            )}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10">
              <GraduationCap size={20} className="text-accent" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                Computer Science &amp; Engineering
              </h3>
              <p className="text-sm text-muted font-body">
                United International University
                {ongoingEducation?.gpa
                  ? ` · GPA ${ongoingEducation.gpa}/${ongoingEducation.gpaScale ?? "4.0"}`
                  : ""}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="inline-block rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
                  BSc in CSE
                </span>
                <AwardBadge />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
