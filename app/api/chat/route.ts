import { NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"
import { checkRateLimit } from "@/lib/rate-limit"
import { corsResponse, addCorsHeaders, isSameOrigin } from "@/lib/cors"

export const runtime = "nodejs"
export const maxDuration = 30

const PORTFOLIO_DATA = `
ABOUT SALAH UDDIN SELIM:
- Name: Salah Uddin Selim
- Title: CSE Student & Software Engineer
- Location: Dhaka, Bangladesh
- Email: sselim223512@bscse.uiu.ac.bd
- GitHub: github.com/salahuddinselim
- Education: B.Sc. in Computer Science & Engineering at United International University (GPA 3.68/4.00, 112/137 credits, 2022 — Present)
- HSC: Pirganj Govt. College, Thakurgaon — GPA 5.00/5.00 (2018-2020)
- SSC: Pirganj Pilot High School, Thakurgaon — GPA 5.00/5.00 (2013-2018)

ACHIEVEMENTS:
- 6th Runner-Up — UIU Software Project Competition, Spring 2025
- Perfect GPA 5.00/5.00 in both HSC and SSC
- Languages: Bangla (Native), English (Professional Working Proficiency)

TECHNICAL SKILLS:
- Languages: Python, Java, C, C++, PHP, JavaScript, HTML/CSS
- Frameworks: JavaFX, Bootstrap, SpeechRecognition, Pyttsx3
- Databases: MySQL, File I/O
- Hardware & IoT: Arduino, DS18B20, pH/Turbidity/Ultrasonic Sensors, L298N Motor Driver, Servo Motors
- Tools: Git, GitHub, IntelliJ IDEA, Arduino IDE, VS Code, Scene Builder
- Concepts: OOP, Multithreading, Socket Programming, DSA, MVC, REST APIs

PROJECTS:
1. Multilevel Puzzle Solving Game (Spring 2025) — Java, JavaFX, MySQL, Socket Programming. Team-based desktop app with 5 logic games, real-time chat, collaborative level-unlocking. Won 6th Runner-Up at UIU. github.com/salahuddinselim/PuzzleSolving-Game
2. Tournament Management System — TournyMate (Fall 2024) — PHP, MySQL, Bootstrap, JavaScript. Full-stack tournament admin with brackets, live scores, role-based controls. github.com/salahuddinselim/tourny_mate
3. Automated Fish Pond Monitoring System (Summer 2024) — Arduino, C++, IoT. Smart system with 5 sensors, automated water exchange/pH balancing/food dispensing. github.com/salahuddinselim/Automated-Fish-Pond
4. AI Voice Assistant — Python, SpeechRecognition, Pyttsx3, Google API. Voice assistant with NL speech parsing, TTS, web search. github.com/salahuddinselim/Voice-Assistance
5. Player Information System — Bangladesh Cricket Team — C, File I/O. CLI for player stats with search/sort. github.com/salahuddinselim/Player-Information-System
`

const SYSTEM_INSTRUCTION = [
  `You are Infernape, an AI assistant for Salah Uddin Selim's portfolio website.`,
  ``,
  `YOUR PURPOSE:`,
  `- Answer questions about Salah Uddin Selim — his skills, projects, education, achievements, and contact info.`,
  `- Provide recommendations on which projects are relevant based on what the visitor is looking for.`,
  `- Be helpful, concise (2-4 sentences), friendly, and professional.`,
  ``,
  `Here is Salah's complete portfolio data — use it to answer questions accurately:`,
  ``,
  PORTFOLIO_DATA,
  ``,
  `STRICT RULES:`,
  `- ONLY answer questions about Salah Uddin Selim. If asked about anything else, say: "I'm only here to help you learn about Salah Uddin Selim. Feel free to ask me about his work, skills, or experience!"`,
  `- Do NOT write code, solve problems, give advice, or answer anything unrelated to Salah.`,
  `- Keep responses concise and natural.`,
  `- You are Infernape — an AI guide, not Salah himself. Refer to him in third person.`,
].join("\n")

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return addCorsHeaders(request, NextResponse.json({ error: "Forbidden" }, { status: 403 }))
  }

  if (request.method === "OPTIONS") {
    return corsResponse(request)
  }

  const contentType = request.headers.get("content-type") ?? ""
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported media type" }, { status: 415 })
  }

  const { success: allowed } = await checkRateLimit(request, "chat", {
    max: 30,
    windowMs: 3600_000,
  })
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": "3600" } },
    )
  }

  let body: { messages?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: "Messages array is required" }, { status: 422 })
  }

  for (const msg of body.messages) {
    if (typeof msg.content !== "string" || msg.content.length > 4000) {
      return NextResponse.json({ error: "Invalid message content" }, { status: 422 })
    }
  }

  const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 })
  }

  try {
    const genAI = new GoogleGenAI({ apiKey })
    const { messages } = body

    let historyMessages = messages.slice(0, -1)
    const firstUserIdx = historyMessages.findIndex((m: { role: string }) => m.role === "user")
    historyMessages = firstUserIdx === -1 ? [] : historyMessages.slice(firstUserIdx)

    const contents = historyMessages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }))

    contents.push({
      role: "user",
      parts: [{ text: messages[messages.length - 1].content }],
    })

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    })

    const resp = NextResponse.json({ role: "assistant", content: response.text })
    return addCorsHeaders(request, resp)
  } catch {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 })
  }
}

export async function OPTIONS(request: Request) {
  return corsResponse(request)
}
