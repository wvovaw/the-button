import { type PropsWithChildren } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { userAuth } from '@/hooks/useAuth';

export function RequireAuth({ children }: PropsWithChildren) {
  const location = useLocation();
  const authCtx = userAuth();

  if (!authCtx?.accessToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
