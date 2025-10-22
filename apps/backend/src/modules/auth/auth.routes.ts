import type { FastifyInstance } from "fastify";
import { $ref } from "./auth.schemas";
import { getGoogleOauthUrl, googleOauthHandler, me, signOut } from "./auth.controllers";

async function authRoutes(server: FastifyInstance) {
  server.get(
    '/google/callback',
    {
      schema: {
        querystring: $ref('googleOauthCallbackQueryStringSchema'),
        response: {
          302: {
            description: 'Success redirect',
          },
          401: {
            description: 'Invalid user credentials provided',
            type: 'object',
            properties: {
              statusCode: { type: 'number', default: 401 },
              error: { type: 'string', default: 'Unauthorized' },
              message: { type: 'string' },
            },
          },
        },
        description: 'Returns authorization token',
        tags: ['Auth', 'Google'],
      },
    },
    googleOauthHandler,
  )

  server.get(
    '/google/url', {
      schema: {
        response: {
          200: {
            description: 'Google sign in URL',
            schema: $ref('getGoogleOauthUrlResponseSchema')
          }
        },
        description: 'Returns google authorization url',
        tags: ['Auth', 'Google'],
      }
    },
    getGoogleOauthUrl
  )

  server.get(
    '/me',
    {
      preHandler: [server.authenticate],
      schema: {
        response: {
          200: {
            description: 'Signed in user data'
          }
        },
        description: 'Returns authorized user data',
        tags: ['Auth'],
      },
    },
    me
  )

  server.get(
    '/signout',
    {
      schema: {
        response: {
          200: {
            description: 'Successfully signed out'
          }
        },
        description: 'Sign out user and clear cookies',
        tags: ['Auth'],
      },
    },
    signOut
  )
}

export default authRoutes