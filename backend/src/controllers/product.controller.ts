import type { Request, Response } from "express";
import * as productService from "../services/product.service.js";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
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
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res
        .status(401)
        .json({ success: false, message: "Harap login terlebih dahulu" });
    }

    const idParam = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    // Periksa jika idParam undefined
    if (!idParam) {
      return res
        .status(400)
        .json({ success: false, message: "ID Produk tidak valid" });
    }

    const productId = parseInt(idParam, 10);
    const { is_liked } = req.body;

    const updatedProduct = await productService.UpdateProductLike(
      productId,
      is_liked,
    );

    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Gagal update like:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
