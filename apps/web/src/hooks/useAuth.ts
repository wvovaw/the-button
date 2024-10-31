import { useContext } from 'react'
import { AuthContext } from '@/HOC/AuthProvider'

export function useAuth() {
  return useContext(AuthContext)
}
