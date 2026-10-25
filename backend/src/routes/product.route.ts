import { Router, type IRouter } from "express";
import {
  getAllProducts,
  getCategories,
  getLatestProducts,
  getSpecialProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProduct,
  toggleLike,
} from "../controllers/product.controller.js";
import { requireAuth } from "../middlewares/require-auth.js";
import { validate } from "../middlewares/validate.js";
import {
  createProductBodySchema,
  listCategoriesQuerySchema,
  listProductsQuerySchema,
  productIdParamSchema,
  toggleLikeBodySchema,
  updateProductBodySchema,
} from "../schemas/product.schema.js";

const router: IRouter = Router();

router.get("/", validate({ query: listProductsQuerySchema }), getAllProducts);
router.get("/latest", getLatestProducts);
router.get("/special", getSpecialProducts);
router.get(
  "/categories",
  validate({ query: listCategoriesQuerySchema }),
  getCategories
);
router.get("/:id", validate({ params: productIdParamSchema }), getProductById);

router.post(
  "/",
  requireAuth,
  validate({ body: createProductBodySchema }),
  createProduct,
);

router.patch(
  "/:id",
  requireAuth,
  validate({ params: productIdParamSchema, body: updateProductBodySchema }),
  updateProduct,
);

router.delete(
  "/:id",
  requireAuth,
  validate({ params: productIdParamSchema }),
  deleteProduct,
);

router.patch(
  "/:id/like",
  requireAuth,
  validate({ params: productIdParamSchema, body: toggleLikeBodySchema }),
  toggleLike,
);

export { router };
