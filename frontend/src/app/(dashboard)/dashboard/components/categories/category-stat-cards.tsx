import { FolderTree, ShoppingBag, Sparkles, AlertTriangle } from "lucide-react";
import type { CategoryStats } from "@/types/category";

type CategoryStatCardsProps = {
  categories: CategoryStats[];
  isLoading?: boolean;
};

export function CategoryStatCards({ categories, isLoading }: CategoryStatCardsProps) {
  if (isLoading) {
    return <div className="grid grid-cols-1 gap-4 md:grid-cols-4"><div className="col-span-4 h-28 animate-pulse rounded-xl bg-neutral-900" /></div>;
  }

  // Hitung statistik secara dinamis
  const totalCategories = categories.length;
  const activeProducts = categories.reduce((acc, cat) => acc + cat.productCount, 0);
  
  // Cari kategori dengan produk terbanyak
  const topCategory = categories.reduce((prev, current) => 
    (prev.productCount > current.productCount) ? prev : current, categories[0]
  );

  const emptyCategories = categories.filter(c => c.productCount === 0).length;

  const STATS = [
    {
      id: "total", label: "TOTAL CATEGORIES", value: `${totalCategories} Categories`,
      description: `Based on current data`, icon: FolderTree, iconColor: "text-neutral-400", descriptionColor: "text-neutral-500",
    },
    {
      id: "active", label: "ACTIVE PRODUCTS", value: `${activeProducts} Products`,
      description: `Across ${totalCategories} categories`, icon: ShoppingBag, iconColor: "text-neutral-400", descriptionColor: "text-neutral-500",
    },
    {
      id: "top", label: "TOP PERFORMING", value: topCategory?.name || "—",
      description: `${topCategory?.productCount || 0} items listed`, icon: Sparkles, iconColor: "text-amber-400", descriptionColor: "text-neutral-500",
    },
    {
      id: "empty", label: "ZERO INVENTORY", value: `${emptyCategories} Category`,
      description: emptyCategories > 0 ? `Empty category found` : "All categories have products", icon: AlertTriangle, iconColor: "text-orange-500", descriptionColor: emptyCategories > 0 ? "text-orange-400" : "text-emerald-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.id} className="flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-neutral-400">{stat.label}</span>
              <Icon className={`size-5 ${stat.iconColor}`} />
            </div>
            <div className="mt-3"><h3 className="text-2xl font-bold tracking-tight text-white">{stat.value}</h3></div>
            <div className="mt-2"><p className={`text-xs font-medium ${stat.descriptionColor}`}>{stat.description}</p></div>
          </div>
        );
      })}
    </div>
  );
}