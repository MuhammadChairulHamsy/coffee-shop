"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useCreateProduct, useUpdateProduct } from "@/hooks/use-products";
import { toApiError } from "@/lib/api-error";
import {
  formSchema,
  type FormInput,
  type FormOutput,
  type Product,
} from "@/schemas/product.schema";
import { ImageUpload } from "./image-upload";

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
  }, [open, product?.id]);

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = form.handleSubmit(async (values) => {
    console.log("🔴 [Submit] Values:", values);
    try {
      if (isEdit && product) {
        await updateMutation.mutateAsync({ id: product.id, payload: values });
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
          <DialogTitle>
            {isEdit ? "Edit Produk" : "Tambah Produk Baru"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Perbarui informasi produk di bawah ini."
              : "Isi informasi produk yang ingin ditambahkan."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* ---------- Nama ---------- */}
          <Field data-invalid={!!form.formState.errors.name}>
            <FieldLabel htmlFor="name">
              Nama Produk <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="name"
              placeholder="Ethiopia Guji Highland"
              aria-invalid={!!form.formState.errors.name}
              {...form.register("name")}
            />
            <FieldError errors={[form.formState.errors.name]} />
          </Field>

          {/* ---------- Deskripsi ---------- */}
          <Field>
            <FieldLabel htmlFor="description">Deskripsi</FieldLabel>
            <Textarea
              id="description"
              placeholder="Floral, Bergamot, Peach..."
              rows={3}
              {...form.register("description")}
            />
          </Field>

          {/* ---------- Harga ---------- */}
          <Field data-invalid={!!form.formState.errors.price}>
            <FieldLabel htmlFor="price">
              Harga (IDR) <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="price"
              type="number"
              min={0}
              placeholder="145000"
              aria-invalid={!!form.formState.errors.price}
              {...form.register("price")}
            />
            <FieldError errors={[form.formState.errors.price]} />
          </Field>

          {/* ---------- Type & Category ---------- */}
          <div className="grid grid-cols-2 gap-3">
            <Field data-invalid={!!form.formState.errors.type}>
              <FieldLabel htmlFor="type">
                Type <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="type"
                placeholder="Filter Roast"
                aria-invalid={!!form.formState.errors.type}
                {...form.register("type")}
              />
              <FieldError errors={[form.formState.errors.type]} />
            </Field>

            <Field data-invalid={!!form.formState.errors.category}>
              <FieldLabel htmlFor="category">
                Category <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="category"
                placeholder="Single Origin"
                aria-invalid={!!form.formState.errors.category}
                {...form.register("category")}
              />
              <FieldError errors={[form.formState.errors.category]} />
            </Field>
          </div>

          {/* ---------- URL Gambar ---------- */}
         <Field data-invalid={!!form.formState.errors.imageUrl}>
            <FieldLabel>Gambar Produk</FieldLabel>
            <ImageUpload
              value={form.watch("imageUrl") ?? null}
              onChange={(url) => {
                console.log("🟡 [Form] URL dari ImageUpload:", url);
                form.setValue("imageUrl", url ?? "", {
                  shouldValidate: true,
                  shouldDirty: true,   // ⬅️ tandai form sebagai dirty
                });
                console.log(
                  "🟢 [Form] form.imageUrl sekarang:",
                  form.getValues("imageUrl"),
                );
              }}
            />
            <FieldError errors={[form.formState.errors.imageUrl]} />
          </Field>

          {/* ---------- is_special ---------- */}
          <Field orientation="horizontal">
            <Checkbox
              id="is_special"
              checked={form.watch("is_special")}
              onCheckedChange={(checked) =>
                form.setValue("is_special", Boolean(checked))
              }
            />
            <FieldLabel
              htmlFor="is_special"
              className="cursor-pointer font-normal"
            >
              Tandai sebagai produk special
            </FieldLabel>
          </Field>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="default"
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
