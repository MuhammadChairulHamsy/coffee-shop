"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateProduct, useUpdateProduct } from "@/hooks/use-products";
import { toApiError } from "@/lib/api-error";
import type { Product } from "@/schemas/product.schema";

/* ---------- Form Schema ---------- */

const formSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(200),
  description: z.string().trim().max(2000).optional(),
  price: z.coerce.number().int().positive("Harga harus lebih dari 0"),
  type: z.string().trim().min(1, "Type wajib diisi").max(100),
  category: z.string().trim().min(1, "Category wajib diisi").max(100),
  imageUrl: z
    .string()
    .trim()
    .url("URL gambar tidak valid")
    .optional()
    .or(z.literal("")),
  is_special: z.boolean().default(false),
});

type FormInput = z.input<typeof formSchema>;
type FormOutput = z.output<typeof formSchema>;

/* ---------- Props ---------- */

type ProductFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
};

export function ProductFormDialog({
  open,
  onOpenChange,
  product,
}: ProductFormDialogProps) {
  const isEdit = Boolean(product);
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const form = useForm<FormInput, any, FormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      type: "",
      category: "",
      imageUrl: "",
      is_special: false,
    },
  });

  React.useEffect(() => {
    if (open) {
      form.reset({
        name: product?.name ?? "",
        description: product?.description ?? "",
        price: product?.price ?? 0,
        type: product?.type ?? "",
        category: product?.category ?? "",
        imageUrl: product?.imageUrl ?? "",
        is_special: product?.is_special ?? false,
      });
    }
  }, [open, product, form]);

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (isEdit && product) {
        await updateMutation.mutateAsync({
          id: product.id,
          payload: values,
        });
        toast.success("Produk berhasil diperbarui");
      } else {
        await createMutation.mutateAsync(values);
        toast.success("Produk berhasil ditambahkan");
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(toApiError(error).message);
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Produk" : "Tambah Produk Baru"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Perbarui informasi produk di bawah ini."
              : "Isi informasi produk yang ingin ditambahkan."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            label="Nama Produk"
            error={form.formState.errors.name?.message}
            required
          >
            <Input
              placeholder="Ethiopia Guji Highland"
              {...form.register("name")}
            />
          </FormField>

          <FormField label="Deskripsi">
            <Textarea
              placeholder="Floral, Bergamot, Peach..."
              rows={3}
              {...form.register("description")}
            />
          </FormField>

          <FormField
            label="Harga (IDR)"
            error={form.formState.errors.price?.message}
            required
          >
            <Input
              type="number"
              min={0}
              placeholder="145000"
              {...form.register("price")}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="Type"
              error={form.formState.errors.type?.message}
              required
            >
              <Input placeholder="Filter Roast" {...form.register("type")} />
            </FormField>

            <FormField
              label="Category"
              error={form.formState.errors.category?.message}
              required
            >
              <Input placeholder="Single Origin" {...form.register("category")} />
            </FormField>
          </div>

          <FormField
            label="URL Gambar"
            error={form.formState.errors.imageUrl?.message}
          >
            <Input
              type="url"
              placeholder="https://..."
              {...form.register("imageUrl")}
            />
          </FormField>

          <div className="flex items-center gap-2">
            <Checkbox
              id="is_special"
              checked={form.watch("is_special")}
              onCheckedChange={(checked) =>
                form.setValue("is_special", Boolean(checked))
              }
            />
            <Label htmlFor="is_special" className="cursor-pointer">
              Tandai sebagai produk special
            </Label>
          </div>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Batal
          </Button>
          <Button type="button" onClick={onSubmit} disabled={isPending}>
            {isPending
              ? "Menyimpan..."
              : isEdit
                ? "Simpan Perubahan"
                : "Tambah Produk"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- Sub-component: FormField ---------- */

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>
        {label} {required && <span className="text-rose-400">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
}