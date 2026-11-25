import { motion } from 'motion/react'
import { ExternalLink, Github, Terminal } from 'lucide-react'
import { Badge } from '../ui/badge'
import type { Portfolio } from '../../lib/schemas'

interface ProjectsProps {
  data: Portfolio
}

export function Projects({ data }: ProjectsProps) {
  return (
    <section id="projects" className="section-padding bg-surface">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-xs text-primary uppercase tracking-widest">
            Réalisations techniques
          </span>
          <h2 className="section-title mt-2 text-foreground">Projets</h2>
        </motion.div>

        {/* Project cards */}
        <div className="flex flex-col gap-8">
          {data.projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              viewport={{ once: true }}
              className="glow-card rounded-2xl overflow-hidden bg-background"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                {/* Left — info */}
                <div className="lg:col-span-3 p-8 flex flex-col gap-4">
                  {/* Domain tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.domainTags.map((tag) => (
                      <Badge key={tag} variant="green">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="font-sans text-xl font-bold text-foreground">
                      {project.title}
                    </h3>
                    <p className="font-mono text-sm text-muted mt-1">{project.subtitle}</p>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-sm text-muted leading-relaxed">
                    {project.description}
                  </p>

                  {/* Benchmarks */}
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

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="gray">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-2">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-primary transition-colors"
                      >
                        <Github size={14} /> Code
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-primary transition-colors"
                      >
                        <ExternalLink size={14} /> Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Right — architecture mockup */}
                <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-custom p-6 flex flex-col justify-center bg-surface-raised">
                  <div className="flex items-center gap-2 mb-4">
                    <Terminal size={14} className="text-primary" />
                    <span className="font-mono text-xs text-muted uppercase tracking-wider">
                      Architecture
                    </span>
                  </div>
                  <pre className="font-mono text-xs text-muted leading-relaxed whitespace-pre-wrap break-words">
                    {project.architecture
                      .split(' · ')
                      .map((part, j) => (
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
          ))}
        </div>
      </div>
    </section>
  )
}
