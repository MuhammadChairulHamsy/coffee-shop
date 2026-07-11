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
    <section className="container mx-auto mt-12 lg:mt-32 px-4 mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Product / Beans Image */}
        <div className="relative flex justify-center">
          <Image
            src="/image/Sign-up.webp"
            alt="Quality Coffee Beans"
            width={500}
            height={500}
            className="object-contain drop-shadow-sm p-4"
          />
        </div>

        {/* Right Side: Quality Details */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-primary font-bold text-3xl lg:text-5xl tracking-tight leading-tight">
            We care about the quality of our <span className="font-extrabold">products</span>
          </h2>

          <p className="max-w-[595px] text-muted-foreground font-medium text-sm lg:text-base leading-relaxed">
            Drinking coffee is one of the most global things you do each day. Here I can spend a long and comfortable time with this workspace facilities.
          </p>

          {/* Grid Feature Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
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
            <Button size="lg" className="rounded-full px-8 font-semibold cursor-pointer">
              Explore our products →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityProducts;