"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useDeleteProduct } from "@/hooks/use-products";
import { toApiError } from "@/lib/api-error";
import type { Product } from "@/schemas/product.schema";

type ProductDeleteDialogProps = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProductDeleteDialog({
  product,
  open,
  onOpenChange,
}: ProductDeleteDialogProps) {
  const deleteMutation = useDeleteProduct();

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product) return;

    try {
      await deleteMutation.mutateAsync(product.id);
      toast.success("Produk berhasil dihapus");
      onOpenChange(false);
    } catch (error) {
      toast.error(toApiError(error).message);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Produk?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus produk{" "}
            <b className="text-foreground">{product?.name}</b>? Tindakan ini
            tidak bisa dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={deleteMutation.isPending}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {deleteMutation.isPending ? "Menghapus..." : "Ya, Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}