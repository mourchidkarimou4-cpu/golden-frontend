// src/pages/porteur/RapportsPage.tsx
import { useState, useEffect } from 'react'
import { NAV_PORTEUR, type NavItem } from '@/lib/navItems'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { GoldenSpinner, SectionLabel } from '@/components/ui'
import { reportingAPI } from '@/lib/api'


const RAPPORTS = [
  { title: 'Rapport de performance mensuel', date: 'Mars 2026', type: 'Performance', icon: '◫' },
  { title: 'Rapport de financement Q1 2026', date: 'Janvier 2026', type: 'Financement', icon: '₣' },
  { title: "Rapport d'activité investisseurs", date: 'Février 2026', type: 'Investisseurs', icon: '◎' },
]

export default function RapportsPage() {
  const [dashboard, setDashboard] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    reportingAPI.dashboardPorteur().then(({ data }) => {
      setDashboard(data)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <DashboardLayout navItems={NAV_PORTEUR} title="Rapports">
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <a href="/porteur" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 12 }}>← Retour</a>
        <span style={{ color: 'var(--text-dim)' }}>|</span>
        <a href="/porteur" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 12 }}>⊞ Accueil</a>
      </div>
      <GoldenSpinner />
    </DashboardLayout>
  )

  const { summary, projects = [] } = dashboard ?? {}
  const mainProject = projects[0]

  return (
    <DashboardLayout navItems={NAV_PORTEUR} title="Rapports" subtitle="Analyses et synthèses de votre projet">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="kpi-card" style={{ padding: 28 }}>
            <SectionLabel>Résumé exécutif</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 20 }}>
              {[
                { label: 'Projets actifs', value: summary?.active_projects ?? 0 },
                { label: 'Total investissements', value: summary?.total_investments ?? 0 },
                { label: 'Capital levé', value: `${((summary?.total_raised ?? 0)/1_000_000).toFixed(1)}M ₣` },
              ].map(s => (
                <div key={s.label} style={{ padding: 20, background: 'var(--dark-4)', border: '1px solid var(--border)', textAlign: 'center' }}>
                  <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 32, color: 'var(--gold-light)', marginBottom: 8 }}>{s.value}</div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{s.label}</div>
                </div>
              ))}
            </div>
            {mainProject && (
              <div style={{ marginTop: 24, padding: 20, background: 'var(--dark-4)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
                  Projet principal — {mainProject.title}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  {[
                    { label: 'Financement', value: `${mainProject.funding_percentage ?? 0}%` },
                    { label: 'ROI', value: `${mainProject.roi_estimated ?? 0}%` },
                    { label: 'Durée', value: `${mainProject.duration_months ?? 0}m` },
                    { label: 'Vues', value: mainProject.views ?? 0 },
                  ].map(s => (
                    <div key={s.label} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 22, color: 'var(--gold)' }}>{s.value}</div>
                      <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="kpi-card" style={{ padding: 28 }}>
            <SectionLabel>Rapports disponibles</SectionLabel>
            {RAPPORTS.map((r, i) => (
              <div key={i} style={{
                padding: 16, marginBottom: 12,
                background: 'var(--dark-4)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <div style={{ width: 40, height: 40, border: '1px solid var(--border-bright)', display: 'grid', placeItems: 'center', color: 'var(--gold)', fontSize: 18, flexShrink: 0 }}>
                  {r.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{r.title}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>{r.type} · {r.date}</div>
                </div>
                <button className="btn-gold-sm" style={{ fontSize: 10 }}>Télécharger</button>
              </div>
            ))}
          </div>
        </div>
        <div className="kpi-card" style={{ padding: 24 }}>
          <SectionLabel>Indicateurs clés</SectionLabel>
          {[
            { label: 'Taux de conversion', value: '12%', trend: '+2%' },
            { label: 'Durée négociation', value: '18j', trend: '-3j' },
            { label: 'Score de confiance', value: '7.4/10', trend: '+0.3' },
            { label: 'Vues par semaine', value: '142', trend: '+28%' },
          ].map(s => (
            <div key={s.label} style={{ padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>{s.label}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 20, color: 'var(--gold-light)' }}>{s.value}</span>
                <span style={{ fontSize: 11, color: '#4ade80' }}>↑ {s.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
