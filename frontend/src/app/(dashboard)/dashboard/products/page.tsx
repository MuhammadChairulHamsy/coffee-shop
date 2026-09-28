import { Button } from "@/components/ui/button";
import { Download, PlusIcon } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Katalog Produk Speciality
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola stok, harga, dan daftar produk kopi Coffeo.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <Button>
            <Download className="mr-1 size-4" />
            Export data
          </Button>
          <Button>
            <PlusIcon className="mr-1 size-4" />
            Tambah Product Baru
          </Button>
        </div>
      </div>
      {/* Tempat komponen tabel/list produk */}
      <div className="rounded-lg border border-border p-8 text-center text-muted-foreground">
        Tabel daftar produk akan ditampilkan di sini.
      </div>
    </div>
  );
}
