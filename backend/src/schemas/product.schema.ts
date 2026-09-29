import { z } from "zod";

/** Params: /products/:id */
export const productIdParamSchema = z.object({
  id: z.coerce
    .number({ error: "ID Produk harus berupa angka" })
    .int("ID Produk harus bilangan bulat")
    .positive("ID Produk harus lebih dari 0"),
});

/** Body: PATCH /products/:id/like */
export const toggleLikeBodySchema = z.object({
  is_liked: z.boolean().optional(),
});

export type ProductIdParam = z.infer<typeof productIdParamSchema>;
export type ToggleLikeBody = z.infer<typeof toggleLikeBodySchema>;