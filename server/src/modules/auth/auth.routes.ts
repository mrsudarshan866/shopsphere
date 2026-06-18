import { Router } from "express";
import {
  register,
  login,
  logout,
  getProfile,
  refreshToken,
} from "./auth.controller";

import { protect } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);

router.get("/profile", protect, getProfile);

export default router;
