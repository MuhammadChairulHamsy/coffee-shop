"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductRow } from "./product-row";
import { ProductTableSkeleton } from "./product-table-skeleton";
import { ProductEmptyState } from "./product-empty-state";
import { ProductErrorState } from "./product-error-state";
import type { ProductTableProps } from "@/types/product";
import { COLUMNS_TABLE_PRODUCT } from "@/constants/product";


export default function ProductTable({
  products,
  isLoading,
  isError,
  error,
  selectedIds,
  onSelectOne,
  onSelectAll,
  onEdit,
  onDelete,
  onRetry,
}: ProductTableProps) {
  const allSelected =
    products.length > 0 && selectedIds.length === products.length;
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
                  disabled={products.length === 0}
                  aria-label="Pilih semua produk"
                />
              </TableHead>
              {COLUMNS_TABLE_PRODUCT.map((col) => (
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
            {isLoading && <ProductTableSkeleton />}
            {!isLoading && isError && error && (
              <ProductErrorState error={error} onRetry={onRetry} />
            )}
            {!isLoading && !isError && products.length === 0 && (
              <ProductEmptyState />
            )}
            {!isLoading &&
              !isError &&
              products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  isSelected={selectedIds.includes(product.id)}
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
