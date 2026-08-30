"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function toggleProductLike(productId: number, isCurrentlyLiked: boolean) {
  try {
    // 1. Ambil cookie pengunjung saat ini
    const reqHeaders = await headers();
    const cookieHeader = reqHeaders.get("cookie") || "";
    
    // Gunakan variabel lingkungan, fallback ke localhost jika tidak ada
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    // 2. Tembak endpoint Express
    const response = await fetch(`${apiUrl}/api/products/${productId}/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "cookie": cookieHeader, 
      },
      body: JSON.stringify({ is_liked: !isCurrentlyLiked }),
    });

    // 3. Tangani respons dari backend dengan aman
    if (!response.ok) {
      if (response.status === 401) {
        return { success: false, message: "Harap login terlebih dahulu untuk menyukai produk." };
      }
      return { success: false, message: "Gagal memperbarui status favorit." };
    }

    // 4. Perbarui cache tampilan Next.js
    revalidatePath("/");
    
    return { success: true, message: "Status favorit berhasil diperbarui." };

  } catch (error) {
    console.error("Action toggleProductLike error:", error);
    return { success: false, message: "Terjadi kesalahan pada server." };
  }
}