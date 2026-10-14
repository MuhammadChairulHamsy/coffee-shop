"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, PlusIcon } from "lucide-react";
import { SearchBar } from "@//app/(dashboard)/dashboard/components/search-bar";
import { FilterSelect } from "@/app/(dashboard)/dashboard/components/filter-select";
import { ViewToggle } from "@/app/(dashboard)/dashboard/components/view-toggle";
import ProductTable from "@/app/(dashboard)/dashboard/components/product/product-table";
import { useProducts } from "@/hooks/useProducts";
import { useDebounce } from "@/hooks/use-debounce";
import {
  PAGE_SIZE,
  PROFILE_OPTIONS,
  SORT_OPTIONS,
} from "@/constants/product-filters";
import type { Product } from "@/types/product";
import type {
  ProfileFilter,
  ProductSort,
  ViewMode,
} from "@/types/product-filter";

export default function ProductsPage() {
  /* ---------- UI State ---------- */
  const [search, setSearch] = React.useState("");
  const [profile, setProfile] = React.useState<ProfileFilter>("semua-sangrai");
  const [sort, setSort] = React.useState<ProductSort>("terlaris");
  const [view, setView] = React.useState<ViewMode>("grid");
  const [page, setPage] = React.useState(1);

  // ⬇️ Simpan pilihan user mentah (tanpa sync ke products)
  const [pickedIds, setPickedIds] = React.useState<number[]>([]);

  const debouncedSearch = useDebounce(search, 300);

  /* ---------- Data Fetching ---------- */
  const { products, meta, status, error, refetch } = useProducts({
    page,
    limit: PAGE_SIZE,
    search: debouncedSearch || undefined,
  });

  /* ---------- Derived: selectedIds yang valid saja ---------- */
  const selectedIds = React.useMemo(
    () => pickedIds.filter((id) => products.some((p) => p.id === id)),
    [pickedIds, products],
  );

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

  const handleEdit = React.useCallback((product: Product) => {
    // TODO
  }, []);

  const handleDelete = React.useCallback((product: Product) => {
    // TODO
  }, []);

  /* ---------- Effect: reset page saat search berubah ---------- */
  React.useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  /* ---------- Render ---------- */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Katalog Produk Speciality
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola stok, harga, dan daftar produk kopi Coffeo.
          </p>
        </div>
        <div className="flex flex-row gap-2 lg:flex-col">
          <Button variant="outline">
            <Download className="mr-1 size-4" />
            Export
          </Button>
          <Button>
            <PlusIcon className="mr-1 size-4" />
            New Product
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
          <FilterSelect
            value={profile}
            onValueChange={setProfile}
            options={PROFILE_OPTIONS}
            indicator="chevron"
          />
          <FilterSelect
            value={sort}
            onValueChange={setSort}
            options={SORT_OPTIONS}
            indicator="sort"
          />
          <ViewToggle value={view} onChange={setView} />
        </div>
      </div>

      {/* Info count */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
    </div>
  );
}
