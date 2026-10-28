"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, PlusIcon } from "lucide-react";
import { SearchBar } from "@//app/(dashboard)/dashboard/components/search-bar";
import { FilterSelect } from "@/app/(dashboard)/dashboard/components/filter-select";
import { ViewToggle } from "@/app/(dashboard)/dashboard/components/view-toggle";
import ProductTable from "@/app/(dashboard)/dashboard/components/product/product-table";
import { ProductFormDialog } from "@/app/(dashboard)/dashboard/components/product/product-form-dialog";
import { ProductDeleteDialog } from "@/app/(dashboard)/dashboard/components/product/product-delete-dialog";
import { useProducts } from "@/hooks/use-products";
import { useDebounce } from "@/hooks/use-debounce";
import {
  PAGE_SIZE,
  PROFILE_OPTIONS,
  SORT_OPTIONS,
} from "@/constants/product-filters";
import type { Product, RoastProfile } from "@/schemas/product.schema";
import type { ProductSort, ViewMode } from "@/types/product-filter";

export default function ProductsPage() {
  /* ---------- Filter State ---------- */
  const [search, setSearch] = React.useState("");
  const [profile, setProfile] = React.useState<RoastProfile>("semua-sangrai");
  const [sort, setSort] = React.useState<ProductSort>("terbaru");
  const [view, setView] = React.useState<ViewMode>("grid");
  const [page, setPage] = React.useState(1);

  /* ---------- Selection State ---------- */
  const [pickedIds, setPickedIds] = React.useState<number[]>([]);

  /* ---------- Dialog State ---------- */
  const [formOpen, setFormOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(
    null,
  );
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deletingProduct, setDeletingProduct] = React.useState<Product | null>(
    null,
  );

  const debouncedSearch = useDebounce(search, 300);

  /* ---------- Data Fetching ---------- */
  const { products, meta, status, error, refetch } = useProducts({
    page,
    limit: PAGE_SIZE,
    search: debouncedSearch || undefined,
    sort,
    profile,
  });

  /* ---------- Derived Selection ---------- */
  const selectedIds = React.useMemo(
    () => pickedIds.filter((id) => products.some((p) => p.id === id)),
    [pickedIds, products],
  );

  /* ---------- Reset page saat filter berubah ---------- */
  React.useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sort, profile]);

  /* ---------- Handlers ---------- */
  const handleSelectOne = React.useCallback((id: number, checked: boolean) => {
    setPickedIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id),
    );
  }, []);

  const handleSelectAll = React.useCallback(
    (checked: boolean) => {
      setPickedIds(checked ? products.map((p) => p.id) : []);
    },
    [products],
  );

  const handleCreate = React.useCallback(() => {
    setEditingProduct(null);
    setFormOpen(true);
  }, []);

  const handleEdit = React.useCallback((product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  }, []);

  const handleDelete = React.useCallback((product: Product) => {
    setDeletingProduct(product);
    setDeleteOpen(true);
  }, []);

  /* ---------- Render ---------- */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl text-sidebar-foreground font-bold tracking-tight">
            Katalog Produk Speciality
          </h1>
          <p className="text-sm text-sidebar-foreground">
            Kelola stok, harga, dan daftar produk kopi Coffeo.
          </p>
        </div>
        <div className="flex flex-row gap-2 lg:flex-col">
          <Button variant="outline">
            <Download className="mr-1 size-4" /> Export
          </Button>
          <Button onClick={handleCreate}>
            <PlusIcon className="mr-1 size-4" /> New Product
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-md flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search product..."
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:ml-auto">
          <FilterSelect<RoastProfile>
            value={profile}
            onValueChange={setProfile}
            options={PROFILE_OPTIONS}
            indicator="chevron"
          />
          <FilterSelect<ProductSort>
            value={sort}
            onValueChange={setSort}
            options={SORT_OPTIONS}
            indicator="sort"
          />
          <ViewToggle value={view} onChange={setView} />
        </div>
      </div>

      {/* Info count */}
      <div className="flex items-center gap-2 text-xs text-sidebar-foreground">
        <span>
          Menampilkan {meta?.total ?? 0} produk
          {selectedIds.length > 0 && ` · ${selectedIds.length} dipilih`}
        </span>
        {status.isFetching && <span>· Memuat…</span>}
      </div>

      {/* Table */}
      <ProductTable
        products={products}
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

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Sebelumnya
          </Button>
          <span className="text-xs text-muted-foreground">
            Halaman {page} dari {meta.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= meta.totalPages}
            onClick={() => setPage(page + 1)}
          >
            Selanjutnya
          </Button>
        </div>
      )}

      {/* Dialogs */}
      <ProductFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        product={editingProduct}
      />
      <ProductDeleteDialog
        product={deletingProduct}
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setDeletingProduct(null);
        }}
      />
    </div>
  );
}
