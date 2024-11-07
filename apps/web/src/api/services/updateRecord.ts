import type { PostRecordRequesData, RecordData } from '../types'
import { createSignature } from '@/lib/signature'
import client from '../client'

export async function updateRecord(data: PostRecordRequesData): Promise<RecordData> {
  const signature = await createSignature(JSON.stringify(data))
  const res = await client.put<RecordData>('/records', data, {
    headers: {
      'X-Signature': signature,
    },
  })
  return res.data
}
