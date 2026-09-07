import { prisma } from "../lib/prisma";

export const getAllProducts = async () => {
  return await prisma.products.findMany()
}

export const getLatestProducts = async () => {
  const latests = await prisma.products.findMany({
    where: {
      is_special: false
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });
  return latests;
};

export const getSpecialProducts = async () => {
  const products = await prisma.products.findMany({
    where: { is_special: true },
  });
  return products;
};

export const UpdateProductLike = async (id: number, is_liked: boolean) => {
  return await prisma.products.update({
    where: { id },
    data: { is_liked },
  });
};
