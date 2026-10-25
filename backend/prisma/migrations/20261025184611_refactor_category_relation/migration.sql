/*
  Warnings:

  - You are about to drop the column `category` on the `Products` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- 1. Hapus Index lama
DROP INDEX "Products_category_idx";

-- 2. Buat tabel Category terlebih dahulu
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- 3. Tambahkan UNIQUE INDEX untuk nama kategori
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- 4. Pindahkan data kategori unik dari tabel Products ke tabel Category
--    (NOW() digunakan untuk mengisi updatedAt secara otomatis)
INSERT INTO "Category" ("name", "updatedAt")
SELECT DISTINCT "category", NOW() FROM "Products";

-- 5. Tambahkan kolom categoryId ke tabel Products (sebagai NULLABLE dulu)
ALTER TABLE "Products" ADD COLUMN "categoryId" INTEGER;

-- 6. Isi categoryId dengan ID dari tabel Category yang baru saja dibuat
UPDATE "Products" p
SET "categoryId" = c."id"
FROM "Category" c
WHERE p."category" = c."name";

-- 7. Setelah data terisi, baru hapus kolom lama "category"
ALTER TABLE "Products" DROP COLUMN "category";

-- 8. Ubah categoryId menjadi NOT NULL (karena semua baris sudah terisi)
ALTER TABLE "Products" ALTER COLUMN "categoryId" SET NOT NULL;

-- 9. Buat Index dan Foreign Key untuk relasi
CREATE INDEX "Products_categoryId_idx" ON "Products"("categoryId");

ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_fkey" 
FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;