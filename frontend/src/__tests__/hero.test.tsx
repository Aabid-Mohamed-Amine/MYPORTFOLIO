import { describe, it, expect } from 'vitest'
import { render, screen } from './test-utils'
import { Hero } from '../components/sections/hero'
import { FALLBACK_PORTFOLIO } from '../data/portfolio-fallback'

describe('Hero', () => {
  it('renders H1 with "Turning raw data"', () => {
    render(<Hero data={FALLBACK_PORTFOLIO} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Turning raw data')
  })

  it('renders PyTorch tech pill', () => {
    render(<Hero data={FALLBACK_PORTFOLIO} />)
    expect(screen.getByText('PyTorch')).toBeInTheDocument()
  })

  it('renders all 6 tech pills', () => {
    render(<Hero data={FALLBACK_PORTFOLIO} />)
    const pills = ['Python', 'PyTorch', 'LangChain/RAG', 'SQL/Spark', 'Docker', 'Azure/AWS']
    pills.forEach((pill) => {
      expect(screen.getByText(pill)).toBeInTheDocument()
    })
  })

  it('renders CV download link', () => {
    render(<Hero data={FALLBACK_PORTFOLIO} />)
    const link = screen.getByRole('link', { name: /Télécharger CV/i })
    expect(link).toHaveAttribute('href', '/CV_Mohamed_Amine_AABID_FR.pdf')
  })

  it('renders projects CTA button', () => {
    render(<Hero data={FALLBACK_PORTFOLIO} />)
    expect(screen.getByText(/Voir les projets/)).toBeInTheDocument()
  })

  it('renders Python terminal block', () => {
    render(<Hero data={FALLBACK_PORTFOLIO} />)
    expect(screen.getByText(/AIEngineer/)).toBeInTheDocument()
  })
})
