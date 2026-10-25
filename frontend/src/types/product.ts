import type { LucideIcon } from "lucide-react";
import type { ApiError } from "@/lib/api-error";
import type { Product } from "@/types/product";

/* ---------- UI-only types ---------- */

export interface QualityItem {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export type ProductTableProps = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  error: ApiError | null;
  selectedIds: number[];
  onSelectOne: (id: number, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onRetry?: () => void;
};


/* ---------- Product — re-export dari Zod schema ---------- */

export type {
  Product,
  PaginatedProducts,
  ListProductsQuery,
} from "@/schemas/product.schema";

/* ---------- Aliases ---------- */

export type { Product as LatestProduct } from "@/schemas/product.schema";
export type { Product as SpecialProduct } from "@/schemas/product.schema";