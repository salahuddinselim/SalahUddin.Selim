"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { Send, Loader2, CheckCircle2, AlertCircle, Mail } from "lucide-react"
import { SocialOrbit } from "@/components/sections/social-orbit"
import { cn } from "@/lib/utils"

interface FormFields {
  name: string
  email: string
  subject: string
  message: string
  website: string
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

export function ContactSection() {
  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  })
  const [state, setState] = useState<SubmitState>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const updateField = (field: keyof FormFields, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setState("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setState("success")
      setFields({ name: "", email: "", subject: "", message: "", website: "" })
      setTimeout(() => setState("idle"), 4000)
    } catch (err) {
      setState("error")
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong")
      setTimeout(() => setState("idle"), 4000)
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
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground">
            Get In Touch
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField
                label="Name"
                value={fields.name}
                onChange={(v) => updateField("name", v)}
                placeholder="John Doe"
                disabled={state === "loading"}
                required
              />
              <InputField
                label="Email"
                type="email"
                value={fields.email}
                onChange={(v) => updateField("email", v)}
                placeholder="john@example.com"
                disabled={state === "loading"}
                required
              />
            </div>

            <InputField
              label="Subject"
              value={fields.subject}
              onChange={(v) => updateField("subject", v)}
              placeholder="What's this about?"
              disabled={state === "loading"}
              required
            />

            <TextareaField
              label="Message"
              value={fields.message}
              onChange={(v) => updateField("message", v)}
              placeholder="Tell me about your project, idea, or just say hi..."
              disabled={state === "loading"}
              required
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

            <motion.button
              type="submit"
              disabled={state === "loading"}
              whileHover={state === "idle" ? { scale: 1.02 } : {}}
              whileTap={state === "idle" ? { scale: 0.98 } : {}}
              className={cn(
                "w-full sm:w-auto inline-flex items-center justify-center gap-2",
                "px-6 py-3 rounded-xl text-sm font-medium font-body",
                "transition-all duration-300",
                state === "idle" && [
                  "bg-accent/10 text-accent border border-accent/20",
                  "hover:bg-accent/20 hover:shadow-[0_0_25px_rgba(0,217,255,0.12)]",
                ],
                state === "loading" && [
                  "bg-accent/10 text-accent/60 border border-accent/10",
                  "cursor-not-allowed",
                ],
                state === "success" && [
                  "bg-success/10 text-success border border-success/20",
                ],
                state === "error" && [
                  "bg-error/10 text-error border border-error/20",
                ],
              )}
            >
              {state === "idle" && (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
              {state === "loading" && (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              )}
              {state === "success" && (
                <>
                  <CheckCircle2 size={16} />
                  Message Sent!
                </>
              )}
              {state === "error" && (
                <>
                  <AlertCircle size={16} />
                  {errorMsg || "Failed to send"}
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
              Connect With Me
            </h3>
            <p className="text-sm text-muted font-body text-center mb-6 max-w-xs">
              Click the center button to expand my social links
            </p>
            <SocialOrbit />
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
  placeholder,
  disabled,
  type = "text",
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  disabled?: boolean
  type?: string
  required?: boolean
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
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        suppressHydrationWarning
        className={cn(
          "w-full px-4 py-3 rounded-xl text-sm font-body text-foreground placeholder:text-muted/50",
          "bg-[rgba(17,24,39,0.65)] backdrop-blur-[12px]",
          "border border-[rgba(255,255,255,0.06)]",
          "focus:outline-none focus:border-accent/40 focus:shadow-[0_0_20px_rgba(0,217,255,0.06)]",
          "transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
        )}
      />
    </div>
  )
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  disabled,
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  disabled?: boolean
  required?: boolean
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
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={5}
        className={cn(
          "w-full px-4 py-3 rounded-xl text-sm font-body text-foreground placeholder:text-muted/50 resize-none",
          "bg-[rgba(17,24,39,0.65)] backdrop-blur-[12px]",
          "border border-[rgba(255,255,255,0.06)]",
          "focus:outline-none focus:border-accent/40 focus:shadow-[0_0_20px_rgba(0,217,255,0.06)]",
          "transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
        )}
      />
    </div>
  )
}
