// src/hooks/useBreakpoint.ts
import { useState, useEffect } from 'react'

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export function useBreakpoint(): Breakpoint {
  const getBreakpoint = (): Breakpoint => {
    const w = window.innerWidth
    if (w < 480)  return 'xs'
    if (w < 640)  return 'sm'
    if (w < 768)  return 'md'
    if (w < 1024) return 'lg'
    return 'xl'
  }

  const [bp, setBp] = useState<Breakpoint>(getBreakpoint)

  useEffect(() => {
    const handler = () => setBp(getBreakpoint())
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return bp
}

export function useIsMobile() {
  const bp = useBreakpoint()
  return bp === 'xs' || bp === 'sm'
}

export function useIsTablet() {
  const bp = useBreakpoint()
  return bp === 'md'
}

export function useIsDesktop() {
  const bp = useBreakpoint()
  return bp === 'lg' || bp === 'xl'
}
