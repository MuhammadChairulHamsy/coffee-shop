"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type DataPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function DataPagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: DataPaginationProps) {
  if (totalPages <= 1) return null;

  // Fungsi untuk menentukan halaman mana saja yang ditampilkan (termasuk logika Ellipsis)
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    
    if (totalPages <= 7) {
      // Jika halaman sedikit, tampilkan semua
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Jika halaman banyak, tampilkan halaman awal, akhir, dan sekitar halaman aktif
      pages.push(1);
      
      if (currentPage > 3) pages.push("ellipsis");
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (currentPage < totalPages - 2) pages.push("ellipsis");
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        {/* Tombol Previous */}
        <PaginationItem>
          <PaginationPrevious
            href={`page=${currentPage - 1}`}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className={
              currentPage <= 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {/* Nomor Halaman & Ellipsis */}
        {getPageNumbers().map((page, index) => {
          if (page === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={`?page=${page}`}
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
                className="text-card-foreground cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Tombol Next */}
        <PaginationItem>
          <PaginationNext
            href={`?page=${currentPage + 1}`}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={
              currentPage >= totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}