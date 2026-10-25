"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreateCategory } from "@/hooks/use-products";
import { toast } from "sonner";
import { formSchema } from "@/schemas/product.schema";


export function CategoryFormDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const createMutation = useCreateCategory();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", description: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await createMutation.mutateAsync(values);
      toast.success("Kategori berhasil ditambahkan");
      onOpenChange(false);
      form.reset();
    } catch {
      toast.error("Gagal menambahkan kategori");
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Tambah Kategori Baru</DialogTitle></DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Nama Kategori</Label>
            <Input placeholder="Contoh: Merchandise" {...form.register("name")} />
            {form.formState.errors.name && <p className="text-xs text-rose-400">{form.formState.errors.name.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label>Deskripsi (Opsional)</Label>
            <Textarea placeholder="Deskripsi singkat kategori..." {...form.register("description")} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
            <Button type="submit" disabled={createMutation.isPending}>Simpan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}