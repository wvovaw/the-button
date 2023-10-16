import { RecordsPaginatedRequestData, RecordsPaginatedResponseData } from "../types";
import client from "../client";

export async function getRecordsPaginated(meta: RecordsPaginatedRequestData): Promise<RecordsPaginatedResponseData> {
  const res = await client.get<RecordsPaginatedResponseData>(`/records`, { data: meta });
  return res.data;
}
