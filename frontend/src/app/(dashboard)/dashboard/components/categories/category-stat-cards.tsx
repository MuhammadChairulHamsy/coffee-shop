"use client";

import { 
  FolderTree, 
  ShoppingBag, 
  Sparkles, 
  AlertTriangle 
} from "lucide-react";

// Tipe data untuk memastikan type-safe
type StatCard = {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  descriptionColor: string;
};

// Data dummy, nanti bisa dilempar sebagai props dari API
const STATS: StatCard[] = [
  {
    id: "total",
    label: "TOTAL CATEGORIES",
    value: "6 Categories",
    description: "+1 new added this month",
    icon: FolderTree,
    iconColor: "text-neutral-400",
    descriptionColor: "text-emerald-500",
  },
  {
    id: "active",
    label: "ACTIVE PRODUCTS",
    value: "27 Products",
    description: "Across 5 stocked categories",
    icon: ShoppingBag,
    iconColor: "text-neutral-400",
    descriptionColor: "text-neutral-500",
  },
  {
    id: "top",
    label: "TOP PERFORMING",
    value: "Coffee Beans",
    description: "Highest turnover & revenue",
    icon: Sparkles,
    iconColor: "text-amber-400",
    descriptionColor: "text-neutral-500",
  },
  {
    id: "empty",
    label: "ZERO INVENTORY",
    value: "1 Category",
    description: "Merchandise is empty",
    icon: AlertTriangle,
    iconColor: "text-orange-500",
    descriptionColor: "text-orange-400",
  },
];

export function CategoryStatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {STATS.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.id}
            className="flex flex-col justify-between rounded-xl border-2 border-neutral-800 bg-neutral-900/50 p-6 shadow-sm"
          >
            {/* Header: Label & Icon */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-neutral-400">
                {stat.label}
              </span>
              <Icon className={`size-5 ${stat.iconColor}`} />
            </div>

            {/* Value */}
            <div className="mt-3">
              <h3 className="text-2xl font-bold tracking-tight text-white">
                {stat.value}
              </h3>
            </div>

            {/* Description */}
            <div className="mt-2">
              <p className={`text-xs font-medium ${stat.descriptionColor}`}>
                {stat.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}