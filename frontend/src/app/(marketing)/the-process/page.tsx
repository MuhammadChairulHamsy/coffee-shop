import Image from "next/image";
import { Leaf } from "lucide-react";

/* ---------- DATA DUMMY (Bisa dipindah ke file constants) ---------- */
const PROCESS_STATS = [
  { value: "1,800+", label: "MASL ELEVATION" },
  { value: "86+", label: "SCA CUPPING SCORE" },
  { value: "0%", label: "DEFECT TOLERANCE" },
  { value: "24 Hrs", label: "ROAST TO SHIP", highlight: true },
];

const PROCESS_STEPS = [
  {
    step: "01",
    category: "CULTIVATION & TERROIR",
    title: "Direct High-Altitude Sourcing",
    description:
      "We partner exclusively with multi-generational smallholders situated above 1,800 MASL in nutrient-rich volcanic soils. Slower bean maturation at cold mountain elevations concentrates natural sugars and dense cellular structures, unlocking vibrant floral notes and distinct tropical acidity.",
    tags: ["Hand-Picked Only", "Direct Trade +35% Fair", "Volcanic Loam Soil"],
    imageUrl: "/image/process-coffee.jpg", 
    originCoordinates: "Terrazu & Guji Highlands (2,100m)",
  },
  // Nanti bisa tambah step 02, 03, dst di sini...
];

export default function TheProcessPage() {
  return (
    <section className="mb-24 mt-10 overflow-hidden lg:mt-24">
      <div className="container mx-auto px-4 md:px-5">
        
        {/* 1. Header Section */}
        <div className="flex flex-col items-center justify-center gap-6 lg:gap-8">
          <div className="flex max-w-fit items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <Leaf className="h-4 w-4" />
            Peak Flavor Retention
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Zero Stale Storage
          </div>

          <h1 className="text-center font-inter text-3xl font-bold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
            From High-Altitude Crop to Your <br className="hidden md:block" />
            Morning Cup.
          </h1>

          <p className="text-center text-base text-muted-foreground md:text-lg">
            Discover the meticulous 5-stage artisanal journey behind every bag
            of Coffesy. <br className="hidden md:block" />
            Freshness isn't a promise, it's our scientific method.
          </p>
        </div>

        {/* 2. Stat Cards Section */}
        <div className="mt-16 flex justify-center">
          <div className="flex w-full max-w-4xl flex-wrap items-center justify-center gap-3 rounded-[2rem] bg-[#F5F0EB] p-3 sm:gap-4 sm:p-4 dark:bg-neutral-900/50">
            {PROCESS_STATS.map((stat, index) => (
              <div
                key={index}
                className="flex min-w-36 flex-1 flex-col items-center justify-center rounded-full bg-white px-6 py-3 shadow-sm transition-transform hover:scale-105 dark:bg-neutral-950 sm:py-4"
              >
                <span
                  className={`text-lg font-bold sm:text-xl ${
                    stat.highlight ? "text-primary" : "text-foreground"
                  }`}
                >
                  {stat.value}
                </span>
                <span className="mt-1 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. The 5-Stage Journey Section (Baru) */}
        <div className="mt-24">
          {/* Header Journey */}
          <div className="mb-12 flex flex-col items-center space-y-4 text-center">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-background border border-primary/20">
              <div className="h-2 w-2 rounded-full bg-primary" />
            </div>
            <h2 className="font-inter text-3xl font-bold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">
              The 5-Stage Scientific Journey
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
              Every bean undergoes rigorous precision monitoring to eliminate
              oxidation, lock in natural sweetness, and honor single-origin
              terroirs.
            </p>
          </div>

          {/* Container Card Utama */}
          <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-[#F5F0EB] p-6 sm:p-10 dark:bg-neutral-900/40">
            {PROCESS_STEPS.map((item, index) => (
              <div key={index} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                
                {/* Kolom Kiri: Teks */}
                <div className="flex flex-col gap-5">
                  {/* Step Number & Category */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2D1A11] text-xs font-bold text-white">
                      {item.step}
                    </div>
                    <span className="text-xs font-bold tracking-widest text-primary uppercase">
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-inter text-3xl font-bold text-foreground sm:text-4xl">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-foreground shadow-sm dark:bg-neutral-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Kolom Kanan: Gambar dengan Overlay */}
                <div className="relative h-80 w-full overflow-hidden rounded-2xl shadow-lg sm:h-96">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  
                  {/* Overlay Gradient Gelap */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Text Overlay (Origin) */}
                  <div className="absolute bottom-0 left-0 flex flex-col p-6 text-white">
                    <span className="mb-1 text-[10px] font-bold tracking-widest uppercase opacity-80">
                      Origin Coordinates
                    </span>
                    <span className="font-playfair text-xl font-bold sm:text-2xl">
                      {item.originCoordinates}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}