import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Contact } from '../components/sections/contact'
import { About } from '../components/sections/about'
import { FALLBACK_PORTFOLIO } from '../data/portfolio-fallback'

describe('About', () => {
  it('renders À Propos heading', () => {
    render(<About data={FALLBACK_PORTFOLIO} />)
    expect(screen.getByText('À Propos')).toBeInTheDocument()
  })

  it('renders all 3 engineering metrics', () => {
    render(<About data={FALLBACK_PORTFOLIO} />)
    expect(FALLBACK_PORTFOLIO.aboutMetrics).toHaveLength(3)
    FALLBACK_PORTFOLIO.aboutMetrics.forEach((m) => {
      expect(screen.getByText(m.value)).toBeInTheDocument()
    })
  })

  it('renders CDI ou Alternance text', () => {
    render(<About data={FALLBACK_PORTFOLIO} />)
    expect(screen.getByText(/CDI ou Alternance/)).toBeInTheDocument()
  })
})

describe('Contact', () => {
  it('renders contact CTA heading', () => {
    render(<Contact />)
    expect(screen.getByText(/Prêt à construire/)).toBeInTheDocument()
  })

  it('renders email copy button', () => {
    render(<Contact />)
    const copyBtn = screen.getByRole('button', { name: /copy email/i })
    expect(copyBtn).toBeInTheDocument()
  })

  it('renders Poser une question chat button', () => {
    render(<Contact />)
    expect(screen.getByText('Poser une question')).toBeInTheDocument()
  })
})
