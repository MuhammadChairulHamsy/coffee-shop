"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { categoryService } from "@/services/category-service";
import { toApiError } from "@/lib/api-error";
import type { ListCategoriesQuery } from "@/types/category";
import type { CategoryFormValues } from "@/schemas/category.schema";

/* ---------- Query Keys ---------- */
export const categoryKeys = {
  all: ["categories"] as const,
  list: (params?: ListCategoriesQuery) =>
    [...categoryKeys.all, "list", params ?? {}] as const,
};

/* ---------- Queries ---------- */
export function useCategories(params?: ListCategoriesQuery) {
  const query = useQuery({
    queryKey: categoryKeys.list(params), // ✅ Sekarang queryKey dipisah dengan rapi
    queryFn: () => categoryService.getAll(params),
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

/* ---------- Mutations ---------- */
export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CategoryFormValues) =>
      categoryService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: CategoryFormValues;
    }) => categoryService.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => categoryService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
}
