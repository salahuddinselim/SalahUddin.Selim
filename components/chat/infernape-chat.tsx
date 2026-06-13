"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, User, Loader2, Sparkles } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface InfernapeChatProps {
  open: boolean
  onClose: () => void
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Hey! I'm Infernape, your AI guide. Pick a question below to learn more about Salah!",
}

const QUESTIONS = [
  "What are Salah's technical skills?",
  "Tell me about his projects",
  "What's his education background?",
  "What awards has he won?",
  "How can I contact him?",
]

export function InfernapeChat({ open, onClose }: InfernapeChatProps) {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [loading, setLoading] = useState(false)
  const [asked, setAsked] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleQuestion = async (question: string) => {
    if (loading) return
    setAsked(true)

    const userMsg: Message = { role: "user", content: question }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      })

      if (!res.ok) throw new Error("Failed to fetch")

      const data = await res.json()
      setMessages((prev) => [...prev, data])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting. Try again or reach out directly via the contact form!" },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-6rem)] rounded-2xl border border-white/10 bg-[#0B1220]/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-[#0B1220] border border-white/10">
                  <img src="/infernape-icon.png" alt="Infernape" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-white/90">Infernape</span>
                  <span className="text-xs text-emerald-400 ml-2">● Online</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mt-1 border border-white/10">
                      <img src="/infernape-icon.png" alt="Infernape" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-cyan-400/10 text-white/90 border border-cyan-400/20"
                        : "bg-white/5 text-white/80 border border-white/5"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                      <User size={14} className="text-white/60" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-white/10">
                    <img src="/infernape-icon.png" alt="Infernape" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-white/5 rounded-2xl px-4 py-3 border border-white/5">
                    <Loader2 size={16} className="text-white/40 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="p-4 border-t border-white/10 shrink-0">
              {!asked ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={12} className="text-cyan-400" />
                    <span className="text-xs font-mono text-white/40 uppercase tracking-wider">Choose a question</span>
                  </div>
                  {QUESTIONS.map((q) => (
                    <motion.button
                      key={q}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuestion(q)}
                      disabled={loading}
                      className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-white/70 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white hover:border-cyan-400/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {QUESTIONS.map((q) => (
                    <motion.button
                      key={q}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuestion(q)}
                      disabled={loading}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-cyan-400/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
