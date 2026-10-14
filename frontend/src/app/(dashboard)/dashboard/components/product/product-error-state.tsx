"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ApiError } from "@/lib/api-error";

const getTitle = (status: number | null): string => {
  switch (status) {
    case 401:
      return "Sesi berakhir";
    case 403:
      return "Akses ditolak";
    case 404:
      return "Endpoint tidak ditemukan";
    case 500:
      return "Server error";
    default:
      return "Gagal memuat data";
  }
};

type ProductErrorStateProps = {
  error: ApiError;
  onRetry?: () => void;
};

export function ProductErrorState({ error, onRetry }: ProductErrorStateProps) {
  const router = useRouter();
  const title = getTitle(error.status);

  return (
    <TableRow className="border-neutral-800">
      <TableCell colSpan={8} className="px-4 py-16 text-center">
        <div className="mx-auto flex max-w-sm flex-col items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-full bg-rose-500/10">
            <AlertCircle className="size-5 text-rose-400" />
          </div>
          <p className="text-sm font-medium text-rose-400">{title}</p>
          <p className="text-xs text-neutral-500">{error.message}</p>
          <div className="mt-2 flex gap-2">
            {error.status === 401 && (
              <Button size="sm" onClick={() => router.push("/login")}>
                Login ulang
              </Button>
            )}
            {onRetry && error.status !== 401 && (
              <Button size="sm" variant="outline" onClick={onRetry}>
                Coba lagi
              </Button>
            )}
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}