// src/components/ui/ResponsiveGrid.tsx
import { ReactNode } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

interface ResponsiveGridProps {
  children: ReactNode
  cols?: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }
  gap?: number
  style?: React.CSSProperties
}

export function ResponsiveGrid({
  children,
  cols = { xs: 1, sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 16,
  style,
}: ResponsiveGridProps) {
  const bp = useBreakpoint()
  const columns = cols[bp] ?? cols.xl ?? 1

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap,
      ...style,
    }}>
      {children}
    </div>
  )
}

interface ResponsiveSidebarLayoutProps {
  children: ReactNode
  sidebar: ReactNode
  sidebarWidth?: number
  gap?: number
  reverseMobile?: boolean
}

export function ResponsiveSidebarLayout({
  children,
  sidebar,
  sidebarWidth = 320,
  gap = 24,
  reverseMobile = false,
}: ResponsiveSidebarLayoutProps) {
  const bp = useBreakpoint()
  const isMobile = bp === 'xs' || bp === 'sm' || bp === 'md'

  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap }}>
        {reverseMobile ? <>{sidebar}{children}</> : <>{children}{sidebar}</>}
      </div>
    )
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `1fr ${sidebarWidth}px`,
      gap,
    }}>
      {children}
      {sidebar}
    </div>
  )
}
