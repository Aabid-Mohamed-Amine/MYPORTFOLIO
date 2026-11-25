import { type ReactNode } from 'react'
import { motion } from 'motion/react'
import {
  Brain,
  Database,
  Cloud,
  Code2,
  BarChart3,
  Box,
  Layers,
  GitBranch,
  Server,
} from 'lucide-react'
import type { Portfolio } from '../../lib/schemas'

const SKILL_ICONS: Record<string, ReactNode> = {
  PyTorch: <Brain size={14} />,
  TensorFlow: <Brain size={14} />,
  'Hugging Face': <Code2 size={14} />,
  LangChain: <Layers size={14} />,
  'Scikit-learn': <BarChart3 size={14} />,
  OpenCV: <Box size={14} />,
  'Apache Spark': <Server size={14} />,
  PostgreSQL: <Database size={14} />,
  MongoDB: <Database size={14} />,
  Redis: <Database size={14} />,
  FAISS: <Database size={14} />,
  'Power BI': <BarChart3 size={14} />,
  Python: <Code2 size={14} />,
  FastAPI: <Server size={14} />,
  Docker: <Box size={14} />,
  Kubernetes: <Cloud size={14} />,
  'GitHub Actions': <GitBranch size={14} />,
  'Azure / AWS': <Cloud size={14} />,
}

const CATEGORY_ICONS: Record<string, ReactNode> = {
  'AI & Machine Learning': <Brain size={18} />,
  'Data Engineering & Databases': <Database size={18} />,
  'MLOps, Backend & Cloud': <Cloud size={18} />,
}

interface StackProps {
  data: Portfolio
}

export function Stack({ data }: StackProps) {
  return (
    <section id="stack" className="section-padding bg-surface">
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
            Outils & technologies
          </span>
          <h2 className="section-title mt-2 text-foreground">Tech Stack</h2>
        </motion.div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.skillCategories.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glow-card rounded-xl p-6 bg-background flex flex-col gap-5"
            >
              {/* Category header */}
              <div className="flex items-center gap-2.5">
                <span className="text-primary">
                  {CATEGORY_ICONS[cat.category] ?? <Code2 size={18} />}
                </span>
                <h3 className="font-mono text-xs font-medium text-foreground uppercase tracking-wider">
                  {cat.category}
                </h3>
              </div>

              {/* Skills list */}
              <div className="flex flex-col gap-2.5">
                {cat.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2.5 group">
                    <span className="text-primary/60 group-hover:text-primary transition-colors flex-shrink-0">
                      {SKILL_ICONS[skill] ?? (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/60 inline-block" />
                      )}
                    </span>
                    <span className="font-sans text-sm text-muted group-hover:text-foreground transition-colors">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
