// src/pages/LandingPage.tsx
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { GoldenLogo, SectionLabel } from '@/components/ui'
import { useIsMobile } from '@/hooks/useBreakpoint'
import { useScrollReveal } from '@/hooks/useCountUp'

const STEPS = [
  { num: '01', title: 'Créez votre profil vérifié', desc: "Inscription sécurisée avec vérification d'identité KYC. Porteur ou investisseur — chaque profil est validé par notre équipe." },
  { num: '02', title: 'Déposez ou explorez les projets', desc: 'Porteurs : soumettez votre pitch et documents financiers. Investisseurs : parcourez des projets filtrés selon vos critères.' },
  { num: '03', title: 'Notre algorithme crée le lien', desc: 'Notre moteur de matching analyse secteur, montant, zone géographique et profil de risque pour proposer les meilleures correspondances.' },
  { num: '04', title: 'Négociez et finalisez', desc: 'Messagerie sécurisée, due diligence intégrée, signature électronique et versement via Mobile Money ou virement bancaire.' },
]

const STATS = [
  { num: '240+', label: 'Projets financés' },
  { num: '₣4.2Mrd', label: 'Capital mobilisé' },
  { num: '98%', label: 'Satisfaction' },
  { num: '6', label: "Pays d'Afrique" },
]

export default function LandingPage() {
  const navRef = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()
  useScrollReveal()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', window.scrollY > 60)
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80)
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    reveals.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ background: 'var(--dark)', minHeight: '100vh' }}>

      {/* ── Navbar ──────────────────────────────────── */}
      <nav ref={navRef} className="navbar" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: isMobile ? '16px 20px' : '24px 60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid transparent',
        transition: 'all .4s',
      }}>
        <GoldenLogo />

        {/* Desktop nav */}
        {!isMobile && (
          <ul style={{ display: 'flex', alignItems: 'center', gap: 40, listStyle: 'none' }}>
            {[['#comment','Comment ça marche'],['#profils','Profils'],['#projets','Projets']].map(([href, label]) => (
              <li key={href}>
                <a href={href} style={{
                  color: 'var(--text-muted)', textDecoration: 'none',
                  fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase',
                  transition: 'color .3s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                >{label}</a>
              </li>
            ))}
          </ul>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/login" style={{
            fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>Connexion</Link>
          <Link to="/register" className="btn-gold-sm" style={{ fontSize: 11 }}>
            {isMobile ? 'Commencer' : 'Commencer →'}
          </Link>
          {isMobile && (
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              background: 'none', border: 'none', color: 'var(--text-muted)',
              fontSize: 22, cursor: 'pointer', padding: 4,
            }}>☰</button>
          )}
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobile && menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 150,
          }} />
          <div style={{
            position: 'fixed', top: 0, right: 0, bottom: 0, width: '75%',
            background: 'var(--dark-2)', zIndex: 200, padding: '80px 32px 40px',
            borderLeft: '1px solid var(--border)',
            animation: 'slideUp .3s ease',
          }}>
            <button onClick={() => setMenuOpen(false)} style={{
              position: 'absolute', top: 20, right: 20,
              background: 'none', border: 'none', color: 'var(--text-muted)',
              fontSize: 24, cursor: 'pointer',
            }}>✕</button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[['#comment','Comment ça marche'],['#profils','Profils'],['#projets','Projets']].map(([href, label]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{
                  color: 'var(--text)', textDecoration: 'none',
                  fontSize: 18, fontFamily: '"Cormorant Garamond", serif',
                  padding: '20px 0', borderBottom: '1px solid var(--border)',
                  letterSpacing: '0.05em',
                }}>{label}</a>
              ))}
            </div>
            <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to="/login" className="btn-outline" onClick={() => setMenuOpen(false)}>
                Se connecter
              </Link>
              <Link to="/register" className="btn-primary" onClick={() => setMenuOpen(false)}>
                Créer un compte
              </Link>
            </div>
          </div>
        </>
      )}

      {/* ── Hero ────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: isMobile ? '100px 24px 60px' : '140px 60px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* BG circles - hidden on mobile for perf */}
        {!isMobile && [600,900,400].map((s,i) => (
          <div key={i} style={{
            position: 'absolute', borderRadius: '50%',
            width: s, height: s,
            border: `1px solid rgba(201,168,76,${[.08,.05,.06][i]})`,
            top: [-200,-350,-150][i], right: [-100,-250,undefined][i] as any,
            left: i === 2 ? -100 : undefined,
            animation: `rotate ${[40,60,30][i]}s linear infinite${i===1?' reverse':''}`,
            pointerEvents: 'none',
          }}/>
        ))}

        <div style={{ position: 'relative', zIndex: 1, maxWidth: isMobile ? '100%' : 680 }}>
          <div className="section-label" style={{ animation: 'fadeUp .8s ease both' }}>
            <div className="section-label-line" />
            <span className="section-label-text">Plateforme de mise en relation</span>
          </div>
          <h1 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: isMobile ? '48px' : 'clamp(52px, 7vw, 88px)',
            fontWeight: 300, lineHeight: 1.05, marginBottom: isMobile ? 20 : 32,
            animation: 'fadeUp .8s .1s ease both',
          }}>
            <em style={{ fontStyle: 'italic', color: 'var(--gold-light)', display: 'block' }}>Connecter</em>
            <strong style={{ fontWeight: 600, display: 'block' }}>les visionnaires</strong>
            aux capitaux
          </h1>
          <p style={{
            fontSize: isMobile ? 14 : 16, lineHeight: 1.8, color: 'var(--text-muted)',
            maxWidth: 480, marginBottom: isMobile ? 32 : 56,
            animation: 'fadeUp .8s .2s ease both',
          }}>
            GOLDEN Investissement rapproche porteurs de projets ambitieux et investisseurs éclairés.
            Une plateforme sécurisée, transparente et pensée pour l'Afrique.
          </p>
          <div style={{
            display: 'flex', flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 12 : 24, alignItems: isMobile ? 'stretch' : 'center',
            animation: 'fadeUp .8s .3s ease both',
          }}>
            <Link to="/register" className="btn-primary">Rejoindre la plateforme</Link>
            <Link to="/login" style={{
              display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start',
              gap: 10, color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13,
              transition: 'color .3s', padding: isMobile ? '12px 0' : '0',
            }}>Se connecter →</Link>
          </div>
        </div>

        {/* Stats - inline on mobile, absolute on desktop */}
        <div style={{
          marginTop: isMobile ? 48 : 0,
          position: isMobile ? 'relative' : 'absolute',
          right: isMobile ? 'auto' : 60,
          bottom: isMobile ? 'auto' : 80,
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : '1fr',
          gap: isMobile ? 16 : 0,
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              padding: isMobile ? '16px' : '0',
              background: isMobile ? 'var(--dark-3)' : 'transparent',
              border: isMobile ? '1px solid var(--border)' : 'none',
              marginBottom: isMobile ? 0 : i > 0 ? 32 : 0,
              textAlign: isMobile ? 'center' : 'right',
            }}>
              {!isMobile && i > 0 && <div style={{ width: '100%', height: 1, background: 'var(--border)', marginBottom: 32 }}/>}
              <span style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: isMobile ? 32 : 42,
                fontWeight: 300, color: 'var(--gold-light)',
                display: 'block', lineHeight: 1,
              }}>{s.num}</span>
              <div style={{
                fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--text-muted)', marginTop: 4,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ────────────────────────────── */}
      <section id="comment" style={{
        padding: isMobile ? '60px 24px' : '120px 60px',
        background: 'var(--dark-2)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
          gap: isMobile ? 40 : 80,
          alignItems: 'start',
        }}>
          <div>
            <SectionLabel>Le processus</SectionLabel>
            <h2 className="section-title reveal">
              Simple,<br/><em>transparent</em><br/>et sécurisé
            </h2>
            <p className="reveal" style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text-muted)' }}>
              De la soumission de votre projet à la signature du contrat, chaque étape est guidée et protégée.
            </p>
          </div>
          <div>
            {STEPS.map(step => (
              <div key={step.num} className="reveal" style={{
                padding: isMobile ? '20px 0' : '32px 0',
                borderBottom: '1px solid var(--border)',
                display: 'grid',
                gridTemplateColumns: '40px 1fr',
                gap: 16, alignItems: 'start',
              }}>
                <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 13, color: 'var(--gold)', paddingTop: 2 }}>{step.num}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>{step.title}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-muted)' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Profils ────────────────────────────────── */}
      <section id="profils" style={{ padding: isMobile ? '60px 24px' : '120px 60px' }}>
        <div style={{ marginBottom: isMobile ? 32 : 60 }}>
          <SectionLabel>Deux profils</SectionLabel>
          <h2 className="section-title reveal">Fait pour <em>vous</em></h2>
          <p className="reveal" style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: 500 }}>
            Que vous ayez un projet à financer ou des capitaux à faire fructifier, GOLDEN est votre partenaire de confiance.
          </p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 16 : 2,
        }}>
          {[
            { num: '01', tag: 'Porteur de projet', title: 'Vous avez une vision. Trouvez le capital.', desc: "Soumettez votre projet, pitchez votre vision et connectez-vous aux investisseurs qui croient en votre potentiel.", features: ['Dépôt de dossier simplifié','Matching intelligent','Messagerie intégrée','Accompagnement personnalisé','Contrats sécurisés'], link: '/register', linkLabel: 'Déposer mon projet →' },
            { num: '02', tag: 'Investisseur', title: 'Vous avez le capital. Trouvez les opportunités.', desc: "Accédez à un portefeuille de projets vérifiés et diversifiez vos investissements dans l'économie africaine.", features: ['Projets vérifiés et évalués','Filtres avancés','Due diligence assistée','Tableau de bord temps réel','Reporting automatisé'], link: '/register', linkLabel: 'Explorer les projets →' },
          ].map(card => (
            <div key={card.num} className="reveal" style={{
              background: 'var(--dark-2)',
              padding: isMobile ? '32px 24px' : '60px 48px',
              border: '1px solid var(--border)',
              transition: 'border-color .4s',
            }}>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? 48 : 80, fontWeight: 300, color: 'var(--text-dim)', lineHeight: 1, display: 'block', marginBottom: 20 }}>{card.num}</span>
              <div style={{ display: 'inline-block', padding: '4px 12px', border: '1px solid var(--border-bright)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>{card.tag}</div>
              <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? 22 : 28, fontWeight: 400, marginBottom: 12, lineHeight: 1.3 }}>{card.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: 24 }}>{card.desc}</p>
              <ul style={{ listStyle: 'none', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {card.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: 'var(--text-muted)' }}>
                    <div style={{ width: 16, height: 1, background: 'var(--gold)', flexShrink: 0 }}/>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to={card.link} style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {card.linkLabel}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats band ─────────────────────────────── */}
      <div className="reveal" style={{
        padding: isMobile ? '40px 24px' : '80px 60px',
        background: 'var(--dark-3)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: isMobile ? 24 : 0,
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{
            padding: isMobile ? '16px' : '0 40px',
            textAlign: 'center',
            borderRight: !isMobile && i < 3 ? '1px solid var(--border)' : 'none',
          }}>
            <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: isMobile ? 40 : 56, fontWeight: 300, color: 'var(--gold-light)', display: 'block', lineHeight: 1, marginBottom: 8 }}>{s.num}</span>
            <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── CTA ────────────────────────────────────── */}
      <section style={{
        padding: isMobile ? '80px 24px' : '160px 60px',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}/>
        <h2 className="reveal" style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: isMobile ? '40px' : 'clamp(48px,6vw,80px)',
          fontWeight: 300, lineHeight: 1.1, marginBottom: 20, position: 'relative',
        }}>
          Prêt à faire <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>croître</em> votre avenir ?
        </h2>
        <p className="reveal" style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 400, margin: '0 auto 40px', lineHeight: 1.8 }}>
          Rejoignez des centaines d'entrepreneurs et d'investisseurs qui font confiance à GOLDEN.
        </p>
        <div className="reveal" style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center', justifyContent: 'center',
          gap: isMobile ? 12 : 20,
          position: 'relative',
        }}>
          <Link to="/register?role=porteur" className="btn-primary">Je suis porteur de projet</Link>
          <Link to="/register?role=investisseur" className="btn-outline">Je suis investisseur</Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────── */}
      <footer style={{
        padding: isMobile ? '40px 24px' : '60px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        gap: isMobile ? 24 : 0,
      }}>
        <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 14, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
          GOLDEN <span style={{ color: 'var(--gold)' }}>Investissement</span> &nbsp;·&nbsp; Cotonou, Bénin
        </div>
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? 16 : 32, listStyle: 'none' }}>
          {['À propos','Légal','Confidentialité','Contact'].map(l => (
            <li key={l}>
              <a href="#" style={{ fontSize: 11, color: 'var(--text-dim)', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{l}</a>
            </li>
          ))}
        </ul>
        <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>© 2026 GOLDEN Investissement</div>
      </footer>

      <style>{`
        .navbar.scrolled {
          background: rgba(10,10,10,0.95) !important;
          backdrop-filter: blur(20px);
          border-color: var(--border) !important;
          padding-top: 12px !important;
          padding-bottom: 12px !important;
        }
      `}</style>
    </div>
  )
}
