import { NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"
import { checkRateLimit } from "@/lib/rate-limit"
import { corsResponse, addCorsHeaders, requireSameOrigin } from "@/lib/cors"

export const runtime = "nodejs"
export const maxDuration = 30

const PORTFOLIO_DATA = `
ABOUT SALAH UDDIN SELIM:
- Name: Salah Uddin Selim
- Title: CSE Student & Aspiring Data Analyst
- Location: Dhaka, Bangladesh
- Email: selimsalahuddin19@gmail.com
- GitHub: github.com/salahuddinselim
- LinkedIn: linkedin.com/in/selimsalahuddin
- Instagram: instagram.com/selimsalahuddin
- Facebook: facebook.com/salahuddin.selim.19
- Education: B.Sc. in Computer Science & Engineering at United International University (GPA 3.74/4.00, 126/137 credits, 2022 — Present)
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

// The chat UI only offers these 5 fixed questions (no free-text input), so we
// can afford a hand-written fallback answer for each. If the Gemini call
// fails for any reason (quota, transient overload, etc.) we serve this
// instead of a dead-end error — the assistant should never simply break.
const FALLBACK_ANSWERS: Record<string, string> = {
  "what are salah's technical skills?":
    "Salah works across Python, Java, C/C++, PHP, and JavaScript, with frameworks like JavaFX and Bootstrap, MySQL for databases, and hands-on IoT experience with Arduino sensors. He's also comfortable with Git, REST APIs, and multithreaded/socket programming.",
  "tell me about his projects":
    "A few highlights: a multiplayer Puzzle Solving Game in Java/JavaFX that won 6th Runner-Up at UIU's Software Project Competition, a full-stack Tournament Management System (PHP/MySQL), an Automated Fish Pond Monitoring System using Arduino and IoT sensors, and an AI Voice Assistant in Python. Check out the Projects page for details and links.",
  "what's his education background?":
    "Salah is pursuing a B.Sc. in Computer Science & Engineering at United International University (GPA 3.74/4.00, graduating 2026). He earned a perfect GPA of 5.00/5.00 in both his HSC and SSC exams in Bangladesh.",
  "what awards has he won?":
    "He placed 6th Runner-Up at the UIU Software Project Competition, Spring 2025, and achieved a perfect GPA of 5.00/5.00 in both HSC and SSC.",
  "how can i contact him?":
    "You can reach Salah at selimsalahuddin19@gmail.com, through the contact form on this site, or connect on LinkedIn, GitHub, Instagram, or Facebook — links are in the footer and Persona page.",
}

function getFallbackAnswer(question: string): string {
  const key = question.trim().toLowerCase()
  return (
    FALLBACK_ANSWERS[key] ??
    "I'm having trouble reaching my AI brain right now — but you can find everything about Salah's skills, projects, education, and contact info elsewhere on this site, or reach out directly at selimsalahuddin19@gmail.com."
  )
}

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
  if (!requireSameOrigin(request)) {
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
    if (
      typeof msg !== "object" ||
      msg === null ||
      typeof (msg as { content?: unknown }).content !== "string" ||
      (msg as { content: string }).content.length > 4000
    ) {
      return NextResponse.json({ error: "Invalid message content" }, { status: 422 })
    }
  }

  const { messages } = body
  const lastUserContent = (messages[messages.length - 1] as { content: string }).content

  const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY
  if (!apiKey) {
    const resp = NextResponse.json({
      role: "assistant",
      content: getFallbackAnswer(lastUserContent),
    })
    return addCorsHeaders(request, resp)
  }

  try {
    const genAI = new GoogleGenAI({ apiKey })

    let historyMessages = messages.slice(0, -1)
    const firstUserIdx = historyMessages.findIndex((m: { role: string }) => m.role === "user")
    historyMessages = firstUserIdx === -1 ? [] : historyMessages.slice(firstUserIdx)

    const contents = historyMessages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }))

    contents.push({
      role: "user",
      parts: [{ text: lastUserContent }],
    })

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents,
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    })

    if (!response.text) throw new Error("Empty response from model")

    const resp = NextResponse.json({ role: "assistant", content: response.text })
    return addCorsHeaders(request, resp)
  } catch (error) {
    console.error("[chat] Gemini request failed, serving fallback:", error)
    const resp = NextResponse.json({
      role: "assistant",
      content: getFallbackAnswer(lastUserContent),
    })
    return addCorsHeaders(request, resp)
  }
}

export async function OPTIONS(request: Request) {
  return corsResponse(request)
}
