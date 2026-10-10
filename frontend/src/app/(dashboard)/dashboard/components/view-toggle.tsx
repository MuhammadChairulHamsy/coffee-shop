"use client";

import { LayoutGrid, Rows3 } from "lucide-react";
import type { ViewMode } from "@/types/product-filter";

interface ViewToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex h-11 items-center gap-1 rounded-full bg-muted/50 p-1">
      <button
        type="button"
        aria-label="Tampilan daftar"
        suppressHydrationWarning
        onClick={() => onChange("list")}
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors cursor-pointer ${
          value === "list"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Rows3 className="h-4 w-4" />
      </button>

      <button
        type="button"
        aria-label="Tampilan grid"
        onClick={() => onChange("grid")}
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors cursor-pointer ${
          value === "grid"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <LayoutGrid className="h-4 w-4" />
      </button>
    </div>
  );
}
