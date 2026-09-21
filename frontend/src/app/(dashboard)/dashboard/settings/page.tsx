export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pengaturan Toko</h1>
        <p className="text-sm text-muted-foreground">
          Konfigurasi profil toko, metode pembayaran, dan integrasi API.
        </p>
      </div>
      <div className="rounded-lg border border-border p-8 text-center text-muted-foreground">
        Form pengaturan toko akan ditampilkan di sini.
      </div>
    </div>
  );
}