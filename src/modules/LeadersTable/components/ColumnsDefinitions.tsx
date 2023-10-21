import { ColumnDef } from "@tanstack/react-table";

import { type RecordData } from "@/api/types";

// To add meta fields modify react-table.d.ts file in the root dir of the module
const columns: ColumnDef<RecordData>[] = [
  {
    accessorKey: "id",
    header: "id",
    meta: {
      skeletonClassName: "h-3 w-4",
    },
  },
  {
    accessorKey: "Name",
    accessorFn: ({ owner }) => {
      return owner.name;
    },
    meta: {
      skeletonClassName: "h-3 w-18",
    },
  },
  {
    accessorKey: "highScore",
    header: "Highscore",
    meta: {
      skeletonClassName: "h-3 w-8",
    },
  },
  {
    accessorKey: "totalAttempts",
    header: "Attempts",
    meta: {
      skeletonClassName: "h-3 w-8",
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      return (
        <span>
          {Intl.DateTimeFormat("ru-RU", { dateStyle: "short", timeStyle: "short" }).format(
            Date.parse(row.original.createdAt),
          )}
        </span>
      );
    },
    meta: {
      skeletonClassName: "h-3 w-16",
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last update",
    cell: ({ row }) => {
      return (
        <span>
          {Intl.DateTimeFormat("ru-RU", { dateStyle: "short", timeStyle: "short" }).format(
            Date.parse(row.original.updatedAt),
          )}
        </span>
      );
    },
    meta: {
      skeletonClassName: "h-3 w-16",
    },
  },
];

export default columns;
