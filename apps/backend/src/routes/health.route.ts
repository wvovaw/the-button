import type { FastifyInstance } from 'fastify'
import db from '@/db'

async function healthcheckRoute(server: FastifyInstance) {
  server.get(
    '/',
    {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string', default: 'Healthy' },
            },
            description: 'Server has established connection with the DB',
          },
          500: {
            type: 'object',
            properties: {
              message: { type: 'string', default: 'Unhealthy' },
            },
            description: 'Server couldn\'t establish connection with the DB',
          },
        },
        description: 'Checks if Supabase instance is up and running',
      },
    },
    async (req, res) => {
      try {
        await db.run(`SELECT 1`)
        res.status(200).send({ message: 'Healthy' })
      }
      catch {
        res.status(500).send({ message: 'Unhealthy' })
      }
    },
  )
}
export default healthcheckRoute
