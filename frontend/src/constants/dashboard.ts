import { DashboardStatCard, LatestOrderItem } from "@/types/dashboard";

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

export const INITIAL_LATEST_ORDERS: LatestOrderItem[] = [
  {
    id: "8942",
    customerName: "Budi Santoso",
    productDetail: "2x Ethiopia Guji Natural 250g",
    price: "$28.50",
    status: "Selesai",
  },
  {
    id: "8941",
    customerName: "Jessica Tan",
    productDetail: "1x Gayo Anaerobic Slow Dr...",
    price: "$34.00",
    status: "Diproses",
  },
  {
    id: "8940",
    customerName: "Hendra Kusuma",
    productDetail: "3x Flores Bajawa Washed ...",
    price: "$42.00",
    status: "Siap Kirim",
  },
  {
    id: "8939",
    customerName: "Maya Putri",
    productDetail: "1x Kerinci Natural Single Orig...",
    price: "$16.50",
    status: "Selesai",
  },
  {
    id: "8938",
    customerName: "Kopi Kenangan R&D",
    productDetail: "5kg House Blend Espresso ...",
    price: "$115.00",
    status: "Diproses",
  },
];