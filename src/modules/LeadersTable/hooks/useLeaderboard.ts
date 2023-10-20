import { useEffect, useState } from "react";
import { getRecordsPaginated } from "@/api/services/getRecords";
import { RecordsPaginatedRequestData, type RecordsPaginatedResponseData } from "@/api/types";

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<RecordsPaginatedResponseData | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [meta, setMeta] = useState<RecordsPaginatedRequestData>({
    page: 0,
    perPage: 10,
  });

  const nextPage = () => {
    setMeta({
      ...meta,
      page: meta.page + 1,
    });
  };
  const prevPage = () => {
    setMeta({
      ...meta,
      page: meta.page > 0 ? meta.page - 1: 0,
    });
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getRecordsPaginated(meta);
      setLeaderboard(data);
      setLoading(false);
    };
    load();
  }, [meta]);
  return { leaderboard, isLoading, nextPage, prevPage };
}
