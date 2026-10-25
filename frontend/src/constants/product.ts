export const COLUMNS_TABLE_PRODUCT = [
  { key: "name", label: "Product Name", className: "" },
  {
    key: "description",
    label: "Description",
    className: "hidden lg:table-cell",
  },
  { key: "price", label: "Retail Price", className: "text-center" },
  { key: "type", label: "Type", className: "hidden lg:table-cell" },
  { key: "category", label: "Category", className: "hidden lg:table-cell" },
  { key: "status", label: "Status", className: "hidden xl:table-cell" },
  { key: "actions", label: "Aksi", className: "text-right" },
] as const;
