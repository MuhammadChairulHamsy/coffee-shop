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
import { useDeleteCategory } from "@/hooks/use-products";
import { toApiError } from "@/lib/api-error";
import { CategoryStats } from "@/schemas/category.schema";

type CategoryDeleteDialogProps = {
  category: CategoryStats | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CategoryDeleteDialog({
  category,
  open,
  onOpenChange,
}: CategoryDeleteDialogProps) {
  const deleteMutation = useDeleteCategory();

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!category) return;

    try {
      await deleteMutation.mutateAsync(category.id);
      toast.success("Category berhasil dihapus");
      onOpenChange(false);
    } catch (error) {
      toast.error(toApiError(error).message);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Category?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus category{" "}
            <b className="text-foreground">{category?.name}</b>? Tindakan ini
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
