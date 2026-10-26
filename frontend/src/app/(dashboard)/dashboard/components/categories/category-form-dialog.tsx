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
import { useCreateCategory, useUpdateCategory } from "@/hooks/use-products";
import { toast } from "sonner";
import { toApiError } from "@/lib/api-error";
import {
  categoryFormSchema,
  type CategoryFormValues,
  type CategoryStats
} from "@/schemas/category.schema";

type CategoryFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: CategoryStats | null; // ✅ Konsisten pakai 'category'
};

export function CategoryFormDialog({
  open,
  onOpenChange,
  category,
}: CategoryFormDialogProps) {
  const isEdit = Boolean(category);
  const createMutation = useCreateCategory();
  // Asumsi kamu sudah membuat useUpdateCategory di hooks
  const updateMutation = useUpdateCategory();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: { name: "", description: "" },
  });

  // ✅ Sinkronisasi data saat mode Edit dibuka
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
        // TODO: Panggil updateMutation
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
          <div className="space-y-1.5">
            <Label htmlFor="name">Nama Kategori *</Label>
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

          <div className="space-y-1.5">
            <Label htmlFor="description">Deskripsi (Opsional)</Label>
            <Textarea
              id="description"
              placeholder="Deskripsi singkat kategori..."
              rows={3}
              {...form.register("description")}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
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
