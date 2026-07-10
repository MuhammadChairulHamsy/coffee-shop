import { getSpecialProducts } from "@/data/products";
import SpecialProductsFilter from "./SpecialProductsFilter";

const SpecialProducts = async () => {
  const products = await getSpecialProducts();

  return (
    <section className="mt-24 container">
      <div className="flex flex-col space-y-10">
        <div className="flex flex-col text-center space-y-5">
          <h2 className="text-primary font-bold text-3xl lg:text-5xl tracking-tight">
            Weekend special products
          </h2>
          <p className="text-muted-foreground font-medium text-sm lg:text-base">
            Check out our daily special product that you can get with +20% OFF!
          </p>
        </div>

        {/* Filter + Grid — Client Component */}
        <SpecialProductsFilter products={products} />
      </div>
    </section>
  );
};

export default SpecialProducts;