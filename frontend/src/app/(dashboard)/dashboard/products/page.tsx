export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Katalog Produk</h1>
          <p className="text-sm text-muted-foreground">
            Kelola stok, harga, dan daftar produk kopi Coffeo.
          </p>
        </div>
      </div>
      {/* Tempat komponen tabel/list produk */}
      <div className="rounded-lg border border-border p-8 text-center text-muted-foreground">
        Tabel daftar produk akan ditampilkan di sini.
      </div>
    </div>
  );
}