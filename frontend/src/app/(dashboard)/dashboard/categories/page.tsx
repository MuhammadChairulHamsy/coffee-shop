import { CategoryStatCards } from "../components/categories/category-stat-cards";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-playfair text-sidebar-foreground text-3xl font-bold tracking-wider">
          Kategori Produk
        </h1>
        <p className="text-sm text-sidebar-foreground">
          Atur kategori seperti Coffee Beans, Accessories, dan Apparel.
        </p>
      </div>
      <CategoryStatCards/>
    </div>
  );
}
