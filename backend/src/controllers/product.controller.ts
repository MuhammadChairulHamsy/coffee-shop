import type { Request, Response, NextFunction } from "express";
import * as productService from "../services/product.service.js";
import type { CreateProductBody, ListProductsQuery, listCategoriesQuery, ToggleLikeBody, UpdateProductBody } from "../schemas/product.schema.js";


export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = req.validated!.query as ListProductsQuery;
    const result = await productService.getAllProducts(query);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search } = req.validated!.query as listCategoriesQuery;
    const categories = await productService.getAllCategories(search);
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.validated!.params as { id: number };
    const product = await productService.getProductById(id);
    res.status(200).json({ success: true, data: product });
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

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.validated!.body as CreateProductBody;
    const product = await productService.createProduct(body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.validated!.params as { id: number };
    const body = req.validated!.body as UpdateProductBody;
    const product = await productService.updateProduct(id, body);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};


export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.validated!.params as { id: number };
    await productService.deleteProduct(id);
    res.status(200).json({ success: true, message: "Produk berhasil dihapus" });
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