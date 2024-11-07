import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { LoginForm } from '@/modules/LoginForm'

export function LoginPage() {
  return <LoginCard />
}

function LoginCard() {
  return (
    <div className="my-24 w-full">
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}
