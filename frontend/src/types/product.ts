import type { LucideIcon } from "lucide-react";

/* ---------- UI-only types ---------- */

export interface QualityItem {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

/* ---------- Product — re-export dari Zod schema ---------- */

export type {
  Product,
  PaginatedProducts,
  ListProductsQuery,
} from "@/schemas/product.schema";

/* ---------- Aliases ---------- */

export type { Product as LatestProduct } from "@/schemas/product.schema";
export type { Product as SpecialProduct } from "@/schemas/product.schema";