import { Router, type IRouter } from "express";
import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { requireAuth } from "../middlewares/require-auth.js";
import { validate } from "../middlewares/validate.js";
import {
  categoryIdParamSchema,
  createCategoryBodySchema,
  listCategoriesQuerySchema,
  updateCategoryBodySchema,
} from "../schemas/category.schema.js";

const router: IRouter = Router();

router.get("/", validate({ query: listCategoriesQuerySchema }), getCategories);

router.get(
  "/:id",
  validate({ params: categoryIdParamSchema }),
  getCategoryById,
);

router.post(
  "/",
  requireAuth,
  validate({ body: createCategoryBodySchema }),
  createCategory,
);

router.patch(
  "/:id",
  requireAuth,
  validate({ params: categoryIdParamSchema, body: updateCategoryBodySchema }),
  updateCategory,
);

router.delete(
  "/:id",
  requireAuth,
  validate({ params: categoryIdParamSchema }),
  deleteCategory,
);

export { router as categoryRouter };
