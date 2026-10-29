import { apiClient } from "@/utils/api";
import { 
  CategoryFormValues, 
  PaginatedCategories, 
  paginatedCategoriesSchema 
} from "@/schemas/category.schema";
import type { ListCategoriesQuery } from "@/types/category";

// (Pindahkan helper parseOrThrow ke file utils jika belum, atau copy di sini)
const parseOrThrow = <T>(schema: any, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Response validation failed: ${result.error.message}`);
  }
  return result.data as T;
};

export const categoryService = {
  getAll: async (params?: ListCategoriesQuery): Promise<PaginatedCategories> => {
    const { data } = await apiClient.get("/categories", { params });
    return parseOrThrow<PaginatedCategories>(paginatedCategoriesSchema, data);
  },

  create: async (payload: CategoryFormValues): Promise<any> => {
    const { data } = await apiClient.post("/categories", payload);
    return data; 
  },

  update: async (id: number, payload: CategoryFormValues): Promise<any> => {
    const { data } = await apiClient.patch(`/categories/${id}`, payload);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
  },
};