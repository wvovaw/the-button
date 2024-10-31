import { useRecords } from './hooks/useRecords'
import { DataTable } from './components/DataTable'
import columns from './components/ColumnsDefinitions'

export default function LeaderboardTable() {
  const { records, pagination, setPagination } = useRecords()

  const data = records?.data ?? []
  const rowsCount = records?.meta.itemsCount ?? 0

  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-6 mt-4">
        <h1 className="font-heading text-2xl font-bold tracking-wide text-foreground">Leaderboard</h1>
        <p className="mt-1 font-body text-base text-muted-foreground">Who pushes the button harder? 👈</p>
      </div>
      <DataTable
        columns={columns}
        data={data}
        rowsCount={rowsCount}
        pagination={pagination}
        onPaginationChange={setPagination}
      />
    </section>
  )
}
