import Image from "next/image";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- DATA DUMMY ---------- */
const PROCESS_STATS = [
  { value: "1,800+", label: "MASL ELEVATION" },
  { value: "86+", label: "SCA CUPPING SCORE" },
  { value: "0%", label: "DEFECT TOLERANCE" },
  { value: "24 Hrs", label: "ROAST TO SHIP", highlight: true },
];

const PROCESS_STEPS = [
  {
    step: "01",
    category: "ORIGIN & SELECTION",
    title: "High-Altitude Sourcing",
    description:
      "Sourced exclusively from single-origin volcanic smallholders above 1,800m. Cold maturation yields dense beans bursting with natural sugars and crisp florals.",
    tags: ["1,800+ MASL", "Direct Fair Trade"],
    imageUrl: "/imag/process-coffee-2.jpg",
    overlayLabel: "ORIGIN & SELECTION",
    overlayValue: "Terrazu & Guji Highlands",
  },
  {
    step: "02",
    category: "THERMAL CRAFTSMANSHIP",
    title: "Tailored Roast Profiling",
    description:
      "Small 12kg cast-iron batches tracked in real time. We precisely control convective heat through the Maillard reaction to highlight origin acidity without char or smoke.",
    tags: ["Small-Batch 12kg", "Agtron Monitored"],
    imageUrl: "/image/process-coffee-2.jpg",
    overlayLabel: "CRAFTSMANSHIP",
    overlayValue: "Adaptive Roast Curves",
  },
  // {
  //   step: "03",
  //   category: "PEAK DELIVERY",
  //   title: "Fresh Dispatch Guarantee",
  //   description:
  //     "Zero shelf storage. Every bag is roasted to order, nitrogen-flushed to freeze oxidation, and shipped within 24 hours stamped with roast date and cupping notes.",
  //   tags: ["24h Roast-to-Ship", "Nitrogen Sealed"],
  //   imageUrl: "/image/the-process/process-coffee-3.jpg",
  //   overlayLabel: "FRESHNESS STAMPED",
  //   overlayValue: "Dispatched in 24h",
  // },
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
            Discover the meticulous 3-stage artisanal journey behind every bag
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

        {/* 3. The 3-Stage Journey Section */}
        <div className="mt-24">
          <div className="mb-12 flex flex-col items-center space-y-4 text-center">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-primary/20 bg-background">
              <div className="h-2 w-2 rounded-full bg-primary" />
            </div>
            <h2 className="font-inter text-3xl font-bold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">
              The 3-Stage Scientific Journey
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
              Three essential milestones engineered to eliminate oxidation,
              develop peak sweetness, and deliver uncompromising fresh flavor.
            </p>
          </div>

          {/* ✅ Layout: Selang-seling Kanan - Kiri - Kanan */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {PROCESS_STEPS.map((item, index) => {
              // Jika index 0 (Kanan), index 1 (Kiri), index 2 (Kanan)
              const isImageRight = index % 2 === 0;

              return (
                <div
                  key={item.step}
                  className="overflow-hidden rounded-3xl bg-[#F5F0EB] p-6 sm:p-10 dark:bg-neutral-900/40"
                >
                  <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* Kolom Teks */}
                    <div
                      className={cn(
                        "flex flex-col gap-5",
                        isImageRight ? "lg:order-1" : "lg:order-2",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2D1A11] text-xs font-bold text-white">
                          {item.step}
                        </div>
                        <span className="text-xs font-bold tracking-widest text-primary uppercase">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="font-inter text-2xl font-bold text-foreground sm:text-3xl">
                        {item.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {item.description}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-foreground sm:text-xs shadow-sm dark:bg-neutral-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Kolom Gambar */}
                    <div
                      className={cn(
                        "relative h-64 w-full overflow-hidden rounded-xl sm:h-72",
                        isImageRight ? "lg:order-2" : "lg:order-1",
                      )}
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        unoptimized // ✅ Tambahkan ini
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      {/* Overlay Gradient (Lebih gelap di bawah untuk teks) */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Text Overlay (Kiri Bawah) */}
                      <div className="absolute bottom-4 left-4 flex flex-col text-white">
                        <span className="mb-1 text-[9px] font-bold tracking-widest uppercase opacity-80 sm:text-[10px]">
                          {item.overlayLabel}
                        </span>
                        <span className="font-playfair text-lg font-bold sm:text-xl">
                          {item.overlayValue}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
