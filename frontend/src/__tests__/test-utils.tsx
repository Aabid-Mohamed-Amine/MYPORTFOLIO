import { type ReactElement, type ReactNode } from 'react'
import { render as rtlRender, screen, fireEvent, waitFor, act, within, type RenderOptions } from '@testing-library/react'
import { LanguageProvider } from '../i18n/language-context'

function AllProviders({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}

function render(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return rtlRender(ui, { wrapper: AllProviders, ...options })
}

export { render, screen, fireEvent, waitFor, act, within }
