
"use client"

import { productService } from "@/services/productService";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useProducts() {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: productService.getAll,
    staleTime: 1000 * 60 * 5,
  });
}
