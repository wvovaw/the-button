import type { PropsWithChildren } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'

export function RequireAuth({ children }: PropsWithChildren) {
  const location = useLocation()
  const authCtx = useAuth()

  if (!authCtx?.isAuthenticated()) {
    return <Navigate to="/signin" state={{ from: location }} />
  }

  return children
}
