import Navbar from "@/components/layouts/navbar";
import Hero from "@/components/sections/hero";
import LatestProducts from "@/components/sections/latest-products";
import QualityProducts from "@/components/sections/quality-products";
import SpecialProducts from "@/components/sections/special-products";
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
        <QualityProducts />
      </main>
    </div>
  );
}
