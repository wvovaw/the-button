import { SignUpRequestData, SignUpResponseData } from '@/types';
import client from '../client';

export async function signUp(signUpData: SignUpRequestData): Promise<SignUpResponseData> {
  const res = await client.post<SignUpResponseData>('/users', signUpData);
  return res.data;
}
