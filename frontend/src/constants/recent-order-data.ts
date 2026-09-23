import { Order } from "@/types/order";

// Contoh Mock Data Pesanan Terbaru Coffesy untuk DataTable
export const recentOrdersData: Order[] = [
  {
    id: "ORD-7001",
    customer: "Budi Santoso",
    email: "budi@gmail.com",
    product: "Ethiopia Yirgacheffe",
    quantity: 2,
    amount: "$36.00",
    status: "Completed",
    paymentMethod: "QRIS",
    date: "2026-09-22",
  },
  {
    id: "ORD-7002",
    customer: "Siti Rahma",
    email: "siti.rahma@yahoo.com",
    product: "Colombia Supremo",
    quantity: 3,
    amount: "$48.00",
    status: "Processing",
    paymentMethod: "Credit Card",
    date: "2026-09-22",
  },
  {
    id: "ORD-7003",
    customer: "Ahmad Dahlan",
    email: "ahmad.d@outlook.com",
    product: "Gayo Honey Process",
    quantity: 1,
    amount: "$25.00",
    status: "Pending",
    paymentMethod: "Bank Transfer",
    date: "2026-09-21",
  },
  {
    id: "ORD-7004",
    customer: "Dewi Lestari",
    email: "dewi.l@gmail.com",
    product: "V60 Dripper Ceramic",
    quantity: 1,
    amount: "$30.00",
    status: "Completed",
    paymentMethod: "QRIS",
    date: "2026-09-20",
  },
];