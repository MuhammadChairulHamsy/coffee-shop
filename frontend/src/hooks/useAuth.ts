"use client";

import { useSession } from "@/lib/authClient"; 

export const useAuth = () => {
  // Better Auth menangani fetching, caching, dan state otomatis
  const { data, isPending } = useSession();

  return { 
    isLoggedIn: !!data?.session, 
    user: data?.user || null,
    isLoading: isPending 
  };
}