import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Search, ShoppingCart } from "lucide-react";
import { NAV_LINKS } from "@/app/lib/constants";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <Image
          src="/coffeo.svg"
          alt="Coffeo logo"
          width={28}
          height={28}
          className="object-contain"
        />
        <span className="text-lg lg:text-xl font-playfair tracking-tight font-bold text-foreground ">
          Coffesy
        </span>
      </Link>

      {/* Nav Links */}
      <ul className="hidden md:flex items-center gap-1">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="px-3 py-1.5 rounded-md font-inter text-sm md:text-lg text-foreground"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="flex items-center border-2  rounded-md overflow-hidden ">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1.5 text-sm bg-transparent text-foreground outline-none hidden lg:block lg:w-36 lg:focus:w-48 cursor-pointer"
          />
          <button type="submit" className="px-2 py-1.5 " aria-label="Search">
            <Search size={18} />
          </button>
        </div>

        {/* Cart */}
        <button
          className="p-2 rounded-md border-2 cursor-pointer"
          aria-label="Shopping cart"
        >
          <ShoppingCart size={18} />
        </button>

        {/* Auth */}
        <Button
          variant="outline"
          className="border-2 text-foreground bg-transparent hover:bg-amber-900 hover:text-amber-100 font-semibold text-sm transition-colors cursor-pointer"
        >
          Log in / Sign up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
