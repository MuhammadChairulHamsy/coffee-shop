"use server";

import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export const loginWithGoogle = async (formData: FormData) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google", 
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "select_account"
      },
    },
  });

  if (error) redirect("/login?error=oauth_failed");
  if(data.url) redirect(data.url)
};

export const logout = async  () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
}
