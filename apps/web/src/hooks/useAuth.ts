import { AuthContext } from '@/providers/AuthProvider'
import { useContext } from 'react'

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('the `useAuth` hook must be called from the inside of AuthProvider!')

  return ctx
}
