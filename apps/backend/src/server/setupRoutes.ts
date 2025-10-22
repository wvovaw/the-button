import type { FastifyInstance } from 'fastify'
import { recordRouter, recordSchemas } from '../modules/record'
import { statisticsRouter, statisticsSchemas } from '../modules/statistics'
import { userRouter, userSchemas } from '../modules/user'
import { authRouter, authSchemas } from '../modules/auth'

import healthcheckRoute from '../routes/health.route'

export default function (server: FastifyInstance) {
  const allSchemas = [...userSchemas, ...recordSchemas, ...statisticsSchemas, ...authSchemas]
  for (const schema of allSchemas) {
    server.addSchema(schema)
  }

  server.register(userRouter, { prefix: 'api/users' })
  server.register(recordRouter, { prefix: 'api/records' })
  server.register(statisticsRouter, { prefix: 'api/statistics' })
  server.register(authRouter, { prefix: 'api/oauth' })
  server.register(healthcheckRoute, { prefix: 'api/health' })
}
