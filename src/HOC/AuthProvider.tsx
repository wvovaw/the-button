import { type PropsWithChildren, createContext, useState, useMemo, useEffect, useCallback } from "react";
import client from "@/api/client";
import { type UserProfile } from "@/api/types";

type SignInFnType = (params: UserProfile, cb: () => void) => void;
type SignOutFnType = (cb: () => void) => void;

type AuthContextType = {
  user: UserProfile | null;
  signIn: SignInFnType;
  signOut: SignOutFnType;
};
export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserProfile | null>(JSON.parse(localStorage.getItem("user-profile") ?? "null"));

  useEffect(() => {
    if (user) {
      client.defaults.headers.common["Authorization"] = user.accessToken;
      localStorage.setItem("user-profile", JSON.stringify(user));
    } else {
      delete client.defaults.headers.common["Authorization"];
      localStorage.removeItem("user-profile");
    }
  }, [user]);

  const signIn = useCallback((params: UserProfile, cb: () => void) => {
    setUser(params);
    cb();
  }, []);
  const signOut = useCallback((cb: () => void) => {
    setUser(null);
    cb();
  }, []);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      signIn,
      signOut,
    }),
    [user, signIn, signOut],
  );
  return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
}
