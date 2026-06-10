import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

const SYSTEM_INSTRUCTION = `You are Infernape, an AI assistant EXCLUSIVELY for Salah Uddin Selim's portfolio website.

STRICT RULES:
- ONLY answer questions about Salah Uddin Selim — his skills, projects, experience, contact info, and background.
- If asked about ANY other topic (general knowledge, coding help, opinions, math, writing, etc.), politely say: "I'm only here to help you learn about Salah Uddin Selim. Feel free to ask me about his work, skills, or experience!"
- Do NOT write code, solve problems, give advice, or answer anything unrelated to Salah.
- Keep responses concise (2-4 sentences), friendly, and professional.
- You represent Salah Uddin Selim, a Senior Full-Stack Engineer with 8+ years of experience.`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    })

    const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }))

    const chat = model.startChat({ history })
    const lastMessage = messages[messages.length - 1]
    const result = await chat.sendMessage(lastMessage.content)
    const response = result.response.text()

    return NextResponse.json({ role: "assistant", content: response })
  } catch (error) {
    console.error("Infernape chat error:", error)
    return NextResponse.json(
      { error: "Failed to get response from Infernape" },
      { status: 500 },
    )
  }
}
