import { getLatestProducts } from "@/data/products";
import LatestProductsClient from "./LatestProductsClient";

const LatestProducts = async () => {
  // Ambil data produk segar langsung dari server/database
  const products = await getLatestProducts();

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

      {/* Product Grid Client Area dengan Fitur Like Aktif */}
      <LatestProductsClient initialProducts={products} />
    </section>
  );
};

export default LatestProducts;