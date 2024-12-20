import type { UserProfile } from '@/providers/AuthProvider'
import type { z } from 'zod'
import { signIn } from '@/api/services/signin'
import { Button } from '@/components/ui/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'

import { useAuth } from '@/hooks/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import { jwtDecode } from 'jwt-decode'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { loginSchema } from './schema'

export function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const authCtx = useAuth()
  const fromPage = location.state?.from?.pathname || '/'

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState(false)

  async function onSubmit({ email, password }: z.infer<typeof loginSchema>) {
    try {
      setIsLoading(true)
      setLoginError(false)
      const signInData = await signIn({
        email,
        password,
      })

      if (signInData.accessToken) {
        const payload: Omit<UserProfile, 'accessToken'> = jwtDecode(signInData.accessToken)
        authCtx?.signIn(
          {
            accessToken: signInData.accessToken,
            id: payload.id,
            name: payload.name,
            email: payload.email,
          },
          () => navigate(fromPage, { replace: true }),
        )
      } else {
        setIsLoading(false)
        setLoginError(true)
      }
    } catch (e: unknown) {
      setIsLoading(false)
      setLoginError(true)
      console.log('Login failed: ', e)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="daybi@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {loginError && <FormMessage>Authentication failed. Please check your credentials and try again</FormMessage>}
        <Button type="submit" disabled={isLoading}>
          Submit
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" aria-hidden />}
        </Button>
      </form>
    </Form>
  )
}
