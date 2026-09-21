import type { LucideIcon } from "lucide-react";

export interface QualityItem {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  description: string | null;
  price: number;
  type: string;
  category: string;
  is_liked: boolean;
  is_special: boolean;
  created_at?: string;
};

// Aliases
export type LatestProduct = Product;
export type SpecialProduct = Product;