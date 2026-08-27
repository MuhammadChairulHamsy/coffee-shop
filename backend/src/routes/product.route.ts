import { Router } from "express";
import { prisma } from "../lib/prisma";
import { auth } from "../lib/auth"; 
import { fromNodeHeaders } from "better-auth/node";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const products = await prisma.products.findMany({
      orderBy: { id: "asc" },
    });
    res.json(products);
  } catch (error) {
    console.error("Failed to retrieve the product list:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

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
    const updatedProduct = await prisma.products.update({
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
