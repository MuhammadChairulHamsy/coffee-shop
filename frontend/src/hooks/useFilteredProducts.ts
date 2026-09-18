"use client";

import { useState, useOptimistic, startTransition } from "react";
import type { Product } from "@/types";
import { toggleProductLike } from "@/actions/toggleProductLike";

export function useFilteredProducts(initialProducts: Product[] = []) {
  const safeProducts = initialProducts || [];
  const [activeFilter, setActiveFilter] = useState("All");

  // Logika Optimistic Update untuk Like/Unlike
  const [optimisticProducts, toggleOptimisticLike] = useOptimistic(
    safeProducts,
    (state, productId: number) =>
      state.map((p) =>
        p.id === productId ? { ...p, is_liked: !p.is_liked } : p
      )
  );

  // 2. Logika Penyaringan Kategori (Gunakan case-insensitive check untuk aman)
  const filteredProducts =
    activeFilter.toLowerCase() === "all"
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
      console.error("Failed to update like:", error);
      alert("Failed to like the product, please log in first.");
    }
  };

  return {
    activeFilter,
    setActiveFilter,
    filteredProducts,
    handleLikeClick,
  };
}