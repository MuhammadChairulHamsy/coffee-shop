import { Button } from "@/components/ui/button";
import { ArrowDown, Coffee, Leaf, Wind } from "lucide-react";
import Image from "next/image";

export default function PackingSection() {
  return (
    <section className="mb-24 mt-10 overflow-hidden lg:mt-24">
      <div className="container mx-auto px-4 md:px-5">
        <div className="flex flex-col items-center justify-between gap-16 lg:flex-row lg:gap-12">
          
          {/* Kolom Kiri: Teks & CTA */}
          <div className="flex w-full flex-col items-start gap-6 lg:w-1/2">
            <div className="flex max-w-fit items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              Circular Stewardship
            </div>

            <h1 className="font-inter text-3xl font-bold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
              Engineered for <br className="hidden sm:block" /> Freshness.{" "}
              <br className="hidden sm:block" />
              <span className="text-primary">Designed for the Planet.</span>
            </h1>

            <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
              How we preserve delicate volatile aromatics and sweet natural cup
              profiles while completely eliminating petroleum plastics from your
              morning pour-over ritual.
            </p>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" size="lg" className="cursor-pointer">
                <ArrowDown className="mr-2 h-4 w-4" />
                Explore the pack science
              </Button>
              <Button size="lg" className="cursor-pointer">
                <Coffee className="mr-2 h-4 w-4" />
                Available pack formats
              </Button>
            </div>
          </div>

          {/* Kolom Kanan: Gambar Premium (Fixed) */}
          <div className="relative flex w-full justify-center lg:w-1/2">
            
            {/* Efek Cahaya di Belakang (Glow) */}
            <div className="absolute inset-0 m-auto h-[80%] w-[80%] rounded-full bg-primary/20 blur-[120px]" />

            {/* Bingkai Utama */}
            <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl">
              
              {/* Gambar (Menggunakan layout natural agar tidak terpotong) */}
              <div className="relative w-full">
                <Image
                  src="/image/packing-coffee.jpg"
                  alt="Sustainable coffee packaging"
                  width={600} // Angka proporsi untuk landscape
                  height={400}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="h-auto w-full object-cover"
                />
                
                {/* Overlay Gradient Halus */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-black/10" />
              </div>

              {/* Badge Melayang 1: Release Valve */}
              <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-neutral-900/80 px-4 py-2 text-[10px] font-bold tracking-wide text-white backdrop-blur-md sm:text-xs shadow-lg">
                <Wind className="h-4 w-4 text-white" />
                CO₂ Release Valve Active
              </div>

              {/* Badge Melayang 2: Degradasi */}
              <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-2.5 backdrop-blur-lg shadow-xl dark:bg-neutral-900/90">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-500 dark:bg-orange-500/20 dark:text-orange-400">
                  <Leaf className="h-4 w-4" />
                </div>
                <div className="flex flex-col pr-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                    ASTM D6400
                  </span>
                  <span className="text-sm font-bold text-neutral-900 dark:text-white">
                    Degrades in 180 Days
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}