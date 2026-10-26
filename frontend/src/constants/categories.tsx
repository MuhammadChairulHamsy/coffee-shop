export const COLUMNS = [
  { key: "name", label: "Category Name", className: "w-[25%]" },
  { key: "description", label: "Description", className: "hidden lg:table-cell" },
  { key: "price", label: "Products", className: "text-center w-[10%]" },
  { key: "type", label: "Total Value", className: "hidden lg:table-cell" },
  { key: "category", label: "Status", className: "hidden lg:table-cell" },
  { key: "status", label: "Last Updated", className: "hidden xl:table-cell" },
  { key: "actions", label: "Actions", className: "text-right" },
] as const;