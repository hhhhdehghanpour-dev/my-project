import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.ts";

import {
  getDailyCaloriesController,
  getTargetCaloriesController,
} from "../controllers/calorie.controller.ts";

const router = Router();

router.get(
  "/calorie",
  authMiddleware,
  getDailyCaloriesController
);

router.get(
  "/calorie/target",
  authMiddleware,
  getTargetCaloriesController
);

export default router;