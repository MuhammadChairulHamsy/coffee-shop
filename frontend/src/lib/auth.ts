import { headers } from "next/headers";
import axios from "axios";
import type { NavbarAuthProps } from "@/types";

export const getAuthUser = async (): Promise<NavbarAuthProps["user"]> => {
  try {
    const reqHeaders = await headers();
    const cookieHeader = reqHeaders.get("cookie") || "";

    const response = await axios.get("http://localhost:3001/api/auth/get-session", {
      headers: {
        cookie: cookieHeader,
      },
    });

    const sessionData = response.data;
    
    // Better Auth mengembalikan object { session, user }
    if (!sessionData?.user) return null;

    return {
      name: sessionData.user.name,
      avatar: sessionData.user.image ?? null,
      email: sessionData.user.email,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    
    console.error("Gagal mengambil sesi dari server:", error);
    return null;
  }
};