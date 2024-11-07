import type { RecordData } from '../types'
import client from '../client'

export async function getRecordByUserId(userId: number): Promise<RecordData> {
  const res = await client.get<RecordData>(`/records/${userId}`)
  return res.data
}
