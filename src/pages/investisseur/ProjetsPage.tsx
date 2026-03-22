// src/pages/investisseur/ProjetsPage.tsx
import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { GoldenSpinner, SectionLabel, StatusBadge } from '@/components/ui'
import { projectsAPI } from '@/lib/api'
import { useIsMobile } from '@/hooks/useBreakpoint'

const NAV_ITEMS = [
  { icon: '⊞', label: "Vue d'ensemble",  to: '/investisseur' },
  { icon: '◈', label: 'Projets',          to: '/investisseur/projets' },
  { icon: '₣', label: 'Portfolio',        to: '/investisseur/portfolio' },
  { icon: '✉', label: 'Messages',         to: '/investisseur/messages' },
  { icon: '♦', label: 'Favoris',          to: '/investisseur/favoris' },
  { icon: '◫', label: 'Rapports',         to: '/investisseur/rapports' },
  { icon: '◯', label: 'Mon profil',       to: '/investisseur/profil' },
  { icon: '🪪', label: 'KYC', to: '/kyc' },
  { icon: '⊙', label: 'Paramètres',      to: '/investisseur/parametres' },
]

const SECTORS = ['Tous', 'agro', 'tech', 'energy', 'health', 'education', 'real_estate', 'commerce']
const RISKS   = ['Tous', 'low', 'medium', 'high']

export default function ProjetsPage() {
  const isMobile = useIsMobile()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading]   = useState(true)
  const [sector, setSector]     = useState('Tous')
  const [risk, setRisk]         = useState('Tous')
  const [search, setSearch]     = useState('')

  useEffect(() => {
    projectsAPI.list({ status: 'active' }).then(({ data }) => {
      setProjects(data.results ?? data ?? [])
    }).finally(() => setLoading(false))
  }, [])

  const filtered = projects.filter(p => {
    if (sector !== 'Tous' && p.sector !== sector) return false
    if (risk !== 'Tous' && p.risk_level !== risk) return false
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  if (loading) return (
    <DashboardLayout navItems={NAV_ITEMS} title="Projets">
      <GoldenSpinner />
    </DashboardLayout>
  )

  return (
    <DashboardLayout navItems={NAV_ITEMS} title="Projets" subtitle="Explorez les opportunités d'investissement">
      {/* Recherche */}
      <div style={{ marginBottom: 20 }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un projet..."
          style={{
            width: '100%', padding: '12px 16px',
            background: 'var(--dark-3)', border: '1px solid var(--border)',
            color: 'var(--text)', fontSize: 13, outline: 'none', fontFamily: 'inherit',
          }}
        />
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {SECTORS.map(s => (
          <button key={s} onClick={() => setSector(s)} style={{
            padding: '6px 14px', fontSize: 10, letterSpacing: '0.1em',
            textTransform: 'uppercase', cursor: 'pointer',
            background: sector === s ? 'var(--gold)' : 'transparent',
            border: `1px solid ${sector === s ? 'var(--gold)' : 'var(--border)'}`,
            color: sector === s ? 'var(--dark)' : 'var(--text-muted)',
            transition: 'all .2s',
          }}>{s}</button>
        ))}
      </div>

      {/* Grille projets */}
      {filtered.length === 0 ? (
        <div className="kpi-card" style={{ padding: 60, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.3 }}>◈</div>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Aucun projet disponible pour le moment.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: 16,
        }}>
          {filtered.map((p: any) => (
            <div key={p.id} className="kpi-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 20, fontWeight: 400, marginBottom: 6 }}>{p.title}</h3>
                  <StatusBadge status={p.status} label={p.status_label ?? p.status} />
                </div>
                <span style={{
                  fontSize: 10, padding: '3px 10px',
                  background: p.risk_level === 'low' ? 'rgba(74,222,128,0.1)' : p.risk_level === 'high' ? 'rgba(248,113,113,0.1)' : 'rgba(251,191,36,0.1)',
                  color: p.risk_level === 'low' ? '#4ade80' : p.risk_level === 'high' ? '#f87171' : '#fbbf24',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>{p.risk_level}</span>
              </div>

              <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
                {p.tagline ?? p.description?.slice(0, 100) + '...'}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
                {[
                  { label: 'Montant', value: `${((p.amount_needed ?? 0)/1_000_000).toFixed(0)}M ₣` },
                  { label: 'ROI', value: `${p.roi_estimated ?? 0}%` },
                  { label: 'Durée', value: `${p.duration_months ?? 0}m` },
                ].map(s => (
                  <div key={s.label} style={{ padding: '10px', background: 'var(--dark-4)', border: '1px solid var(--border)', textAlign: 'center' }}>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 16, color: 'var(--gold-light)' }}>{s.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-primary" style={{ flex: 1, fontSize: 11, padding: '10px' }}
                  onClick={() => window.location.href = `/investisseur/projet/${p.id}`}>
                  Voir le projet
                </button>
                <button className="btn-gold-sm" style={{ fontSize: 11 }}
                  onClick={() => projectsAPI.toggleFav(p.id)}>
                  ♦
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
