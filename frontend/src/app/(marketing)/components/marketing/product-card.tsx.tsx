"use client";

import { Button } from "@/components/ui/button";
import { formatDolar } from "@/utils/format-dolar";
import type { Product } from "@/schemas/product.schema";
import { ProductImage } from "./product-Image";
import { Heart } from "lucide-react";

type ProductCardProps = {
  product: Product;
  priority: boolean;
  onLike: (id: number, currentLiked: boolean) => void;
};

export function ProductCard({ product, priority, onLike }: ProductCardProps) {
  return (
    <div className="group flex w-full max-w-[320px] flex-col rounded-3xl border border-border/40 bg-background p-5 text-card-foreground transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative mb-6 flex aspect-square w-full items-center justify-center overflow-visible rounded-2xl bg-secondary/40">
        <div className="relative z-10 h-full w-full cursor-pointer transition-transform duration-500 ease-out group-hover:-translate-y-3">
          <ProductImage
            src={product.imageUrl}
            alt={product.name}
            priority={priority}
          />
        </div>
        {/* Shadow Effect */}
        <div className="absolute bottom-4 z-0 h-4 w-32 rounded-[100%] bg-black/10 blur-sm transition-all duration-500 ease-out group-hover:w-24 group-hover:scale-90 group-hover:opacity-40 group-hover:blur-[6px]" />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col">
        <span className="mb-2 text-[11px] font-bold uppercase tracking-widest text-primary">
          {product.category?.name || "Uncategorized"}
        </span>
        <h3 className="mb-1 line-clamp-1 font-playfair text-xl font-bold text-foreground">
          {product.name}
        </h3>
        <p className="mt-auto text-lg font-black text-foreground">
          {formatDolar(product.price)}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-auto flex items-center gap-3 border-t border-border/50 pt-5">
        <Button className="group/btn flex-1 cursor-pointer rounded-xl font-semibold">
          Add to cart
          <span className="ml-1 inline-block transition-transform group-hover/btn:translate-x-1">
            →
          </span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={`shrink-0 cursor-pointer rounded-xl transition-colors ${
            product.is_liked
              ? "border-destructive bg-destructive/10"
              : "hover:bg-muted"
          }`}
          onClick={() => onLike(product.id, product.is_liked)}
          aria-label={product.is_liked ? "Hapus dari favorit" : "Tambah ke favorit"}
        >
          <Heart
            className={`h-5 w-5 transition-transform duration-200 active:scale-125 ${
              product.is_liked
                ? "fill-destructive text-destructive"
                : "text-muted-foreground"
            }`}
          />
        </Button>
      </div>
    </div>
  );
}

