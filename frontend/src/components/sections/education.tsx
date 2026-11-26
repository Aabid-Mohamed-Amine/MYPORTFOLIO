import { motion } from 'motion/react'
import { GraduationCap, Award } from 'lucide-react'
import { useLang } from '../../i18n/language-context'
import type { Portfolio } from '../../lib/schemas'

interface EducationProps {
  data: Portfolio
}

export function Education({ data }: EducationProps) {
  const { t, lang } = useLang()
  return (
    <section id="formation" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-xs text-primary uppercase tracking-widest">
            {t.education.eyebrow}
          </span>
          <h2 className="section-title mt-2 text-foreground">{t.education.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {data.education.map((edu, i) => {
            const degree = lang === 'en' ? (edu.degreeEn ?? edu.degree) : edu.degree
            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="glow-card rounded-xl p-6 bg-surface flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <GraduationCap size={20} className="text-primary" />
                  <span className="font-mono text-xs text-muted">{edu.year}</span>
                </div>
                <div>
                  <h3 className="font-sans text-sm font-semibold text-foreground leading-snug">
                    {degree}
                  </h3>
                  <p className="font-mono text-xs text-primary mt-1">{edu.institution}</p>
                  <p className="font-mono text-xs text-muted mt-0.5">{edu.location}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Award size={18} className="text-primary" />
            <h3 className="font-sans text-lg font-semibold text-foreground">
              {t.education.certifications}
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {data.certifications.map((cert) => (
              <div
                key={cert.id}
                className="glow-card rounded-lg px-4 py-3 bg-surface flex items-center gap-3"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <div>
                  <span className="font-sans text-sm font-medium text-foreground">{cert.title}</span>
                  <span className="font-mono text-xs text-muted ml-2">
                    {cert.issuer} · {cert.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
