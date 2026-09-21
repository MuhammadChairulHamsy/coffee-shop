"use client"

import { getStatsCards } from "@/lib/get-stats-cards";
import { OverviewCard } from "./components/overview-cards";

export default function DashboardPage() {
  const cards = getStatsCards();
  return (
    <div className="container space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-3">
          <h2 className="text-4xl font-playfair font-bold tracking-wide">
            Overview
          </h2>
          <p className="text-muted-foreground">
            Operational summary of roasting activities, coffee bean sales performance, and direct order flow for Coffesy Hub.
          </p>
        </div>
        <div className="text-sm px-4 py-2 bg-muted/50 rounded-full border text-muted-foreground font-medium">
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <OverviewCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
