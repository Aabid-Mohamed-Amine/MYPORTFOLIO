import { useState, useEffect, type FormEvent } from 'react'

const API = '/api/v1/admin'

// ── Types ────────────────────────────────────────────────────────────────────

interface Experience {
  id: string; company: string; role: string; type: string
  period: string; location: string; description: string
  metrics: string[]; tags: string[]; repo_url: string | null
}
interface Project {
  id: string; title: string; subtitle: string; domain_tags: string[]
  description: string; architecture: string; benchmarks: string[]
  tech_stack: string[]; repo_url: string | null; demo_url: string | null
}
interface Education {
  id: string; degree: string; institution: string; year: string; location: string
}
interface Certification {
  id: string; title: string; issuer: string; year: string; url: string | null
}
interface SkillCategory { category: string; skills: string[] }
interface AboutMetric { label: string; value: string }
interface Portfolio {
  experiences: Experience[]; projects: Project[]; education: Education[]
  certifications: Certification[]; skill_categories: SkillCategory[]; about_metrics: AboutMetric[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function authHeader(token: string) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
}

function newId() {
  return Math.random().toString(36).slice(2, 10)
}

function tagsFromStr(s: string): string[] {
  return s.split(',').map(t => t.trim()).filter(Boolean)
}

// ── Sub-components ───────────────────────────────────────────────────────────

function Field({ label, value, onChange, multiline = false }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-mono text-xs text-muted uppercase tracking-wider">{label}</label>
      {multiline
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)}
            className="admin-input resize-none" />
        : <input value={value} onChange={e => onChange(e.target.value)} className="admin-input" />
      }
    </div>
  )
}

function TagsField({ label, value, onChange }: {
  label: string; value: string[]; onChange: (v: string[]) => void
}) {
  return (
    <Field label={`${label} (séparés par virgule)`}
      value={value.join(', ')}
      onChange={s => onChange(tagsFromStr(s))} />
  )
}

// ── Experiences Tab ──────────────────────────────────────────────────────────

function ExperienceForm({ exp, onSave, onCancel }: {
  exp: Experience; onSave: (e: Experience) => void; onCancel: () => void
}) {
  const [d, setD] = useState({ ...exp })
  const set = (k: keyof Experience) => (v: unknown) => setD(prev => ({ ...prev, [k]: v }))
  return (
    <div className="admin-card flex flex-col gap-4">
      <Field label="Entreprise" value={d.company} onChange={set('company')} />
      <Field label="Rôle" value={d.role} onChange={set('role')} />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Type (Stage / PFE / CDI)" value={d.type} onChange={set('type')} />
        <Field label="Période" value={d.period} onChange={set('period')} />
      </div>
      <Field label="Lieu" value={d.location} onChange={set('location')} />
      <Field label="Description" value={d.description} onChange={set('description')} multiline />
      <TagsField label="Métriques" value={d.metrics} onChange={set('metrics')} />
      <TagsField label="Tags techniques" value={d.tags} onChange={set('tags')} />
      <Field label="Lien repo GitHub (optionnel)" value={d.repo_url ?? ''} onChange={v => set('repo_url')(v || null)} />
      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave(d)} className="admin-btn-primary">Sauvegarder</button>
        <button onClick={onCancel} className="admin-btn-ghost">Annuler</button>
      </div>
    </div>
  )
}

function ExperiencesTab({ portfolio, onChange }: { portfolio: Portfolio; onChange: (p: Portfolio) => void }) {
  const [editing, setEditing] = useState<string | null>(null)
  const save = (exp: Experience) => {
    onChange({ ...portfolio, experiences: portfolio.experiences.map(e => e.id === exp.id ? exp : e) })
    setEditing(null)
  }
  const add = () => {
    const blank: Experience = {
      id: newId(), company: '', role: '', type: 'Stage', period: '',
      location: '', description: '', metrics: [], tags: [], repo_url: null
    }
    onChange({ ...portfolio, experiences: [blank, ...portfolio.experiences] })
    setEditing(blank.id)
  }
  const remove = (id: string) => onChange({ ...portfolio, experiences: portfolio.experiences.filter(e => e.id !== id) })
  return (
    <div className="flex flex-col gap-4">
      <button onClick={add} className="admin-btn-primary self-start">+ Ajouter une expérience</button>
      {portfolio.experiences.map(exp => (
        editing === exp.id
          ? <ExperienceForm key={exp.id} exp={exp} onSave={save} onCancel={() => setEditing(null)} />
          : <div key={exp.id} className="admin-card flex items-start justify-between gap-4">
              <div>
                <p className="font-sans font-semibold text-foreground">{exp.company || '(sans nom)'}</p>
                <p className="font-mono text-xs text-muted mt-0.5">{exp.role}</p>
                <p className="font-mono text-xs text-primary mt-0.5">{exp.period}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing(exp.id)} className="admin-btn-ghost text-xs">Modifier</button>
                <button onClick={() => remove(exp.id)} className="admin-btn-danger text-xs">Supprimer</button>
              </div>
            </div>
      ))}
    </div>
  )
}

// ── Projects Tab ─────────────────────────────────────────────────────────────

function ProjectForm({ proj, onSave, onCancel }: {
  proj: Project; onSave: (p: Project) => void; onCancel: () => void
}) {
  const [d, setD] = useState({ ...proj })
  const set = (k: keyof Project) => (v: unknown) => setD(prev => ({ ...prev, [k]: v }))
  return (
    <div className="admin-card flex flex-col gap-4">
      <Field label="Titre" value={d.title} onChange={set('title')} />
      <Field label="Sous-titre" value={d.subtitle} onChange={set('subtitle')} />
      <TagsField label="Domain tags" value={d.domain_tags} onChange={set('domain_tags')} />
      <Field label="Description" value={d.description} onChange={set('description')} multiline />
      <Field label="Architecture" value={d.architecture} onChange={set('architecture')} multiline />
      <TagsField label="Benchmarks" value={d.benchmarks} onChange={set('benchmarks')} />
      <TagsField label="Stack technique" value={d.tech_stack} onChange={set('tech_stack')} />
      <Field label="Lien repo GitHub" value={d.repo_url ?? ''} onChange={v => set('repo_url')(v || null)} />
      <Field label="Lien démo" value={d.demo_url ?? ''} onChange={v => set('demo_url')(v || null)} />
      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave(d)} className="admin-btn-primary">Sauvegarder</button>
        <button onClick={onCancel} className="admin-btn-ghost">Annuler</button>
      </div>
    </div>
  )
}

function ProjectsTab({ portfolio, onChange }: { portfolio: Portfolio; onChange: (p: Portfolio) => void }) {
  const [editing, setEditing] = useState<string | null>(null)
  const save = (proj: Project) => {
    onChange({ ...portfolio, projects: portfolio.projects.map(p => p.id === proj.id ? proj : p) })
    setEditing(null)
  }
  const add = () => {
    const blank: Project = {
      id: newId(), title: '', subtitle: '', domain_tags: [], description: '',
      architecture: '', benchmarks: [], tech_stack: [], repo_url: null, demo_url: null
    }
    onChange({ ...portfolio, projects: [blank, ...portfolio.projects] })
    setEditing(blank.id)
  }
  const remove = (id: string) => onChange({ ...portfolio, projects: portfolio.projects.filter(p => p.id !== id) })
  return (
    <div className="flex flex-col gap-4">
      <button onClick={add} className="admin-btn-primary self-start">+ Ajouter un projet</button>
      {portfolio.projects.map(proj => (
        editing === proj.id
          ? <ProjectForm key={proj.id} proj={proj} onSave={save} onCancel={() => setEditing(null)} />
          : <div key={proj.id} className="admin-card flex items-start justify-between gap-4">
              <div>
                <p className="font-sans font-semibold text-foreground">{proj.title || '(sans titre)'}</p>
                <p className="font-mono text-xs text-muted mt-0.5">{proj.subtitle}</p>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {proj.domain_tags.map(t => <span key={t} className="font-mono text-xs text-primary border border-primary/30 rounded px-1.5 py-0.5">{t}</span>)}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing(proj.id)} className="admin-btn-ghost text-xs">Modifier</button>
                <button onClick={() => remove(proj.id)} className="admin-btn-danger text-xs">Supprimer</button>
              </div>
            </div>
      ))}
    </div>
  )
}

// ── Education Tab ─────────────────────────────────────────────────────────────

function EducationTab({ portfolio, onChange }: { portfolio: Portfolio; onChange: (p: Portfolio) => void }) {
  const [editing, setEditing] = useState<string | null>(null)
  const save = (edu: Education) => {
    onChange({ ...portfolio, education: portfolio.education.map(e => e.id === edu.id ? edu : e) })
    setEditing(null)
  }
  const add = () => {
    const blank: Education = { id: newId(), degree: '', institution: '', year: '', location: '' }
    onChange({ ...portfolio, education: [blank, ...portfolio.education] })
    setEditing(blank.id)
  }
  const remove = (id: string) => onChange({ ...portfolio, education: portfolio.education.filter(e => e.id !== id) })
  return (
    <div className="flex flex-col gap-4">
      <button onClick={add} className="admin-btn-primary self-start">+ Ajouter une formation</button>
      {portfolio.education.map(edu => (
        editing === edu.id
          ? <div key={edu.id} className="admin-card flex flex-col gap-4">
              <Field label="Diplôme" value={edu.degree} onChange={v => save({ ...edu, degree: v })} />
              <Field label="Établissement" value={edu.institution} onChange={v => save({ ...edu, institution: v })} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Années" value={edu.year} onChange={v => setEditing(null) || onChange({ ...portfolio, education: portfolio.education.map(e => e.id === edu.id ? { ...edu, year: v } : e) })} />
                <Field label="Ville" value={edu.location} onChange={v => onChange({ ...portfolio, education: portfolio.education.map(e => e.id === edu.id ? { ...edu, location: v } : e) })} />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setEditing(null)} className="admin-btn-primary">OK</button>
              </div>
            </div>
          : <div key={edu.id} className="admin-card flex items-start justify-between gap-4">
              <div>
                <p className="font-sans font-semibold text-foreground">{edu.degree || '(sans titre)'}</p>
                <p className="font-mono text-xs text-muted mt-0.5">{edu.institution} · {edu.year}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing(edu.id)} className="admin-btn-ghost text-xs">Modifier</button>
                <button onClick={() => remove(edu.id)} className="admin-btn-danger text-xs">Supprimer</button>
              </div>
            </div>
      ))}
    </div>
  )
}

// ── Certifications Tab ────────────────────────────────────────────────────────

function CertificationsTab({ portfolio, onChange }: { portfolio: Portfolio; onChange: (p: Portfolio) => void }) {
  const [editing, setEditing] = useState<string | null>(null)
  const save = (cert: Certification) => {
    onChange({ ...portfolio, certifications: portfolio.certifications.map(c => c.id === cert.id ? cert : c) })
    setEditing(null)
  }
  const add = () => {
    const blank: Certification = { id: newId(), title: '', issuer: '', year: '', url: null }
    onChange({ ...portfolio, certifications: [blank, ...portfolio.certifications] })
    setEditing(blank.id)
  }
  const remove = (id: string) => onChange({ ...portfolio, certifications: portfolio.certifications.filter(c => c.id !== id) })
  return (
    <div className="flex flex-col gap-4">
      <button onClick={add} className="admin-btn-primary self-start">+ Ajouter une certification</button>
      {portfolio.certifications.map(cert => (
        editing === cert.id
          ? <div key={cert.id} className="admin-card flex flex-col gap-4">
              <Field label="Titre" value={cert.title} onChange={v => onChange({ ...portfolio, certifications: portfolio.certifications.map(c => c.id === cert.id ? { ...cert, title: v } : c) })} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Organisme" value={cert.issuer} onChange={v => onChange({ ...portfolio, certifications: portfolio.certifications.map(c => c.id === cert.id ? { ...cert, issuer: v } : c) })} />
                <Field label="Année" value={cert.year} onChange={v => onChange({ ...portfolio, certifications: portfolio.certifications.map(c => c.id === cert.id ? { ...cert, year: v } : c) })} />
              </div>
              <Field label="URL (optionnel)" value={cert.url ?? ''} onChange={v => onChange({ ...portfolio, certifications: portfolio.certifications.map(c => c.id === cert.id ? { ...cert, url: v || null } : c) })} />
              <div className="flex gap-3 pt-2">
                <button onClick={() => save(cert)} className="admin-btn-primary">OK</button>
                <button onClick={() => setEditing(null)} className="admin-btn-ghost">Annuler</button>
              </div>
            </div>
          : <div key={cert.id} className="admin-card flex items-start justify-between gap-4">
              <div>
                <p className="font-sans font-semibold text-foreground">{cert.title || '(sans titre)'}</p>
                <p className="font-mono text-xs text-muted mt-0.5">{cert.issuer} · {cert.year}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing(cert.id)} className="admin-btn-ghost text-xs">Modifier</button>
                <button onClick={() => remove(cert.id)} className="admin-btn-danger text-xs">Supprimer</button>
              </div>
            </div>
      ))}
    </div>
  )
}

// ── CV Upload Tab ─────────────────────────────────────────────────────────────

function CvTab({ token }: { token: string }) {
  const [statusFr, setStatusFr] = useState('')
  const [statusEn, setStatusEn] = useState('')

  const upload = async (lang: 'fr' | 'en', file: File, setStatus: (s: string) => void) => {
    setStatus('Envoi en cours…')
    const form = new FormData()
    form.append('file', file)
    try {
      const res = await fetch(`${API}/cv/${lang}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      })
      if (res.ok) setStatus('✓ CV uploadé avec succès')
      else setStatus('✗ Erreur lors de l\'upload')
    } catch {
      setStatus('✗ Erreur réseau')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {(['fr', 'en'] as const).map(lang => (
        <div key={lang} className="admin-card flex flex-col gap-3">
          <p className="font-sans font-semibold text-foreground">CV version {lang.toUpperCase()}</p>
          <input type="file" accept="application/pdf"
            onChange={e => {
              const f = e.target.files?.[0]
              if (f) upload(lang, f, lang === 'fr' ? setStatusFr : setStatusEn)
            }}
            className="font-mono text-sm text-muted file:admin-btn-ghost file:mr-3 file:cursor-pointer" />
          {(lang === 'fr' ? statusFr : statusEn) && (
            <p className="font-mono text-xs text-primary">{lang === 'fr' ? statusFr : statusEn}</p>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Main Admin Page ───────────────────────────────────────────────────────────

type Tab = 'experiences' | 'projects' | 'education' | 'certifications' | 'cv'

export default function AdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem('admin_token') ?? '')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [tab, setTab] = useState<Tab>('experiences')
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  // Load portfolio when logged in
  useEffect(() => {
    if (!token) return
    fetch(`${API}/portfolio`, { headers: authHeader(token) })
      .then(r => { if (!r.ok) throw new Error('unauth'); return r.json() })
      .then(setPortfolio)
      .catch(() => { setToken(''); sessionStorage.removeItem('admin_token') })
  }, [token])

  const login = async (e: FormEvent) => {
    e.preventDefault()
    setLoginError('')
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) { setLoginError('Mot de passe incorrect'); return }
      const { access_token } = await res.json() as { access_token: string }
      sessionStorage.setItem('admin_token', access_token)
      setToken(access_token)
    } catch {
      setLoginError('Erreur réseau')
    }
  }

  const save = async () => {
    if (!portfolio) return
    setSaving(true); setSaveMsg('')
    try {
      const res = await fetch(`${API}/portfolio`, {
        method: 'PUT',
        headers: authHeader(token),
        body: JSON.stringify(portfolio),
      })
      setSaveMsg(res.ok ? '✓ Sauvegardé' : '✗ Erreur lors de la sauvegarde')
    } catch {
      setSaveMsg('✗ Erreur réseau')
    } finally {
      setSaving(false)
      setTimeout(() => setSaveMsg(''), 3000)
    }
  }

  const TABS: { id: Tab; label: string }[] = [
    { id: 'experiences', label: 'Expériences' },
    { id: 'projects', label: 'Projets' },
    { id: 'education', label: 'Formation' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'cv', label: 'CV' },
  ]

  if (!token) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <form onSubmit={login} className="admin-card w-full max-w-sm flex flex-col gap-5">
          <div>
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-1">Admin</p>
            <h1 className="font-sans text-2xl font-bold text-foreground">Portfolio Admin</h1>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-mono text-xs text-muted uppercase tracking-wider">Mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="admin-input" autoFocus />
          </div>
          {loginError && <p className="font-mono text-xs text-red-400">{loginError}</p>}
          <button type="submit" className="admin-btn-primary">Se connecter →</button>
        </form>
      </div>
    )
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-mono text-sm text-muted">Chargement…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-custom bg-surface/80 backdrop-blur-sm px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">Admin</span>
          <span className="font-sans text-sm font-semibold text-foreground">Portfolio</span>
        </div>
        <div className="flex items-center gap-3">
          {saveMsg && <span className="font-mono text-xs text-primary">{saveMsg}</span>}
          <button onClick={save} disabled={saving} className="admin-btn-primary text-sm disabled:opacity-50">
            {saving ? 'Sauvegarde…' : 'Publier les changements'}
          </button>
          <button onClick={() => { setToken(''); sessionStorage.removeItem('admin_token') }}
            className="admin-btn-ghost text-xs">
            Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-custom pb-0">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors border-b-2 -mb-px
                ${tab === t.id
                  ? 'text-primary border-primary'
                  : 'text-muted border-transparent hover:text-foreground'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'experiences' && <ExperiencesTab portfolio={portfolio} onChange={setPortfolio} />}
        {tab === 'projects' && <ProjectsTab portfolio={portfolio} onChange={setPortfolio} />}
        {tab === 'education' && <EducationTab portfolio={portfolio} onChange={setPortfolio} />}
        {tab === 'certifications' && <CertificationsTab portfolio={portfolio} onChange={setPortfolio} />}
        {tab === 'cv' && <CvTab token={token} />}
      </div>
    </div>
  )
}
