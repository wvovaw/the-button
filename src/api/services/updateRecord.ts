import { UpdateRecordRequestData, RecordData } from "../types";
import client from "../client";

export async function updateRecord(data: UpdateRecordRequestData): Promise<RecordData> {
  const res = await client.put<RecordData>("/records", data);
  return res.data;
}
