import { headers } from "next/headers";
import type { NavbarAuthProps } from "@/types";

export const getAuthUser = async (): Promise<NavbarAuthProps["user"]> => {
  try {
    // Ambil cookies dari request Next.js saat ini
    const reqHeaders = await headers();
    const cookieHeader = reqHeaders.get("cookie") || "";

    // Tembak endpoint bawaan Better Auth di Express
    const response = await fetch("http://localhost:3001/api/auth/get-session", {
      headers: {
        cookie: cookieHeader, // Teruskan cookies ke backend
      },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const sessionData = await response.json();
    
    // Better Auth mengembalikan object { session, user }
    if (!sessionData?.user) return null;

    return {
      name: sessionData.user.name,
      avatar: sessionData.user.image ?? null, // Better Auth menggunakan 'image', bukan 'avatar_url'
      email: sessionData.user.email,
    };
  } catch (error) {
    console.error("Gagal mengambil sesi dari server:", error);
    return null;
  }
};