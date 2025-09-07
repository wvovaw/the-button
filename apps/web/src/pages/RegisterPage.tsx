import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RegisterForm } from '@/modules/RegisterForm'

export function RegisterPage() {
  return <RegisterCard />
}

function RegisterCard() {
  return (
    <div className="my-24 w-full">
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  )
}
