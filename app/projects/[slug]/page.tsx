import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { GitBranch, ExternalLink, ArrowLeft } from "lucide-react"
import { getProjects } from "@/lib/sanity/fetch"
import { s as siteUrl } from "@/data/site"

export const dynamic = "force-static"
export const revalidate = 3600

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.filter((p) => p.slug).map((p) => ({ slug: p.slug }))
}

async function getProject(slug: string) {
  const projects = await getProjects()
  return projects.find((p) => p.slug === slug) ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}

  const title = `${project.title} | Projects`
  const description = project.description

  return {
    title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.title} | Salah Uddin Selim`,
      description,
      type: "article",
      url: `${siteUrl}/projects/${slug}`,
      images: project.image ? [{ url: project.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Salah Uddin Selim`,
      description,
      images: project.image ? [project.image] : undefined,
    },
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: { "@type": "Person", name: "Salah Uddin Selim" },
    dateCreated: String(project.year),
    keywords: (project.technologies ?? []).join(", "),
    url: `${siteUrl}/projects/${slug}`,
    ...(project.image ? { image: project.image } : {}),
  }

  return (
    <main className="min-h-screen pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>

        <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-white/10 mb-8 bg-gradient-to-br from-accent/20 via-accent-secondary/10 to-bg-secondary flex items-center justify-center">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          ) : (
            <span className="text-5xl font-heading font-bold text-accent/30 select-none">
              {project.title.charAt(0)}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
          {project.title}
        </h1>
        <p className="text-accent font-body mt-2">{project.description}</p>
        <p className="text-xs text-muted font-mono mt-2">
          {project.year} &middot; {project.category}
        </p>

        <p className="text-base text-muted font-body leading-relaxed max-w-prose mt-6">
          {project.longDescription}
        </p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xs font-heading font-semibold text-foreground/60 uppercase tracking-wider mb-2">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-accent/10 text-accent border border-accent/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 pt-8">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm px-4 py-2"
            >
              <GitBranch size={14} />
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm px-4 py-2"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </main>
  )
}
