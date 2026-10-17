import { apiClient } from "@/utils/api";
import {
  paginatedProductsSchema,
  productSchema,
  type ListProductsQuery,
  type PaginatedProducts,
  type Product,
} from "@/schemas/product.schema";

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

/* ---------- Types untuk payload ---------- */

export type CreateProductPayload = {
  name: string;
  description?: string | null;
  price: number;
  type: string;
  category: string;
  imageUrl?: string | null;
  is_special?: boolean;
  is_liked?: boolean;
};

export type UpdateProductPayload = Partial<CreateProductPayload>;

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

  /* LIKE */
  toggleLike: async (id: number, isLiked?: boolean): Promise<Product> => {
    const { data } = await apiClient.patch(`/products/${id}/like`, {
      ...(typeof isLiked === "boolean" && { is_liked: isLiked }),
    });
    return parseOrThrow<Product>(productSchema, data.data);
  },
};
