import CurvedLoop from "@/components/ui/curved-loop";
import Hero from "@/components/sections/hero";
import LatestProducts from "@/components/sections/latest-products";
import NewsletterSection from "@/components/sections/newsletter-section";
import QualityProducts from "@/components/sections/quality-products";
import SpecialProducts from "@/components/sections/special-products";

export default function Page() {
  return (
    <>
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
    </>
  );
}
