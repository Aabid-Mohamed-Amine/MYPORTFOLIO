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

export default function App() {
  const { data, loading, error } = usePortfolioData()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="font-mono text-xs text-primary animate-pulse">
            Chargement du portfolio…
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {error && (
        <div className="fixed top-16 inset-x-0 z-40 flex justify-center px-4 pt-2">
          <div className="font-mono text-xs text-muted border border-muted/30 bg-surface rounded-md px-3 py-1.5">
            ⚡ Mode offline — données statiques
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
