import { useEffect, useState } from "react";
import { getRecordsPaginated } from "@/api/services/getRecords";
// import { getRecordsPaginated } from "../api/mockGetRecords";
import { type RecordsPaginatedResponseData } from "@/api/types";
import { type PaginationState } from "@tanstack/react-table";

export function useRecords() {
  const [records, setRecords] = useState<RecordsPaginatedResponseData | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getRecordsPaginated({ page: pagination.pageIndex, perPage: pagination.pageSize });
      setRecords(data);
      setLoading(false);
    };
    load();
  }, [pagination]);
  return { pagination, setPagination, records, isLoading };
}
