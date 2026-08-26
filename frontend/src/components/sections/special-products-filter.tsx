"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import type { Product } from "@/types";
import { useFilteredProducts } from "@/hooks/use-filtered-products";
import { PRODUCT_FILTERS } from "@/lib/constants";


const SpecialProductsFilter = ({ products }: { products: Product[] }) => {
  const { activeFilter, filteredProducts, handleLikeClick, setActiveFilter } =
    useFilteredProducts(products);

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {PRODUCT_FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer border
              ${
                activeFilter === filter.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:text-foreground"
              }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          Tidak ada produk di kategori ini.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group text-card-foreground border border-border/60 rounded-2xl p-4 w-full max-w-80 flex flex-col shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div className="relative w-full h-64 rounded-xl flex items-center justify-center overflow-visible">
                <div className="relative w-full h-full z-10 transition-transform duration-500 ease-out group-hover:-translate-y-4 cursor-pointer">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain drop-shadow-sm p-4"
                    priority={product.id === 1}
                  />
                </div>
                <div className="absolute bottom-2 z-0 w-28 h-3 bg-black/10 rounded-[100%] blur-[6px] transition-all duration-500 ease-out group-hover:w-20 group-hover:opacity-50 group-hover:scale-90 group-hover:blur-[5px]" />
              </div>

              {/* Product Info */}
              <div className="space-y-1 flex-1 text-center pt-4">
                <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                  {product.type}
                </span>
                <h3 className="font-bold text-xl text-foreground line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-2xl font-black text-foreground pt-1">
                  ${product.price}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="link"
                  className="p-0 h-auto font-bold text-foreground hover:no-underline group/btn cursor-pointer"
                >
                  Add to cart{" "}
                  <span className="inline-block transition-transform group-hover/btn:translate-x-1 ml-1">
                    →
                  </span>
                </Button>

                {/* Tombol Heart Like/Unlike */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-muted relative z-20 cursor-pointer"
                  aria-label={
                    product.is_liked ? "Unlike product" : "Like product"
                  }
                  onClick={() => handleLikeClick(product.id, product.is_liked)}
                >
                  <Heart
                    className={`w-5 h-5 transition-transform active:scale-125 duration-150 ${
                      product.is_liked
                        ? "fill-destructive text-destructive"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SpecialProductsFilter;
