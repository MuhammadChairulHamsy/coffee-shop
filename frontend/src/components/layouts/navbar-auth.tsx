"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "../ui/button";
import type { NavbarAuthProps } from "@/types/navigation";
import { signOut } from "@/lib/authClient";

const NavbarAuth = ({ user }: NavbarAuthProps) => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [imageError, setImageError] = useState(false);

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

  const userInitial = user.name?.charAt(0).toUpperCase() ?? "U";
  const showAvatarImage = Boolean(user.avatar) && !imageError;

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

  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="flex items-center gap-2">
        {showAvatarImage ? (
          <Image
            src={user.avatar!}
            alt={user.name ?? "avatar"}
            width={32}
            height={32}
            unoptimized
            className="rounded-full object-cover border border-border"
            onError={() => setImageError(true)}
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
