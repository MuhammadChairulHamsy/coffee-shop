"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, PlusIcon } from "lucide-react";
import { CategoryStatCards } from "../components/categories/category-stat-cards";
import CategoryTable from "@/app/(dashboard)/dashboard/components/categories/category-table";
import { useCategories } from "@/hooks/use-products";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";

export default function CategoriesPage() {
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 300);

  // Ambil data asli dari API
  const { categories, status, error } = useCategories(debouncedSearch || undefined);

  const handleEdit = (name: string) => {
    toast.info(`Fitur edit untuk kategori "${name}" belum tersedia.`);
  };

  const handleDelete = (name: string) => {
    toast.error("Fitur hapus kategori belum diimplementasikan.");
  };

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
          <Button>
            <PlusIcon className="mr-1 size-4" /> Add Category
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <CategoryStatCards categories={categories} isLoading={status.isLoading} />

      {/* Search Bar Kategori */}
      <div className="flex items-center gap-3">
        <div className="relative max-w-md flex-1">
          {/* Asumsi kamu punya komponen SearchBar */}
          <input
            type="text"
            placeholder="Cari kategori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-md border border-neutral-800 bg-neutral-900 px-4 text-sm text-neutral-50 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-700"
          />
        </div>
      </div>

      {/* Table dengan Status Loading & Error */}
      {status.isError && (
        <div className="rounded-lg border border-rose-900/50 bg-rose-900/10 p-4 text-center text-sm text-rose-400">
          Gagal memuat kategori: {error?.message}
        </div>
      )}

      <CategoryTable
        categories={categories}
        isLoading={status.isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}