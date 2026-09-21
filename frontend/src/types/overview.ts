
export interface OverviewFooterDetail {
  label: string;
  value: string;
}

export interface OverviewCardItem {
  id: string;
  title: string;
  value: string | number;
  iconName: "Wallet" | "ShoppingBag" | "Boxes" | "Award"; 
  iconBgColor: string;
  iconColor: string;
  trendBadge?: {
    text: string;
    type: "positive" | "negative" | "warning" | "neutral";
  };
  progressBar?: {
    value: number;
    label?: string;
  };
  footerDetails?: Array<{ label: string; value: string }>;
}

export interface OverviewStatsData {
  totalRevenue?: number;
  revenueTargetPercentage?: number;
  revenueGrowth?: number;
  totalOrders?: number;
  ordersGrowth?: number;
  avgDailyOrders?: number;
  activeCoffeeBeans?: number;
  lowStockAlerts?: number;
  readyToRoastKg?: number;
  avgScaScore?: number;
  cuppingFrequency?: string;
  qGraderId?: string;
}