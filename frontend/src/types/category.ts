import { ApiError } from "@/lib/api-error";
import type { CategoryStats } from "@/schemas/category.schema";
export type { CategoryStats };

// export type CategoryStats = {
//   id: number;
//   name: string;
//   description: string | null;
//   productCount: number;
//   totalValue: number;
//   lastUpdated: string;
//   status: "active" | "empty";
// };

export type CategoryTableProps = {
  categories: CategoryStats[];
  isLoading?: boolean;
  isError: boolean;
  error: ApiError | null;
  selectedIds: number[];
  onSelectOne: (id: number, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onEdit?: (category: CategoryStats) => void;
  onDelete?: (category: CategoryStats) => void;
  onRetry?: () => void;
};

export type ListCategoriesQuery = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
};
