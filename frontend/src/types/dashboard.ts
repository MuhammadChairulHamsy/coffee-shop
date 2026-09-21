import type { LucideIcon } from "lucide-react";

export interface SidebarMenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export interface MenuItemProps {
  item: SidebarMenuItem;
}