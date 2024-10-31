import { RecordsPaginatedQuerystringData, RecordsPaginatedResponseData } from "../types";
import client from "../client";

export async function getRecordsPaginated(meta: RecordsPaginatedQuerystringData): Promise<RecordsPaginatedResponseData> {
  const res = await client.get<RecordsPaginatedResponseData>(`/records`, { params: meta });
  return res.data;
}
