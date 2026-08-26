import { getSpecialProducts } from "@/data/products";
import SpecialProductsFilter from "./special-products-filter";

const SpecialProducts = async () => {
  const products = await getSpecialProducts();

  return (
    <section className="container mx-auto mt-12 lg:mt-32 px-4 mb-20">
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
        <h3 className="text-primary font-bold text-3xl lg:text-5xl tracking-tight">
          Weekend special products
        </h3>
        <p className="text-muted-foreground font-medium text-sm lg:text-base">
          Check out our daily special product that you can get with +20% OFF!
        </p>
      </div>

      {/* Filter + Grid — Client Component */}
      <SpecialProductsFilter products={products} />
    </section>
  );
};

export default SpecialProducts;
