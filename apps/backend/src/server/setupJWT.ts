import type { JWT } from '@fastify/jwt'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import fjwt from '@fastify/jwt'

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT
  }
  export interface FastifyInstance {
    authenticate: any
  }
}
declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: number
      email: string
      name: string
    }
  }
}

export default function (server: FastifyInstance) {
  server.register(fjwt, {
    secret: server.config.JWT_SECRET,
    verify: {
      extractToken: request => request.cookies.accessToken,
    },
  })

  server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    }
    catch (e) {
      return reply.status(401).send({ error: 'Unauthorized' })
    }
  })

  server.addHook('preHandler', (req, reply, next) => {
    req.jwt = server.jwt
    return next()
  })
}