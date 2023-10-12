import { RecordsPaginatedResponseData } from "../types";
import client from "../client";

export async function getRecordByUserId(meta: RecordsPaginatedResponseData): Promise<RecordsPaginatedResponseData> {
  const res = await client.get<RecordsPaginatedResponseData>(`/records`, meta);
  return res.data;
}
