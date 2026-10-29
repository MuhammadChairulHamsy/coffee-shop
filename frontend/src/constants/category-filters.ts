import type { CategorySort } from "@/schemas/category.schema";

export const CATEGORY_SORT_OPTIONS: { value: CategorySort; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "most-products", label: "Sort by: Most Products" },
  { value: "least-products", label: "Sort by: Least Products" },
  { value: "name-asc", label: "Sort by: Name (A-Z)" },
];

export const PAGE_SIZE = 20;