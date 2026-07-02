import { MessageCircle } from "lucide-react"

interface ChatButtonProps {
  onClick: () => void
  label: string
}

export function ChatButton({ onClick, label }: ChatButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open chat"
      className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-200 transition-all duration-200 hover:border-cyan-300/30 hover:bg-cyan-400/20 h-11 w-11 md:h-10 md:w-10 lg:h-auto lg:w-auto lg:bg-white/5 lg:px-4 lg:py-2 lg:text-sm lg:font-semibold lg:uppercase lg:tracking-[0.20em]"
    >
      <MessageCircle size={18} className="md:hidden" />
      <MessageCircle size={16} className="hidden md:block lg:hidden" />
      <MessageCircle size={14} className="hidden lg:block" />
      <span className="hidden lg:inline">{label}</span>
    </button>
  )
}
