import { StatisticsResponseData } from "../types";
import client from "../client";

export async function getStatistics(): Promise<StatisticsResponseData> {
  const res = await client.get<StatisticsResponseData>(`/statistics`);
  return res.data;
}