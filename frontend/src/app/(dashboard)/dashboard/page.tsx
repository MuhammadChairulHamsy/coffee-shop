"use client";

import * as React from "react";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { DataTable } from "@/components/data-table";
import { Order } from "@/types/order";


// Contoh Mock Data Pesanan Terbaru Coffesy untuk DataTable
const recentOrdersData: Order[] = [
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

export default function DashboardPage() {
  const [formattedDate, setFormattedDate] = React.useState<string>("");

  React.useEffect(() => {
    setFormattedDate(
      new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* --- PAGE HEADER --- */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="font-playfair text-3xl font-bold tracking-tight">
            Overview
          </h1>
          <p className="text-sm text-muted-foreground">
            Operational summary of roasting activities, coffee bean sales
            performance, and direct order flow for Coffesy Hub.
          </p>
        </div>
        <div className="w-fit rounded-full border bg-muted/40 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-2xs">
          {formattedDate || "Memuat tanggal..."}
        </div>
      </div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="@container/main flex flex-1 flex-col gap-6">
        {/* 1. SECTION CARDS */}
        <SectionCards />

        {/* 2. INTERACTIVE CHART */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-2xs">
          <ChartAreaInteractive />
        </div>

        {/* 3. RECENT ORDERS DATA TABLE */}
        <div className="rounded-xl border bg-card p-4 text-card-foreground shadow-2xs md:p-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold tracking-tight">
              Pesanan Terbaru
            </h2>
            <p className="text-xs text-muted-foreground">
              Daftar transaksi dan status pemesanan terkini di toko Coffesy.
            </p>
          </div>
          <DataTable data={recentOrdersData} />
        </div>
      </div>
    </div>
  );
}
