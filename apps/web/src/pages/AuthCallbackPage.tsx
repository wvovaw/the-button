import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMe } from '@/api/services/auth'
import { useAuth } from '@/hooks/useAuth'

export function AuthCallbackPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const userData = await getMe()

        signIn(userData, () => {
          navigate('/play', { replace: true })
        })
      } catch (error) {
        console.error('Auth callback error:', error)
        navigate('/signin?error=auth_failed', { replace: true })
      }
    }

    handleAuthCallback()
  }, [navigate, signIn])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
        <p className="text-gray-600">Signing In...</p>
      </div>
    </div>
  )
}
