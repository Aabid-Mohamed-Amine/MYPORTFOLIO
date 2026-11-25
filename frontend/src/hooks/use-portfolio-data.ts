import { useEffect, useState } from 'react'
import { fetchPortfolio } from '../lib/api-client'
import { type Portfolio } from '../lib/schemas'
import { FALLBACK_PORTFOLIO } from '../data/portfolio-fallback'

interface UsePortfolioDataResult {
  data: Portfolio
  loading: boolean
  error: string | null
}

export function usePortfolioData(): UsePortfolioDataResult {
  const [data, setData] = useState<Portfolio>(FALLBACK_PORTFOLIO)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchPortfolio()
      .then((portfolio) => {
        if (!cancelled) {
          setData(portfolio)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Failed to fetch portfolio'
          console.warn('Portfolio API unavailable, using fallback data:', message)
          setData(FALLBACK_PORTFOLIO)
          setError(message)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading, error }
}
