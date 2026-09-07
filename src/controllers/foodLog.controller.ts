import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.ts";

import {
  createFoodLog,
  getFoodLogs,
  getTodayFoodLogs,
  MEAL_TYPES,
} from "../services/foodLog.service.ts";

export async function createFoodLogController(
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

    const {
      foodId,
      name,
      meal,
      quantity,
      calories,
      protein,
      carbohydrates,
      fat,
    } = req.body;

    if (
      name === undefined ||
      meal === undefined ||
      quantity === undefined ||
      calories === undefined ||
      protein === undefined ||
      carbohydrates === undefined ||
      fat === undefined
    ) {
      return res.status(400).json({
        message:
          "name, meal, quantity, calories, protein, carbohydrates and fat are required",
      });
    }

    if (
      typeof name !== "string" ||
      name.trim().length === 0
    ) {
      return res.status(400).json({
        message: "name must be a valid string",
      });
    }

    if (
      typeof meal !== "string" ||
      !MEAL_TYPES.includes(
        meal as (typeof MEAL_TYPES)[number]
      )
    ) {
      return res.status(400).json({
        message: "Invalid meal type",
        allowedMeals: MEAL_TYPES,
      });
    }

    if (
      typeof quantity !== "number" ||
      quantity <= 0
    ) {
      return res.status(400).json({
        message:
          "quantity must be a valid positive number",
      });
    }

    if (
      typeof calories !== "number" ||
      calories < 0
    ) {
      return res.status(400).json({
        message:
          "calories must be a valid non-negative number",
      });
    }

    if (
      typeof protein !== "number" ||
      protein < 0
    ) {
      return res.status(400).json({
        message:
          "protein must be a valid non-negative number",
      });
    }

    if (
      typeof carbohydrates !== "number" ||
      carbohydrates < 0
    ) {
      return res.status(400).json({
        message:
          "carbohydrates must be a valid non-negative number",
      });
    }

    if (
      typeof fat !== "number" ||
      fat < 0
    ) {
      return res.status(400).json({
        message:
          "fat must be a valid non-negative number",
      });
    }

    if (
      foodId !== undefined &&
      (
        typeof foodId !== "number" ||
        !Number.isInteger(foodId) ||
        foodId <= 0
      )
    ) {
      return res.status(400).json({
        message: "foodId must be a valid positive integer",
      });
    }

    const foodLog = await createFoodLog(
      userId,
      foodId,
      name.trim(),
      meal,
      quantity,
      calories,
      protein,
      carbohydrates,
      fat
    );

    return res.status(201).json({
      message: "Food log created successfully",
      foodLog,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create food log",
    });
  }
}

export async function getFoodLogsController(
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

    const foodLogs = await getFoodLogs(userId);

    return res.status(200).json({
      foodLogs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to get food logs",
    });
  }
}

export async function getTodayFoodLogsController(
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

    const foodLogs = await getTodayFoodLogs(userId);

    return res.status(200).json({
      foodLogs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to get today's food logs",
    });
  }
}