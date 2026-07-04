import { client } from "./client"
import { groq } from "next-sanity"
import type { SanityProfile, SanitySkill, SanityProject, SanityExperience } from "@/types"

const SANITY_REVALIDATE_SECONDS = 3600

const profileQuery = groq`*[_type == "profile"][0]{
  name,
  title,
  tagline,
  bio,
  "avatar": avatar.asset->url,
  location,
  email,
  "resumeUrl": resume.asset->url,
  available
}`

const skillsQuery = groq`*[_type == "skill"] | order(order asc) {
  name,
  icon,
  category,
  proficiency
}`

const projectsQuery = groq`*[_type == "project"] | order(year desc, featured desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  longDescription,
  technologies,
  category,
  "image": image.asset->url,
  liveUrl,
  githubUrl,
  featured,
  year
}`

const experienceQuery = groq`*[_type == "experience"] | order(order asc) {
  _id,
  company,
  role,
  period,
  description,
  achievements,
  technologies
}`

const socialLinksQuery = groq`*[_type == "socialLink"] | order(order asc) {
  name,
  url,
  icon
}`

export interface SocialLinkData {
  name: string
  url: string
  icon?: string
}

export function getProfile(): Promise<SanityProfile> {
  return client.fetch(
    profileQuery,
    {},
    { next: { revalidate: SANITY_REVALIDATE_SECONDS, tags: ["sanity"] } },
  )
}

export function getSkills(): Promise<SanitySkill[]> {
  return client.fetch(
    skillsQuery,
    {},
    { next: { revalidate: SANITY_REVALIDATE_SECONDS, tags: ["sanity"] } },
  )
}

export function getProjects(): Promise<SanityProject[]> {
  return client.fetch(
    projectsQuery,
    {},
    { next: { revalidate: SANITY_REVALIDATE_SECONDS, tags: ["sanity"] } },
  )
}

export function getExperience(): Promise<SanityExperience[]> {
  return client.fetch(
    experienceQuery,
    {},
    { next: { revalidate: SANITY_REVALIDATE_SECONDS, tags: ["sanity"] } },
  )
}

export function getSocialLinks(): Promise<SocialLinkData[]> {
  return client.fetch(
    socialLinksQuery,
    {},
    { next: { revalidate: SANITY_REVALIDATE_SECONDS, tags: ["sanity"] } },
  )
}

const galleryQuery = groq`*[_type == "gallery"] | order(order asc) {
  title,
  "image": image.asset->url,
  "width": image.asset->metadata.dimensions.width,
  "height": image.asset->metadata.dimensions.height,
  caption,
  location,
  span
}`

export interface GalleryImageData {
  title: string
  image: string
  width?: number
  height?: number
  caption?: string
  location?: string
  span?: "square" | "vertical" | "horizontal" | "large"
}

export function getGalleryImages(): Promise<GalleryImageData[]> {
  return client.fetch(
    galleryQuery,
    {},
    { next: { revalidate: SANITY_REVALIDATE_SECONDS, tags: ["sanity"] } },
  )
}

const credentialsQuery = groq`*[_type == "credential"] | order(year desc, order asc) {
  title,
  issuer,
  date,
  year,
  category,
  tags,
  description
}`

export interface CredentialData {
  title: string
  issuer: string
  date: string
  year: number
  category: string
  tags: string[]
  description?: string
}

export function getCredentials(): Promise<CredentialData[]> {
  return client.fetch(
    credentialsQuery,
    {},
    { next: { revalidate: SANITY_REVALIDATE_SECONDS, tags: ["sanity"] } },
  )
}

const educationQuery = groq`*[_type == "education"] | order(order asc) {
  institution,
  degree,
  field,
  startYear,
  endYear,
  gpa,
  gpaScale,
  completedCredits,
  totalCredits,
  status,
  description,
  abbreviation
}`

export interface EducationData {
  institution: string
  degree: string
  field?: string
  startYear?: number
  endYear?: string
  gpa?: string
  gpaScale?: string
  completedCredits?: number
  totalCredits?: number
  status?: string
  description?: string
  abbreviation?: string
}

export function getEducation(): Promise<EducationData[]> {
  return client.fetch(
    educationQuery,
    {},
    { next: { revalidate: SANITY_REVALIDATE_SECONDS, tags: ["sanity"] } },
  )
}
