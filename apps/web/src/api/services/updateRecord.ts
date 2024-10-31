import { PostRecordRequesData, RecordData } from '../types'
import client from '../client'
import { createSignature } from '@/lib/signature'

export async function updateRecord(data: PostRecordRequesData): Promise<RecordData> {
  const signature = await createSignature(JSON.stringify(data))
  const res = await client.put<RecordData>('/records', data, {
    headers: {
      'X-Signature': signature,
    },
  })
  return res.data
}
