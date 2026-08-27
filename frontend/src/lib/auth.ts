import { headers } from "next/headers";
import axios from "axios";
import type { NavbarAuthProps } from "@/types";

export const getAuthUser = async (): Promise<NavbarAuthProps["user"]> => {
  try {
    // Ambil cookies dari request Next.js saat ini
    const reqHeaders = await headers();
    const cookieHeader = reqHeaders.get("cookie") || "";

    // Tembak endpoint bawaan Better Auth di Express menggunakan Axios
    const response = await axios.get("http://localhost:3001/api/auth/get-session", {
      headers: {
        cookie: cookieHeader, // Teruskan cookies ke backend
      },
    });

    // Axios secara otomatis mengubah JSON response ke dalam object 'data'
    const sessionData = response.data;
    
    // Better Auth mengembalikan object { session, user }
    if (!sessionData?.user) return null;

    return {
      name: sessionData.user.name,
      avatar: sessionData.user.image ?? null, // Typo tanda '=' sudah dihapus
      email: sessionData.user.email,
    };
  } catch (error) {
    // Axios akan melempar error jika status response bukan 2xx (misal 401 Unauthorized)
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // Wajar terjadi jika user memang belum login, tidak perlu log error merah
      return null;
    }
    
    console.error("Gagal mengambil sesi dari server:", error);
    return null;
  }
};