import { describe, it, expect } from 'vitest'
import { portfolioSchema } from '../lib/schemas'

const mockPortfolio = {
  experiences: [
    {
      id: 'bdo',
      company: 'BDO Maroc',
      role: 'AI Engineer',
      type: 'PFE',
      period: 'Fév 2025 – Juil 2025',
      location: 'Casablanca',
      description: 'Test description',
      metrics: ['-46% audit time'],
      tags: ['Docker', 'FastAPI'],
    },
  ],
  projects: [
    {
      id: 'auditscan',
      title: 'AuditScanIA',
      subtitle: 'Multi-Agent AI',
      domain_tags: ['RAG', 'DOCKER'],
      description: 'Test project',
      architecture: 'Docker · FastAPI',
      benchmarks: ['Risk Score: 90/100'],
      tech_stack: ['Docker', 'FastAPI'],
      repo_url: null,
      demo_url: null,
    },
  ],
  education: [
    {
      id: 'master',
      degree: 'Master Science et Ingénierie de Données',
      institution: 'Université Mohammed V',
      year: '2024–2026',
      location: 'Rabat',
    },
  ],
  certifications: [
    {
      id: 'cert-ds',
      title: 'Data Science',
      issuer: '365 Data Science',
      year: '2023',
      url: null,
    },
  ],
  skill_categories: [
    {
      category: 'AI & Machine Learning',
      skills: ['PyTorch', 'TensorFlow'],
    },
  ],
  about_metrics: [
    { label: 'Pipelines IA déployés', value: '5+' },
  ],
}

describe('portfolioSchema', () => {
  it('parses valid portfolio response', () => {
    const result = portfolioSchema.safeParse(mockPortfolio)
    expect(result.success).toBe(true)
  })

  it('transforms snake_case to camelCase', () => {
    const result = portfolioSchema.safeParse(mockPortfolio)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.skillCategories).toBeDefined()
      expect(result.data.aboutMetrics).toBeDefined()
      expect(result.data.projects[0].domainTags).toEqual(['RAG', 'DOCKER'])
      expect(result.data.projects[0].techStack).toEqual(['Docker', 'FastAPI'])
    }
  })

  it('succeeds with extra unknown fields (passthrough)', () => {
    const withExtra = { ...mockPortfolio, unknown_field: 'extra' }
    const result = portfolioSchema.safeParse(withExtra)
    expect(result.success).toBe(true)
  })

  it('rejects missing experiences', () => {
    const { experiences: _exp, ...rest } = mockPortfolio
    const result = portfolioSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  it('rejects missing projects', () => {
    const { projects: _proj, ...rest } = mockPortfolio
    const result = portfolioSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })
})
