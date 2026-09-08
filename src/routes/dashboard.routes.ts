import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.ts";

import {
  getDashboardController,
} from "../controllers/dashboard.controller.ts";

const router = Router();

router.get(
  "/dashboard",
  authMiddleware,
  getDashboardController
);

export default router;