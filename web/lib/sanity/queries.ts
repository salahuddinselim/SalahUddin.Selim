import { groq } from 'next-sanity'

export const profileQuery = groq`*[_type == "profile"][0]{
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

export const navItemsQuery = groq`*[_type == "navItem"] | order(order asc) {
  label,
  href
}`

export const socialLinksQuery = groq`*[_type == "socialLink"] | order(order asc) {
  name,
  url,
  icon
}`

export const skillsQuery = groq`*[_type == "skill"] | order(order asc) {
  name,
  icon,
  category,
  proficiency
}`

export const projectsQuery = groq`*[_type == "project"] | order(year desc, featured desc) {
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

export const experienceQuery = groq`*[_type == "experience"] | order(order asc) {
  _id,
  company,
  role,
  period,
  description,
  achievements,
  technologies
}`

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc) {
  _id,
  name,
  role,
  company,
  "avatar": avatar.asset->url,
  content
}`

export const fullPortfolioQuery = groq`{
  "profile": ${profileQuery},
  "socialLinks": ${socialLinksQuery},
  "skills": ${skillsQuery},
  "projects": ${projectsQuery},
  "experience": ${experienceQuery},
  "testimonials": ${testimonialsQuery}
}`
