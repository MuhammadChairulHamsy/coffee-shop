// @/components/filter-select.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import * as React from "react";

interface FilterSelectProps<T extends string> {
  value: T;
  onValueChange: (value: T) => void;
  options: { value: T; label: string }[];
  /** Ikon di kiri trigger */
  icon?: React.ReactNode;
  /** Placeholder kalau value kosong */
  placeholder?: string;
  className?: string;
  /** Pakai chevron ke bawah (default) atau arrow up-down (untuk sort) */
  indicator?: "chevron" | "sort";
}

export function FilterSelect<T extends string>({
  value,
  onValueChange,
  options,
  icon,
  placeholder,
  className,
  indicator = "chevron",
}: FilterSelectProps<T>) {
  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <Select value={value} onValueChange={(v) => onValueChange(v as T)}>
      <SelectTrigger
        className={`h-11 w-auto min-w-44 gap-2 rounded-full border-0 bg-muted/50 px-5 text-sm font-medium text-foreground data-placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-border [&>svg:last-child]:hidden ${className ?? ""}`}
      >
        {icon}
        <SelectValue placeholder={placeholder}>
          {selectedLabel}
        </SelectValue>

        {/* Indicator kanan */}
        {indicator === "chevron" ? (
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
        ) : (
          <ArrowUpDown className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
        )}
      </SelectTrigger>

      <SelectContent className="rounded-xl">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}