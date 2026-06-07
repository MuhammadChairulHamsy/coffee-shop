import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="flex justify-center gap-10">
      <div className="flex items-center gap-2">
        <Image
          src="/coffeo.svg"
          alt="icon-coffeo"
          width={30}
          height={30}
          className="object-cover"
        />
        <span className="text-xl text-foreground font-bold">Coffeo</span>
      </div>

      <div className="flex gap-6 font-sans font-bold text-sm md:text-lg">
        <Link href="/" className="px-2 py-1 text-foreground">
          Product
        </Link>
        <Link
          href="/special-offers"
          className="px-2 py-1 font-sans text-foreground"
        >
          Special offers
        </Link>
        <Link
          href="/the-process"
          className="px-2 py-1 font-sans text-foreground"
        >
          The Process
        </Link>
        <Link href="/packing" className="px-2 py-1 font-sans text-foreground">
          Packing
        </Link>
        <Link href="/about" className="px-2 py-1 font-sans text-foreground">
          About
        </Link>

        <Button className="">Sign in</Button>
      </div>
    </nav>
  );
};

export default Navbar;
