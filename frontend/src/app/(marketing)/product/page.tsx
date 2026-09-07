"use client";

import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { PRODUCT_FILTERS } from "@/lib/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import { useProducts } from "@/hooks/useProducts"; 

const ProductPage = () => {
  // Ambil data semua produk. Ganti dengan hook/fetching logic milikmu yang mengambil seluruh data
  const { products, status } = useProducts(); 
  
  const { activeFilter, filteredProducts, handleLikeClick, setActiveFilter } =
    useFilteredProducts(products || []);

  const formatDolar = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (status?.isLoading) return <div className="text-center py-20 animate-pulse">Memuat menu...</div>;

  return (
    <section className="container mt-12 lg:mt-20 px-4 mb-20">
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
        <h1 className="text-primary font-playfair font-extrabold text-5xl sm:text-6xl lg:text-7xl">
          Our Menu
        </h1>
        <p className="text-muted-foreground font-medium text-sm lg:text-base">
          Temukan kopi favoritmu dari berbagai pilihan biji kopi premium kami.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
        {PRODUCT_FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer border
              ${
                activeFilter === filter.value
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Product Grid Hasil Filter */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
          <p className="text-lg font-medium">Kategori ini sedang kosong.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-card text-card-foreground border border-border/40 rounded-3xl p-5 w-full max-w-[320px] flex flex-col hover:shadow-xl hover:border-primary/30 transition-all duration-300">
              
              <div className="relative w-full aspect-square rounded-2xl bg-secondary/40 flex items-center justify-center mb-6">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-xl p-6 transition-transform duration-500 ease-out group-hover:-translate-y-3"
                />
              </div>

              <div className="flex flex-col flex-1">
                <span className="text-[11px] font-bold text-primary tracking-widest uppercase mb-2">
                  {product.category}
                </span>
                <h3 className="font-playfair font-bold text-xl text-foreground line-clamp-1 mb-1">
                  {product.name}
                </h3>
                <p className="text-lg font-black text-foreground mt-auto">
                  {formatDolar(product.price)}
                </p>
              </div>

            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductPage;