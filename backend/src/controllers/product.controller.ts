import type { Request, Response, NextFunction } from "express";
import * as productService from "../services/product.service.js";
import type { ToggleLikeBody } from "../schemas/product.schema.js";

export const getAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await productService.getAllProducts();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getSpecialProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await productService.getSpecialProducts();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getLatestProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await productService.getLatestProducts();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const toggleLike = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.validated!.params as { id: number };
    const { is_liked } = (req.validated!.body ?? {}) as ToggleLikeBody;

    const updated =
      typeof is_liked === "boolean"
        ? await productService.setProductLike(id, is_liked)
        : await productService.toggleProductLike(id);

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};