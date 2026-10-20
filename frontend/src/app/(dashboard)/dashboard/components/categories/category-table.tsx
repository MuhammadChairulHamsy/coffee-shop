"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { CategoryRow } from "./category-row";
import type { CategoryStats } from "@/types/category";
import { FolderOpen } from "lucide-react";

const COLUMNS = [
  { key: "name", label: "Category Name", className: "w-[25%]" },
  { key: "description", label: "Description", className: "hidden lg:table-cell" },
  { key: "price", label: "Products", className: "text-center w-[10%]" },
  { key: "type", label: "Total Value", className: "hidden lg:table-cell" },
  { key: "category", label: "Status", className: "hidden lg:table-cell" },
  { key: "status", label: "Last Updated", className: "hidden xl:table-cell" },
  { key: "actions", label: "Actions", className: "text-right" },
] as const;

type CategoryTableProps = {
  categories: CategoryStats[];
  isLoading?: boolean;
  onEdit?: (name: string) => void;
  onDelete?: (name: string) => void;
};

export default function CategoryTable({
  categories,
  isLoading,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-neutral-800 hover:bg-transparent">
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-neutral-500">
                  Memuat data...
                </TableCell>
              </TableRow>
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex size-12 items-center justify-center rounded-full bg-neutral-900">
                      <FolderOpen className="size-6 text-neutral-600" />
                    </div>
                    <p className="text-sm font-medium text-neutral-300">
                      Belum ada kategori
                    </p>
                    <p className="text-xs text-neutral-500">
                      Tambahkan kategori pertama Anda.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
                <CategoryRow
                  key={category.name}
                  category={category}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}