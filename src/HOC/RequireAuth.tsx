import { type PropsWithChildren } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function RequireAuth({ children }: PropsWithChildren) {
  const location = useLocation();
  const authCtx = useAuth();

  if (!authCtx?.user?.accessToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
