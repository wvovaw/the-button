import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

const googleOauthCallbackQueryStringSchema = z.object({
  code: z.string(),
  state: z.string().optional()
})
export type GoogleOauthCallbackQueryString = z.infer<typeof googleOauthCallbackQueryStringSchema>

const getGoogleOauthUrlResponseSchema = z.object({
  url: z.string().url()
})

export const { schemas: authSchemas, $ref } = buildJsonSchemas(
  {
    googleOauthCallbackQueryStringSchema,
    getGoogleOauthUrlResponseSchema,
  },
  { $id: 'Auth' },
)
