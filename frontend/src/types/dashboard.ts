import type { LucideIcon } from "lucide-react";

export type TrendDirection = "positive" | "warning" | "neutral";
export type LatestOrderStatus = "Selesai" | "Diproses" | "Siap Kirim";

export interface DashboardStatCard {
  id: string;
  title: string;
  value: string;
  badgeText: string;
  trend: TrendDirection;
  progressValue?: number;
  progressLabel?: string;
  footerLabel?: string;
  footerValue?: string;
}

export interface MenuItemProps {
  item: {
    title: string;
    url: string;
    icon: LucideIcon;
  };
}


export interface LatestOrderItem {
  id: string;
  customerName: string;
  productDetail: string;
  price: string;
  status: LatestOrderStatus;
}

