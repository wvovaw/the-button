import type { GetGoogleOauthUrlResponse, UserProfile } from '../types'
import client from '../client'

export async function getGoogleOauthUrl(): Promise<GetGoogleOauthUrlResponse> {
  const res = await client.get<GetGoogleOauthUrlResponse>('/oauth/google/url')
  return res.data
}

export async function signOut() {
  await client.get('/oauth/signout')
}

export async function getMe(): Promise<UserProfile> {
  const res = await client.get<UserProfile>('/oauth/me')
  return res.data
}
