import { Product } from "@/types";
import { api } from "@/utils/api";

// Definisikan struktur respons dari backend
interface ApiResponse {
  success: boolean;
  data: Product[];
}

export const productService = {
  // Fungsi untuk mengambil 4 produk terbaru
  getLatest: async (): Promise<Product[]> => {
    const response = await api.get<ApiResponse>("/products/latest");
    return response.data.data ?? [];
  },

  // Fungsi untuk mengambil produk spesial/kategori lainnya
  getSpecial: async (): Promise<Product[]> => {
    const response = await api.get<ApiResponse>("/products/special");
    return response.data.data ?? [];
  },
};