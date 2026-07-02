"use client"

import { useState, type FormEvent } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { Send, Loader2, CheckCircle2, AlertCircle, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { Turnstile, resetTurnstile } from "@/components/ui/turnstile"
import { contactSectionCopy, contactFormFields, contactApiEndpoint, fallbackSocials } from "@/data"
import type { SocialLinkData } from "@/lib/sanity/fetch"

const SocialOrbit = dynamic(
  () => import("@/components/sections/social-orbit").then((mod) => mod.SocialOrbit),
  {
    ssr: false,
    loading: () => (
      <div className="w-[320px] h-[320px] rounded-full bg-white/[0.03] border border-white/10" />
    ),
  },
)

interface FormFields {
  name: string
  email: string
  subject: string
  message: string
  website: string
  turnstileToken: string
}

type SubmitState = "idle" | "loading" | "success" | "error"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
}

export function ContactSection({
  socials = fallbackSocials,
  email,
}: {
  socials?: SocialLinkData[]
  email?: string
} = {}) {
  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
    turnstileToken: "",
  })
  const [state, setState] = useState<SubmitState>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleTurnstileVerify = (token: string) => {
    updateField("turnstileToken", token)
  }

  const handleTurnstileExpire = () => {
    updateField("turnstileToken", "")
  }

  const updateField = (field: keyof FormFields, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }))
  }

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const validateField = (name: keyof FormFields, value: string): string | null => {
    if (name === "name" && !value.trim()) return "Name is required"
    if (name === "email" && !value.trim()) return "Email is required"
    if (name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Enter a valid email"
    if (name === "subject" && !value.trim()) return "Subject is required"
    if (name === "message" && !value.trim()) return "Message is required"
    if (name === "message" && value.trim().length < 10)
      return "Message must be at least 10 characters"
    return null
  }

  const handleBlur = (name: keyof FormFields, value: string) => {
    if (name === "website" || name === "turnstileToken") return
    const error = validateField(name, value)
    setFieldErrors((prev) => {
      const next = { ...prev }
      if (error) next[name] = error
      else delete next[name]
      return next
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const errors: Record<string, string> = {}
    for (const field of ["name", "email", "subject", "message"] as const) {
      const error = validateField(field, fields[field])
      if (error) errors[field] = error
    }
    if (!fields.turnstileToken) errors.turnstileToken = "Please complete the security check"
    setFieldErrors(errors)

    if (Object.keys(errors).length > 0) return

    setState("loading")
    setErrorMsg("")

    try {
      const res = await fetch(contactApiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setState("success")
      setFields({ name: "", email: "", subject: "", message: "", website: "", turnstileToken: "" })
      setFieldErrors({})
      resetTurnstile()
      setTimeout(() => setState("idle"), 4000)
    } catch (err) {
      setState("error")
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong")
      setTimeout(() => setState("idle"), 6000)
    }
  }

  return (
    <section id="contact" className="relative w-full py-24 sm:py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Mail size={20} className="text-accent" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            {contactSectionCopy.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Form */}
          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-5"
            noValidate
          >
            <div aria-live="polite" role="status">
              {/* Error banner */}
              {state === "error" && errorMsg && (
                <div className="flex items-start gap-3 rounded-xl bg-error/10 border border-error/20 px-4 py-3">
                  <AlertCircle size={16} className="text-error shrink-0 mt-0.5" />
                  <p className="text-sm text-error/90 font-body">{errorMsg}</p>
                </div>
              )}
              {/* Success banner */}
              {state === "success" && (
                <div className="flex items-start gap-3 rounded-xl bg-success/10 border border-success/20 px-4 py-3">
                  <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                  <p className="text-sm text-success/90 font-body">
                    Message sent successfully! I'll get back to you soon.
                  </p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField
                label={contactFormFields.name.label}
                value={fields.name}
                onChange={(v) => updateField("name", v)}
                onBlur={(v) => handleBlur("name", v)}
                placeholder={contactFormFields.name.placeholder}
                disabled={state === "loading"}
                required
                error={fieldErrors.name}
              />
              <InputField
                label={contactFormFields.email.label}
                type={contactFormFields.email.type}
                value={fields.email}
                onChange={(v) => updateField("email", v)}
                onBlur={(v) => handleBlur("email", v)}
                placeholder={contactFormFields.email.placeholder}
                disabled={state === "loading"}
                required
                error={fieldErrors.email}
              />
            </div>

            <InputField
              label={contactFormFields.subject.label}
              value={fields.subject}
              onChange={(v) => updateField("subject", v)}
              onBlur={(v) => handleBlur("subject", v)}
              placeholder={contactFormFields.subject.placeholder}
              disabled={state === "loading"}
              required
              error={fieldErrors.subject}
            />

            <TextareaField
              label={contactFormFields.message.label}
              value={fields.message}
              onChange={(v) => updateField("message", v)}
              onBlur={(v) => handleBlur("message", v)}
              placeholder={contactFormFields.message.placeholder}
              disabled={state === "loading"}
              required
              error={fieldErrors.message}
            />

            <div className="absolute opacity-0 pointer-events-none -z-10" aria-hidden="true">
              <label htmlFor="field-website">Leave this empty</label>
              <input
                id="field-website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={fields.website}
                onChange={(e) => updateField("website", e.target.value)}
              />
            </div>

            <Turnstile onVerify={handleTurnstileVerify} onExpire={handleTurnstileExpire} />
            {fieldErrors.turnstileToken && (
              <p className="text-xs text-error font-body mt-1">{fieldErrors.turnstileToken}</p>
            )}

            <motion.button
              type="submit"
              disabled={state === "loading"}
              whileHover={state === "idle" ? { scale: 1.02 } : {}}
              whileTap={state === "idle" ? { scale: 0.98 } : {}}
              className={cn(
                "btn-primary w-full sm:w-auto justify-center min-h-[48px]",
                state === "loading" && ["opacity-60 cursor-not-allowed"],
                state === "success" && ["!bg-success !border-success"],
                state === "error" && ["!bg-error/10 !text-error !border-error/20"],
              )}
            >
              {state === "idle" && (
                <>
                  <Send size={16} />
                  {contactSectionCopy.sendLabel}
                </>
              )}
              {state === "loading" && (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {contactSectionCopy.sendingLabel}
                </>
              )}
              {state === "success" && (
                <>
                  <CheckCircle2 size={16} />
                  {contactSectionCopy.sentLabel}
                </>
              )}
              {state === "error" && (
                <>
                  <AlertCircle size={16} />
                  {contactSectionCopy.failedLabel}
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Social Orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" as const }}
            className="lg:col-span-2 flex flex-col items-center justify-center"
          >
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              {contactSectionCopy.connectHeading}
            </h3>
            <p className="text-sm text-muted font-body text-center mb-6 max-w-xs">
              {contactSectionCopy.connectDescription}
            </p>
            <SocialOrbit socials={socials} email={email} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function InputField({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  disabled,
  type = "text",
  required,
  error,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  onBlur?: (v: string) => void
  placeholder: string
  disabled?: boolean
  type?: string
  required?: boolean
  error?: string
}) {
  const id = `field-${label.toLowerCase().replace(/\s+/g, "-")}`
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground/80 font-body mb-1.5">
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => onBlur?.(value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        suppressHydrationWarning
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full px-4 py-3 rounded-xl text-sm font-body text-foreground placeholder:text-muted",
          "bg-[rgba(17,24,39,0.65)] backdrop-blur-[12px]",
          "border",
          error
            ? "border-error/50 focus:border-error"
            : "border-[rgba(255,255,255,0.06)] focus:border-accent/40",
          "focus:outline-none focus:shadow-[0_0_20px_rgba(0,217,255,0.06)]",
          "transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
        )}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-error font-body mt-1">
          {error}
        </p>
      )}
    </div>
  )
}

function TextareaField({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  disabled,
  required,
  error,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  onBlur?: (v: string) => void
  placeholder: string
  disabled?: boolean
  required?: boolean
  error?: string
}) {
  const id = `field-${label.toLowerCase().replace(/\s+/g, "-")}`
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground/80 font-body mb-1.5">
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => onBlur?.(value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={5}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full px-4 py-3 rounded-xl text-sm font-body text-foreground placeholder:text-muted resize-none",
          "bg-[rgba(17,24,39,0.65)] backdrop-blur-[12px]",
          "border",
          error
            ? "border-error/50 focus:border-error"
            : "border-[rgba(255,255,255,0.06)] focus:border-accent/40",
          "focus:outline-none focus:shadow-[0_0_20px_rgba(0,217,255,0.06)]",
          "transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
        )}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-error font-body mt-1">
          {error}
        </p>
      )}
    </div>
  )
}
