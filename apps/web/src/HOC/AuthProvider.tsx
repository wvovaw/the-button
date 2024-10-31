import { type PropsWithChildren, createContext, useMemo, useCallback, useEffect } from 'react'
import client from '@/api/client'
import { useLocalStorage } from '@/hooks/usehooks-ts'

export type UserProfile = {
  id: number
  name: string
  email: string
  accessToken: string
}

type SignInFnType = (params: UserProfile, cb: () => void) => void
type SignOutFnType = (cb: () => void) => void
type IsAuthenticated = () => boolean

type AuthContextType = {
  user: UserProfile | null
  signIn: SignInFnType
  signOut: SignOutFnType
  isAuthenticated: IsAuthenticated
}
export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useLocalStorage<UserProfile | null>('user-profile', null)

  useEffect(() => {
    if (user) client.defaults.headers.common['Authorization'] = `Bearer ${user.accessToken}`
    else delete client.defaults.headers.common['Authorization']
  }, [user])

  const signIn = useCallback((user: UserProfile, cb: () => void) => {
    setUser(user)
    cb()
  }, [])
  const signOut = useCallback((cb: () => void) => {
    setUser(null)
    cb()
  }, [])
  const isAuthenticated = useCallback(() => (user && user.accessToken ? true : false), [user])

  const value: AuthContextType = useMemo(
    () => ({
      user,
      signIn,
      signOut,
      isAuthenticated,
    }),
    [user, signIn, signOut, isAuthenticated],
  )
  return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
}
