"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, PlusIcon } from "lucide-react";
import { CategoryStatCards } from "../components/categories/category-stat-cards";
import CategoryTable from "@/app/(dashboard)/dashboard/components/categories/category-table";
import { useCategories } from "@/hooks/use-products";
import { useDebounce } from "@/hooks/use-debounce";
import { CategoryFormDialog } from "../components/categories/category-form-dialog";
import { PAGE_SIZE } from "@/constants/product-filters";
import type { CategoryStats } from "@/schemas/category.schema";
import { CategoryDeleteDialog } from "../components/categories/category-delete-dialog";

export default function CategoriesPage() {
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);

  /* ---------- Dialog State ---------- */
  const [formOpen, setFormOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] = React.useState<CategoryStats | null>(null);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deletingCategory, setDeletingCategory] = React.useState<CategoryStats | null>(null);

  /* ---------- Selection State ---------- */
  const [pickedIds, setPickedIds] = React.useState<number[]>([]);

  /* ---------- Debounce & Data Fetching (Urutan sudah benar) ---------- */
  const debouncedSearch = useDebounce(search, 300);

  const { categories, meta, status, error, refetch } = useCategories({
    page,
    limit: PAGE_SIZE,
    search: debouncedSearch || undefined,
  });

  /* ---------- Derived Selection ---------- */
  const selectedIds = React.useMemo(
    () => pickedIds.filter((id) => categories.some((c) => c.id === id)),
    [pickedIds, categories],
  );

  /* ---------- Handlers ---------- */
  const handleSelectOne = React.useCallback((id: number, checked: boolean) => {
    setPickedIds((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));
  }, []);

  const handleSelectAll = React.useCallback(
    (checked: boolean) => {
      setPickedIds(checked ? categories.map((c) => c.id) : []);
    },
    [categories],
  );

  const handleEdit = React.useCallback((category: CategoryStats) => {
    setEditingCategory(category);
    setFormOpen(true);
  }, []); // ✅ Tambahkan [] agar sesuai kaidah useCallback

  const handleDelete = React.useCallback((category: CategoryStats) => {
    setDeletingCategory(category);
    setDeleteOpen(true);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="font-playfair text-sidebar-foreground text-3xl font-bold tracking-wider">
            Kategori Produk
          </h1>
          <p className="text-sm text-sidebar-foreground">
            Atur kategori produk kopi dan merchandise Anda.
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <Button variant="outline">
            <Download className="mr-1 size-4" /> Export
          </Button>
          <Button onClick={() => { setEditingCategory(null); setFormOpen(true); }}>
            <PlusIcon className="mr-1 size-4" /> Add Category
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <CategoryStatCards categories={categories} isLoading={status.isLoading} />

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Cari kategori..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 w-full max-w-md rounded-md border border-neutral-800 bg-neutral-900 px-4 text-sm text-neutral-50 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-700"
        />
      </div>

      {/* Table */}
      {status.isError && (
        <div className="rounded-lg border border-rose-900/50 bg-rose-900/10 p-4 text-center text-sm text-rose-400">
          Gagal memuat kategori: {error?.message}
        </div>
      )}

      <CategoryTable
        categories={categories}
        isLoading={status.isLoading}
        isError={status.isError}
        error={error}
        selectedIds={selectedIds}
        onSelectOne={handleSelectOne}
        onSelectAll={handleSelectAll}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRetry={refetch}
      />

      <CategoryFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        category={editingCategory}
      />
      <CategoryDeleteDialog category={deletingCategory} open={deleteOpen} onOpenChange={(open) => {
        setDeleteOpen(open);
        if(!open) setDeletingCategory(null)
      }}/>
    </div>
  );
}