"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | undefined;

    const initAuth = async () => {
      const supabase = await createClient();
      
      // Check initial session
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      setIsLoading(false);

      // Listen to changes
      const { data } = supabase.auth.onAuthStateChange(
        (_event: AuthChangeEvent, session: Session | null) => {
          setIsLoggedIn(!!session);
          setIsLoading(false);
        }
      );

      subscription = data.subscription;
    };

    initAuth();

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  return { isLoggedIn, isLoading };
}