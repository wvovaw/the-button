import type { CreateUserInput } from './user.schemas'
import { DrizzleQueryError, eq } from 'drizzle-orm'
import db from '@/db'
import { users } from '@/db/schema'

export async function createUser(input: CreateUserInput) {
  try {
    const [user] = await db.insert(users).values(input).returning()
    return user
  }
  catch (e) {
    if (e instanceof DrizzleQueryError) {
      throw new Error(`New user creation failed.`, {
        cause: 409,
      })
    }
    throw e
  }
}

export async function findUserByEmail(emailInput: string) {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, emailInput),
  })
}

export async function findUserById(id: number) {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, id),
  })
}

export async function updateUserGoogleId(userId: number, googleId: string) {
  return db.update(users).set({ googleId }).where(eq(users.id, userId)).returning()
}

export async function findUsers() {
  return db.query.users.findMany({
    columns: {
      email: true,
      name: true,
      id: true,
    },
  })
}
