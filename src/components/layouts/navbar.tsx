import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import NavbarAuth from "@/components/layouts/navbar-auth";
import NavbarMobile from "@/components/layouts/navbar-mobile";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getAuthUser } from "@/lib/auth";

const Navbar = async () => {
  const userData = await getAuthUser();
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
          <Input
            type="text"
            placeholder="Search..."
            className="px-3 py-1.5 text-sm text-foreground outline-none border-none hidden lg:block lg:w-36 lg:focus:w-48 cursor-pointer focus-visible:ring-0"
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
