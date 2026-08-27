import { prisma } from "../lib/prisma";

export const getAllProducts = async () => {
  const products = await prisma.products.findMany({
    orderBy: { createdAt: "desc" },
  });
  return products;
};
