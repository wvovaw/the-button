import { use } from 'react'
import { AuthContext } from '@/providers/AuthContext'

export function useAuth() {
  const ctx = use(AuthContext)
  if (!ctx) throw new Error('the `useAuth` hook must be called from the inside of AuthProvider!')

  return ctx
}
