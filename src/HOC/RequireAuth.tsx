import { type PropsWithChildren } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function RequireAuth({ children }: PropsWithChildren) {
  const location = useLocation();
  const authCtx = useAuth();

  if (!authCtx?.isAuthenticated()) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
}
