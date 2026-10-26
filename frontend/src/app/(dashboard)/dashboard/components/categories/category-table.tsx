"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryRow } from "./category-row";
import type { CategoryTableProps } from "@/types/category";
import { FolderOpen } from "lucide-react";
import { COLUMNS } from "@/constants/categories";
import { Checkbox } from "@/components/ui/checkbox";
import { CategoryErrorState } from "./category-error-state";
import { CategoryEmptyState } from "./category-empty-state";
import { CategoryTableSkeleton } from "./category-table-skeleton";

export default function CategoryTable({
  categories,
  isLoading,
  isError,
  error,
  selectedIds,
  onSelectOne,
  onSelectAll,
  onEdit,
  onDelete,
  onRetry,
}: CategoryTableProps) {
  const allSelected =
    categories.length > 0 && selectedIds.length === categories.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-neutral-800 hover:bg-transparent">
              <TableHead className="w-12 px-4 py-3">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(checked) => onSelectAll(Boolean(checked))}
                  disabled={categories.length === 0}
                  aria-label="Pilih semua categories"
                />
              </TableHead>
              {COLUMNS.map((col) => (
                <TableHead
                  key={col.key}
                  className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-400 ${col.className}`}
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
             {isLoading && <CategoryTableSkeleton />}
            {!isLoading && isError && error && (
              <CategoryErrorState error={error} onRetry={onRetry} />
            )}
            {!isLoading && !isError && categories.length === 0 && (
              <CategoryEmptyState />
            )}
            {!isLoading &&
              !isError &&
              categories.map((category) => (
                <CategoryRow
                  key={category.name}
                  category={category}
                  isSelected={selectedIds.includes(category.id)}
                  onSelectOne={onSelectOne}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
