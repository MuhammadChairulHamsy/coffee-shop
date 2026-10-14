import { z } from "zod";


export const listProductsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),
  sort: z.enum(["terbaru", "harga-asc", "harga-desc", "terlaris"]).optional(),
  roastProfile: z.enum(["light", "medium", "dark"]).optional(),
});

export type ListProductsQuery = z.infer<typeof listProductsQuerySchema>; 

/** Params: /products/:id */
export const productIdParamSchema = z.object({
  id: z.coerce
    .number({ error: "ID Produk harus berupa angka" })
    .int("ID Produk harus bilangan bulat")
    .positive("ID Produk harus lebih dari 0"),
});

export type ProductIdParam = z.infer<typeof productIdParamSchema>;

/** Body: PATCH /products/:id/like */
export const toggleLikeBodySchema = z.object({
  is_liked: z.boolean().optional(),
});

export type ToggleLikeBody = z.infer<typeof toggleLikeBodySchema>;