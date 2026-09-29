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
  productIdParamSchema,
  toggleLikeBodySchema,
} from "../schemas/product.schema.js";

const router: IRouter = Router();

router.get("/", getAllProducts);
router.get("/special", getSpecialProducts);
router.get("/latest", getLatestProducts);

router.patch(
  "/:id/like",
  requireAuth,
  validate({ params: productIdParamSchema, body: toggleLikeBodySchema }),
  toggleLike,
);

export { router };