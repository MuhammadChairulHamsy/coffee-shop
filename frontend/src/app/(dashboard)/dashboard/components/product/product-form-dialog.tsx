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
import {
  useCategories,
  useCreateProduct,
  useUpdateProduct,
} from "@/hooks/use-products";
import { toApiError } from "@/lib/api-error";
import {
  formSchema,
  type FormInput,
  type FormOutput,
  type Product,
} from "@/schemas/product.schema";
import { ImageUpload } from "./image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const { categories } = useCategories();

  const form = useForm<FormInput, any, FormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      type: "",
      categoryId: undefined,
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
        categoryId: product?.categoryId ?? undefined,
        imageUrl: product?.imageUrl ?? "",
        is_special: product?.is_special ?? false,
      });
    }
  }, [open, product?.id]);

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = form.handleSubmit(async (values) => {
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
      <DialogContent
        className="
          w-[calc(100vw-2rem)] max-w-3xl
          sm:w-full sm:max-w-3xl
          max-h-[90vh] flex flex-col
          gap-4 p-4 sm:p-6
        "
      >
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

        {/* ============ FORM: responsive ============ */}
        <form
          onSubmit={onSubmit}
          className="
            flex flex-col gap-5
            md:flex-row md:gap-6
            flex-1 overflow-y-auto pr-1
            lg:overflow-hidden
          "
        >
          {/* ============ KOLOM KIRI: Info Teks ============ */}
          <div className="flex flex-1 flex-col gap-4 min-w-0">
            {/* Nama */}
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="name">
                Nama Produk <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="name"
                placeholder="Ethiopia Guji Highland"
                aria-invalid={!!form.formState.errors.name}
                autoFocus
                {...form.register("name")}
              />
              <FieldError errors={[form.formState.errors.name]} />
            </Field>

            {/* Type + Category — 1 kolom di mobile, 2 kolom di sm+ */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

              <Field data-invalid={!!form.formState.errors.categoryId}>
                <FieldLabel htmlFor="categoryId">
                  Kategori <span className="text-destructive">*</span>
                </FieldLabel>
                <Select
                  value={
                    form.watch("categoryId") !== undefined
                      ? String(form.watch("categoryId"))
                      : undefined
                  }
                  onValueChange={(value) => {
                    form.setValue("categoryId", Number(value), {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                >
                  <SelectTrigger
                    aria-invalid={!!form.formState.errors.categoryId}
                  >
                    <SelectValue placeholder="Pilih kategori..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError errors={[form.formState.errors.categoryId]} />
              </Field>
            </div>

            {/* Harga */}
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

            {/* Deskripsi */}
            <Field>
              <FieldLabel htmlFor="description">Deskripsi</FieldLabel>
              <Textarea
                id="description"
                placeholder="Floral, Bergamot, Peach..."
                rows={3}
                {...form.register("description")}
              />
            </Field>

            {/* is_special */}
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
          </div>

          {/* ============ KOLOM KANAN: Gambar ============ */}
          <div
            className="
              flex flex-col gap-2
              w-full shrink-0
              md:w-52
            "
          >
            <FieldLabel>Gambar Produk</FieldLabel>
            <ImageUpload
              value={form.watch("imageUrl") ?? null}
              onChange={(url) => {
                form.setValue("imageUrl", url ?? "", {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
            {form.formState.errors.imageUrl && (
              <FieldError errors={[form.formState.errors.imageUrl]} />
            )}
          </div>
        </form>

        {/* ============ FOOTER: stack di mobile, row di sm+ ============ */}
        <DialogFooter
          className="
            flex-col-reverse gap-2
            sm:flex-row sm:justify-end
          "
        >
          <Button
            type="button"
            variant="default"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            Batal
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
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
