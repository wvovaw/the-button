import { PostRecordRequesData, RecordData } from "../types";
import client from "../client";
import { createSignature } from "@/lib/signature";

export async function createRecord(data: PostRecordRequesData): Promise<RecordData> {
  const signature = await createSignature(JSON.stringify(data));
  const res = await client.post<RecordData>("/records", data, {
    headers: {
      "X-Signature": signature 
    }
  });
  return res.data;
}
