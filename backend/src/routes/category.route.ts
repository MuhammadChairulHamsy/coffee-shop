import { Router, type IRouter } from "express";
import {
  getCategories,
  createCategory,
} from "../controllers/category.controller.js";
import { requireAuth } from "../middlewares/require-auth.js";
import { validate } from "../middlewares/validate.js";
import {
  createCategoryBodySchema,
  listCategoriesQuerySchema,
} from "../schemas/category.schema.js";

const router: IRouter = Router();

router.get("/", validate({ query: listCategoriesQuerySchema }), getCategories);
router.post(
  "/",
  requireAuth,
  validate({ body: createCategoryBodySchema }),
  createCategory,
);

export { router as categoryRouter };