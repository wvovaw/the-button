import type { ColumnDef } from '@tanstack/react-table'
import type { RecordData } from '@/api/types'
import { formatRelative } from 'date-fns/formatRelative'
import { enUS as en } from 'date-fns/locale/en-US'

// To add meta fields modify react-table.d.ts file in the root dir of the module
const columns: ColumnDef<RecordData>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    meta: {
      skeletonClassName: 'h-2 w-4',
    },
  },
  {
    accessorKey: 'owner',
    header: 'Name',
    accessorFn: ({ owner }) => {
      return owner.name
    },
    meta: {
      skeletonClassName: 'h-2 w-18',
    },
  },
  {
    accessorKey: 'highscore',
    header: 'Highscore',
    meta: {
      skeletonClassName: 'h-2 w-8',
    },
  },
  {
    accessorKey: 'average',
    header: 'AVG',
    cell: ({ row }) => {
      return row.original.average.toFixed(2)
    },
    meta: {
      skeletonClassName: 'h-2 w-6',
    },
  },
  {
    accessorKey: 'totalClicks',
    header: 'Clicks',
    meta: {
      skeletonClassName: 'h-2 w-8',
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last update',
    cell: ({ row }) => {
      return (
        <span>
          {formatRelative(Date.parse(row.original.updatedAt), Date.now(), {
            locale: en,
            weekStartsOn: 1,
          })}
        </span>
      )
    },
    meta: {
      skeletonClassName: 'h-2 w-16',
    },
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Created",
  //   cell: ({ row }) => {
  //     return (
  //       <span>
  //         {Intl.DateTimeFormat("ru-RU", { dateStyle: "short", timeStyle: "short" }).format(
  //           Date.parse(row.original.createdAt),
  //         )}
  //       </span>
  //     );
  //   },
  //   meta: {
  //     skeletonClassName: "h-2 w-16",
  //   },
  // },
]

export default columns
