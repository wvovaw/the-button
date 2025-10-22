import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SignInForm } from '@/modules/SignInForm'
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'

export function SignInPage() {
  const [searchParams] = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'session_expired':
        return 'Your session has expired. Please sign in again.'
      case 'google_oauth_failed':
        return 'Google authentication failed. Please try again.'
      case 'auth_failed':
        return 'Authentication failed. Please try again.'
      default:
        return null
    }
  }

  const errorMessage = getErrorMessage(error)

  return (
    <div className="my-24 w-full">
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <Alert variant="destructive" className="my-4">
              <AlertTitle>Authorization Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  )
}
