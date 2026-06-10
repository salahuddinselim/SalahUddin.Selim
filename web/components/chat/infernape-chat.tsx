"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Bot, User, Loader2 } from "lucide-react"

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
  content: "Hey! I'm Infernape, your AI guide. Ask me anything about Salah's work, skills, or experience!",
}

export function InfernapeChat({ open, onClose }: InfernapeChatProps) {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMsg: Message = { role: "user", content: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
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
        { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again." },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
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
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-6rem)] rounded-2xl border border-white/10 bg-[#0B1220]/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
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
                    <div className="w-7 h-7 rounded-full bg-cyan-400/10 flex items-center justify-center shrink-0 mt-1">
                      <Bot size={14} className="text-cyan-300" />
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
                  <div className="w-7 h-7 rounded-full bg-cyan-400/10 flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-cyan-300" />
                  </div>
                  <div className="bg-white/5 rounded-2xl px-4 py-3 border border-white/5">
                    <Loader2 size={16} className="text-white/40 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Infernape anything..."
                  className="flex-1 bg-transparent text-sm text-white/80 placeholder-white/30 outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-300 hover:bg-cyan-400/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
