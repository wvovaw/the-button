import { CreateRecordRequestData, RecordData } from "../types";
import client from "../client";

export async function createRecord(data: CreateRecordRequestData): Promise<RecordData> {
  const res = await client.post<RecordData>("/records", data);
  return res.data;
}
