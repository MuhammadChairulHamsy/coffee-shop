import { z } from "zod";

/* ---------- Entity Schema ---------- */

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  type: z.string(),
  category: z.string(),
  imageUrl: z.string().nullable(),
  is_liked: z.boolean(),
  is_special: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Product = z.infer<typeof productSchema>;

/* ---------- Request Schemas ---------- */

export const listProductsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),
});

export type ListProductsQuery = z.infer<typeof listProductsQuerySchema>;

export const productIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/* ---------- Response Schema ---------- */

export const paginatedProductsSchema = z.object({
  data: z.array(productSchema),
  meta: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});

export type PaginatedProducts = z.infer<typeof paginatedProductsSchema>;
