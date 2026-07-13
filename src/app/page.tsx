import CurvedLoop from "@/components/ui/curved-loop";
import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";
import Hero from "@/components/sections/hero";
import LatestProducts from "@/components/sections/latest-products";
import NewsletterSection from "@/components/sections/newsletter-section";
import QualityProducts from "@/components/sections/quality-products";
import SpecialProducts from "@/components/sections/special-products";

export default function Page() {
  return (
    <div className="min-h-screen relative flex flex-col justify-between">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 w-full">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-1 mx-auto w-full pt-10">
        <Hero />

        {/* Render CurvedLoop dengan prop array yang valid */}
        <CurvedLoop
          marqueeText="COFFESY ✦ FRESHLY BREWED ✦ 10% OFF FIRST CUP ✦"
          speed={2}
          curveAmount={250}
          direction="right"
          interactive
          className="text-primary"
        />

        <LatestProducts />
        <SpecialProducts />
        <QualityProducts />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
