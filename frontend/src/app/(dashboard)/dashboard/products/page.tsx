"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, PlusIcon } from "lucide-react";
import { useState } from "react";
import { SearchBar } from "../components/search-bar";
import { ProductSort, ProfileFilter, ViewMode } from "@/types/product-filter";
import { FilterSelect } from "../components/filter-select";
import { PROFILE_OPTIONS, SORT_OPTIONS } from "@/constants/product-filters";
import { ViewToggle } from "../components/view-toggle";
import ProductTable from "../components/product/product-table";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [profile, setProfile] = React.useState<ProfileFilter>("semua-sangrai");
  const [sort, setSort] = React.useState<ProductSort>("terlaris");
  const [view, setView] = React.useState<ViewMode>("grid");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Katalog Produk Speciality
          </h1>
          <p className="text-sm text-muted-foreground">
            There is no order data yet. Manage stock, prices, and the Coffeo
            coffee product list.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <Button>
            <Download className="mr-1 size-4" />
            Export data
          </Button>
          <Button>
            <PlusIcon className="mr-1 size-4" />
            Add New Product
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search product..."
            className="max-w-md"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 lg:ml-auto">
          <FilterSelect
            value={profile}
            onValueChange={setProfile}
            options={PROFILE_OPTIONS}
            indicator="chevron"
          />
        </div>
        <FilterSelect
          value={sort}
          onValueChange={setSort}
          options={SORT_OPTIONS}
          indicator="sort"
        />

        <ViewToggle value={view} onChange={setView} />
      </div>
      {/* Tempat komponen tabel/list produk */}
      <div>
        <ProductTable />
      </div>
    </div>
  );
}
