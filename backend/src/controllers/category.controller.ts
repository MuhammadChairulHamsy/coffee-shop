import type { Request, Response, NextFunction } from "express";
import * as categoryService from "../services/category.service.js";
import type {
  ListCategoriesQuery,
  CreateCategoryBody,
  UpdateCategoryBody,
} from "../schemas/category.schema.js";

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = req.validated!.query as ListCategoriesQuery;
    const category = await categoryService.getAllCategories(query);
    res.status(200).json({ success: true, ...category });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.validated!.params as { id: number };
    const category = await categoryService.getCategoryById(id);
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.validated!.body as CreateCategoryBody;
    const category = await categoryService.createCategory(body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.validated!.params as { id: number };
    const body = req.validated!.body as UpdateCategoryBody;
    const category = await categoryService.updateCategory(id, body);
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.validated!.params as {id: number};
    await categoryService.deleteCategory(id);
    res.status(200).json({success: true, message: "Category berhasil dihapus"})
  } catch (error) {
    next(error);
  }
}
