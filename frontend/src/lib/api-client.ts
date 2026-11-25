import { portfolioSchema, type Portfolio } from './schemas'

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? ''

export async function fetchPortfolio(): Promise<Portfolio> {
  const response = await fetch(`${BASE_URL}/api/v1/portfolio`)
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  const json: unknown = await response.json()
  return portfolioSchema.parse(json)
}
