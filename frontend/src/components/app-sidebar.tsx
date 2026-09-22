"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Coffee,
  LayoutDashboard,
  FolderTree,
  ShoppingBag,
  Tag,
  Star,
  Users,
  Settings,
  LucideIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { MenuItemProps } from "@/types";


function MenuItem({ item }: MenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.url;
  const Icon = item.icon;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        tooltip={item.title}
        className="transition-colors"
      >
        <Link href={item.url} className="flex items-center gap-3">
          <Icon className="size-4 shrink-0" />
          <span className="font-medium text-sm">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigationData = {
    main: [
      {
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Product Catalog",
        url: "/dashboard/products",
        icon: Coffee,
      },
      {
        title: "Product Categories",
        url: "/dashboard/categories",
        icon: FolderTree,
      },
      {
        title: "Order List",
        url: "/dashboard/orders",
        icon: ShoppingBag,
      }
    ],
    marketing: [
      {
        title: "Special Offers",
        url: "/dashboard/special-offers",
        icon: Tag,
      },
      {
        title: "Customer Reviews",
        url: "/dashboard/reviews",
        icon: Star,
      },
    ],
    system: [
      {
        title: "Manage Users",
        url: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Store Settings",
        url: "/dashboard/settings",
        icon: Settings,
      },
    ],
  };

  const userData = {
    name: "Admin Coffesy",
    email: "admin@coffesy.com",
    avatar: "/coffeo.svg",
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border/50"
      {...props}
    >
      {/* --- HEADER SIDEBAR --- */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="hover:bg-transparent">
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="bg-primary shadow-md shadow-primary/20 size-9 rounded-xl flex items-center justify-center shrink-0">
                  <Coffee className="text-primary-foreground size-5" />
                </div>
                <div className="flex flex-col gap-0.5 overflow-hidden text-left">
                  <span className="font-bold text-sidebar-foreground text-base leading-none font-playfair">
                    Coffesy.
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">
                    Admin Portal
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* --- CONTENT SIDEBAR --- */}
      <SidebarContent className="overflow-hidden">
        {/* GROUP 1: MAIN */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 mb-2">
            Ringkasan
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.main.map((item) => (
                <MenuItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* GROUP 2: OPERATIONAL */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 mb-2 mt-2">
            Manajemen Operasional
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.marketing.map((item) => (
                <MenuItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* GROUP 3: SYSTEM */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70 mb-2">
            Sistem
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.system.map((item) => (
                <MenuItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* --- FOOTER SIDEBAR --- */}
      <SidebarFooter className="border-t border-border/50 p-2">
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
