import { KeyRound } from 'lucide-react'
import { useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'

export function LoginWithGoogle() {
  const config = useRef({
    GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    GOOGLE_CALLBACK_URL: import.meta.env.VITE_GOOGLE_REDIRECT_URL,
    GOOGLE_OAUTH_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
    GOOGLE_OAUTH_SCOPES: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  })

  const initiateGoogleOAuth = useCallback(() => {
    const state = crypto.randomUUID()
    localStorage.setItem('oauth_state', state)

    const params = new URLSearchParams({
      client_id: config.current.GOOGLE_CLIENT_ID,
      redirect_uri: config.current.GOOGLE_CALLBACK_URL,
      access_type: 'offline',
      response_type: 'code',
      state,
      scope: config.current.GOOGLE_OAUTH_SCOPES.join(' '),
    })

    const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${config.current.GOOGLE_OAUTH_URL}?${params.toString()}`
    window.location.href = GOOGLE_OAUTH_CONSENT_SCREEN_URL
  }, [])

  return (
    <Button onClick={initiateGoogleOAuth}>
      <KeyRound className="size-6" />
      Sign In With Goooooooooooogle
    </Button>
  )
}
