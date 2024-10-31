import { FastifyInstance, FastifyReplyContext, FastifyRequest } from 'fastify'
import swagger from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { withRefResolver } from 'fastify-zod'
import { version } from '../../package.json'

export default function (server: FastifyInstance) {
  server.register(
    swagger,
    withRefResolver({
      swagger: {
        info: {
          title: 'The Button clone API ',
          description: 'The Button clone game API docs',
          version,
        },
        securityDefinitions: {
          apiKey: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
          },
        },
        security: [
          {
            apiKey: [],
          },
        ],
      },
    }),
  )
  // @ts-ignore
  // i don't know why but this fastify-swager-ui plugin is kind of incompatible with this register method. But it still works
  server.register(fastifySwaggerUi, {
    prefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request: FastifyRequest, reply: FastifyReplyContext, next: () => void) {
        next()
      },
      preHandler: function (request: FastifyRequest, reply: FastifyReplyContext, next: () => void) {
        next()
      },
    },
    staticCSP: true,
    transformStaticCSP: (header: unknown) => header,
    transformSpecification: (swaggerObject: unknown) => swaggerObject,
    transformSpecificationClone: true,
  })
}
