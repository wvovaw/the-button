import type { FastifyInstance } from 'fastify'
import fastifyCookie from '@fastify/cookie'

export default function (server: FastifyInstance) {
  server.register(fastifyCookie, {
    hook: 'onRequest',
    secret: server.config.COOKIE_SECRET,
    algorithm: 'sha256',
  })
}
