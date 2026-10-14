import { TableCell, TableRow } from "@/components/ui/table";

export function ProductTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i} className="border-neutral-800">
          <TableCell className="px-4 py-3">
            <div className="size-4 animate-pulse rounded bg-neutral-800" />
          </TableCell>
          <TableCell className="px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="size-12 animate-pulse rounded-md bg-neutral-800" />
              <div className="flex flex-col gap-2">
                <div className="h-4 w-32 animate-pulse rounded bg-neutral-800" />
                <div className="h-3 w-20 animate-pulse rounded bg-neutral-800" />
              </div>
            </div>
          </TableCell>
          <TableCell className="hidden px-4 py-3 lg:table-cell">
            <div className="h-4 w-40 animate-pulse rounded bg-neutral-800" />
          </TableCell>
          <TableCell className="px-4 py-3">
            <div className="mx-auto h-4 w-20 animate-pulse rounded bg-neutral-800" />
          </TableCell>
          <TableCell className="hidden px-4 py-3 lg:table-cell">
            <div className="h-5 w-16 animate-pulse rounded bg-neutral-800" />
          </TableCell>
          <TableCell className="hidden px-4 py-3 lg:table-cell">
            <div className="h-5 w-16 animate-pulse rounded bg-neutral-800" />
          </TableCell>
          <TableCell className="hidden px-4 py-3 xl:table-cell">
            <div className="h-5 w-12 animate-pulse rounded bg-neutral-800" />
          </TableCell>
          <TableCell className="px-4 py-3">
            <div className="ml-auto size-8 animate-pulse rounded bg-neutral-800" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}