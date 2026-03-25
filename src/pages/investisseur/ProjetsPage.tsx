// src/pages/investisseur/ProjetsPage.tsx
import { useState, useEffect } from 'react'
import { NAV_INVESTISSEUR, type NavItem } from '@/lib/navItems'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { GoldenSpinner } from '@/components/ui'
import { projectsAPI } from '@/lib/api'
import { useIsMobile } from '@/hooks/useBreakpoint'


const SECTORS = ['Tous', 'Agriculture', 'Tech', 'Énergie', 'Santé', 'Immobilier', 'Finance']

export default function ProjetsPage() {
  const isMobile = useIsMobile()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sector, setSector] = useState('Tous')
  const [search, setSearch] = useState('')

  useEffect(() => {
    projectsAPI.list?.({ status: 'published' })
      .then((r: any) => setProjects(r.data?.results ?? r.data ?? []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = projects.filter(p => {
    const matchSector = sector === 'Tous' || p.sector === sector
    const matchSearch = !search || p.title?.toLowerCase().includes(search.toLowerCase())
    return matchSector && matchSearch
  })

  return (
    <DashboardLayout navItems={NAV_INVESTISSEUR} title="Projets" subtitle="Explorez les opportunités d'investissement">
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <a href="/investisseur" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 12 }}>← Retour</a>
        <a href="/investisseur" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 12 }}>⊞ Accueil</a>
      </div>

      {/* Filtres */}
      <div style={{ marginBottom: 24 }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un projet..."
          style={{
            width: '100%', padding: '10px 14px', marginBottom: 12,
            background: 'var(--dark-3)', border: '1px solid var(--border)',
            color: 'var(--text)', fontSize: 13, outline: 'none', fontFamily: 'inherit',
          }}
        />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {SECTORS.map(s => (
            <button key={s} onClick={() => setSector(s)} style={{
              padding: '6px 14px', fontSize: 10, letterSpacing: '.1em',
              textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit',
              background: sector === s ? 'var(--gold)' : 'transparent',
              color: sector === s ? 'var(--dark)' : 'var(--text-muted)',
              border: `1px solid ${sector === s ? 'var(--gold)' : 'var(--border)'}`,
              transition: 'all .2s',
            }}>{s}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><GoldenSpinner /></div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 40, marginBottom: 16, opacity: .3 }}>◈</div>
          <p style={{ fontSize: 14 }}>Aucun projet disponible pour le moment.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap: 16 }}>
          {filtered.map((project: any) => (
            <div key={project.id} style={{
              padding: 20, border: '1px solid var(--border)',
              background: 'var(--dark-2)', transition: 'border-color .2s',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 9, color: 'var(--gold)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                    {project.sector}
                  </div>
                  <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 20, color: 'var(--text)' }}>
                    {project.title}
                  </div>
                </div>
                {project.matching_score && (
                  <span style={{ fontSize: 10, color: '#3DD68C', background: 'rgba(61,214,140,.08)', border: '1px solid rgba(61,214,140,.2)', padding: '2px 8px' }}>
                    Match {project.matching_score}%
                  </span>
                )}
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
                {project.tagline ?? project.description?.slice(0, 100)}
              </p>
              <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
                {[
                  { label: 'Objectif', val: `${(project.funding_goal/1000000).toFixed(0)}M ₣` },
                  { label: 'ROI estimé', val: `${project.expected_roi ?? '--'}%` },
                  { label: 'Durée', val: `${project.duration_months ?? '--'}m` },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ fontFamily: '"Cormorant Garamond",serif', fontSize: 20, color: 'var(--gold-light)' }}>{s.val}</div>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => projectsAPI.toggleFav?.(project.id)} style={{
                  padding: '8px 14px', background: 'transparent',
                  border: '1px solid var(--border)', color: 'var(--text-muted)',
                  fontSize: 10, cursor: 'pointer', letterSpacing: '.08em',
                }}>♦ Favori</button>
                <button style={{
                  flex: 1, padding: '8px', background: 'var(--gold)', color: 'var(--dark)',
                  border: 'none', fontSize: 10, cursor: 'pointer',
                  letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: 'inherit',
                }}>Voir le projet →</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
