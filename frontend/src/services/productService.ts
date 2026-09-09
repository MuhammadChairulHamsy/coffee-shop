import { Product } from "@/types";
import { api } from "@/utils/api";

interface ApiResponse {
  success: boolean;
  data: Product[];
}

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const respons = await api.get<ApiResponse>("/products");
    return respons.data.data ?? [];
  },

  getLatest: async (): Promise<Product[]> => {
    const response = await api.get<ApiResponse>("/products/latest");
    return response.data.data ?? [];
  },
  
  getSpecial: async (): Promise<Product[]> => {
    const response = await api.get<ApiResponse>("/products/special");
    return response.data.data ?? [];
  },
};
