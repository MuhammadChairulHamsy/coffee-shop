import { MessageCircle, Box, PackageCheck, Layers } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

const QUALITY_ITEMS = [
  {
    id: 1,
    icon: MessageCircle,
    title: "Active community",
    description: "You can reach out whenever you want!",
  },
  {
    id: 2,
    icon: Box,
    title: "Best product design",
    description: "We worked a lot to make a great experience",
  },
  {
    id: 3,
    icon: PackageCheck,
    title: "Premium quality",
    description: "A premium quality coffee is what our customers deserve",
  },
  {
    id: 4,
    icon: Layers,
    title: "The best material",
    description: "Our product is made by premium materials",
  },
];

const QualityProducts = () => {
  return (
    <section className="container mx-auto mt-12 lg:mt-32 mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Product / Beans Image */}
        <div className="relative flex justify-center items-center">
          {/* Gambar Biji Kopi Utama */}
          <Image
            src="/image/Seed-coffee-2-removebg-preview.webp"
            alt="Quality Coffee Beans"
            width={700}
            height={600}
            className="w-full h-auto object-contain drop-shadow-md"
          />

          {/* Floating Testimonial Card (Glassmorphism Effect) */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-8 sm:left-auto sm:translate-x-0 sm:-right-6 sm:bottom-16 z-20 w-[90%] sm:w-auto">
            <div className="flex items-center gap-3.5 p-2.5 pr-6 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-white/40 dark:border-zinc-800/50 rounded-full shadow-xl shadow-black/5">
              {/* Avatar User */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 shadow-sm">
                <Image
                  src="/image/Sign-up.webp"
                  alt="Muhammad Chairul Hamsy"
                  fill
                  sizes="(max-width: 640px) 48px, 56px"
                  className="object-cover"
                />
              </div>

              {/* Info Testimoni */}
              <div className="flex flex-col">
                <span className="text-foreground font-bold text-sm sm:text-base tracking-tight leading-snug">
                  Muhammad Chairul Hamsy
                </span>
                <p className="max-w-56 sm:max-w-72 text-muted-foreground text-[11px] sm:text-xs leading-tight line-clamp-2">
                  Coffeo is one of the most successful company... customer
                  relationship is very good.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Quality Details */}
        <div className="flex flex-col space-y-1 lg:space-y-5">
          <h2 className="text-primary p-2 lg:p-0 font-bold text-2xl lg:text-5xl tracking-tight leading-tight">
            We care about the quality of our{" "}
            <span className="font-extrabold">products</span>
          </h2>

          <p className="max-w-[595px] text-muted-foreground font-medium text-sm p-3 lg:p-0 lg:text-base leading-relaxed">
            Drinking coffee is one of the most global things you do each day.
            Here I can spend a long and comfortable time with this workspace
            facilities.
          </p>

          {/* Grid Feature Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 mx-3 lg:mx-0">
            {QUALITY_ITEMS.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.id} className="flex items-start space-x-4">
                  {/* Circle Icon Badge */}
                  <div className="p-3 rounded-full bg-muted/60 text-foreground shrink-0">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-1">
                    <h3 className="text-foreground font-bold text-base tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Button
              size="lg"
              className="rounded-full mx-3 lg:mx-0 px-3 lg:px-8 font-semibold cursor-pointer"
            >
              Explore our products →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityProducts;
