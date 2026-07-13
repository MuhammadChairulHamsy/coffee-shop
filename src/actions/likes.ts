"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleProductLike(productId: number, isCurrentlyLiked: boolean) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Kamu harus login terlebih dahulu.");
  }

  const { error } = await supabase
    .from("products")
    .update({ is_liked: !isCurrentlyLiked })
    .eq("id", productId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}