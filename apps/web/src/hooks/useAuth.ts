import { useContext } from 'react'
import { AuthContext } from '@/providers/AuthProvider'

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('the `useAuth` hook must be called from the inside of AuthProvider!')

  return ctx
}
