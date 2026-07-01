import Image from "next/image";
import { Button } from "../ui/button";
import { Heart } from "lucide-react"; 
import { Latest_Products } from "../../data/latestProducts";

const LatestProducts = () => {
  return (
    <section className="container mx-auto mt-12 lg:mt-24 px-4 mb-20">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
        <h2 className="text-primary font-bold text-3xl lg:text-5xl tracking-tight">
          Explore the recent products
        </h2>
        <p className="text-muted-foreground font-medium text-sm lg:text-base">
          Our delectable drink options, including classic espresso choices,
          house specialties, fruit smoothies and frozen treats.
        </p>
      </div>

      {/* Product Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {Latest_Products.map((product) => (
          <div 
            key={product.id} 
            className="group text-card-foreground border border-border/60 rounded-2xl p-3 w-full max-w-80 flex flex-col shadow-sm hover:shadow-md transition-shadow relative"
          >
            {/* === IMAGE CONTAINER DENGAN ANIMASI BAYANGAN === */}
            <div className="relative w-full rounded-xl flex flex-col items-center justify-center overflow-visible">
              
              {/* Pembungkus gambar agar melayang ke atas (-translate-y-4) saat di-hover */}
              <div className="relative z-10 transition-transform duration-500 ease-out group-hover:-translate-y-4 cursor-pointer">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={700}
                  height={500}
                  className="object-contain drop-shadow-sm"
                  priority={product.id === 1}
                />
              </div>

              {/* Elemen Bayangan Oval di bawah gambar */}
              <div 
                className="
                  absolute bottom-4 z-0 
                  w-24 h-3 
                  bg-black/15 
                  rounded-[100%] 
                  blur-[6px] 
                  transition-all duration-500 ease-out 
                  group-hover:w-16 
                  group-hover:opacity-50 
                  group-hover:scale-90
                  group-hover:blur-[5px]
                "
              />
            </div>

            {/* Product Info */}
            <div className="space-y-1 flex-1 text-center">
              <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                {product.type}
              </span>
              <h3 className="font-bold text-xl text-foreground">
                {product.title}
              </h3>
              <p className="text-2xl font-black text-foreground pt-1">
                ${product.price}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <Button variant="link" className="p-0 h-auto font-bold text-foreground hover:no-underline group/btn">
                Add to cart <span className="inline-block transition-transform group-hover/btn:translate-x-1 ml-1">→</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-muted relative z-20"
                aria-label="Like product"
              >
                <Heart 
                  className={`w-5 h-5 ${product.like ? "fill-destructive text-destructive" : "text-muted-foreground"}`} 
                />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestProducts;