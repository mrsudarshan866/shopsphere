import { Router } from "express";

import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "./cart.controller";

import { protect } from "../../middlewares/auth.middleware";

const router = Router();

router.use(protect);

router.get("/", getCart);

router.post("/add", addToCart);

router.put("/:productId", updateCartItem);

router.delete("/:productId", removeCartItem);

router.delete("/clear/all", clearCart);

export default router;
