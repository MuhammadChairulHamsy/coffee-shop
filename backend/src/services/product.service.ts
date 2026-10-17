import { prisma } from "../lib/prisma.js";
import { NotFoundError } from "../lib/errors.js";
import type { CreateProductBody, ListProductsQuery, UpdateProductBody } from "@/schemas/product.schema.js";
import type { Prisma } from "@/generated/prisma/index.js";

export const getAllProducts = async (params: ListProductsQuery) => {
  const { page, limit, search, category, sort, profile } = params;
  const skip = (page - 1) * limit;

  /* ---------- Where ---------- */
  const where: Prisma.ProductsWhereInput = {
    ...(search && {
      name: { contains: search, mode: "insensitive" },
    }),
    ...(category && { category }),
    ...(profile !== "semua-sangrai" && {
      // Asumsi: field `type` berisi "Light Roast", "Medium Roast", dll
      type: { contains: profile, mode: "insensitive" },
    }),
  };

  /* ---------- Order By ---------- */
  const orderBy: Prisma.ProductsOrderByWithRelationInput = (() => {
    switch (sort) {
      case "terbaru":
        return { createdAt: "desc" };
      case "harga-asc":
        return { price: "asc" };
      case "harga-desc":
        return { price: "desc" };
      case "terlaris":
      case "rating":
      default:
        // Fallback: produk yang di-like dianggap populer
        return { is_liked: "desc" };
    }
  })();

  const [data, total] = await prisma.$transaction([
    prisma.products.findMany({ where, orderBy, skip, take: limit }),
    prisma.products.count({ where }),
  ]);

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

export const getProductById = async (id: number) => {
  const product = await prisma.products.findUnique({ where: { id } });
  if (!product) throw new NotFoundError("Produk tidak ditemukan");
  return product;
};

export const getLatestProducts = async () => {
  return prisma.products.findMany({
    where: { is_special: false },
    orderBy: { createdAt: "desc" },
    take: 4,
  });
};

export const getSpecialProducts = async () => {
  return prisma.products.findMany({
    where: { is_special: true },
    orderBy: { createdAt: "desc" },
  });
};

export const createProduct = async (body: CreateProductBody) => {
  return prisma.products.create({
    data: {
      name: body.name,
      description: body.description || null,
      price: body.price,
      type: body.type,
      category: body.category,
      imageUrl: body.imageUrl || null,
      is_special: body.is_special ?? false,
    },
  });
};

export const updateProduct = async (id: number, body: UpdateProductBody) => {
  await getProductById(id); 

  return prisma.products.update({
    where: { id },
    data: {
      ...(body.name !== undefined && { name: body.name }),
      ...(body.description !== undefined && {
        description: body.description || null,
      }),
      ...(body.price !== undefined && { price: body.price }),
      ...(body.type !== undefined && { type: body.type }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl || null }),
      ...(body.is_special !== undefined && { is_special: body.is_special }),
    },
  });
};

export const deleteProduct = async (id: number) => {
  await getProductById(id);

  return prisma.products.delete({ where: { id } });
};


export const setProductLike = async (id: number, isLiked: boolean) => {
  const exists = await prisma.products.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!exists) throw new NotFoundError("Produk tidak ditemukan");

  return prisma.products.update({
    where: { id },
    data: { is_liked: isLiked },
  });
};

export const toggleProductLike = async (id: number) => {
  return prisma.$transaction(async (tx) => {
    const product = await tx.products.findUnique({
      where: { id },
      select: { is_liked: true },
    });
    if (!product) throw new NotFoundError("Produk tidak ditemukan");

    return tx.products.update({
      where: { id },
      data: { is_liked: !product.is_liked },
    });
  });
};