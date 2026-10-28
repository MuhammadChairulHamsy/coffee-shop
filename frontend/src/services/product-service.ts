import { apiClient } from "@/utils/api";
import {
  paginatedProductsSchema,
  productSchema,
  type CreateProductPayload,
  type UpdateProductPayload,
  type ListProductsQuery,
  type PaginatedProducts,
  type Product,
} from "@/schemas/product.schema";
import { ListCategoriesQuery } from "@/types/category";
import { CategoryFormValues, PaginatedCategories, paginatedCategoriesSchema } from "@/schemas/category.schema";

/* Helper: parse response dengan Zod */
const parseOrThrow = <T>(
  schema: { safeParse: (data: unknown) => any },
  data: unknown,
): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Response validation failed: ${result.error.issues
        .map(
          (i: { path: (string | number)[]; message: string }) =>
            `${i.path.join(".")}: ${i.message}`,
        )
        .join(", ")}`,
    );
  }
  return result.data as T;
};

/* ---------- Service ---------- */

export const productService = {
  /* READ */
  getAll: async (params?: ListProductsQuery): Promise<PaginatedProducts> => {
    const { data } = await apiClient.get("/products", {
      params: {
        ...(params?.page && { page: params.page }),
        ...(params?.limit && { limit: params.limit }),
        ...(params?.search && { search: params.search }),
        ...(params?.category && { category: params.category }),
        ...(params?.sort && { sort: params.sort }),
        ...(params?.profile && { profile: params.profile }),
      },
    });
    return parseOrThrow<PaginatedProducts>(paginatedProductsSchema, data);
  },

  getById: async (id: number): Promise<Product> => {
    const { data } = await apiClient.get(`/products/${id}`);
    return parseOrThrow<Product>(productSchema, data.data);
  },

  getLatest: async (): Promise<Product[]> => {
    const { data } = await apiClient.get("/products/latest");
    return parseOrThrow<Product[]>(productSchema.array(), data.data ?? []);
  },

  getSpecial: async (): Promise<Product[]> => {
    const { data } = await apiClient.get("/products/special");
    return parseOrThrow<Product[]>(productSchema.array(), data.data ?? []);
  },

  /* CREATE */
  create: async (payload: CreateProductPayload): Promise<Product> => {
    const { data } = await apiClient.post("/products", payload);
    return parseOrThrow<Product>(productSchema, data.data);
  },

  /* UPDATE */
  update: async (
    id: number,
    payload: UpdateProductPayload,
  ): Promise<Product> => {
    const { data } = await apiClient.patch(`/products/${id}`, payload);
    return parseOrThrow<Product>(productSchema, data.data);
  },

  /* DELETE */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },

  /* READ: Categories */
  getCategories: async (params?: ListCategoriesQuery): Promise<PaginatedCategories> => {
  const { data } = await apiClient.get("/products/categories", { params });
  return parseOrThrow<PaginatedCategories>(paginatedCategoriesSchema, data);
},

  /* ---------- CREATE: Category ---------- */
  createCategory: async (payload: CategoryFormValues): Promise<any> => {
    const { data } = await apiClient.post("/products/categories", payload);
    return data; 
  },

  /* ---------- UPDATE: Category ---------- */
  updateCategory: async (id: number, payload: CategoryFormValues): Promise<any> => {
    const { data } = await apiClient.patch(`/products/categories/${id}`, payload);
    return data;
  },

  /* ---------- DELETE: Category ---------- */
  deleteCategory: async (id: number): Promise<void> => {
    await apiClient.delete(`/products/categories/${id}`);
  },

  /* LIKE */
  toggleLike: async (id: number, isLiked?: boolean): Promise<Product> => {
    const { data } = await apiClient.patch(`/products/${id}/like`, {
      ...(typeof isLiked === "boolean" && { is_liked: isLiked }),
    });
    return parseOrThrow<Product>(productSchema, data.data);
  },
};
