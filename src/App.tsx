// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/lib/auth'
import { GoldenCursor } from '@/components/ui'

import LandingPage           from '@/pages/LandingPage'
import LoginPage             from '@/pages/LoginPage'
import RegisterPage          from '@/pages/RegisterPage'
import KYCPage               from '@/pages/KYCPage'
import DashboardPorteur      from '@/pages/DashboardPorteur'
import DashboardInvestisseur from '@/pages/DashboardInvestisseur'
import MessagesPage          from '@/pages/MessagesPage'
import CreateProjectPage     from '@/pages/CreateProjectPage'

import MonProjetPage      from '@/pages/porteur/MonProjetPage'
import InvestisseursPage  from '@/pages/porteur/InvestisseursPage'
import ActivitePage       from '@/pages/porteur/ActivitePage'
import DocumentsPage      from '@/pages/porteur/DocumentsPage'
import FinancesPage       from '@/pages/porteur/FinancesPage'
import RapportsPage       from '@/pages/porteur/RapportsPage'
import ProfilPage         from '@/pages/porteur/ProfilPage'
import ParametresPage     from '@/pages/porteur/ParametresPage'

function PrivateRoute({ children, role }: { children: React.ReactNode; role?: string }) {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ background: '#0A0A0A', minHeight: '100vh' }} />
  if (!user)   return <Navigate to="/login" replace />
  if (role && user.role !== role)
    return <Navigate to={user.role === 'porteur' ? '/porteur' : '/investisseur'} replace />
  return <>{children}</>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (user) return <Navigate to={user.role === 'porteur' ? '/porteur' : '/investisseur'} replace />
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"         element={<LandingPage />} />
      <Route path="/login"    element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path="/kyc"      element={<PrivateRoute><KYCPage /></PrivateRoute>} />

      {/* Dashboard principal porteur */}
      <Route path="/porteur"               element={<PrivateRoute role="porteur"><DashboardPorteur /></PrivateRoute>} />
      <Route path="/porteur/nouveau"       element={<PrivateRoute role="porteur"><CreateProjectPage /></PrivateRoute>} />
      <Route path="/porteur/messages"      element={<PrivateRoute role="porteur"><MessagesPage /></PrivateRoute>} />

      {/* Pages porteur */}
      <Route path="/porteur/projet"        element={<PrivateRoute role="porteur"><MonProjetPage /></PrivateRoute>} />
      <Route path="/porteur/investisseurs" element={<PrivateRoute role="porteur"><InvestisseursPage /></PrivateRoute>} />
      <Route path="/porteur/activite"      element={<PrivateRoute role="porteur"><ActivitePage /></PrivateRoute>} />
      <Route path="/porteur/documents"     element={<PrivateRoute role="porteur"><DocumentsPage /></PrivateRoute>} />
      <Route path="/porteur/finances"      element={<PrivateRoute role="porteur"><FinancesPage /></PrivateRoute>} />
      <Route path="/porteur/rapports"      element={<PrivateRoute role="porteur"><RapportsPage /></PrivateRoute>} />
      <Route path="/porteur/profil"        element={<PrivateRoute role="porteur"><ProfilPage /></PrivateRoute>} />
      <Route path="/porteur/parametres"    element={<PrivateRoute role="porteur"><ParametresPage /></PrivateRoute>} />

      {/* Investisseur */}
      <Route path="/investisseur"           element={<PrivateRoute role="investisseur"><DashboardInvestisseur /></PrivateRoute>} />
      <Route path="/investisseur/messages"  element={<PrivateRoute role="investisseur"><MessagesPage /></PrivateRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GoldenCursor />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
