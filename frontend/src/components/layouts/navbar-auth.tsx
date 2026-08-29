"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import type { NavbarAuthProps } from "@/types";

// 1. Import signOut dari auth-client yang sudah kamu buat sebelumnya
import { signOut } from "@/lib/authClient"; 
import { useRouter } from "next/navigation";
import { useState } from "react";

const NavbarAuth = ({ user }: NavbarAuthProps) => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!user) {
    return (
      <Link href="/login">
        <Button
          variant="outline"
          className="text-foreground hover:bg-accent hover:text-accent-foreground font-semibold text-sm transition-colors cursor-pointer"
        >
          Log in
        </Button>
      </Link>
    );
  }

  // 2. Buat fungsi handler untuk mengeksekusi logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(); 
      router.refresh(); 
    } catch (error) {
      console.error("Gagal logout:", error);
      setIsLoggingOut(false);
    }
  };

  const userInitial = user.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="flex items-center gap-2">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.name ?? "avatar"}
            width={32}
            height={32}
            unoptimized
            className="rounded-full object-cover border border-border"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
            {userInitial}
          </div>
        )}
        <span className="hidden lg:block text-sm font-medium text-foreground">
          {user.name}
        </span>
      </div>

      {/* 3. Ubah form menjadi tombol biasa dengan event onClick */}
      <Button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        variant="outline"
        className="text-foreground bg-transparent hover:bg-destructive hover:text-white font-semibold text-sm transition-colors cursor-pointer"
      >
        {isLoggingOut ? "Keluar..." : "Logout"}
      </Button>
    </div>
  );
};

export default NavbarAuth;