import { prisma } from "../lib/prisma.js";
import type { Prisma } from "@/generated/prisma/index.js";
import type {
  ListCategoriesQuery,
  CreateCategoryBody,
} from "@/schemas/category.schema.js";

export const getAllCategories = async (params?: ListCategoriesQuery) => {
  const { search, sort } = params ?? {};

  let orderBy: Prisma.CategoryOrderByWithRelationInput = { name: "asc" };

  if (sort === "most-products") {
    orderBy = { products: { _count: "desc" } };
  } else if (sort === "least-products") {
    orderBy = { products: { _count: "asc" } };
  } else if (sort === "name-asc") {
    orderBy = { name: "asc" };
  }

  const grouped = await prisma.category.findMany({
    where: search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }
      : undefined,
    include: {
      _count: { select: { products: true } },
      products: { select: { price: true } },
    },
    orderBy: orderBy,
  });

  return grouped.map((c) => {
    const totalValue = c.products.reduce((sum, p) => sum + p.price, 0);
    return {
      id: c.id,
      name: c.name,
      description: c.description,
      productCount: c._count.products,
      totalValue: totalValue,
      lastUpdated: c.updatedAt.toISOString(),
      status: c._count.products > 0 ? "active" : "empty",
    };
  });
};

export const createCategory = async (data: CreateCategoryBody) => {
  return prisma.category.create({ data });
};