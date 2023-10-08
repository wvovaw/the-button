import { userAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function () {
  const authCtx = userAuth();
  const navigate = useNavigate();
  if (authCtx?.user?.accessToken)
    return (
      <span className="flex gap-3">
        <div className="font-semibold">{authCtx.user.name}</div>
        <button className="text-xs" onClick={() => authCtx.signOut(() => navigate('/', { replace: true }))}>
          logout
        </button>
      </span>
    );
  else
    return (
      <div className="space-x-3">
        <button className="font-semibold" onClick={() => navigate('/login')}>
          login
        </button>
        <button className="font-semibold" onClick={() => navigate('/register')}>
          register
        </button>
      </div>
    );
}
