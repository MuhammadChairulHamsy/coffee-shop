"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, FolderOpen } from "lucide-react";
import { formatDate, formatIDR } from "@/utils/format";
import type { CategoryStats } from "@/types/category";

type CategoryRowProps = {
  category: CategoryStats;
  onEdit?: (name: string) => void;
  onDelete?: (name: string) => void;
};

export function CategoryRow({ category, onEdit, onDelete }: CategoryRowProps) {
  const isActive = category.productCount > 0;

  return (
    <TableRow className="border-neutral-800 transition-colors hover:bg-neutral-900/50">
      {/* Category Name */}
      <TableCell className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400">
            <FolderOpen className="size-5" />
          </div>
          <span className="font-medium text-neutral-50">
            {category.name}
          </span>
        </div>
      </TableCell>

      {/* Description */}
      <TableCell className="hidden px-4 py-3 lg:table-cell">
        <p className="line-clamp-1 max-w-xs text-xs text-neutral-400">
          {category.description || "—"}
        </p>
      </TableCell>

      {/* Products Count */}
      <TableCell className="px-4 py-3 text-center">
        <span className="text-sm font-semibold text-neutral-50">
          {category.productCount}
        </span>
      </TableCell>

      {/* Total Value */}
      <TableCell className="hidden px-4 py-3 lg:table-cell">
        <span className="text-sm text-neutral-400">
          {formatIDR(category.totalValue)}
        </span>
      </TableCell>

      {/* Status */}
      <TableCell className="hidden px-4 py-3 lg:table-cell">
        <Badge
          variant="outline"
          className={
            isActive
              ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-400"
              : "border-neutral-800 bg-neutral-900 text-neutral-500"
          }
        >
          {isActive ? "Active" : "Empty"}
        </Badge>
      </TableCell>

      {/* Last Updated */}
      <TableCell className="hidden px-4 py-3 text-sm text-neutral-400 xl:table-cell">
        {formatDate(category.lastUpdated)}
      </TableCell>

      {/* Actions */}
      <TableCell className="px-4 py-3 text-right">
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit?.(category.name)}
            className="size-8 cursor-pointer text-neutral-400 hover:text-neutral-50"
            aria-label={`Edit ${category.name}`}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete?.(category.name)}
            className="size-8 cursor-pointer text-rose-400 hover:bg-rose-500/10"
            aria-label={`Hapus ${category.name}`}
            disabled={!isActive} 
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}