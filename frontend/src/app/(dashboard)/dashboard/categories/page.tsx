"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, PlusIcon } from "lucide-react";
import { CategoryStatCards } from "../components/categories/category-stat-cards";
import CategoryTable from "@/app/(dashboard)/dashboard/components/categories/category-table";
import { useCategories } from "@/hooks/use-products";
import { useDebounce } from "@/hooks/use-debounce";
import { CategoryFormDialog } from "../components/categories/category-form-dialog";
import { CATEGORY_SORT_OPTIONS, PAGE_SIZE } from "@/constants/category-filters";
import type { CategorySort, CategoryStats } from "@/schemas/category.schema";
import { CategoryDeleteDialog } from "../components/categories/category-delete-dialog";
import { SearchBar } from "../components/search-bar";
import { FilterSelect } from "../components/filter-select";
import { ViewToggle } from "../components/view-toggle";
import { ViewMode } from "@/types/ui";

export default function CategoriesPage() {
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = React.useState<CategorySort>("all");
  const [view, setView] = React.useState<ViewMode>("grid");

  /* ---------- Dialog State ---------- */
  const [formOpen, setFormOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] =
    React.useState<CategoryStats | null>(null);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deletingCategory, setDeletingCategory] =
    React.useState<CategoryStats | null>(null);

  /* ---------- Selection State ---------- */
  const [pickedIds, setPickedIds] = React.useState<number[]>([]);

  /* ---------- Debounce & Data Fetching ---------- */
  const debouncedSearch = useDebounce(search, 300);

  const { categories, status, error, refetch } = useCategories({
    page,
    limit: PAGE_SIZE,
    sort,
    search: debouncedSearch || undefined,
  });

  /* ---------- Derived Selection ---------- */
  const selectedIds = React.useMemo(
    () => pickedIds.filter((id) => categories.some((c) => c.id === id)),
    [pickedIds, categories],
  );

  /* ---------- Reset page saat filter berubah ---------- */
  React.useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sort]);

  /* ---------- Handlers ---------- */
  const handleSelectOne = React.useCallback((id: number, checked: boolean) => {
    setPickedIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id),
    );
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
  }, []);

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
          <Button
            onClick={() => {
              setEditingCategory(null);
              setFormOpen(true);
            }}
          >
            <PlusIcon className="mr-1 size-4" /> Add Category
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <CategoryStatCards categories={categories} isLoading={status.isLoading} />

      {/* Search Bar & Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-md flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search category name, description..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:ml-auto">
          {/* Filter Sort Menggunakan Opsi Kategori */}
          <FilterSelect
            value={sort}
            onValueChange={setSort}
            options={CATEGORY_SORT_OPTIONS}
            indicator="sort"
          />
          <ViewToggle value={view} onChange={setView} />
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-sidebar-foreground">
        <span>
          Menampilkan {categories.length} category
          {selectedIds.length > 0 && ` · ${selectedIds.length} dipilih`}
        </span>
        {status.isFetching && <span>· Memuat…</span>}
      </div>

      {/* Table */}
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

      {/* Dialogs */}
      <CategoryFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        category={editingCategory}
      />
      <CategoryDeleteDialog
        category={deletingCategory}
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setDeletingCategory(null);
        }}
      />
    </div>
  );
}
