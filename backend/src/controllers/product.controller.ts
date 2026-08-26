import { Request, Response } from "express";
import * as productService from "../services/product.service";

export const getProduct = async (Req: Request, res: Response) => {
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
