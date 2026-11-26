import { motion } from 'motion/react'
import { useLang } from '../../i18n/language-context'
import type { Portfolio } from '../../lib/schemas'

interface AboutProps {
  data: Portfolio
}

export function About({ data }: AboutProps) {
  const { t, lang } = useLang()
  return (
    <section id="about" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-xs text-primary uppercase tracking-widest">
            {t.about.eyebrow}
          </span>
          <h2 className="section-title mt-2 text-foreground">{t.about.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Photo + métriques */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="relative w-fit">
              <div className="h-80 w-80 rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_40px_hsl(142_72%_50%/0.1)]">
                <img
                  src="/profile.jpeg"
                  alt="Mohamed Amine Aabid"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 font-mono text-xs text-primary border border-primary/40 bg-background rounded-lg px-3 py-1.5 shadow-[0_0_16px_hsl(142_72%_50%/0.2)]">
                AI & Data Engineer
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 mt-2">
              {data.aboutMetrics.map((metric, i) => {
                const label = lang === 'en' ? (metric.labelEn ?? metric.label) : metric.label
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="glow-card rounded-xl p-4 bg-surface flex items-center gap-4"
                  >
                    <div className="font-mono text-2xl font-bold text-primary">{metric.value}</div>
                    <div className="font-sans text-sm font-semibold text-foreground">{label}</div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-5"
          >
            <p className="font-sans text-base text-muted leading-relaxed">{t.about.p1}</p>
            <p className="font-sans text-base text-muted leading-relaxed">{t.about.p2}</p>
            <p className="font-sans text-base text-muted leading-relaxed">
              {t.about.p3a}{' '}
              <span className="text-primary font-semibold">{t.about.p3b}</span>{' '}
              {t.about.p3c}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
