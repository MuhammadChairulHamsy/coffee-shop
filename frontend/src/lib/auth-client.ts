import { createAuthClient } from "better-auth/react";
import { API_URL } from "./config";

// Inisialisasi klien Better Auth untuk frontend Next.js
export const authClient = createAuthClient({
  baseURL: API_URL
});

// Ekspor fungsi-fungsi bawaan agar mudah dipanggil di komponen
export const { signIn, signUp, signOut, useSession } = authClient;
