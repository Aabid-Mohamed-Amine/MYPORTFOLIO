import { motion } from 'motion/react'
import { MapPin, Calendar, Github } from 'lucide-react'
import { Badge } from '../ui/badge'
import { useLang } from '../../i18n/language-context'
import type { Portfolio } from '../../lib/schemas'

interface ExperienceProps {
  data: Portfolio
}

export function Experience({ data }: ExperienceProps) {
  const { t, lang } = useLang()
  return (
    <section id="experiences" className="section-padding">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-xs text-primary uppercase tracking-widest">
            {t.experience.eyebrow}
          </span>
          <h2 className="section-title mt-2 text-foreground">{t.experience.title}</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          <div className="flex flex-col gap-12">
            {data.experiences.map((exp, i) => {
              const role = lang === 'en' ? (exp.roleEn ?? exp.role) : exp.role
              const type = lang === 'en' ? (exp.typeEn ?? exp.type) : exp.type
              const description = lang === 'en' ? (exp.descriptionEn ?? exp.description) : exp.description
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="relative pl-14"
                >
                  <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-surface-raised">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_8px_hsl(142_72%_50%/0.8)]" />
                  </div>

                  <div className="glow-card rounded-xl p-6 bg-surface">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-sans text-base font-semibold text-foreground">{role}</h3>
                        <p className="font-mono text-sm text-primary mt-0.5">{exp.company}</p>
                      </div>
                      <Badge variant="gray">{type}</Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-3 font-mono text-xs text-muted">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>

                    <p className="font-sans text-sm text-muted leading-relaxed mb-4">{description}</p>

                    {exp.metrics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.metrics.map((metric) => (
                          <span
                            key={metric}
                            className="font-mono text-xs text-primary border border-primary/30 bg-primary/8 rounded-md px-2.5 py-1"
                          >
                            ↗ {metric}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-1.5">
                      {exp.tags.map((tag) => (
                        <Badge key={tag} variant="gray">
                          {tag}
                        </Badge>
                      ))}
                      {exp.repoUrl && (
                        <a
                          href={exp.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto flex items-center gap-1.5 font-mono text-xs text-muted hover:text-primary transition-colors"
                        >
                          <Github size={13} />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
