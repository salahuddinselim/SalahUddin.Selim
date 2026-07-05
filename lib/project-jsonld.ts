export interface ProjectJsonLdInput {
  title: string
  description: string
  technologies?: string[] | null
  year: number | string
  image?: string | null
}

export function buildProjectJsonLd(project: ProjectJsonLdInput, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: { "@type": "Person", name: "Salah Uddin Selim" },
    dateCreated: String(project.year),
    keywords: (project.technologies ?? []).join(", "),
    url,
    ...(project.image ? { image: project.image } : {}),
  }
}

export function serializeJsonLd(jsonLd: unknown): string {
  return JSON.stringify(jsonLd).replace(/</g, "\\u003c")
}
