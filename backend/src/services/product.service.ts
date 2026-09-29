import { prisma } from "../lib/prisma.js";
import { NotFoundError } from "../lib/errors.js";

export const getAllProducts = async () => {
  return prisma.products.findMany({ orderBy: { createdAt: "desc" } });
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