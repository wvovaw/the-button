import type { PropsWithChildren } from 'react'
import type { AuthContextType } from './AuthContext'
import type { UserProfile } from '@/api/types'
import { useCallback, useMemo } from 'react'
import { signOut as apiSignOut } from '@/api/services/auth'
import { useLocalStorage } from '@/hooks/usehooks-ts'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useLocalStorage<UserProfile | null>('user-profile', null)

  const signIn = useCallback(
    (user: UserProfile, cb: () => void) => {
      setUser(user)
      cb()
    },
    [setUser],
  )
  const signOut = useCallback(
    async (cb: () => void) => {
      try {
        await apiSignOut()
      } catch (error) {
        console.error('Sign out API error:', error)
      } finally {
        setUser(null)
        cb()
      }
    },
    [setUser],
  )
  const isAuthenticated = useCallback(() => !!user, [user])

  const value: AuthContextType = useMemo(
    () => ({
      user,
      signIn,
      signOut,
      isAuthenticated,
    }),
    [user, signIn, signOut, isAuthenticated],
  )
  return <AuthContext value={value}> {children} </AuthContext>
}
