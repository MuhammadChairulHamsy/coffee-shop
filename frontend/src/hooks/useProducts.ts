"use client";

import { ListProductsQuery } from "@/schemas/product.schema";
import { productService } from "@/services/productService";
import type { Product } from "@/schemas/product.schema";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { toApiError } from "@/lib/api-error";

export const productKeys = {
  all: ["products"] as const,
  list: (params?: ListProductsQuery) =>
    [...productKeys.all, "list", params ?? {}] as const,
  detail: (id: number) => [...productKeys.all, "detail", id] as const,
};

export function useProducts(params?: ListProductsQuery) {
  const query = useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => productService.getAll(params),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });

  return {
    products: query.data?.data ?? [],
    meta: query.data?.meta,
    status: {
      isLoading: query.isLoading,
      isFetching: query.isFetching,
      isError: query.isError,
      isSuccess: query.isSuccess,
    },
    error: query.error ? toApiError(query.error) : null,
    refetch: query.refetch,
  };
}
// Hook untuk 4 produk terbaru
export function useLatestProducts() {
  const query = useQuery({
    queryKey: ["products", "latest"],
    queryFn: productService.getLatest,      // → Promise<Product[]>
    staleTime: 5 * 60 * 1000,
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
