import type { UserProfile } from '@/api/types'
import { createContext } from 'react'

export type SignInFnType = (params: UserProfile, cb: () => void) => void
export type SignOutFnType = (cb: () => void) => Promise<void>
export type IsAuthenticated = () => boolean

export interface AuthContextType {
  user: UserProfile | null
  signIn: SignInFnType
  signOut: SignOutFnType
  isAuthenticated: IsAuthenticated
}
export const AuthContext = createContext<AuthContextType | null>(null)
