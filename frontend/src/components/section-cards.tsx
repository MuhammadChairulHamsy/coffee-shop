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
  TrendingDownIcon,
  AlertTriangleIcon,
  Wallet,
  ShoppingBag,
  Grid2X2,
  CheckCircle2,
} from "lucide-react";
import type { DashboardStatCard } from "@/types/dashboard";
import { INITIAL_DASHBOARD_STATS } from "@/constants/dashboard";

function CardHeaderIcon({ id }: { id: string }) {
  const styles: Record<
    string,
    { bg: string; fg: string; Icon: typeof Wallet }
  > = {
    revenue: { bg: "bg-orange-500/15", fg: "text-orange-400", Icon: Wallet },
    orders: {
      bg: "bg-indigo-500/15",
      fg: "text-indigo-400",
      Icon: ShoppingBag,
    },
    stock: { bg: "bg-orange-500/15", fg: "text-orange-400", Icon: Grid2X2 },
    sca_score: {
      bg: "bg-emerald-500/15",
      fg: "text-emerald-400",
      Icon: CheckCircle2,
    },
  };
  const config = styles[id];
  if (!config) return null;
  const { bg, fg, Icon } = config;
  return (
    <div
      className={`flex size-9 items-center justify-center rounded-xl ${bg} ${fg}`}
    >
      <Icon className="size-4" />
    </div>
  );
}

type Trend = "positive" | "negative" | "warning" | "neutral";

function TrendBadge({ trend, text }: { trend: Trend; text: string }) {
  const styles: Record<Trend, string> = {
    positive: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
    negative: "text-rose-400 border-rose-400/30 bg-rose-400/5",
    warning: "text-orange-400 border-orange-400/30 bg-orange-400/5",
    neutral: "text-card-foreground border-border bg-muted/30",
  };
  return (
    <Badge
      variant="outline"
      className={`gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${styles[trend]}`}
    >
      {trend === "positive" && <TrendingUpIcon className="size-3" />}
      {trend === "negative" && <TrendingDownIcon className="size-3" />}
      {trend === "warning" && <AlertTriangleIcon className="size-3" />}
      {text}
    </Badge>
  );
}

interface SectionCardsProps {
  stats?: DashboardStatCard[];
}

export function SectionCards({
  stats = INITIAL_DASHBOARD_STATS,
}: SectionCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {stats.map((item) => (
        <Card
          key={item.id}
          className="@container/card relative overflow-hidden
             rounded-2xl border-2
             bg-card text-card-foreground
             shadow-lg shadow-black/10"
        >
          <CardHeader className="gap-1">
            <CardDescription className="text-[11px] font-medium uppercase tracking-wider text-card-foreground">
              {item.title}
            </CardDescription>

            <CardTitle className="text-3xl font-bold tabular-nums text-card-foreground @[250px]/card:text-4xl">
              {item.id === "sca_score" ? (
                <>
                  {item.value}
                  <span className="text-sm font-normal text-card-foreground">
                    {" "}
                    / 100
                  </span>
                </>
              ) : (
                item.value
              )}
            </CardTitle>

            <CardAction>
              <CardHeaderIcon id={item.id} />
            </CardAction>
          </CardHeader>

          <div className="px-6 pb-2">
            <TrendBadge
              trend={(item.trend ?? "neutral") as Trend}
              text={item.badgeText ?? ""}
            />
          </div>

          <CardFooter className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
            {item.progressValue !== undefined ? (
              <div className="flex w-full items-center gap-3">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${item.progressValue}%` }}
                  />
                </div>
                <span className="shrink-0 font-medium text-card-foreground">
                  {item.progressLabel}
                </span>
              </div>
            ) : (
              <div className="flex w-full items-center justify-between">
                <span className="max-w-[60%] text-[11px] font-medium leading-tight text-card-foreground">
                  {item.footerLabel}
                </span>
                <span className="max-w-[40%] text-right text-[11px] font-bold leading-tight text-card-foreground">
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
