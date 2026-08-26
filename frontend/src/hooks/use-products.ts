"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Product } from "@/types";

export function useLatestProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_special", false)
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) setError(error.message);
      else setProducts(data ?? []);
      setLoading(false);
    };

    fetch();
  }, []);

  return { products, loading, error };
}

export function useSpecialProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    const fetch = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_special", true)
        .order("created_at", { ascending: false });

      if (error) setError(error.message);
      else setProducts(data ?? []);
      setLoading(false);
    };

    fetch();
  }, []);

  return { products, loading, error };
}