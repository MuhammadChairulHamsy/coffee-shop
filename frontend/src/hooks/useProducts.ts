
"use client"

import { productService } from "@/services/productService";
import { Product } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useProducts() {
  const queryClient = useQueryClient();

  // fetch data product
  const  productQuery = useQuery<Product[]>({
    queryKey: ["Products"],
    queryFn: productService.getAll,
    staleTime: 1000 * 60 * 5,
  });

  return {
    products: productQuery.data ?? [],
    status: {
      isLoading: productQuery.isLoading,
      isError: productQuery.isError,
    },
  }
}
