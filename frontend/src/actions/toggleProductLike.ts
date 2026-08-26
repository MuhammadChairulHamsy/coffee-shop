"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function toggleProductLike(productId: number, isCurrentlyLiked: boolean) {
  // 1. Ambil cookie pengunjung saat ini
  const reqHeaders = await headers();
  const cookieHeader = reqHeaders.get("cookie") || "";

  // 2. Tembak endpoint Express untuk mengubah data (kita akan buat endpoint ini di backend nanti)
  const response = await fetch(`http://localhost:3001/api/products/${productId}/like`, {
    method: "PATCH", // Menggunakan PATCH karena kita hanya memperbarui sebagian data
    headers: {
      "Content-Type": "application/json",
      "cookie": cookieHeader, // WAJIB disertakan agar Better Auth di Express bisa mengecek sesi
    },
    body: JSON.stringify({ is_liked: !isCurrentlyLiked }),
  });

  // 3. Tangani error dari backend
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Kamu harus login terlebih dahulu.");
    }
    throw new Error("Gagal memperbarui status like.");
  }

  // 4. Perbarui cache tampilan Next.js
  revalidatePath("/");
}