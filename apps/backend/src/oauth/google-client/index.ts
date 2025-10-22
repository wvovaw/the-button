import { OAuth2Client, type Credentials } from "google-auth-library";

export const googleOauthClient = new OAuth2Client({
  clientId: Bun.env.GOOGLE_CLIENT_ID,
  clientSecret: Bun.env.GOOGLE_CLIENT_SECRET,
  redirectUri: Bun.env.GOOGLE_REDIRECT_URL,
})

export async function getGoogleUserInfo(tokens: Credentials) {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })

    if (!response.ok) {
      return null
    }

    return await response.json() as {
      id: string
      email: string
      verified_email: boolean
      name: string
      given_name: string
      family_name: string
      picture: string
    }
  }
  catch (e) {
    console.error('Google user info request failed')
    return null
  }
}