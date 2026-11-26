import { motion } from 'motion/react'
import { ExternalLink, Github, Terminal } from 'lucide-react'
import { Badge } from '../ui/badge'
import { useLang } from '../../i18n/language-context'
import type { Portfolio } from '../../lib/schemas'

interface ProjectsProps {
  data: Portfolio
}

export function Projects({ data }: ProjectsProps) {
  const { t, lang } = useLang()
  return (
    <section id="projects" className="section-padding bg-surface">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-xs text-primary uppercase tracking-widest">
            {t.projects.eyebrow}
          </span>
          <h2 className="section-title mt-2 text-foreground">{t.projects.title}</h2>
        </motion.div>

        <div className="flex flex-col gap-8">
          {data.projects.map((project, i) => {
            const title = lang === 'en' ? (project.titleEn ?? project.title) : project.title
            const subtitle = lang === 'en' ? (project.subtitleEn ?? project.subtitle) : project.subtitle
            const description = lang === 'en' ? (project.descriptionEn ?? project.description) : project.description
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="glow-card rounded-2xl overflow-hidden bg-background"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                  <div className="lg:col-span-3 p-8 flex flex-col gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.domainTags.map((tag) => (
                        <Badge key={tag} variant="green">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div>
                      <h3 className="font-sans text-xl font-bold text-foreground">{title}</h3>
                      <p className="font-mono text-sm text-muted mt-1">{subtitle}</p>
                    </div>

                    <p className="font-sans text-sm text-muted leading-relaxed">{description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.benchmarks.map((bench) => (
                        <span
                          key={bench}
                          className="font-mono text-xs font-medium text-primary border border-primary/40 bg-primary/8 rounded-lg px-3 py-1.5"
                        >
                          {bench}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="gray">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-2">
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-primary transition-colors"
                        >
                          <Github size={14} /> {t.projects.code}
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-primary transition-colors"
                        >
                          <ExternalLink size={14} /> {t.projects.demo}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-custom p-6 flex flex-col justify-center bg-surface-raised">
                    <div className="flex items-center gap-2 mb-4">
                      <Terminal size={14} className="text-primary" />
                      <span className="font-mono text-xs text-muted uppercase tracking-wider">
                        {t.projects.architecture}
                      </span>
                    </div>
                    <pre className="font-mono text-xs text-muted leading-relaxed whitespace-pre-wrap break-words">
                      {project.architecture.split(' · ').map((part, j) => (
                        <span key={j}>
                          <span className="text-primary">▸</span>{' '}
                          <span className="text-foreground/70">{part}</span>
                          {j < project.architecture.split(' · ').length - 1 && '\n'}
                        </span>
                      ))}
                    </pre>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
