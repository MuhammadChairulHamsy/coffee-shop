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


/* ---------- Form Schema ---------- */

export const formSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(200),
  description: z.string().trim().max(2000).optional(),
  price: z.coerce.number().int().positive("Harga harus lebih dari 0"),
  type: z.string().trim().min(1, "Type wajib diisi").max(100),
  category: z.string().trim().min(1, "Category wajib diisi").max(100),
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
