import { createAuthClient } from "better-auth/react";

// Inisialisasi klien Better Auth untuk frontend Next.js
export const authClient = createAuthClient({
  // Arahkan ke URL server Express-mu, BUKAN ke Next.js
  baseURL: "http://localhost:3001", 
});

// Ekspor fungsi-fungsi bawaan agar mudah dipanggil di komponen
export const { signIn, signUp, signOut, useSession } = authClient;