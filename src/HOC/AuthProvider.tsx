import { type PropsWithChildren, createContext, useState, useMemo, useEffect } from 'react';
import client from '@/api/client';
import { type UserProfile } from '@/types';

type SignInFnType = (params: UserProfile, cb: () => any) => void;
type SignOutFnType = (cb: () => any) => void;

type AuthContextType = {
  user: UserProfile | null;
  signIn: SignInFnType;
  signOut: SignOutFnType;
};
export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserProfile | null>(JSON.parse(localStorage.getItem('user-profile') ?? 'null'));

  useEffect(() => {
    if (user) {
      client.defaults.headers.common['Authorization'] = user.accessToken;
      localStorage.setItem('user-profile', JSON.stringify(user));
    } else {
      delete client.defaults.headers.common['Authorization'];
      localStorage.removeItem('user-profile');
    }
  }, [user]);

  const signIn = (params: UserProfile, cb: () => any) => {
    setUser(params);
    cb();
  };

  const signOut = (cb: () => {}) => {
    setUser(null);
    cb();
  };

  const value: AuthContextType = useMemo(
    () => ({
      user,
      signIn,
      signOut,
    }),
    [user],
  );
  return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
}
