import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  type: z.string(),
  categoryId: z.number(),
  imageUrl: z.string().nullable(),
  is_liked: z.boolean(),
  is_special: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type Product = z.infer<typeof productSchema>;

export const productSortEnum = z.enum([
  "terlaris",
  "terbaru",
  "harga-asc",
  "harga-desc",
  "rating",
]);

export const roastProfileEnum = z.enum([
  "semua-sangrai",
  "light",
  "medium",
  "dark",
]);

export type ProductSort = z.infer<typeof productSortEnum>;
export type RoastProfile = z.infer<typeof roastProfileEnum>;


export const listProductsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),
  sort: productSortEnum.optional(),
  profile: roastProfileEnum.optional(),
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

export const createProductBodySchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(200),
  description: z.string().trim().max(2000).optional().nullable(),
  price: z.coerce.number().int().positive("Harga harus lebih dari 0"),
  type: z.string().trim().min(1, "Type wajib diisi").max(100),
   categoryId: z.coerce.number().int().positive("Kategori wajib dipilih"),
  imageUrl: z.string().url("URL gambar tidak valid").optional().nullable().or(z.literal("")),
  is_special: z.boolean().default(false),
});

export type CreateProductBody = z.infer<typeof createProductBodySchema>;

export const updateProductBodySchema = createProductBodySchema.partial();

export type UpdateProductBody = z.infer<typeof updateProductBodySchema>;

/** Body: PATCH /products/:id/like */
export const toggleLikeBodySchema = z.object({
  is_liked: z.boolean().optional(),
});

export type ToggleLikeBody = z.infer<typeof toggleLikeBodySchema>;