import { describe, it, expect } from 'vitest'
import { render, screen } from './test-utils'
import { Navbar } from '../components/layout/navbar'

describe('Navbar', () => {
  it('renders identity name', () => {
    render(<Navbar />)
    expect(screen.getByText('Mohamed Amine Aabid')).toBeInTheDocument()
  })

  it('renders AI & Data Engineer badge', () => {
    render(<Navbar />)
    expect(screen.getByText('AI & Data Engineer')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Navbar />)
    const links = ['Expériences', 'Projets', 'Formation', 'Stack', 'Contact']
    links.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('renders Me contacter CTA', () => {
    render(<Navbar />)
    expect(screen.getByText(/Me contacter/)).toBeInTheDocument()
  })

  it('nav links point to correct anchors', () => {
    render(<Navbar />)
    const experiencesLink = screen.getByText('Expériences').closest('a')
    expect(experiencesLink).toHaveAttribute('href', '#experiences')
  })
})
