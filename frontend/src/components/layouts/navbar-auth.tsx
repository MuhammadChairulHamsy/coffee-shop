"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { logout } from "@/actions/auth";
import type { NavbarAuthProps } from "@/types";

const NavbarAuth = ({ user }: NavbarAuthProps) => {
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

      {/* Logout */}
      <form action={logout}>
        <Button
          type="submit"
          variant="outline"
          className="text-foreground bg-transparent hover:bg-destructive hover:text-white font-semibold text-sm transition-colors cursor-pointer"
        >
          Logout
        </Button>
      </form>
    </div>
  );
};

export default NavbarAuth;
