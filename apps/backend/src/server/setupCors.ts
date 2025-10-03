import type { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'

export default function (server: FastifyInstance) {
  const allowedOrigins = server.config.CORS_ALLOWED_ORIGINS
  server.register(cors, {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  })
}
