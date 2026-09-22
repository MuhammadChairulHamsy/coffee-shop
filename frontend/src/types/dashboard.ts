export type TrendDirection = "positive" | "warning" | "neutral";

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