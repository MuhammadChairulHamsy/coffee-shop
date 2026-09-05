"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";

// Ubah nama prop dari initialProducts menjadi products agar lebih logis
const LatestProductsClient = ({ products }: { products: Product[] }) => {
  
  // Fungsi ini WAJIB ada agar onClick tombol Heart tidak error
  const handleLikeClick = async (id: number, currentStatus: boolean) => {
    // TODO: Hubungkan dengan endpoint PATCH /api/products/:id/like yang kamu buat sebelumnya
    console.log(`Mengubah status like untuk produk ${id}`);
  };

  // Format harga ke dolar
  const formatDolar = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
          <p className="text-lg font-medium">Tidak ada produk terbaru.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card text-card-foreground border border-border/40 rounded-3xl p-5 w-full max-w-[320px] flex flex-col hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              <div className="relative w-full aspect-square rounded-2xl bg-secondary/40 flex items-center justify-center mb-6 overflow-visible">
                <div className="relative w-full h-full z-10 transition-transform duration-500 ease-out group-hover:-translate-y-3 cursor-pointer">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    loading={product.id <= 4 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-contain drop-shadow-xl p-6"
                    priority={product.id <= 4}
                  />
                </div>
                <div className="absolute bottom-4 z-0 w-32 h-4 bg-black/10 rounded-[100%] blur-sm transition-all duration-500 ease-out group-hover:w-24 group-hover:opacity-40 group-hover:scale-90 group-hover:blur-[6px]" />
              </div>

              <div className="flex flex-col flex-1">
                <span className="text-[11px] font-bold text-primary tracking-widest uppercase mb-2">
                  {product.category} • {product.type}
                </span>
                <h3 className="font-playfair font-bold text-xl text-foreground line-clamp-1 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                  {product.description}
                </p>
                <p className="text-lg font-black text-foreground">
                  {formatDolar(product.price)}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-5 mt-auto border-t border-border/50">
                <Button className="flex-1 rounded-xl font-semibold cursor-pointer group/btn">
                  Add to cart
                  <span className="inline-block transition-transform group-hover/btn:translate-x-1 ml-1">
                    →
                  </span>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-xl shrink-0 cursor-pointer transition-colors ${
                    product.is_liked
                      ? "border-destructive bg-destructive/10"
                      : "hover:bg-muted"
                  }`}
                  aria-label={product.is_liked ? "Unlike" : "Like"}
                  onClick={() => handleLikeClick(product.id, product.is_liked)}
                >
                  <Heart
                    className={`w-5 h-5 transition-transform active:scale-125 duration-200 ${
                      product.is_liked
                        ? "fill-destructive text-destructive"
                        : "text-muted-foreground"
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

export default LatestProductsClient;