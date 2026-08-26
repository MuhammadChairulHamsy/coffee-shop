"use client"

import { useProducts } from "@/hooks/useProducts";
import LatestProductsClient from "./latestProductsClient";

const LatestProducts = async () => {
  const { data: products, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-muted-foreground animate-pulse">
          Memuat produk spesial...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>Gagal memuat produk: {error.message}</p>
      </div>
    );
  }
  return (
    <section className="container mx-auto mt-12 lg:mt-32 px-4 mb-20">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
        <h3 className="text-primary font-bold text-3xl lg:text-5xl tracking-tight">
          Explore the recent products
        </h3>
        <p className="text-muted-foreground font-medium text-sm lg:text-base">
          Our delectable drink options, including classic espresso choices,
          house specialties, fruit smoothies and frozen treats.
        </p>
      </div>

      {/* Product Grid Client Area dengan Fitur Like Aktif */}
      <LatestProductsClient initialProducts={products || []} />
    </section>
  );
};

export default LatestProducts;
