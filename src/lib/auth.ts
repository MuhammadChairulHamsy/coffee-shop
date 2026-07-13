import { createClient } from "@/utils/supabase/server";
import type { NavbarAuthProps } from "@/types";

export const getAuthUser = async (): Promise<NavbarAuthProps["user"]> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return {
    name: user.user_metadata?.full_name ?? user.email ?? "User",
    avatar: user.user_metadata?.avatar_url ?? null,
    email: user.email ?? null,
  };
};
