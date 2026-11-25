import { describe, it, expect } from 'vitest'
import { render, screen } from './test-utils'
import { Experience } from '../components/sections/experience'
import { Projects } from '../components/sections/projects'
import { Education } from '../components/sections/education'
import { Stack } from '../components/sections/stack'
import { FALLBACK_PORTFOLIO } from '../data/portfolio-fallback'

describe('Experience', () => {
  it('renders Expériences heading', () => {
    render(<Experience data={FALLBACK_PORTFOLIO} />)
    expect(screen.getByText('Expériences')).toBeInTheDocument()
  })

  it('renders all experience company names', () => {
    render(<Experience data={FALLBACK_PORTFOLIO} />)
    expect(screen.getAllByText(/BDO|SNRT|3DSF|WeHelp|ONEE/i).length).toBeGreaterThan(0)
  })

  it('renders -46% metric from BDO experience', () => {
    render(<Experience data={FALLBACK_PORTFOLIO} />)
    expect(screen.getByText(/-46%/)).toBeInTheDocument()
  })
})

describe('Projects', () => {
  it('renders Projets heading', () => {
    render(<Projects data={FALLBACK_PORTFOLIO} />)
    expect(screen.getByText('Projets')).toBeInTheDocument()
  })

  it('renders at least one benchmark badge', () => {
    render(<Projects data={FALLBACK_PORTFOLIO} />)
    const benchmarks = screen.getAllByText(/F1-Score|AUC|Accuracy/i)
    expect(benchmarks.length).toBeGreaterThan(0)
  })

  it('renders 5 project articles', () => {
    render(<Projects data={FALLBACK_PORTFOLIO} />)
    const articles = document.querySelectorAll('article')
    expect(articles).toHaveLength(5)
  })
})

describe('Education', () => {
  it('renders Formation heading', () => {
    render(<Education data={FALLBACK_PORTFOLIO} />)
    expect(screen.getByText('Formation')).toBeInTheDocument()
  })

  it('renders Certifications section', () => {
    render(<Education data={FALLBACK_PORTFOLIO} />)
    expect(screen.getByText('Certifications')).toBeInTheDocument()
  })

  it('renders 3 education degrees', () => {
    render(<Education data={FALLBACK_PORTFOLIO} />)
    expect(screen.getByText(/Master/)).toBeInTheDocument()
    expect(screen.getByText(/Licence/)).toBeInTheDocument()
    expect(screen.getByText(/DUT/)).toBeInTheDocument()
  })
})

describe('Stack', () => {
  it('renders Tech Stack heading', () => {
    render(<Stack data={FALLBACK_PORTFOLIO} />)
    expect(screen.getByText('Tech Stack')).toBeInTheDocument()
  })

  it('renders 3 skill categories', () => {
    render(<Stack data={FALLBACK_PORTFOLIO} />)
    expect(screen.getByText(/AI & Machine Learning/i)).toBeInTheDocument()
    expect(screen.getByText(/Data Engineering/i)).toBeInTheDocument()
    expect(screen.getByText(/MLOps/i)).toBeInTheDocument()
  })

  it('renders PyTorch in skills list', () => {
    render(<Stack data={FALLBACK_PORTFOLIO} />)
    const pytorch = screen.getAllByText('PyTorch')
    expect(pytorch.length).toBeGreaterThan(0)
  })
})
