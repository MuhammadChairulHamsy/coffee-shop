import CurvedLoop from "@/components/ui/curved-loop";
import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";
import Hero from "@/components/sections/hero";
import LatestProducts from "@/components/sections/latestProducts";
import NewsletterSection from "@/components/sections/newsletterSection";
import QualityProducts from "@/components/sections/qualityProducts";
import SpecialProducts from "@/components/sections/specialProducts";
// import ProductPage from "./(marketing)/product/page";

export default function Page() {
  return (
    <div className="min-h-screen relative flex flex-col justify-between">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 w-full">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full flex-1 pt-10">
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

        {/* Marketing */}
        {/* <ProductPage /> */}
      </main>
      <Footer />
    </div>
  );
}
