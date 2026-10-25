import { z } from "zod";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
});

export type Category = z.infer<typeof categorySchema>;

/* ---------- Entity Schema ---------- */

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  type: z.string(),
  categoryId: z.number(),
  category: categorySchema,
  imageUrl: z.string().nullable(),
  is_liked: z.boolean(),
  is_special: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
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

/* ---------- Request Schemas ---------- */

export const listProductsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),
  sort: productSortEnum.optional(),
  profile: roastProfileEnum.optional(),
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

/* ---------- Payload Schemas ---------- */

export const createProductPayloadSchema = z.object({
  name: z.string().min(2),
  description: z.string().nullable().optional(),
  price: z.number().positive(),
  type: z.string(),
  categoryId: z.number(),
  imageUrl: z.string().url().nullable().optional().or(z.literal("")),
  is_special: z.boolean().optional(),
  is_liked: z.boolean().optional(),
});

export const updateProductPayloadSchema = createProductPayloadSchema.partial();

export type CreateProductPayload = z.infer<typeof createProductPayloadSchema>;
export type UpdateProductPayload = z.infer<typeof updateProductPayloadSchema>;

/* ---------- Form Schema ---------- */

export const formSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(200),
  description: z.string().trim().max(2000).optional(),
  price: z.coerce.number().int().positive("Harga harus lebih dari 0"),
  type: z.string().trim().min(1, "Type wajib diisi").max(100),
  categoryId: z.coerce.number().min(1, "Kategori wajib dipilih"),
  imageUrl: z
    .string()
    .trim()
    .url("URL gambar tidak valid")
    .optional()
    .nullable()
    .or(z.literal("")),
  is_special: z.boolean().default(false),
});

export type FormInput = z.input<typeof formSchema>;
export type FormOutput = z.output<typeof formSchema>;
