import Navbar from "@/components/layouts/navbar";
import Hero from "@/components/sections/Hero";
import LatestProducts from "@/components/sections/LatestProducts";
import SpecialProducts from "@/components/sections/SpecialProducts";
import Marquee from "@/components/ui/marquee";

export default function Page() {
  return (
    <div className="min-h-screen relative">
      <header className="sticky top-0 z-50 w-full">
        <Navbar />
      </header>

      <main className="container mx-auto pt-5 md:pt-10">
        <Hero />
        <Marquee />
        <LatestProducts />
        <SpecialProducts />
      </main>
    </div>
  );
}
