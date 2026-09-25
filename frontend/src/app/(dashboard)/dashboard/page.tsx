"use client";

import * as React from "react";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { DataTable } from "@/components/data-table";
import { recentOrdersData } from "@/constants/recent-order-data";
import { LatestOrdersCard } from "./components/latest-order-card";

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
          <h1 className="font-playfair text-3xl font-bold tracking-wider">
            Dashboard
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-5">
          <div className="lg:col-span-7 flex flex-col gap-4 rounded-xl border bg-sidebar text-card-foreground shadow-2xs">
            <ChartAreaInteractive />
          </div>
          <div className="lg:col-span-3 flex flex-col gap-4">
            <LatestOrdersCard />
          </div>
        </div>

        {/* 3. RECENT ORDERS DATA TABLE */}
        <div className="rounded-xl border bg-sidebar p-4 text-card-foreground shadow-2xs md:p-6">
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
