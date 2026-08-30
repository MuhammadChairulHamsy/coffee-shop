import { Router } from "express";
import { 
  getSpecialProducts, 
  getLatestProducts, 
  toggleLike 
} from "../controllers/product.controller";

const productRouter = Router();

productRouter.get("/special", getSpecialProducts);
productRouter.get("/latest", getLatestProducts);

productRouter.patch("/:id/like", toggleLike);

export { productRouter };