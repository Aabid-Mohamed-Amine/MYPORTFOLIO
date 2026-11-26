export interface Experience {
  id: string
  company: string
  role: string
  roleEn: string | null
  type: string
  typeEn: string | null
  period: string
  location: string
  description: string
  descriptionEn: string | null
  metrics: string[]
  tags: string[]
  repoUrl: string | null
}

export interface Project {
  id: string
  title: string
  titleEn: string | null
  subtitle: string
  subtitleEn: string | null
  domainTags: string[]
  description: string
  descriptionEn: string | null
  architecture: string
  benchmarks: string[]
  techStack: string[]
  repoUrl: string | null
  demoUrl: string | null
}

export interface Education {
  id: string
  degree: string
  degreeEn: string | null
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
  labelEn: string | null
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
