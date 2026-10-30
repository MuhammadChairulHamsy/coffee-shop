import { prisma } from "../lib/prisma.js";
import type { Prisma } from "@/generated/prisma/index.js";
import type {
  ListCategoriesQuery,
  CreateCategoryBody,
} from "@/schemas/category.schema.js";

export const getAllCategories = async (params: ListCategoriesQuery) => {
  const { page, limit, search, sort } = params;
  const skip = (page - 1) * limit;

  /* ---------- 1. Tentukan Urutan (Order By) ---------- */
  let orderBy: Prisma.CategoryOrderByWithRelationInput = { name: "asc" };

  if (sort === "most-products") {
    orderBy = { products: { _count: "desc" } };
  } else if (sort === "least-products") {
    orderBy = { products: { _count: "asc" } };
  } else if (sort === "name-asc") {
    orderBy = { name: "asc" };
  }

  /* ---------- 2. Where Clause ---------- */
  const where: Prisma.CategoryWhereInput = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  /* ---------- 3. Query Prisma (Transaction) ---------- */
  const [categories, total] = await prisma.$transaction([
    prisma.category.findMany({
      where,
      include: {
        _count: { select: { products: true } },
        products: { select: { price: true } },
      },
      orderBy: orderBy,
      skip: skip,   
      take: limit, 
    }),
    prisma.category.count({ where }), 
  ]);

  /* ---------- 4. Format Response ---------- */
  const data = categories.map((c) => {
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

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const createCategory = async (data: CreateCategoryBody) => {
  return prisma.category.create({ data });
};