import type { PinoLoggerOptions } from 'fastify/types/logger'
import process from 'node:process'
import { fastify } from 'fastify'
import setupCloseWithGrace from './setupCloseWithGrace'
import setupCors from './setupCors'
import setupEnv from './setupEnv'
import setupErrorHandler from './setupErrorHandler'
import setupJWT from './setupJWT'
import setupRoutes from './setupRoutes'
import setupSwagger from './setupSwagger'

async function buildServer() {
  const loggerConfig: Record<string, PinoLoggerOptions | boolean> = {
    development: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
    production: true,
    test: false,
  }

  const nodeEnv = process.env.NODE_ENV ?? 'development'

  const server = fastify({
    logger: loggerConfig[nodeEnv] ?? true,
  })

  await setupEnv(server)
  setupErrorHandler(server)
  setupCors(server)
  setupJWT(server)
  setupSwagger(server)
  setupRoutes(server)
  setupCloseWithGrace(server)

  return server
}

export default buildServer
