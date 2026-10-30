"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreateCategory, useUpdateCategory } from "@/hooks/use-categories";
import { toast } from "sonner";
import { toApiError } from "@/lib/api-error";
import {
  categoryFormSchema,
  type CategoryFormValues,
  type CategoryStats,
} from "@/schemas/category.schema";

type CategoryFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: CategoryStats | null;
};

export function CategoryFormDialog({
  open,
  onOpenChange,
  category,
}: CategoryFormDialogProps) {
  const isEdit = Boolean(category);
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();

  // ✅ Form hanya mengurus name dan description
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  React.useEffect(() => {
    if (open) {
      form.reset({
        name: category?.name ?? "",
        description: category?.description ?? "",
      });
    }
  }, [open, category, form]);

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (isEdit && category) {
        await updateMutation.mutateAsync({ id: category.id, payload: values });
        toast.success("Kategori berhasil diperbarui");
      } else {
        await createMutation.mutateAsync(values);
        toast.success("Kategori berhasil ditambahkan");
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(toApiError(error).message);
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Kategori" : "Tambah Kategori Baru"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Perbarui nama atau deskripsi kategori."
              : "Buat kategori baru untuk mengelompokkan produk."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Field Nama */}
          <div className="space-y-1.5">
            <Label htmlFor="name">
              Nama Kategori <span className="text-rose-400">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Contoh: Merchandise"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-xs text-rose-400">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Field Deskripsi */}
          <div className="space-y-1.5">
            <Label htmlFor="description">Deskripsi (Opsional)</Label>
            <Textarea
              id="description"
              placeholder="Deskripsi singkat kategori..."
              rows={3}
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="text-xs text-rose-400">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          {/* Info: productCount dan totalValue tidak bisa diinput */}
          {isEdit && category && (
            <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-3 text-xs text-neutral-400">
              <p>
                Jumlah Produk: <strong>{category.productCount}</strong>
              </p>
              <p>
                Status: <strong>{category.status === "active" ? "Active" : "Empty"}</strong>
              </p>
              <p className="mt-1 text-[10px] text-neutral-500">
                *Angka di atas dihitung otomatis dari data produk.
              </p>
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="default"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}