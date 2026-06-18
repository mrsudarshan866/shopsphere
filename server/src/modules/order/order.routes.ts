import { Router } from "express";

import {
  createOrder,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
  analytics,
} from "./order.controller";

import { protect } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post("/", protect, createOrder);

router.get("/my-orders", protect, getMyOrders);

router.get("/analytics", protect, authorize("admin"), analytics);

router.get("/admin/all", protect, authorize("admin"), getAllOrders);

router.put("/:id/status", protect, authorize("admin"), updateOrderStatus);

router.get("/:id", protect, getOrder);

export default router;
