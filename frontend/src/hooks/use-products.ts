"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  Product,
  ListProductsQuery,
  CreateProductPayload,
  UpdateProductPayload,
} from "@/schemas/product.schema";
import { productService } from "@/services/product-service";
import { toApiError } from "@/lib/api-error";
import { ListCategoriesQuery } from "@/types/category";
import { CategoryFormValues } from "@/schemas/category.schema";

/* ---------- Query Keys ---------- */

export const productKeys = {
  all: ["products"] as const,
  list: (params?: ListProductsQuery) =>
    [...productKeys.all, "list", params ?? {}] as const,
  detail: (id: number) => [...productKeys.all, "detail", id] as const,
  latest: () => [...productKeys.all, "latest"] as const,
  special: () => [...productKeys.all, "special"] as const,
  categories: (params?: ListCategoriesQuery) =>
    [...productKeys.all, "categories", params] as const,
};

/* ---------- Queries (Data Layer) ---------- */

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

export function useCategories(params?: ListCategoriesQuery) {
  const query = useQuery({
    queryKey: productKeys.categories(params),
    queryFn: () => productService.getCategories(params),
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });

  return {
    categories: query.data?.data ?? [], 
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


export function useLatestProducts() {
  const query = useQuery({
    queryKey: productKeys.latest(),
    queryFn: productService.getLatest,
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

export function useSpecialProducts() {
  const query = useQuery<Product[]>({
    queryKey: productKeys.special(),
    queryFn: productService.getSpecial,
    staleTime: 5 * 60 * 1000,
  });

  return {
    specialProducts: query.data ?? [],
    status: {
      isLoading: query.isLoading,
      isError: query.isError,
    },
  };
}

/* ---------- Mutations (Data Layer — TANPA toast) ---------- */

export function useCreateProduct() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProductPayload) =>
      productService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateProductPayload;
    }) => productService.update(id, payload),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: productKeys.all });
      qc.invalidateQueries({ queryKey: productKeys.detail(variables.id) });
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => productService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}


export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { name: string; description?: string | null }) =>
      productService.createCategory(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: productKeys.categories() });
    },
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: CategoryFormValues }) =>
      productService.updateCategory(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: productKeys.categories() });
    },
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => productService.deleteCategory(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: productKeys.categories() });
    },
  });
}