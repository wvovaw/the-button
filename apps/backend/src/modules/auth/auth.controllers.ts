import type { FastifyReply, FastifyRequest } from "fastify";
import type { GoogleOauthCallbackQueryString } from "./auth.schemas";
import { createUser, findUserByEmail, updateUserGoogleId, findUserById } from "@/modules/user/user.services";
import { getGoogleUserInfo, googleOauthClient } from "@/oauth/google-client";

export async function googleOauthHandler(
  request: FastifyRequest<{
    Querystring: GoogleOauthCallbackQueryString;
  }>,
  reply: FastifyReply
) {
  try {
    const { tokens } = await googleOauthClient.getToken(request.query.code);
    googleOauthClient.setCredentials(tokens);

    const googleUser = await getGoogleUserInfo(tokens);
    if (!googleUser)
      throw new Error("No google user returned", {
        cause: 401,
      });

    let user = await findUserByEmail(googleUser?.email);

    if (!user) {
      user = await createUser({
        email: googleUser.email,
        name: googleUser.name,
      })
    } else {
      if (!user.googleId) {
        user = (await updateUserGoogleId(user.id, googleUser.id))[0]
      }
    }

    // TODO: implement sane refresh
    const accessToken = request.jwt.sign({ ...user }, {
      expiresIn: '14d'
    })
    const isProd = Bun.env.NODE_ENV === 'production'
    reply.setCookie('accessToken', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'strict' : 'lax',
      path: '/',
      maxAge: 14 * 24 * 60 * 60 // 14d
    })
    return reply.redirect(`${request.server.config.FRONTEND_URL}/auth-callback`);
  }
  catch (e: any) {
    return reply.redirect(`${request.server.config.FRONTEND_URL}/signin?error=google_oauth_failed`);
  }
}

export async function getGoogleOauthUrl(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const url = googleOauthClient.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
  });
  reply.send({ url });
}

export async function me(request: FastifyRequest, reply: FastifyReply) {
  reply.send({
    ...request.user
  })
}

export async function signOut(request: FastifyRequest, reply: FastifyReply) {
  try {
    reply.clearCookie('accessToken')
    reply.send()
  } catch (error) {
    console.log(error)
    return reply.status(500).send({ error: 'Sign out failed' })
  }
}