import { z } from "zod";

export const categorySortEnum = z.enum([
  "all",
  "most-products",
  "least-products",
  "name-asc",
]);

export const listCategoriesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  sort: categorySortEnum.optional().default("all"),
});

export type ListCategoriesQuery = z.infer<typeof listCategoriesQuerySchema>;

export const categoryIdParamSchema = z.object({
  id: z.coerce.number({error: "Id category harus berupa angka"})
  .int("ID category harus bilangan bulat")
  .positive("ID category harus lebih dari 0")
})

export type CategoryIdParam = z.infer<typeof categoryIdParamSchema>;

export const createCategoryBodySchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter"),
  description: z.string().trim().optional().nullable(),
});

export type CreateCategoryBody = z.infer<typeof createCategoryBodySchema>;

export const updateCategoryBodySchema = createCategoryBodySchema.partial();

export type UpdateCategoryBody = z.infer<typeof updateCategoryBodySchema>;