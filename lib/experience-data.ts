export interface ExperienceEntry {
  type: "experience" | "education"
  company?: string
  institution?: string
  role?: string
  degree?: string
  field?: string
  period: string
  startYear?: string
  endYear?: string
  description: string
  technologies?: string[]
  gpa?: string
  gpaScale?: string
  status?: string
}

export const fallbackExperience: ExperienceEntry[] = [
  {
    type: "education",
    institution: "United International University",
    degree: "B.Sc.",
    field: "Computer Science & Engineering",
    period: "2022 – Present",
    startYear: "2022",
    endYear: "Present",
    description:
      "Active in software project competitions. Built multiple production-quality projects across Java, Python, PHP, C/C++, and Arduino. Awarded 6th Runner-Up at UIU Software Project Competition, Spring 2025.",
    gpa: "3.68",
    gpaScale: "4.00",
    status: "ongoing",
  },
  {
    type: "experience",
    company: "United International University",
    role: "Student Research Assistant (Project)",
    period: "Spring 2025",
    description:
      "Designed and developed a Multilevel Puzzle Solving Game — a team-based desktop application with 5 logic games, real-time group chat via Java Socket Programming, and collaborative level-unlocking. Awarded 6th Runner-Up at UIU Software Project Competition, Spring 2025.",
    technologies: ["Java", "JavaFX", "MySQL", "Socket Programming", "Multithreading"],
  },
]
