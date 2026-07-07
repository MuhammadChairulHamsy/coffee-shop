// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center ">
      <span className="text-6xl">☕</span>

      <h1 className="mt-6 font-playfair text-primary text-4xl font-bold tracking-tight">
        404 — Kopi Ini Tidak Ditemukan
      </h1>

      <p className="mt-3 max-w-md font-inter text-muted-foreground">
        Sepertinya menu atau halaman yang Anda cari sudah habis diseduh.
        Yuk, kembali ke meja kasir dan pilih menu lain.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:bg-primary/90"
      >
        Kembali ke Beranda
      </Link>

      <Link
        href="/menu"
        className="mt-3 text-sm text-foreground underline underline-offset-4 hover:text-foreground/90"
      >
        Lihat Menu Kami
      </Link>
    </div>
  )
}