"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import type { NavbarAuthProps } from "@/types/navigation";
import { signOut } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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

  const userInitial = user.name?.charAt(0).toUpperCase() ?? "U";
  
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
        <Avatar>
          <AvatarImage src={user.avatar ?? undefined} alt={user.name ?? "avatar"}  />
          <AvatarFallback>
            {userInitial}
          </AvatarFallback>
        </Avatar>
        
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
