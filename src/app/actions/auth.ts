"use client";

import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export const login = async (formData: FormData) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) return { error: error.message };

  redirect("/dashboard");
};

export const signup = async (formData: FormData) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) return { error: error.message };

  redirect("/login");
};

export const logout = async  () => {
    const supabase = await createClient();
    await supabase.auth.signUp();
    redirect("/login");
}
