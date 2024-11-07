import type { PostRecordRequesData, RecordData } from '../types'
import { createSignature } from '@/lib/signature'
import client from '../client'

export async function createRecord(data: PostRecordRequesData): Promise<RecordData> {
  const signature = await createSignature(JSON.stringify(data))
  const res = await client.post<RecordData>('/records', data, {
    headers: {
      'X-Signature': signature,
    },
  })
  return res.data
}
