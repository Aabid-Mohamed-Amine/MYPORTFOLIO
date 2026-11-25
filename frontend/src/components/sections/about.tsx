import { motion } from 'motion/react'
import type { Portfolio } from '../../lib/schemas'

interface AboutProps {
  data: Portfolio
}

export function About({ data }: AboutProps) {
  return (
    <section id="about" className="section-padding">
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
            Profil & chiffres
          </span>
          <h2 className="section-title mt-2 text-foreground">À Propos</h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Photo + métriques */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Profile photo */}
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

            {/* Métriques */}
            <div className="grid grid-cols-1 gap-3 mt-2">
              {data.aboutMetrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glow-card rounded-xl p-4 bg-surface flex items-center gap-4"
                >
                  <div className="font-mono text-2xl font-bold text-primary">{metric.value}</div>
                  <div>
                    <div className="font-sans text-sm font-semibold text-foreground">{metric.label}</div>
                    <div className="font-mono text-xs text-muted">{metric.description}</div>
                  </div>
                </motion.div>
              ))}
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
            <p className="font-sans text-base text-muted leading-relaxed">
              Passionné par l&apos;intersection entre l&apos;IA, la data et le déploiement
              production, je construis des systèmes intelligents capables de passer du prototype
              à l&apos;échelle industrielle.
            </p>
            <p className="font-sans text-base text-muted leading-relaxed">
              Mon profil combine data engineering (pipelines ETL/ELT, Spark, bases vectorielles),
              machine learning appliqué (NLP, LLM fine-tuning, Computer Vision) et MLOps
              (conteneurisation, CI/CD, monitoring). Je conçois des architectures bout-en-bout :
              de l&apos;ingestion des données brutes jusqu&apos;à l&apos;API de serving en production.
            </p>
            <p className="font-sans text-base text-muted leading-relaxed">
              Je cherche un poste{' '}
              <span className="text-primary font-semibold">CDI ou Alternance</span> pour
              concevoir et opérer des systèmes d&apos;IA à fort impact, au sein d&apos;une équipe
              tech exigeante.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
