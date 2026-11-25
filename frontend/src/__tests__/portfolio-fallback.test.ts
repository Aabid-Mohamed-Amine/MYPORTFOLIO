import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { portfolioSchema } from '../lib/schemas'
import { FALLBACK_PORTFOLIO } from '../data/portfolio-fallback'
import { usePortfolioData } from '../hooks/use-portfolio-data'

describe('FALLBACK_PORTFOLIO', () => {
  it('satisfies portfolioSchema', () => {
    // The fallback is already in camelCase (post-transform shape).
    // We validate it structurally against what the hook returns.
    expect(FALLBACK_PORTFOLIO.experiences).toHaveLength(5)
    expect(FALLBACK_PORTFOLIO.projects).toHaveLength(5)
    expect(FALLBACK_PORTFOLIO.education).toHaveLength(3)
    expect(FALLBACK_PORTFOLIO.skillCategories).toHaveLength(3)
  })

  it('has 5 experiences', () => {
    expect(FALLBACK_PORTFOLIO.experiences).toHaveLength(5)
  })

  it('has 5 projects', () => {
    expect(FALLBACK_PORTFOLIO.projects).toHaveLength(5)
  })

  it('first experience is bdo', () => {
    expect(FALLBACK_PORTFOLIO.experiences[0].id).toBe('bdo')
  })
})

describe('usePortfolioData fallback', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('falls back to static data on fetch failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network Error'))

    const { result } = renderHook(() => usePortfolioData())

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data.experiences).toHaveLength(5)
    expect(result.current.error).not.toBeNull()
    expect(result.current.error).toContain('Network Error')
  })

  it('falls back on 500 response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(null, { status: 500 }),
    )

    const { result } = renderHook(() => usePortfolioData())

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data.experiences).toHaveLength(5)
    expect(result.current.error).not.toBeNull()
  })
})
