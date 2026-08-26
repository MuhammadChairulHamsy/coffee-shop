"use client";

import { useState, useOptimistic, startTransition } from "react";
import type { Product } from "@/types";
import { toggleProductLike } from "@/actions/toggleProductLike";

export function useFilteredProducts(initialProducts: Product[] = []) {
  const safeProducts = initialProducts || [];
  const [activeFilter, setActiveFilter] = useState("all");

  // Logika Optimistic Update untuk Like/Unlike
  const [optimisticProducts, toggleOptimisticLike] = useOptimistic(
    safeProducts,
    (state, productId: number) =>
      state.map((p) =>
        p.id === productId ? { ...p, is_liked: !p.is_liked } : p
      )
  );

  // Logika Penyaringan Kategori berdasarkan kolom 'category'
  const filteredProducts =
    activeFilter === "all"
      ? optimisticProducts
      : optimisticProducts.filter(
          (p) => p.category?.toLowerCase() === activeFilter.toLowerCase()
        );

  // Handler klik ikon Heart
  const handleLikeClick = async (productId: number, isLiked: boolean) => {
    startTransition(() => {
      toggleOptimisticLike(productId);
    });

    try {
      await toggleProductLike(productId, isLiked);
    } catch (error) {
      console.error("Gagal memperbarui like:", error);
      alert("Gagal menyukai produk, silakan login terlebih dahulu.");
    }
  };

  return {
    activeFilter,
    setActiveFilter,
    filteredProducts,
    handleLikeClick,
  };
}