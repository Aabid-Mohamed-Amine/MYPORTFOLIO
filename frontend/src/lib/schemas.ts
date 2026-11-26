import { z } from 'zod'

export const experienceSchema = z
  .object({
    id: z.string(),
    company: z.string(),
    role: z.string(),
    role_en: z.string().nullable().optional().default(null),
    type: z.string(),
    type_en: z.string().nullable().optional().default(null),
    period: z.string(),
    location: z.string(),
    description: z.string(),
    description_en: z.string().nullable().optional().default(null),
    metrics: z.array(z.string()),
    tags: z.array(z.string()),
    repo_url: z.string().nullable().optional().default(null),
  })
  .passthrough()
  .transform((e) => ({
    id: e.id,
    company: e.company,
    role: e.role,
    roleEn: e.role_en ?? null,
    type: e.type,
    typeEn: e.type_en ?? null,
    period: e.period,
    location: e.location,
    description: e.description,
    descriptionEn: e.description_en ?? null,
    metrics: e.metrics,
    tags: e.tags,
    repoUrl: e.repo_url ?? null,
  }))

export const projectSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    title_en: z.string().nullable().optional().default(null),
    subtitle: z.string(),
    subtitle_en: z.string().nullable().optional().default(null),
    domain_tags: z.array(z.string()),
    description: z.string(),
    description_en: z.string().nullable().optional().default(null),
    architecture: z.string(),
    benchmarks: z.array(z.string()),
    tech_stack: z.array(z.string()),
    repo_url: z.string().nullable().optional().default(null),
    demo_url: z.string().nullable().optional().default(null),
  })
  .passthrough()
  .transform((p) => ({
    id: p.id,
    title: p.title,
    titleEn: p.title_en ?? null,
    subtitle: p.subtitle,
    subtitleEn: p.subtitle_en ?? null,
    domainTags: p.domain_tags,
    description: p.description,
    descriptionEn: p.description_en ?? null,
    architecture: p.architecture,
    benchmarks: p.benchmarks,
    techStack: p.tech_stack,
    repoUrl: p.repo_url ?? null,
    demoUrl: p.demo_url ?? null,
  }))

export const educationSchema = z
  .object({
    id: z.string(),
    degree: z.string(),
    degree_en: z.string().nullable().optional().default(null),
    institution: z.string(),
    year: z.string(),
    location: z.string(),
  })
  .passthrough()
  .transform((e) => ({
    id: e.id,
    degree: e.degree,
    degreeEn: e.degree_en ?? null,
    institution: e.institution,
    year: e.year,
    location: e.location,
  }))

export const certificationSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    issuer: z.string(),
    year: z.string(),
    url: z.string().nullable().optional().default(null),
  })
  .passthrough()
  .transform((c) => ({ ...c, url: c.url ?? null }))

export const skillCategorySchema = z
  .object({
    category: z.string(),
    skills: z.array(z.string()),
  })
  .passthrough()

export const aboutMetricSchema = z
  .object({
    label: z.string(),
    label_en: z.string().nullable().optional().default(null),
    value: z.string(),
  })
  .passthrough()
  .transform((m) => ({
    label: m.label,
    labelEn: m.label_en ?? null,
    value: m.value,
  }))

export const portfolioSchema = z
  .object({
    experiences: z.array(experienceSchema),
    projects: z.array(projectSchema),
    education: z.array(educationSchema),
    certifications: z.array(certificationSchema),
    skill_categories: z.array(skillCategorySchema),
    about_metrics: z.array(aboutMetricSchema),
  })
  .passthrough()
  .transform((p) => ({
    experiences: p.experiences,
    projects: p.projects,
    education: p.education,
    certifications: p.certifications,
    skillCategories: p.skill_categories,
    aboutMetrics: p.about_metrics,
  }))

export type Portfolio = z.infer<typeof portfolioSchema>
export type Experience = z.infer<typeof experienceSchema>
export type Project = z.infer<typeof projectSchema>
export type Education = z.infer<typeof educationSchema>
export type Certification = z.infer<typeof certificationSchema>
export type SkillCategory = z.infer<typeof skillCategorySchema>
export type AboutMetric = z.infer<typeof aboutMetricSchema>
