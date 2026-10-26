import { TableCell, TableRow } from "@/components/ui/table";
import { Coffee } from "lucide-react";

export function CategoryEmptyState() {
  return (
    <TableRow className="border-neutral-800">
      <TableCell colSpan={8} className="px-4 py-16 text-center">
        <div className="mx-auto flex max-w-sm flex-col items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-full bg-neutral-900">
            <Coffee className="size-5 text-neutral-500" />
          </div>
          <p className="text-sm font-medium text-neutral-200">
            Belum ada category
          </p>
          <p className="text-xs text-neutral-500">
            Tambahkan category pertama Anda dengan tombol &quot;New category&quot;
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
}