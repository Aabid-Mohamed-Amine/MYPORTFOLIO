import { motion } from 'motion/react'
import { Download, ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { useLang } from '../../i18n/language-context'
import type { Portfolio } from '../../lib/schemas'

const TECH_PILLS = ['Python', 'PyTorch', 'LangChain/RAG', 'SQL/Spark', 'Docker', 'Azure/AWS']

const PYTHON_TERMINAL = `class AIEngineer:
    name = "Mohamed Amine Aabid"
    role = "AI & Data Engineer"

    stack = {
        "ai": ["PyTorch", "LangChain", "RAG"],
        "data": ["Spark", "PostgreSQL", "FAISS"],
        "mlops": ["Docker", "Azure", "MLflow"],
    }

    def deploy(self) -> str:
        return "Production-grade AI ✓"`

interface HeroProps {
  data: Portfolio
}

export function Hero({ data: _data }: HeroProps) {
  const { t, lang } = useLang()
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 section-padding overflow-hidden"
    >
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% -10%, hsl(142 72% 50% / 0.07), transparent)',
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          {/* Profile photo */}
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-primary/40 shadow-[0_0_20px_hsl(142_72%_50%/0.2)]">
                <img
                  src="/profile.jpeg"
                  alt="Mohamed Amine Aabid"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full bg-primary border-2 border-background shadow-[0_0_6px_hsl(142_72%_50%/0.8)]" />
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-foreground">Mohamed Amine Aabid</p>
              <p className="font-mono text-xs text-muted">AI & Data Engineer</p>
            </div>
          </div>

          {/* Availability badge */}
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-primary animate-blink" />
            <span className="font-mono text-xs text-primary tracking-widest uppercase">
              {t.hero.availability}
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-sans text-5xl font-extrabold leading-[1.08] tracking-tight text-foreground md:text-6xl xl:text-7xl">
            {t.hero.h1a}{' '}
            <span className="text-primary">{t.hero.h1b}</span>{' '}
            {t.hero.h1c}
            <span className="cursor-blink text-primary ml-1">|</span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-base text-muted leading-relaxed max-w-lg">
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() =>
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              {t.hero.ctaProjects} <ArrowRight size={16} className="ml-2" />
            </Button>
            <a href={`/api/v1/cv/${lang}`} download={`CV_Mohamed_Amine_AABID_${lang.toUpperCase()}.pdf`}>
              <Button variant="ghost" size="lg">
                <Download size={16} className="mr-2" />
                {t.hero.ctaCv}
              </Button>
            </a>
          </div>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {TECH_PILLS.map((pill) => (
              <span key={pill} className="tech-pill">
                {pill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right column — floating Python terminal */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:block"
        >
          <div className="terminal-block relative">
            {/* Window chrome */}
            <div className="flex items-center gap-1.5 mb-4">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-3 font-mono text-xs text-muted">ai_engineer.py</span>
            </div>

            {/* Code */}
            <pre className="font-mono text-sm leading-relaxed overflow-x-auto">
              {PYTHON_TERMINAL.split('\n').map((line, i) => {
                const isKeyword =
                  line.trim().startsWith('class') ||
                  line.trim().startsWith('def') ||
                  line.trim().startsWith('return')
                const isString = line.includes('"') || line.includes("'")
                const isComment = line.trim().startsWith('#')
                return (
                  <div key={i} className="whitespace-pre">
                    {isComment ? (
                      <span className="text-muted">{line}</span>
                    ) : isKeyword ? (
                      <span className="text-primary">{line}</span>
                    ) : isString ? (
                      <span className="text-foreground/80">{line}</span>
                    ) : (
                      <span className="text-foreground/70">{line}</span>
                    )}
                  </div>
                )
              })}
            </pre>

            {/* Green ambient shadow */}
            <div
              className="pointer-events-none absolute inset-0 rounded-xl"
              style={{
                boxShadow: '0 0 60px hsl(142 72% 50% / 0.12)',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
