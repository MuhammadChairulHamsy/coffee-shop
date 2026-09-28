import { ProductSort, ProfileFilter } from "@/types/product-filter";

export const PRODUCT_FILTERS = [
  { label: "All", value: "All" },
  { label: "Accessories", value: "Accessories" },
  { label: "Coffee Beans", value: "Coffee Beans" },
  { label: "Apparel", value: "Apparel" },
  { label: "Instant Coffee", value: "Instant Coffee" },
  { label: "Bundle", value: "Bundle" },
] as const;

export const PROFILE_OPTIONS: { value: ProfileFilter; label: string }[] = [
  { value: "semua-sangrai", label: "Profil: Semua Sangrai" },
  { value: "light", label: "Profil: Light Roast" },
  { value: "medium", label: "Profil: Medium Roast" },
  { value: "dark", label: "Profil: Dark Roast" },
];

export const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: "terlaris", label: "Urutan: Terlaris" },
  { value: "terbaru", label: "Urutan: Terbaru" },
  { value: "harga-asc", label: "Urutan: Harga Terendah" },
  { value: "harga-desc", label: "Urutan: Harga Tertinggi" },
  { value: "rating", label: "Urutan: Rating" },
];