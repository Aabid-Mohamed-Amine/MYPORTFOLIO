import { Navbar } from './components/layout/navbar'
import { Footer } from './components/layout/footer'
import { Hero } from './components/sections/hero'
import { Experience } from './components/sections/experience'
import { Projects } from './components/sections/projects'
import { Education } from './components/sections/education'
import { Stack } from './components/sections/stack'
import { About } from './components/sections/about'
import { Contact } from './components/sections/contact'
import { usePortfolioData } from './hooks/use-portfolio-data'
import { LanguageProvider, useLang } from './i18n/language-context'

function PortfolioApp() {
  const { data, loading, error } = usePortfolioData()
  const { t } = useLang()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="font-mono text-xs text-primary animate-pulse">{t.app.loading}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {error && (
        <div className="fixed top-16 inset-x-0 z-40 flex justify-center px-4 pt-2">
          <div className="font-mono text-xs text-muted border border-muted/30 bg-surface rounded-md px-3 py-1.5">
            {t.app.offline}
          </div>
        </div>
      )}

      <main>
        <Hero data={data} />
        <Experience data={data} />
        <Projects data={data} />
        <Education data={data} />
        <Stack data={data} />
        <About data={data} />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioApp />
    </LanguageProvider>
  )
}
