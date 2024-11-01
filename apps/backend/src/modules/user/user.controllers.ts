import { FastifyReply, FastifyRequest } from 'fastify'
import { verifyPassword } from '../../utils/hash'
import { CreateUserInput, LoginInput } from './user.schemas'
import { createUser, findUserByEmail, findUsers } from './user.services'

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput
  }>,
  reply: FastifyReply,
) {
  const body = request.body
  const user = await createUser(body)
  return reply.code(201).send(user)
}

export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginInput
  }>,
  reply: FastifyReply,
) {
  const body = request.body

  // find a user by email
  const user = await findUserByEmail(body.email)

  if (!user) {
    return reply.code(401).send(
      new Error('Invalid email or password', {
        cause: 401,
      }),
    )
  }

  // verify password
  const correctPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password,
  })

  if (correctPassword) {
    const { password: _pass, salt: _salt, ...rest } = user
    // generate access token
    return { accessToken: request.jwt.sign(rest) }
  }

  return reply.code(401).send(
    new Error('Invalid email or password', {
      cause: 401,
    }),
  )
}

export async function getUsersHandler() {
  const users = await findUsers()
  return users
}
