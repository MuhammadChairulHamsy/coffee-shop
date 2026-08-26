import { Router } from "express";
import { prisma } from "../lib/prisma";
import { auth } from "../lib/auth"; // Import konfigurasi Better Auth-mu
import { fromNodeHeaders } from "better-auth/node";

const productRouter = Router();

// Endpoint untuk melakukan Like/Unlike
productRouter.patch("/:id/like", async (req, res) => {
  try {
    // 1. Cek apakah user sudah login dengan mengecek token dari header request
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // 2. Ambil data dari request
    const productId = parseInt(req.params.id);
    const { is_liked } = req.body;

    // 3. Update database menggunakan Prisma
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { is_liked },
    });

    res.json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Gagal update like:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export { productRouter };