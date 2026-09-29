import { Router, type IRouter } from "express";
import { 
  getSpecialProducts, 
  getLatestProducts, 
  toggleLike, 
  getAllProducts
} from "../controllers/product.controller.js";

const router: IRouter = Router();

router.get("/", getAllProducts);
router.get("/special", getSpecialProducts);
router.get("/latest", getLatestProducts);
router.patch("/:id/like", toggleLike);

export { router };