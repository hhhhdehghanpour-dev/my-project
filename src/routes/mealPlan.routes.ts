import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.ts";

import {
  getTodayMealPlanController,
} from "../controllers/mealPlan.controller.ts";

const router = Router();

router.get(
  "/meal-plan/today",
  authMiddleware,
  getTodayMealPlanController
);

export default router;