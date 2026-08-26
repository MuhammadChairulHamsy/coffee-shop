import { createClient } from "@/utils/supabase/server";
import type { Product } from "@/types";

export async function getLatestProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_special", false)
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    console.error("Error fetching latest products:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getSpecialProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_special", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching special products:", error.message);
    return [];
  }

  return data ?? [];
}