import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.ts";

import {
  getTodayMealPlan,
} from "../services/mealPlan.service.ts";

export async function getTodayMealPlanController(
  req: AuthRequest,
  res: Response
) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const mealPlan = await getTodayMealPlan(userId);

    return res.status(200).json({
      mealPlan,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to get today's meal plan",
    });
  }
}