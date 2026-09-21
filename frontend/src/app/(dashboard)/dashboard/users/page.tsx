export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Kelola Pengguna</h1>
        <p className="text-sm text-muted-foreground">
          Kelola hak akses admin, staff, dan akun pelanggan terdaftar.
        </p>
      </div>
      <div className="rounded-lg border border-border p-8 text-center text-muted-foreground">
        Tabel pengguna akan ditampilkan di sini.
      </div>
    </div>
  );
}