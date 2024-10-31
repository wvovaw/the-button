import { z } from 'zod'

const registerSchema = z
  .object({
    email: z.string().email('Invalid email.'),
    name: z
      .string()
      .min(2, { message: 'Name must contain minumum 2 chars.' })
      .max(16, 'Name must contain maximum 16 chars.'),
    password: z.string().min(8, { message: 'Password must be at least 8 chars.' }),
    confirm: z.string().min(8, { message: 'Passwords must match.' }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Password strings don't match",
    path: ['confirm'],
  })

export { registerSchema }
