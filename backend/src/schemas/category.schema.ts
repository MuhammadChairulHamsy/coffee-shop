import { z } from "zod";

export const categorySortEnum = z.enum([
  "all",
  "most-products",
  "least-products",
  "name-asc",
]);

export const listCategoriesQuerySchema = z.object({
  search: z.string().trim().optional(),
  sort: categorySortEnum.optional().default("all"),
});

export type ListCategoriesQuery = z.infer<typeof listCategoriesQuerySchema>;

export const createCategoryBodySchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter"),
  description: z.string().trim().optional().nullable(),
});

export type CreateCategoryBody = z.infer<typeof createCategoryBodySchema>;