import { apiClient } from "@/utils/api";
import {
  paginatedProductsSchema,
  productSchema,
  type ListProductsQuery,
  type PaginatedProducts,
  type Product,
} from "@/schemas/product.schema";

/* ---------- Helper: parse response dengan Zod ---------- */

const parseOrThrow = <T>(schema: { safeParse: (data: unknown) => any }, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Response validation failed: ${result.error.issues
        .map((i: { path: (string | number)[]; message: string }) => 
          `${i.path.join(".")}: ${i.message}`)
        .join(", ")}`,
    );
  }
  return result.data as T;
};

/* ---------- Service ---------- */

export const productService = {
  /**
   * Ambil daftar produk dengan pagination & filter.
   * Backend: GET /api/products?page=1&limit=20&search=...
   */
  getAll: async (params?: ListProductsQuery): Promise<PaginatedProducts> => {
    const { data } = await apiClient.get("/products", { params });
    return parseOrThrow<PaginatedProducts>(paginatedProductsSchema, data);
  },

  /**
   * Ambil 4 produk terbaru (bukan special).
   * Backend: GET /api/products/latest
   */
  getLatest: async (): Promise<Product[]> => {
    const { data } = await apiClient.get("/products/latest");
    const parsed = productSchema.array().safeParse(data.data ?? []);
    if (!parsed.success) {
      throw new Error(`Response validation failed: ${parsed.error.message}`);
    }
    return parsed.data;
  },

  /**
   * Ambil semua produk special.
   * Backend: GET /api/products/special
   */
  getSpecial: async (): Promise<Product[]> => {
    const { data } = await apiClient.get("/products/special");
    const parsed = productSchema.array().safeParse(data.data ?? []);
    if (!parsed.success) {
      throw new Error(`Response validation failed: ${parsed.error.message}`);
    }
    return parsed.data;
  },

  /**
   * Ambil produk by ID.
   * Backend: GET /api/products/:id
   */
  getById: async (id: number): Promise<Product> => {
    const { data } = await apiClient.get(`/products/${id}`);
    return parseOrThrow<Product>(productSchema, data.data);
  },
};