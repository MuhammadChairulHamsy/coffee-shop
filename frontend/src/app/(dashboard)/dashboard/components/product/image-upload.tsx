"use client";

import * as React from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ImageUploadProps = {
  value?: string | null;
  onChange: (url: string | null) => void;
};

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [preview, setPreview] = React.useState<string | null>(value ?? null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const blobUrlRef = React.useRef<string | null>(null);   // ⬅️ track blob URL

  // Sync dengan value dari luar
  React.useEffect(() => {
    setPreview(value ?? null);
  }, [value]);

  // Cleanup blob URL saat unmount
  React.useEffect(() => {
    return () => {
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    };
  }, []);

  const handleFile = async (file: File) => {
    // Bersihkan blob URL lama
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }

    // Preview lokal
    const localPreview = URL.createObjectURL(file);
    blobUrlRef.current = localPreview;
    setPreview(localPreview);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message ?? "Upload gagal");
      }

      onChange(json.data.url);
      setPreview(json.data.url);

      // ✅ Cleanup blob URL setelah upload sukses (bukan di finally)
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }

      toast.success("Gambar berhasil diupload");
    } catch (error) {
      console.error("🔴 [ImageUpload] Error:", error);
      toast.error(error instanceof Error ? error.message : "Upload gagal");
      setPreview(value ?? null);

      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
  };

  return (
    <div className="space-y-3">
      {preview ? (
        <div className="relative aspect-square w-full max-w-48 overflow-hidden rounded-lg border border-neutral-800">
          <Image
            src={preview}
            alt="Preview"
            width={400}
            height={400}
            unoptimized={preview.startsWith("blob:")}
            className="object-cover"
          />
          <Button
            type="button"
            size="icon"
            variant="destructive"
            onClick={handleRemove}
            className="absolute right-2 top-2 size-7"
          >
            <X className="size-4" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="flex aspect-square w-full max-w-36 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-neutral-800 text-neutral-500 transition-colors hover:border-neutral-700 hover:text-neutral-400 cursor-pointer"
        >
          {isUploading ? (
            <>
              <Loader2 className="size-6 animate-spin" />
              <span className="text-xs">Mengupload...</span>
            </>
          ) : (
            <>
              <Upload className="size-6" />
              <span className="text-xs">Pilih gambar</span>
              <span className="text-[10px]">JPG, PNG, WebP — max 5MB</span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}