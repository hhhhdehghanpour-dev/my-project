import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.ts";

import {
  createFoodLogController,
  getFoodLogsController,
  getTodayFoodLogsController,
} from "../controllers/foodLog.controller.ts";

const router = Router();

router.post(
  "/food-logs",
  authMiddleware,
  createFoodLogController
);

router.get(
  "/food-logs",
  authMiddleware,
  getFoodLogsController
);

router.get(
  "/food-logs/today",
  authMiddleware,
  getTodayFoodLogsController
);

export default router;