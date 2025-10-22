import type { FastifyReply, FastifyRequest } from 'fastify'
import type { CreateUserInput } from './user.schemas'
import { createUser, findUsers } from './user.services'

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


export async function getUsersHandler() {
  const users = await findUsers()
  return users
}
