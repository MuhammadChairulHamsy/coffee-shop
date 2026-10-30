"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, FolderOpen } from "lucide-react";
import { formatDate, formatIDR } from "@/utils/format";
import type { CategoryStats } from "@/schemas/category.schema";
import { Checkbox } from "@/components/ui/checkbox";

type CategoryRowProps = {
  category: CategoryStats;
  isSelected: boolean;
  onSelectOne: (id: number, checked: boolean) => void;
  onEdit?: (category: CategoryStats) => void;
  onDelete?: (category: CategoryStats) => void;
};

export function CategoryRow({
  category,
  isSelected,
  onSelectOne,
  onEdit,
  onDelete,
}: CategoryRowProps) {
  const isActive = category.productCount > 0;

  return (
    <TableRow
      className={
        isSelected
          ? "border-neutral-800 bg-neutral-900/50 transition-colors"
          : "border-neutral-800 transition-colors"
      }
    >
      <TableCell className="px-4 py-3">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) =>
            onSelectOne(category.id, Boolean(checked))
          }
        />
      </TableCell>
      <TableCell className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400">
            <FolderOpen className="size-5" />
          </div>
          <span className="font-medium text-neutral-50">{category.name}</span>
        </div>
      </TableCell>

      <TableCell className="hidden px-4 py-3 lg:table-cell">
        <p className="line-clamp-1 max-w-xs text-xs text-neutral-400">
          {category.description || "—"}
        </p>
      </TableCell>

      <TableCell className="px-4 py-3 text-center">
        <span className="text-sm font-semibold text-neutral-50">
          {category.productCount}
        </span>
      </TableCell>

      <TableCell className="hidden px-4 py-3 lg:table-cell">
        <span className="text-sm text-neutral-400">
          {formatIDR(category.totalValue)}
        </span>
      </TableCell>

      {/* Status Badge yang sudah dibenarkan */}
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

      <TableCell className="hidden px-4 py-3 text-sm text-neutral-400 xl:table-cell">
        {formatDate(category.lastUpdated)}
      </TableCell>

      <TableCell className="px-4 py-3 text-right">
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit?.(category)}
            className="size-8 cursor-pointer text-neutral-400 hover:text-neutral-50"
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete?.(category)}
            className="size-8 cursor-pointer text-rose-400 hover:bg-rose-500/10"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
