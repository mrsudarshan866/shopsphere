import { Router } from "express";

import { createPaymentOrder, verifyPayment } from "./payment.controller";

import { protect } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/create-order", protect, createPaymentOrder);

router.post("/verify", protect, verifyPayment);

export default router;
