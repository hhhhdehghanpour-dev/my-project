import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.ts";

import { getDashboard } from "../services/dashboard.service.ts";

export async function getDashboardController(
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

    const dashboard = await getDashboard(userId);

    return res.status(200).json({
      dashboard,
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
      message: "Failed to get dashboard",
    });
  }
}