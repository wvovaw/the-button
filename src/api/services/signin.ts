import { SignInRequestData, SignInResponseData } from '@/types';
import client from '../client';

export async function signIn(signInData: SignInRequestData): Promise<SignInResponseData> {
  const res = await client.post<SignInResponseData>('/users/login', signInData);
  return res.data;
}
