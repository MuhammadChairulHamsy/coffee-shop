import "server-only";
import { headers } from "next/headers";
import axios from "axios";
import { API_URL } from "./config";
import type { AuthUser } from "@/types/auth";

const TIMEOUT_MS = 5000;

type SessionResponse = {
  user?: {
    name: string;
    email: string;
    image?: string | null;
  };
};

export const getAuthUser = async (): Promise<AuthUser | null> => {
  try {
    const reqHeaders = await headers();
    const cookieHeader = reqHeaders.get("cookie") ?? "";

    const { data } = await axios.get<SessionResponse>(
      `${API_URL}/api/auth/get-session`,
      {
        headers: {
          cookie: cookieHeader,
          "Cache-Control": "no-store",
        },
        timeout: TIMEOUT_MS,
      },
    );

    if (!data?.user) return null;

    return {
      name: data.user.name,
      email: data.user.email,
      avatar: data.user.image ?? null,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }

    if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
      console.error("[getAuthUser] Request timeout setelah", TIMEOUT_MS, "ms");
      return null;
    }

    console.error("[getAuthUser] Gagal:", error);
    return null;
  }
};