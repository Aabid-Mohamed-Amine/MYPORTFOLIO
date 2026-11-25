import { Github, Linkedin, ExternalLink } from 'lucide-react'

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Aabid-Mohamed-Amine',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/mohamed-amine-aabid',
    icon: Linkedin,
  },
  {
    label: 'Kaggle',
    href: 'https://kaggle.com',
    icon: ExternalLink,
  },
]

export function Footer() {
  return (
    <footer className="border-t border-custom bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-12">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} Mohamed Amine Aabid — AI & Data Engineer
          </p>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-muted hover:text-primary transition-colors duration-150"
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
