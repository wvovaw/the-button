import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'

import { type Table } from '@tanstack/react-table'
import TABLE_CONFING from '../constants'

interface TablePaginationProps<TData> {
  table: Table<TData>
}

export default function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
  return (
    <div className="flex justify-between py-4">
      <Select
        value={table.getState().pagination.pageSize.toString()}
        onValueChange={(val) => table.setPageSize(Number(val))}
      >
        <SelectTrigger className="h-8 w-14">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {TABLE_CONFING.PAGE_SIZE.OPTIONS.map((i) => (
            <SelectItem key={i} value={i.toString()}>
              {i}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center justify-end space-x-2">
        <span className="text-center text-sm">
          page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronFirst className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronLast className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
