import { KeyRound, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { getGoogleOauthUrl } from '@/api/services/auth'
import { Button } from '@/components/ui/button'

export function LoginWithGoogle() {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    try {
      setIsLoading(true)
      const { url } = await getGoogleOauthUrl()
      window.location.href = url
    } catch (err) {
      console.error('Google OAuth error:', err)
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleClick} disabled={isLoading}>
      {isLoading ? <Loader2 className="size-6 animate-spin" /> : <KeyRound className="size-6" />}
      Sign In With Google
    </Button>
  )
}
