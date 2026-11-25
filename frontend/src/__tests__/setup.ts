import '@testing-library/jest-dom'

// jsdom does not ship IntersectionObserver; framer-motion's viewport feature needs it
const mockIntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
globalThis.IntersectionObserver = mockIntersectionObserver

// jsdom does not ship ResizeObserver either
const mockResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
globalThis.ResizeObserver = mockResizeObserver
