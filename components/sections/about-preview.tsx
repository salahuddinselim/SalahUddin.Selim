"use client"

import { motion } from "framer-motion"
import { MapPin, GraduationCap, ExternalLink } from "lucide-react"
import type { SanityProfile } from "@/types"
import type { EducationData } from "@/lib/sanity/fetch"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
}

export function AboutPreview({
  education,
  profile,
}: {
  education: EducationData[]
  profile?: SanityProfile
}) {
  const featuredEducation = education.find((edu) => edu.status === "ongoing") ?? education[0]

  const name = profile?.name?.trim() || "Salah Uddin Selim"
  const firstName = name.split(" ")[0]
  const bio =
    profile?.bio?.trim() ||
    "Aspiring data analyst turning data into insight — available for internships and research roles."
  const tagline = profile?.tagline?.trim()
  const location = profile?.location?.trim() || "Dhaka, Bangladesh"

  const gpaLabel = featuredEducation?.gpa
    ? `${featuredEducation.gpa}${featuredEducation.gpaScale ? ` / ${featuredEducation.gpaScale}` : ""}`
    : undefined
  const years = featuredEducation
    ? [featuredEducation.startYear, featuredEducation.endYear].filter(Boolean).join(" – ")
    : undefined

  const abbr = (featuredEducation?.abbreviation ?? featuredEducation?.institution ?? "")
    .slice(0, 3)
    .toUpperCase()

  return (
    <section id="about-preview" className="relative w-full py-28 px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(74% 54% at 20% 14%, rgba(0, 217, 255, 0.07), transparent 69%), radial-gradient(66% 52% at 82% 82%, rgba(8, 145, 178, 0.06), transparent 72%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-4xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-accent/60">
            Who I Am
          </p>
          <h2
            className="font-heading font-bold text-white"
            style={{ fontSize: "clamp(2rem,5vw,3rem)" }}
          >
            About Me
          </h2>
        </motion.div>

        {/* Two-column: Location card (left) + Bio + Education (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-12 items-start">
          {/* Left: Location card — large city name + coordinates */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col gap-4"
          >
            {/* Location card */}
            <div
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 overflow-hidden relative"
              style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(60% 60% at 80% 20%, rgba(0,217,255,0.12), transparent)",
                }}
              />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/50 mb-2">
                📍 Based In
              </p>
              <p
                className="font-heading font-bold text-white leading-none mb-1"
                style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)" }}
              >
                DHAKA
              </p>
              <p className="font-mono text-xs text-[rgba(255,255,255,0.35)] mb-3">Bangladesh</p>
              <div className="border-t border-white/[0.08] pt-3 flex flex-col gap-1">
                <p className="font-mono text-[10px] text-[rgba(255,255,255,0.3)] tracking-wider">
                  23.8103° N, 90.4125° E
                </p>
                <p className="font-mono text-[10px] text-[rgba(255,255,255,0.3)] tracking-wider">
                  UTC +6:00 · Asia/Dhaka
                </p>
              </div>
            </div>

            {/* School badge card */}
            {featuredEducation && (
              <div
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/50 mb-2">
                  🎓 Studying At
                </p>
                <p className="font-heading font-semibold text-white text-sm">
                  {featuredEducation.institution}
                </p>
                {featuredEducation.degree && (
                  <p className="text-accent text-xs mt-0.5 font-medium">
                    {featuredEducation.degree}
                    {featuredEducation.field ? ` in ${featuredEducation.field}` : ""}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  {featuredEducation.gpa && (
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] text-accent font-semibold">
                      CGPA {featuredEducation.gpa}
                    </span>
                  )}
                  {featuredEducation.status === "ongoing" && (
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400">
                      Ongoing
                    </span>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3
              className="font-heading font-bold text-white mb-5"
              style={{ fontSize: "clamp(1.3rem,3vw,1.6rem)" }}
            >
              Hi, I&apos;m {firstName}
            </h3>
            <div className="space-y-4 mb-7">
              <p className="text-[rgba(255,255,255,0.65)] leading-relaxed">{bio}</p>
              {tagline && (
                <blockquote className="border-l-2 border-accent/40 pl-4 italic text-[rgba(255,255,255,0.45)] text-sm leading-relaxed">
                  &ldquo;{tagline}&rdquo;
                </blockquote>
              )}
            </div>
            {/* Location badge */}
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-[rgba(255,255,255,0.45)]">
                <MapPin size={11} className="text-accent/70" aria-hidden />
                {location}
              </span>
              <a
                href="/persona"
                className="flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5 font-mono text-xs text-accent/70 hover:text-accent hover:border-accent/40 transition-colors"
              >
                <ExternalLink size={11} aria-hidden />
                View Profile
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
