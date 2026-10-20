"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, PlusIcon } from "lucide-react";
import { CategoryStatCards } from "../components/categories/category-stat-cards";
import type { CategoryStats } from "@/types/category";
import CategoryTable from "../components/categories/category-table";

// Data Dummy sementara (menyesuaikan dengan seed produk kamu)
const DUMMY_CATEGORIES: CategoryStats[] = [
  {
    name: "Coffee Beans",
    description: "Biji kopi single origin dan blend.",
    productCount: 4,
    totalValue: 680000,
    lastUpdated: new Date().toISOString(),
    status: "active",
  },
  {
    name: "Accessories",
    description: "Alat seduh dan merchandise Coffeo.",
    productCount: 3,
    totalValue: 505000,
    lastUpdated: new Date().toISOString(),
    status: "active",
  },
  {
    name: "Apparel",
    description: null,
    productCount: 0,
    totalValue: 0,
    lastUpdated: new Date().toISOString(),
    status: "empty",
  },
];

export default function CategoriesPage() {
  const handleEdit = (name: string) => {
    console.log("Edit category:", name);
  };

  const handleDelete = (name: string) => {
    console.log("Delete category:", name);
  };

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="font-playfair text-sidebar-foreground text-3xl font-bold tracking-wider">
            Kategori Produk
          </h1>
          <p className="text-sm text-sidebar-foreground">
            Atur kategori seperti Coffee Beans, Accessories, dan Apparel.
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

      {/* Statistik Cards */}
      <CategoryStatCards />

      {/* Tabel Kategori */}
      <div className="mt-8">
        <CategoryTable
          categories={DUMMY_CATEGORIES}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}