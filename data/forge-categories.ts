export const forgeSectionCopy = {
  eyecatch: "EXPERTISE",
  heading: "Technical Expertise",
  allLabel: "All",
}

export const categoryDefaults: Record<
  string,
  { heading: string; description: string; color: string }
> = {
  languages: {
    heading: "Languages",
    description:
      "Proficient in multiple programming languages across systems, web, and application development.",
    color: "#00D9FF",
  },
  frontend: {
    heading: "Frontend",
    description: "Web and desktop GUI frameworks for building user interfaces.",
    color: "#8B5CF6",
  },
  backend: {
    heading: "Backend",
    description: "Server-side, databases, and API development.",
    color: "#22C55E",
  },
  iot: {
    heading: "Hardware & IoT",
    description:
      "Embedded systems, sensor integration, and motor control for automated physical systems.",
    color: "#F97316",
  },
  tools: {
    heading: "Tools & Concepts",
    description:
      "Version control, IDEs, and software engineering concepts used across projects.",
    color: "#EAB308",
  },
  design: {
    heading: "Design",
    description: "UI/UX design and prototyping tools.",
    color: "#EC4899",
  },
}
