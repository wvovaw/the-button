import type { User } from '@prisma/client'
import type { CreateUserInput } from './user.schemas'
import { Prisma } from '@prisma/client'
import { hashPassword } from '../../utils/hash'
import prisma from '../../utils/prisma'

export async function createUser(input: CreateUserInput): Promise<User> {
  const { password, ...rest } = input

  const { hash, salt } = hashPassword(password)

  try {
    const user = await prisma.user.create({
      data: { ...rest, salt, password: hash },
    })

    return user
  }
  catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        throw new Error(`Unique constrain failed. Email and/or name is already has been taken.`, {
          cause: 409,
        })
      }
    }
    throw e
  }
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      email,
    },
  })
}

export async function findUsers(): Promise<Omit<User, 'password' | 'salt'>[]> {
  return prisma.user.findMany({
    select: {
      email: true,
      name: true,
      id: true,
    },
  })
}
