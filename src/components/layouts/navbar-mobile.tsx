"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import type { NavbarAuthProps } from "@/types/index";
import NavbarAuth from "./navbar-auth";
import Image from "next/image";

const NavbarMobile = ({ user }: NavbarAuthProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="md:hidden p-2 rounded-md border-2 cursor-pointer"
        aria-label={isOpen ? "Tutup menu" : "Buka menu"}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-0 z-40 bg-background border-t border-border">
          <div className="flex justify-between p-2 items-center gap-3">
            <div className="flex gap-2">
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
            </div>

            <button
              className="md:hidden p-2 rounded-md border-2 cursor-pointer"
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <ul className="flex flex-col px-6 py-4 gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-md font-inter text-base text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth di mobile drawer */}
          <div className="px-6 py-4 border-t border-border">
            <NavbarAuth user={user} />
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarMobile;
