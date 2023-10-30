import { useRecords } from "./hooks/useRecords";
import { DataTable } from "./components/DataTable";
import columns from "./components/ColumnsDefinitions";

export default function LeaderboardTable() {
  const { records, pagination, setPagination } = useRecords();

  const data = records?.data ?? [];
  const rowsCount = records?.meta.itemsCount ?? 0;

  return (
    <section className="mx-auto max-w-5xl">
      <div className="mt-4 mb-6">
        <h1 className="text-2xl font-bold text-foreground font-heading tracking-wide">Leaderboard</h1>
        <p className="mt-1 text-base text-muted-foreground font-body">
          Who pushes the button harder? 👈 
        </p>
      </div>
      <DataTable
        columns={columns}
        data={data}
        rowsCount={rowsCount}
        pagination={pagination}
        onPaginationChange={setPagination}
      />
    </section>
  );
}
