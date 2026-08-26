import { Product } from "@/types";
import { api } from "@/utils/api";

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get("/products");
    return response.data.data;
  },
};
