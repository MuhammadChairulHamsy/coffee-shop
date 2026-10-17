"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterSelectProps<T extends string> {
  value: T;
  onValueChange: (value: T) => void;
  options: { value: T; label: string }[];
  icon?: React.ReactNode;
  placeholder?: string;
  className?: string;
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
        className={cn(
          "h-11 w-auto min-w-44 gap-2 rounded-full border bg-card/50 px-5",
          "text-sm font-medium text-card-foreground",
          "data-placeholder:text-card-foreground",
          "focus-visible:ring-1 focus-visible:ring-border",
          "[&>svg:last-child]:hidden",
          className,
        )}
      >
        {icon}
        <SelectValue placeholder={placeholder}>{selectedLabel}</SelectValue>
        {indicator === "chevron" ? (
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-card-foreground" />
        ) : (
          <ArrowUpDown className="ml-auto h-4 w-4 shrink-0 text-card-foreground" />
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