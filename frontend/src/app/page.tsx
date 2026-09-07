import CurvedLoop from "@/components/ui/curved-loop";
import Hero from "@/components/sections/hero";
import LatestProducts from "@/components/sections/latestProducts";
import NewsletterSection from "@/components/sections/newsletterSection";
import QualityProducts from "@/components/sections/qualityProducts";
import SpecialProducts from "@/components/sections/specialProducts";
import ProductPage from "./(marketing)/product/page";

export default function Page() {
  return (
    <div className="pt-10">
      <Hero />
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
      <ProductPage />
    </div>
  );
}
