import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { useLang } from '../../i18n/language-context'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, lang, toggle } = useLang()

  const NAV_LINKS = [
    { label: t.nav.experiences, href: '#experiences' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.formation, href: '#formation' },
    { label: t.nav.stack, href: '#stack' },
    { label: t.nav.contact, href: '#contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-custom backdrop-blur-md bg-background/80">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Identity */}
          <div className="flex items-center gap-3">
            <span className="font-sans text-base font-bold text-foreground tracking-tight">
              Mohamed Amine Aabid
            </span>
            <Badge variant="green" className="hidden sm:inline-flex">
              AI & Data Engineer
            </Badge>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-muted hover:text-primary transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={toggle}
              className="font-mono text-xs font-medium border border-custom rounded-md px-2.5 py-1.5 text-muted hover:border-primary hover:text-primary transition-colors"
              aria-label="Switch language"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {t.nav.cta}
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              className="font-mono text-xs font-medium border border-custom rounded-md px-2 py-1 text-muted hover:border-primary hover:text-primary transition-colors"
              aria-label="Switch language"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <button
              className="text-foreground p-2"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-custom bg-surface"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm text-muted hover:text-primary transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setMenuOpen(false)
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="self-start"
              >
                {t.nav.cta}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
