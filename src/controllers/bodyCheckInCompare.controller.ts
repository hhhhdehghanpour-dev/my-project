import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.ts";

import {
  compareBodyCheckIns,
} from "../services/bodyCheckInCompare.service.ts";

export async function compareBodyCheckInsController(
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

    const comparison = await compareBodyCheckIns(userId);

    if (!comparison) {
      return res.status(404).json({
        message:
          "At least two body check-ins are required for comparison",
      });
    }

    return res.status(200).json({
      message: "Body check-ins compared successfully",
      comparison,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to compare body check-ins",
    });
  }
}