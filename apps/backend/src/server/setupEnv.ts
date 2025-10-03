import type { FastifyEnvOptions } from '@fastify/env'
import type { FastifyInstance } from 'fastify'
import path from 'node:path'
import process from 'node:process'
import { fastifyEnv } from '@fastify/env'
import { z } from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'

const schema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('7000'),
  SERVER_HOSTNAME: z.string().default('0.0.0.0'),
  JWT_SECRET: z.string(),
  SIGNATURE_SECRET: z.string(),
  DATABASE_FILENAME: z.string(),
  CORS_ALLOWED_ORIGINS: z.string().transform(val =>
    val.split(',').map(origin => origin.trim()),
  ),
})

type SchemaType = z.infer<typeof schema>
declare module 'fastify' {
  interface FastifyInstance {
    config: SchemaType
  }
}

export default async function (server: FastifyInstance) {
  const nodeEnv = process.env.NODE_ENV ?? 'development'
  const configFilePath = path.resolve(process.cwd(), `.env.${nodeEnv}`)

  server.log.debug(`Environment: ${nodeEnv}`)
  server.log.debug(`Config file: ${configFilePath}`)

  const options: FastifyEnvOptions = {
    confKey: 'config',
    schema: zodToJsonSchema(schema),
  }

  await server.register(fastifyEnv, options)
}
