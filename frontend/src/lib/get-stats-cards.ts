import { OverviewCardItem, OverviewStatsData } from "@/types/overview";

export const getStatsCards = (data?: OverviewStatsData): OverviewCardItem[] => {
  const stats = data || {};

  return [
    {
      id: "revenue",
      title: "TOTAL REVENUE",
      value: `$${(stats.totalRevenue ?? 12450).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      iconName: "Wallet", // Kirim string, bukan komponen/fungsi
      iconBgColor: "bg-orange-100/80",
      iconColor: "text-orange-700",
      trendBadge: {
        text: `↗ +${stats.revenueGrowth ?? 12.5}% vs bulan lalu`,
        type: "positive",
      },
      progressBar: {
        value: stats.revenueTargetPercentage ?? 94,
        label: `${stats.revenueTargetPercentage ?? 94}% target`,
      },
    },
    {
      id: "orders",
      title: "TOTAL PESANAN",
      value: `${stats.totalOrders ?? 342} Orders`,
      iconName: "ShoppingBag",
      iconBgColor: "bg-indigo-100/80",
      iconColor: "text-indigo-700",
      trendBadge: {
        text: `↑ +${stats.ordersGrowth ?? 8}% pesanan baru`,
        type: "positive",
      },
      footerDetails: [
        { label: "Rata-rata volume", value: `${stats.avgDailyOrders ?? 11} order / hari` },
      ],
    },
    {
      id: "stock",
      title: "STOK BIJI KOPI",
      value: `${stats.activeCoffeeBeans ?? 18} Varietas`,
      iconName: "Boxes",
      iconBgColor: "bg-rose-100/80",
      iconColor: "text-rose-700",
      trendBadge: {
        text: `⚠️ ${stats.lowStockAlerts ?? 2} Low Stock Alert`,
        type: "warning",
      },
      footerDetails: [
        { label: "Gayo Honey & Kerinci", value: `${stats.readyToRoastKg ?? 140} kg siap sangrai` },
      ],
    },
    {
      id: "sca_score",
      title: "RATA-RATA SKOR SCA",
      value: `${stats.avgScaScore ?? 88.5} / 100`,
      iconName: "Award",
      iconBgColor: "bg-emerald-100/80",
      iconColor: "text-emerald-700",
      trendBadge: {
        text: "⭐ Certified Specialty",
        type: "neutral",
      },
      footerDetails: [
        { label: "Cupping mingguan", value: `Q-Grader #${stats.qGraderId ?? "402"}` },
      ],
    },
  ];
};