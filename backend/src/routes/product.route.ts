import { Router, type IRouter } from "express";
import {
  getAllProducts,
  getLatestProducts,
  getSpecialProducts,
  toggleLike,
} from "../controllers/product.controller.js";
import { requireAuth } from "../middlewares/require-auth.js";
import { validate } from "../middlewares/validate.js";
import {
  listProductsQuerySchema,
  productIdParamSchema,
  toggleLikeBodySchema,
} from "../schemas/product.schema.js";

const router: IRouter = Router();

router.get("/", getAllProducts);
router.get("/special", getSpecialProducts);
router.get("/latest", getLatestProducts);

router.get("/", validate({ query: listProductsQuerySchema }), getAllProducts);
router.get("/", validate({ query: listProductsQuerySchema }), getAllProducts);

router.patch(
  "/:id/like",
  requireAuth,
  validate({ params: productIdParamSchema, body: toggleLikeBodySchema }),
  toggleLike,
);

export { router };
