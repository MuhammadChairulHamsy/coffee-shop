"use client"

import { productService } from "@/services/productService";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

// Hook untuk 4 produk terbaru
export function useLatestProducts() {
  const query = useQuery<Product[]>({
    queryKey: ["Products", "Latest"],
    queryFn: productService.getLatest,
    staleTime: 1000 * 60 * 5,
  });

  return {
    latestProducts: query.data ?? [],
    status: {
      isLoading: query.isLoading,
      isError: query.isError,
    },
  };
}

// Hook untuk produk kategori spesial
export function useSpecialProducts() {
  const query = useQuery<Product[]>({
    queryKey: ["Products", "Special"], 
    queryFn: productService.getSpecial,
    staleTime: 1000 * 60 * 5,
  });

  return {
    specialProducts: query.data ?? [],
    status: {
      isLoading: query.isLoading,
      isError: query.isError,
    },
  };
}