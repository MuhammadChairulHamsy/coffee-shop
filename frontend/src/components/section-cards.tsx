"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrendingUpIcon,
  AlertTriangleIcon,
  Wallet,
  ShoppingBag,
  Grid2X2,
  CheckCircle2,
} from "lucide-react";
import { DashboardStatCard } from "@/types/dashboard";
import { INITIAL_DASHBOARD_STATS } from "@/constants/dashboard";

// Render Ikon Kanan Atas sesuai jenis card
function CardHeaderIcon({ id }: { id: string }) {
  switch (id) {
    case "revenue":
      return (
        <div className="flex size-9 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
          <Wallet className="size-4" />
        </div>
      );
    case "orders":
      return (
        <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
          <ShoppingBag className="size-4" />
        </div>
      );
    case "stock":
      return (
        <div className="flex size-9 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
          <Grid2X2 className="size-4" />
        </div>
      );
    case "sca_score":
      return (
        <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="size-4" />
        </div>
      );
    default:
      return null;
  }
}

interface SectionCardsProps {
  stats?: DashboardStatCard[];
}

export function SectionCards({ stats = INITIAL_DASHBOARD_STATS }: SectionCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
      {stats.map((item) => (
        <Card key={item.id} className="@container/card relative overflow-hidden bg-sidebar shadow-xs">
          <CardHeader>
            <CardDescription className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
              {item.title}
            </CardDescription>

            <CardTitle className="text-2xl font-bold tracking-tight text-foreground tabular-nums @[250px]/card:text-3xl">
              {item.id === "sca_score" ? (
                <>
                  {item.value}
                  <span className="text-sm font-normal text-muted-foreground"> / 100</span>
                </>
              ) : (
                item.value
              )}
            </CardTitle>

            <CardAction>
              <CardHeaderIcon id={item.id} />
            </CardAction>
          </CardHeader>

          {/* Badge Trend / Alert */}
          <div className="px-6 pb-2">
            <Badge
              variant="outline"
              className={`border-none px-2 py-0.5 text-xs font-semibold ${
                item.trend === "positive"
                  ? "bg-emerald-50 text-emerald-600"
                  : item.trend === "warning"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {item.trend === "positive" && <TrendingUpIcon className="mr-1 size-3.5" />}
              {item.trend === "warning" && <AlertTriangleIcon className="mr-1 size-3.5" />}
              {item.badgeText}
            </Badge>
          </div>

          {/* Footer Card */}
          <CardFooter className="mt-4 flex items-center justify-between border-t border-border/40 pt-3 text-xs">
            {item.progressValue !== undefined ? (
              // Case 1: Progress bar untuk Revenue
              <div className="flex w-full items-center gap-3">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#5D3A29]"
                    style={{ width: `${item.progressValue}%` }}
                  />
                </div>
                <span className="shrink-0 font-medium text-muted-foreground">
                  {item.progressLabel}
                </span>
              </div>
            ) : (
              // Case 2: Dua kolom kiri dan kanan persis seperti di gambar
              <div className="flex w-full items-center justify-between text-muted-foreground">
                <span className="text-[11px] font-medium leading-tight max-w-25">
                  {item.footerLabel}
                </span>
                <span className="text-[11px] font-bold text-foreground text-right leading-tight max-w-25">
                  {item.footerValue}
                </span>
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}