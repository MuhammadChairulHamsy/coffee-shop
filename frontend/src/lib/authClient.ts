import { createAuthClient } from "better-auth/react";

// Inisialisasi klien Better Auth untuk frontend Next.js
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001", 
});

// Ekspor fungsi-fungsi bawaan agar mudah dipanggil di komponen
export const { signIn, signUp, signOut, useSession } = authClient;