import type { CreateUserInput } from './user.schemas'
import { DrizzleQueryError } from 'drizzle-orm'
import db from '@/db'
import { users } from '@/db/schema'
import { hashPassword } from '@/utils/hash'

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input

  const { hash, salt } = hashPassword(password)

  try {
    const [user] = await db.insert(users).values({
      ...rest,
      salt,
      password: hash,
    }).returning()

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

export async function findUsers() {
  return db.query.users.findMany({
    columns: {
      email: true,
      name: true,
      id: true,
    },
  })
}
