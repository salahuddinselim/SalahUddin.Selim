"use client"

import { motion } from "framer-motion"
import { MapPin, GraduationCap } from "lucide-react"
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

        {/* Two-column: Bio (left) + Education (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">
          {/* Left: Bio */}
          <motion.div
            custom={0}
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
                <p className="text-[rgba(255,255,255,0.65)] leading-relaxed">{tagline}</p>
              )}
            </div>
            {/* Location + school badges */}
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-[rgba(255,255,255,0.45)]">
                <MapPin size={11} className="text-accent/70" aria-hidden />
                {location}
              </span>
              {featuredEducation && (
                <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-[rgba(255,255,255,0.45)]">
                  <GraduationCap size={11} className="text-accent/70" aria-hidden />
                  {featuredEducation.abbreviation ?? featuredEducation.institution}
                  {featuredEducation.endYear ? ` · ${featuredEducation.endYear}` : ""}
                </span>
              )}
            </div>
          </motion.div>

          {/* Right: Education card */}
          {featuredEducation && (
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h3 className="font-heading font-semibold text-white text-lg mb-4">Education</h3>
              <div
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-5"
                style={{ backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
              >
                <div className="flex items-start gap-4 mb-4">
                  {/* Institution icon block */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
                    <span className="font-heading font-bold text-sm text-accent">{abbr}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-heading font-bold text-white text-sm leading-snug">
                      {featuredEducation.institution}
                    </p>
                    {featuredEducation.degree && (
                      <p className="text-accent text-xs mt-1 font-medium leading-snug">
                        {featuredEducation.degree}
                        {featuredEducation.field ? ` in ${featuredEducation.field}` : ""}
                      </p>
                    )}
                    {years && (
                      <p className="text-[rgba(255,255,255,0.35)] font-mono text-[11px] mt-1">
                        {years}
                      </p>
                    )}
                  </div>
                </div>

                {/* GPA + status row */}
                {(gpaLabel || featuredEducation.status === "ongoing") && (
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.08] pt-4">
                    {gpaLabel && (
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[rgba(255,255,255,0.35)]">
                          CGPA
                        </span>
                        <span className="font-heading font-bold text-accent text-base">
                          {featuredEducation.gpa}
                        </span>
                        <span className="font-mono text-[11px] text-[rgba(255,255,255,0.35)]">
                          /{featuredEducation.gpaScale ?? "4.0"}
                        </span>
                      </div>
                    )}
                    {featuredEducation.status === "ongoing" && (
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent">
                        Ongoing
                      </span>
                    )}
                  </div>
                )}

                {/* Credits row */}
                {featuredEducation.completedCredits && featuredEducation.totalCredits && (
                  <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-[rgba(255,255,255,0.35)]">
                    <span className="uppercase tracking-[0.15em]">Credits Completed</span>
                    <span>
                      {featuredEducation.completedCredits} / {featuredEducation.totalCredits}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
