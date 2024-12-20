import type { ColumnDef } from '@tanstack/react-table'
import { Skeleton } from '@/components/ui/Skeleton'
import { TableCell, TableRow } from '@/components/ui/Table'
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
      {[...new Array(numOfRows)].map((_, ix) => (
        <RowSkeleton key={ix} columnDefs={columnDefs} />
      ))}
    </>
  )
}

function RowSkeleton<TData>({ columnDefs }: RowSkeletonProps<TData>) {
  return (
    <TableRow className="hover:bg-inherit">
      {columnDefs.map((col, ix) => (
        <TableCell key={ix}>
          <Skeleton className={cn(col.meta?.skeletonClassName)} />
        </TableCell>
      ))}
    </TableRow>
  )
}

export { DataTableSkeleton, RowSkeleton }
