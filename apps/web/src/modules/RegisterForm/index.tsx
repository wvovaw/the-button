import type { z } from 'zod'
import { signUp } from '@/api/services/signup'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useNavigate } from 'react-router-dom'
import { registerSchema } from './schema'

export function RegisterForm() {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      confirm: '',
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [registerError, setRegisterError] = useState(false)

  async function onSubmit({ email, name, password }: z.infer<typeof registerSchema>) {
    try {
      setIsLoading(true)
      setRegisterError(false)
      await signUp({
        email,
        name,
        password,
      })
      navigate('/signin')
    } catch (e: unknown) {
      setIsLoading(false)
      setRegisterError(true)
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="s1mple" {...field} />
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
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {registerError && (
          <FormMessage>Registration failed. Maybe the email and/or the name is already taken.</FormMessage>
        )}
        <Button type="submit" disabled={isLoading}>
          Submit
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" aria-hidden />}
        </Button>
      </form>
    </Form>
  )
}
