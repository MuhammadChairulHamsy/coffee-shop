import { DashboardStatCard } from "@/types/dashboard";

export const INITIAL_DASHBOARD_STATS: DashboardStatCard[] = [
  {
    id: "revenue",
    title: "TOTAL REVENUE",
    value: "$12,450.00",
    badgeText: "+12.5% vs bulan lalu",
    trend: "positive",
    progressValue: 94,
    progressLabel: "94% target",
  },
  {
    id: "orders",
    title: "TOTAL PESANAN",
    value: "342 Orders",
    badgeText: "+8% pesanan baru",
    trend: "positive",
    footerLabel: "Rata-rata volume",
    footerValue: "11 order / hari",
  },
  {
    id: "stock",
    title: "STOK BIJI KOPI",
    value: "18 Varietas",
    badgeText: "2 Low Stock Alert",
    trend: "warning",
    footerLabel: "Gayo Honey & Kerinci",
    footerValue: "140 kg siap sangrai",
  },
  {
    id: "sca_score",
    title: "RATA-RATA SKOR SCA",
    value: "88.5",
    badgeText: "Certified Specialty",
    trend: "neutral",
    footerLabel: "Cupping mingguan",
    footerValue: "Q-Grader #402",
  },
];