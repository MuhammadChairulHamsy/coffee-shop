import { Product } from "@/types";
import { api } from "@/utils/api";

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>("/products");
    return response.data ?? [];
  },
};
