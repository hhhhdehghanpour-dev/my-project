import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.ts";

import {
  calculateBMI,
} from "../services/bmi.service.ts";

export async function getBMIController(
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

    const result = await calculateBMI(userId);

    return res.status(200).json({
      message: "BMI calculated successfully",
      result,
    });
  } catch (error) {
    console.error(error);

    if (
      error instanceof Error &&
      error.message === "Profile not found"
    ) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    return res.status(500).json({
      message: "Failed to calculate BMI",
    });
  }
}