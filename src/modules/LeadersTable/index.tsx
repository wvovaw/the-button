import { useRecords } from "./hooks/useRecords";
import { DataTable } from "./components/DataTable";
import columns from "./components/ColumnsDefinitions";

export default function LeaderboardTable() {
  const { records, pagination, setPagination } = useRecords();

  const data = records?.data ?? [];
  const rowsCount = records?.meta.itemsCount ?? 0;

  return (
    <DataTable
      columns={columns}
      data={data}
      rowsCount={rowsCount}
      pagination={pagination}
      onPaginationChange={setPagination}
    />
  );
}
