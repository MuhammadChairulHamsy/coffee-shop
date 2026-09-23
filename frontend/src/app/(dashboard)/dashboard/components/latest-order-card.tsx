"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck } from "lucide-react";
import { LatestOrderItem, LatestOrderStatus } from "@/types/dashboard";
import { INITIAL_LATEST_ORDERS } from "@/constants/dashboard";

interface LatestOrdersCardProps {
  orders?: LatestOrderItem[];
}

function StatusBadge({ status }: { status: LatestOrderStatus }) {
  switch (status) {
    case "Selesai":
      return (
        <Badge
          variant="outline"
          className="border-none bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[11px] px-2.5 py-0.5 rounded-md font-medium"
        >
          Selesai
        </Badge>
      );
    case "Diproses":
      return (
        <Badge
          variant="outline"
          className="border-none bg-orange-100 text-orange-700 hover:bg-orange-100 text-[11px] px-2.5 py-0.5 rounded-md font-medium"
        >
          Diproses
        </Badge>
      );
    case "Siap Kirim":
      return (
        <Badge
          variant="outline"
          className="border-none bg-slate-200/70 text-slate-700 hover:bg-slate-200/70 text-[11px] px-2.5 py-0.5 rounded-md font-medium"
        >
          Siap Kirim
        </Badge>
      );
  }
}

export function LatestOrdersCard({
  orders = INITIAL_LATEST_ORDERS,
}: LatestOrdersCardProps) {
  return (
    <Card className="flex flex-col justify-between rounded-2xl border border-border/60 bg-sidebar p-5 shadow-xs">
      {/* --- HEADER CARDS --- */}
      <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <CardTitle className="font-serif text-xl font-bold tracking-tight text-foreground">
            Pesanan Terkini
          </CardTitle>
        </div>
        <Link
          href="/dashboard/orders"
          className="text-xs font-semibold text-orange-700 hover:text-orange-800 transition-colors flex items-center gap-0.5"
        >
          Lihat Semua &gt;
        </Link>
      </CardHeader>

      {/* --- ORDER ITEMS LIST --- */}
      <CardContent className="p-0 space-y-3">
        {orders.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl bg-slate-50/80 p-3 dark:bg-muted/40 border border-border/35 transition-all hover:border-border/60"
          >
            {/* Kiri: Nama & Produk */}
            <div className="space-y-0.5 max-w-52">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm text-foreground truncate">
                  {item.customerName}
                </span>
                <span className="text-[11px] text-muted-foreground font-mono">
                  #{item.id}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {item.productDetail}
              </p>
            </div>

            {/* Kanan: Harga & Badge Status */}
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="font-bold text-sm text-foreground">
                {item.price}
              </span>
              <StatusBadge status={item.status} />
            </div>
          </div>
        ))}
      </CardContent>

      {/* --- FOOTER BANNER (SAMEDAY CUT-OFF) --- */}
      <div className="mt-4 rounded-xl bg-[#3E2723] p-3 text-white flex items-center justify-between text-xs font-semibold">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-orange-300" />
          <span>Kurir Sameday Cut-off</span>
        </div>
        <span className="font-mono text-orange-200">15:00 WIB</span>
      </div>
    </Card>
  );
}