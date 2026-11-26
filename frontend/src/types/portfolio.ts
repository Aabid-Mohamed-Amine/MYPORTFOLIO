export interface Experience {
  id: string
  company: string
  role: string
  type: string
  period: string
  location: string
  description: string
  metrics: string[]
  tags: string[]
  repoUrl: string | null
}

export interface Project {
  id: string
  title: string
  subtitle: string
  domainTags: string[]
  description: string
  architecture: string
  benchmarks: string[]
  techStack: string[]
  repoUrl: string | null
  demoUrl: string | null
}

export interface Education {
  id: string
  degree: string
  institution: string
  year: string
  location: string
}

export interface Certification {
  id: string
  title: string
  issuer: string
  year: string
  url: string | null
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface AboutMetric {
  label: string
  value: string
}

export interface Portfolio {
  experiences: Experience[]
  projects: Project[]
  education: Education[]
  certifications: Certification[]
  skillCategories: SkillCategory[]
  aboutMetrics: AboutMetric[]
}
