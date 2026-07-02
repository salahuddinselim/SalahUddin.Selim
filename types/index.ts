// ── Navigation ────────────────────────────────
export interface NavItem {
  _key?: string
  label: string
  href: string
  description?: string
}

// ── Social ────────────────────────────────────
export interface SocialLink {
  _key?: string
  name: string
  url: string
  icon: string
}

// ── Skills ────────────────────────────────────
export interface Skill {
  _key?: string
  name: string
  icon?: string
  category: string
  proficiency: number
}

// ── Projects ──────────────────────────────────
export interface Project {
  _id?: string
  title: string
  slug?: string
  description: string
  longDescription: string
  technologies: string[]
  category: string
  image: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  year: number
}

// ── Experience ────────────────────────────────
export interface Experience {
  _id?: string
  company: string
  role: string
  period: string
  description: string
  achievements?: string[]
  technologies?: string[]
}

// ── Testimonials ──────────────────────────────
export interface Testimonial {
  _id?: string
  name: string
  role: string
  company: string
  avatar: string
  content: string
}

// ── Profile / Portfolio ───────────────────────
export interface PortfolioData {
  name: string
  title: string
  tagline: string
  bio: string
  avatar: string
  location: string
  email: string
  resumeUrl: string
  available: boolean
  navItems: NavItem[]
  socialLinks: SocialLink[]
  skills: Skill[]
  projects: Project[]
  experience: Experience[]
  testimonials: Testimonial[]
}

// ── Sanity document types (for GROQ queries) ──
export interface SanityProfile {
  _id: string
  _type: "profile"
  name: string
  title: string
  tagline: string
  bio: string
  avatar: string
  location: string
  email: string
  resumeUrl: string
  available: boolean
}

export interface SanityProject {
  _id: string
  _type: "project"
  title: string
  slug: string
  description: string
  longDescription: string
  technologies?: string[]
  category: string
  image: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  year: number
}

export interface SanitySkill {
  _id: string
  _type: "skill"
  name: string
  icon?: string
  category: string
  proficiency: number
}

export interface SanityExperience {
  _id: string
  _type: "experience"
  company: string
  role: string
  period: string
  description: string
  achievements?: string[]
  technologies?: string[]
}

export interface SanityTestimonial {
  _id: string
  _type: "testimonial"
  name: string
  role: string
  company: string
  avatar: string
  content: string
}

export interface SanitySocialLink {
  _id: string
  _type: "socialLink"
  name: string
  url: string
  icon: string
}
