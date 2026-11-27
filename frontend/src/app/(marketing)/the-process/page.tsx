import Image from "next/image";
import { ArrowRight, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
    imageUrl: "/image/the-process/process-coffee-1.webp",
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
    imageUrl: "/image/the-process/process-coffee-2.jpg",
    overlayLabel: "CRAFTSMANSHIP",
    overlayValue: "Adaptive Roast Curves",
  },
  {
    step: "03",
    category: "PEAK DELIVERY",
    title: "Fresh Dispatch Guarantee",
    description:
      "Zero shelf storage. Every bag is roasted to order, nitrogen-flushed to freeze oxidation, and shipped within 24 hours stamped with roast date and cupping notes.",
    tags: ["24h Roast-to-Ship", "Nitrogen Sealed"],
    imageUrl: "/image/the-process/process-coffee-3.jpg",
    overlayLabel: "FRESHNESS STAMPED",
    overlayValue: "Dispatched in 24h",
  },
];

const SPECTRUM_DATA = [
  {
    id: "light",
    roastName: "Light Roast",
    agtron: "AGTRON 65-75",
    dots: 1,
    tags: "Terroir & Floral Acidity",
    description:
      "Halted right after the first crack to preserve the fragile aromatic chlorogenic acids. Boasts intense jasmine florals, bergamot sweetness, and crisp stone fruit vibrancy.",
    details: [
      { label: "Acidity", value: "Vibrant & High" },
      { label: "Best Brewed With", value: "V60 / Chemex / Aeropress" },
      { label: "Flagship Example", value: "Ethiopia Guji Micro-Lot" },
    ],
    imageUrl: "/image/the-process/spectrum-light.jpg", // Sesuaikan path gambarmu
  },
  {
    id: "medium",
    roastName: "Medium Roast",
    agtron: "AGTRON 50-60",
    dots: 2,
    tags: "Caramelization & Truffle Body",
    description:
      "Developed through an extended Maillard period. Balancing juicy fruit sugars with warm milk chocolate, toasted macadamia, and velvety salted-caramel mouthfeel.",
    details: [
      { label: "Acidity", value: "Smooth & Rounded" },
      { label: "Best Brewed With", value: "Drip / Espresso / Kalita" },
      { label: "Flagship Example", value: "Honduras El Puente" },
    ],
    imageUrl: "/image/the-process/spectrum-medium.jpg",
  },
  {
    id: "dark",
    roastName: "Dark Roast",
    agtron: "AGTRON 35-45",
    dots: 3,
    tags: "Smoky Molasses & Heavy Body",
    description:
      "Carefully guided to second crack without ever entering bitter carbon territory. Deep notes of 85% Belgian dark cacao, roasted hazelnut, toasted cedar, and rich crema.",
    details: [
      { label: "Acidity", value: "Mellow & Low" },
      { label: "Best Brewed With", value: "French Press / Moka Pot / Milk" },
      { label: "Flagship Example", value: "Coffeo Heritage Blend" },
    ],
    imageUrl: "/image/the-process/spectrum-dark.jpg",
  },
];

export default function TheProcessPage() {
  return (
    <section className="mt-10 overflow-hidden lg:mt-24">
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
                <span className={cn("text-lg font-bold sm:text-xl", stat.highlight ? "text-primary" : "text-foreground")}>
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

          <div className="flex flex-col gap-6 sm:gap-8">
            {PROCESS_STEPS.map((item, index) => {
              // index 0 (Kanan), index 1 (Kiri), index 2 (Kanan)
              const isImageRight = index % 2 === 0;

              return (
                // ✅ overflow-hidden Dihapus dari container ini
                <div
                  key={item.step}
                  className="rounded-3xl bg-[#F5F0EB] p-6 sm:p-10 dark:bg-neutral-900/40"
                >
                  <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    
                    {/* Kolom Teks */}
                    <div
                      className={cn(
                        "flex flex-col gap-5",
                        isImageRight ? "lg:order-1" : "lg:order-2"
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
                            className="rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-foreground shadow-sm sm:text-xs dark:bg-neutral-800"
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
                        isImageRight ? "lg:order-2" : "lg:order-1"
                      )}
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={800}
                        height={600}
                        unoptimized
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10" />
                      
                      <div className="absolute bottom-4 left-4 z-20 flex flex-col text-white">
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

         {/* 4. Roasting Spectrum Section */}
        <div className="mt-32">
          {/* Header Spectrum */}
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Sensory Science
              </span>
              <h2 className="font-inter text-3xl font-bold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">
                Our Roasting Spectrum Guide
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Roasting dictates whether you taste the fruit of the coffee plant or the caramelization of the seed. Choose the flavor horizon that matches your daily brew ritual.
              </p>
            </div>
            
            {/* Filter Tabs (Static UI) */}
            <div className="flex w-fit items-center rounded-full bg-secondary p-1 dark:bg-neutral-900">
              <button className="rounded-full bg-[#1C130C] px-5 py-2 text-xs font-semibold text-white shadow-sm">
                All Spectra
              </button>
              <button className="rounded-full px-5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">
                Light
              </button>
              <button className="rounded-full px-5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">
                Medium
              </button>
              <button className="rounded-full px-5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">
                Dark
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {SPECTRUM_DATA.map((roast) => (
              <div
                key={roast.id}
                className="flex flex-col rounded-[2rem] border border-border/40 bg-card-background p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:bg-neutral-900/40"
              >
                {/* Top Bar: Agtron & Dots */}
                <div className="mb-8 flex items-center justify-between">
                  <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-bold tracking-widest text-foreground dark:bg-neutral-800">
                    {roast.agtron}
                  </span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((dot) => (
                      <div
                        key={dot}
                        className={cn(
                          "h-2 w-2 rounded-full",
                          dot <= roast.dots
                            ? "bg-[#5C3A21] dark:bg-primary"
                            : "bg-neutral-200 dark:bg-neutral-700"
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Image Container */}
                <div className="relative mb-6 flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-3xl bg-secondary/50">
                  <Image
                    src={roast.imageUrl}
                    alt={roast.roastName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Text Content */}
                <div className="flex flex-1 flex-col">
                  <h3 className="font-playfair text-2xl font-bold text-foreground">
                    {roast.roastName}
                  </h3>
                  <span className="mb-4 mt-1 text-xs font-medium text-primary">
                    {roast.tags}
                  </span>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {roast.description}
                  </p>
                </div>

                {/* Details Table */}
                <div className="mt-auto space-y-2.5 border-t border-border/50 pt-5 text-xs">
                  {roast.details.map((detail, idx) => (
                    <div key={idx} className="flex justify-between gap-4">
                      <span className="text-muted-foreground">{detail.label}</span>
                      <span className="text-right font-semibold text-foreground">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. CTA Section (Taste the Freshness) */}
         <div className="mt-24 flex flex-col items-center gap-10 rounded-[2.5rem] bg-[#F5F0EB] p-8 sm:p-12 md:flex-row md:gap-16 lg:p-16 dark:bg-neutral-900/40">
          
          {/* Gambar di Kiri (Bulat) */}
          <div className="relative shrink-0">
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white shadow-xl sm:h-72 sm:w-72 dark:border-neutral-800">
              <Image
                src="/image/Coffee-cup.webp" // Ganti dengan path gambar cangkir kopimu
                alt="Freshly roasted coffee cup"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
          </div>

          {/* Teks & Tombol di Kanan */}
          <div className="flex flex-col items-start text-center md:text-left">
            {/* Label Kecil */}
            <div className="mb-4 inline-flex items-center rounded-full bg-[#FADCD5] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#D16A55]">
              Fresh Batches Roasting Daily
            </div>
            
            {/* Judul */}
            <h2 className="font-inter text-3xl font-bold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">
              Taste the Freshness Difference.
            </h2>
            
            {/* Deskripsi */}
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Elevate your daily ritual with ethically roasted micro-lots delivered right after drum cooling. Subscribe today and receive 20% off your first three recurring deliveries.
            </p>

            {/* Tombol */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="group cursor-pointer rounded-full bg-[#2B140C] px-6 py-5 text-sm font-semibold text-white hover:bg-[#3d1c11]">
                Explore our products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer rounded-full border-none bg-white px-6 py-5 text-sm font-semibold text-foreground shadow-sm hover:bg-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-700"
              >
                Join Tasting Club
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}