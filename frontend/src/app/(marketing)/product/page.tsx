"use client";

import { useFilteredProducts } from "@/hooks/use-filtered-products";
import { PRODUCT_FILTERS } from "@/constants/product-filters";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Coffee, Heart, ShoppingBag } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { ProductSkeleton } from "@/app/(marketing)/product/product-skeleton";

const formatDolar = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);

const ProductPage = () => {
  const { products, status } = useProducts();
  const { activeFilter, filteredProducts, handleLikeClick, setActiveFilter } =
    useFilteredProducts(products || []);

  if (status?.isLoading) return <ProductSkeleton />;

  if (status?.isError) {
    return <div>Gagal mengambil data produk dari server.</div>;
  }

  return (
    <section className="container mx-auto mt-10 mb-20 lg:mt-20">
      {/* Header */}
      <div className="flex flex-col items-center justify-between gap-5 lg:mb-5 lg:flex-col">
        <h1 className="font-playfair text-5xl font-extrabold text-primary sm:text-6xl lg:text-7xl">
          OUR MENU
        </h1>
        <p className="text-sm font-medium text-muted-foreground lg:text-base">
          Temukan kopi favoritmu dari berbagai pilihan biji kopi premium kami.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-12 flex flex-wrap justify-center gap-2 md:gap-3">
        {PRODUCT_FILTERS.map((filter) => (
          <button
            key={filter.value}
            suppressHydrationWarning
            onClick={() => setActiveFilter(filter.value)}
            className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-300 ${
              activeFilter === filter.value
                ? "border-primary bg-primary text-primary-foreground shadow-md"
                : "border-border bg-transparent text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <ShoppingBag className="mb-4 h-12 w-12 opacity-20" />
          <p className="text-lg font-medium">Kategori ini sedang kosong.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onLike={handleLikeClick}
            />
          ))}
        </div>
      )}
    </section>
  );
};

/* ---------- Product Card (extracted) ---------- */

type ProductCardProps = {
  product: {
    id: number;
    name: string;
    imageUrl: string | null;
    category: string;
    price: number;
    is_liked: boolean;
  };
  index: number;
  onLike: (id: number, currentLiked: boolean) => void;
};

function ProductCard({ product, index, onLike }: ProductCardProps) {
  return (
    <div className="group flex w-full max-w-[320px] flex-col rounded-3xl border border-border/40 bg-background p-5 text-card-foreground transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
      {/* Image container */}
      <div className="relative mb-6 flex aspect-square w-full items-center justify-center overflow-visible rounded-2xl bg-secondary/40">
        <div className="relative z-10 h-full w-full cursor-pointer transition-transform duration-500 ease-out group-hover:-translate-y-3">
          <ProductImage
            src={product.imageUrl}
            alt={product.name}
            priority={index < 2}
          />
        </div>

        {/* Shadow */}
        <div className="absolute bottom-4 z-0 h-4 w-32 rounded-[100%] bg-black/10 blur-sm transition-all duration-500 ease-out group-hover:w-24 group-hover:scale-90 group-hover:opacity-40 group-hover:blur-[6px]" />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col">
        <span className="mb-2 text-[11px] font-bold uppercase tracking-widest text-primary">
          {product.category}
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
          aria-label={
            product.is_liked ? "Hapus dari favorit" : "Tambah ke favorit"
          }
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

/* ---------- Product Image (handle null) ---------- */

function ProductImage({
  src,
  alt,
  priority,
}: {
  src: string | null;
  alt: string;
  priority: boolean;
}) {
  if (!src) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Coffee className="h-16 w-16 text-muted-foreground/30" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      className="object-contain p-6 drop-shadow-xl"
    />
  );
}

export default ProductPage;
