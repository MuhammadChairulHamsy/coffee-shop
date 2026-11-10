"use client";

import { useFilteredProducts } from "@/hooks/use-filtered-products";
import { PRODUCT_FILTERS } from "@/constants/product-filters";
import { ShoppingBag } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { ProductSkeleton } from "./product-skeleton";
import { ProductCard } from "@/app/(marketing)/components/marketing/product-card.tsx";

const ProductPage = () => {
  const { products, status } = useProducts();
  const { activeFilter, filteredProducts, handleLikeClick, setActiveFilter } =
    useFilteredProducts(products || []);

  if (status?.isLoading) return <ProductSkeleton />;

  if (status?.isError) {
    return (
      <div className="container mx-auto mt-20 text-center text-muted-foreground">
        Gagal mengambil data produk dari server.
      </div>
    );
  }

  return (
    <section className="container mx-auto mt-10 mb-20 lg:mt-20">
      {/* Header */}
      <div className="flex flex-col mb-12 mx-2 gap-5 lg:mb-5 lg:flex-col">
        <div className="bg-secondary max-w-fit py-1.5 px-4 rounded-full flex items-center gap-2 text-primary tracking-widest ">
          <span className=" bg-primary rounded-full w-1.5 h-1.5"></span>
          <p className="text-[10px] lg:text-xs font-bold">
            DIRECT FARM SOURCING MICRO BATH ROASTED
          </p>
        </div>
        <h1 className="text-foreground font-inter text-2xl lg:text-5xl xl:text-6xl lg:leading-[1.15] font-bold wrap-break-word">
          Speciality Roasted Beans & <br /> Curated Brewing Gear
        </h1>
        <p className="text-sm font-medium text-muted-foreground lg:text-base">
          Sourced directly from high-elevation smallsolders, roasted to order
          within 24{" "}
          <span className="md:block lg:block">
            hours,and delivered at peak degassing for pure cup clarity.
          </span>
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

      {/* Product Grid / Empty State */}
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
              priority={index < 2}
              onLike={handleLikeClick}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductPage;
