import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.ts";

import {
  createWaterLogController,
  getWaterLogsController,
  getTodayWaterLogsController,
} from "../controllers/water.controller.ts";

const router = Router();

router.post(
  "/water",
  authMiddleware,
  createWaterLogController
);

router.get(
  "/water",
  authMiddleware,
  getWaterLogsController
);

router.get(
  "/water/today",
  authMiddleware,
  getTodayWaterLogsController
);

export default router;