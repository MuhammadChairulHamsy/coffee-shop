"use client";

import { Button } from "@/components/ui/button";
import { formatDolar } from "@/utils/format-dolar";
import type { Product } from "@/schemas/product.schema";
import { ProductImage } from "./product-Image";
import { Heart, Star, ArrowRight } from "lucide-react";

type ProductCardProps = {
  product: Product;
  priority: boolean;
  onLike: (id: number, currentLiked: boolean) => void;
  rating?: number;
  discountPercent?: number;
  originalPrice?: number;
};

export function ProductCard({
  product,
  priority,
  onLike,
  rating = 4.5, 
  discountPercent,
  originalPrice,
}: ProductCardProps) {
  // Logika mock diskon (bisa dihapus jika dari DB sudah ada)
  const mockDiscount = discountPercent ?? (product.id % 2 === 0 ? 25 : 20);
  const mockOriginalPrice = originalPrice ?? product.price * 1.3;

  return (
    <div className="group flex w-full max-w-[320px] flex-col rounded-2xl border border-border/40 bg-background p-0 text-card-foreground transition-all duration-300 hover:border-primary/30 hover:shadow-xl overflow-hidden">
      
      {/* Image Container */}
      <div className="relative flex aspect-4/3 w-full items-center justify-center bg-muted/30 p-4">
        {/* Rating Badge (Kiri Atas) */}
        <div className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 backdrop-blur-md shadow-sm">
          <Star className="h-3 w-3 fill-foreground text-foreground" />
          <span className="text-[11px] font-bold">{rating}</span>
          {/* Opsional: Tambahkan tulisan Origin jika ada */}
        </div>

        {/* Discount Badge (Kanan Atas) */}
        {mockDiscount && (
          <div className="absolute right-3 top-3 z-20 rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-bold text-orange-600">
            %{mockDiscount} OFF
          </div>
        )}

        {/* Image */}
        <div className="relative z-10 h-full w-full cursor-pointer transition-transform duration-500 ease-out group-hover:scale-105">
          <ProductImage
            src={product.imageUrl}
            alt={product.name}
            priority={priority}
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category & Type (Sejajar) */}
        <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          <span className="line-clamp-1">{product.category?.name || "SIGNATURE BLEND"}</span>
          <span className="line-clamp-1 text-right">{product.type || "WASHED"}</span>
        </div>

        {/* Product Name */}
        <h3 className="mb-1 line-clamp-1 font-playfair text-lg font-bold text-foreground">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-1 text-xs text-muted-foreground">
          {product.description || "Cinnamon bark, Vanilla bean, Toasted..."}
        </p>

        {/* Price & Actions Area */}
        <div className="mt-auto gap-3 flex items-center justify-between pt-4 border-t border-border/40">
          
          {/* Harga Coret & Harga Asli */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-foreground">
              {formatDolar(product.price)}
            </span>
            <span className="text-sm text-muted-foreground line-through decoration-muted-foreground/50">
              {formatDolar(mockOriginalPrice)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className={`h-7 w-7 shrink-0 cursor-pointer rounded-full transition-colors ${
                product.is_liked
                  ? "border-destructive bg-destructive/10"
                  : "hover:bg-muted"
              }`}
              onClick={() => onLike(product.id, product.is_liked)}
              aria-label={product.is_liked ? "Hapus dari favorit" : "Tambah ke favorit"}
            >
              <Heart
                className={`h-3 w-3 transition-transform duration-200 active:scale-125 ${
                  product.is_liked
                    ? "fill-destructive text-destructive"
                    : "text-foreground"
                }`}
              />
            </Button>

            {/* Tombol Add (Gelap/Hitam) */}
            <Button className="h-7 gap-2 rounded-full bg-foreground px-2 font-semibold text-background hover:bg-foreground/90">
              Add
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}