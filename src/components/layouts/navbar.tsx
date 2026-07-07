import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { createClient } from "@/utils/supabase/server";
import NavbarAuth from "@/components/layouts/navbar-auth";
import NavbarMobile from "@/components/layouts/navbar-mobile";
import type { NavbarAuthProps } from "@/types/index";
import { Button } from "../ui/button";

const Navbar = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userData: NavbarAuthProps["user"] = user
    ? {
        name: user.user_metadata?.full_name ?? user.email ?? null,
        avatar: user.user_metadata?.avatar_url ?? null,
        email: user.email ?? null,
      }
    : null;

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-5 bg-background border-b border-border overflow-hidden">
      {/* Logo */}

      <Link href="/" className="flex items-center gap-2 shrink-0">
        <Image
          src="/coffeo.svg"
          alt="Coffeo logo"
          width={28}
          height={28}
          className="object-contain"
        />

        <span className="text-lg lg:text-xl font-playfair tracking-tight font-bold text-foreground">
          Coffesy
        </span>
      </Link>

      {/* Nav Links — desktop */}

      <ul className="hidden md:flex items-center gap-1">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="px-3 py-1.5 rounded-md font-inter text-sm md:text-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Actions */}

      <div className="flex items-center gap-2">
        {/* Search */}

        <div className="flex items-center border-2 rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1.5 text-sm bg-transparent text-foreground outline-none hidden lg:block lg:w-36 lg:focus:w-48 cursor-pointer"
          />

          <Button
            variant="outline"
            type="button"
            className="px-2 py-1.5 border-none"
            aria-label="Search"
          >
            <Search size={18} />
          </Button>
        </div>

        {/* Cart */}

        <Button
          variant="outline"
          className="p-2 rounded-md cursor-pointer"
          aria-label="Shopping cart"
        >
          <ShoppingCart size={18} />
        </Button>

        {/* Auth — desktop only */}

        <div className="hidden md:block">
          <NavbarAuth user={userData} />
        </div>

        {/* Hamburger — mobile only, pass user untuk drawer */}

        <NavbarMobile user={userData} />
      </div>
    </nav>
  );
};

export default Navbar;
