import { TableCell, TableRow } from '@/components/ui/Table'
import { Skeleton } from '@/components/ui/Skeleton'
import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import TABLE_CONFING from '../constants'

interface DataTableSkeletonProps<TData> {
  columnDefs: ColumnDef<TData>[]
}
interface RowSkeletonProps<TData> {
  columnDefs: ColumnDef<TData>[]
}

function DataTableSkeleton<TData>({ columnDefs }: DataTableSkeletonProps<TData>) {
  const numOfRows = TABLE_CONFING.PAGE_SIZE.OPTIONS.at(0)
  return (
    <>
      {[...Array(numOfRows)].map((_, ix) => (
        <RowSkeleton key={ix} columnDefs={columnDefs} />
      ))}
    </>
  )
}

function RowSkeleton<TData>({ columnDefs }: RowSkeletonProps<TData>) {
  return (
    <>
      <TableRow className="hover:bg-inherit">
        {columnDefs.map((col) => (
          <TableCell key={col.id}>
            <Skeleton className={cn(col.meta?.skeletonClassName)} />
          </TableCell>
        ))}
      </TableRow>
    </>
  )
}

export { DataTableSkeleton, RowSkeleton }
