import { Request, Response } from "express";
import * as productService from "../services/product.service";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth"; 

export const getSpecialProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getSpecialProducts();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve coffee menu data",
    });
  }
};

export const getLatestProducts = async (req: Request, res: Response) => {
  try {
    const latests = await productService.getLatestProducts();
    res.status(200).json({
      success: true,
      data: latests,
    });
  } catch (error) {
    console.error("Error fetching latest products", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve coffee menu data",
    });
  }
};


export const toggleLike = async (req: Request, res: Response) => {
  try {
    // Cek sesi user dari Better Auth
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ success: false, message: "Harap login terlebih dahulu" });
    }

    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const productId = parseInt(idParam, 10);
    const { is_liked } = req.body;

    // Panggil service
    const updatedProduct = await productService.UpdateProductLike(productId, is_liked);

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Gagal update like:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};