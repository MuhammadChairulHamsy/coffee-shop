import { z } from "zod";

export const categoryStatsSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  productCount: z.number(),
  totalValue: z.number(),
  status: z.enum(["active", "empty"]),
  lastUpdated: z.string(),
});

export type CategoryStats = z.infer<typeof categoryStatsSchema>;

export const categorySortEnum = z.enum([
  "all",
  "most-products",
  "least-products",
  "name-asc",
]);

export type CategorySort = z.infer<typeof categorySortEnum>;

export const paginatedCategoriesSchema = z.object({
  data: z.array(categoryStatsSchema),
  meta: z
    .object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      totalPages: z.number(),
    })
    .optional(),
});
export type PaginatedCategories = z.infer<typeof paginatedCategoriesSchema>;

export const categoryFormSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(50),
  description: z.string().trim().max(200).optional().nullable(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
