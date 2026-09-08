import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.ts";

import {
  createWaterLog,
  getWaterLogs,
  getTodayWaterLogs,
  getTodayWaterTotal,
} from "../services/water.service.ts";

export async function createWaterLogController(
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

    const { amount } = req.body;

    if (amount === undefined) {
      return res.status(400).json({
        message: "amount is required",
      });
    }

    if (
      typeof amount !== "number" ||
      !Number.isInteger(amount) ||
      amount <= 0
    ) {
      return res.status(400).json({
        message: "amount must be a positive integer in milliliters",
      });
    }

    const waterLog = await createWaterLog(
      userId,
      amount
    );

    return res.status(201).json({
      message: "Water log created successfully",
      waterLog,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create water log",
    });
  }
}

export async function getWaterLogsController(
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

    const waterLogs = await getWaterLogs(userId);

    return res.status(200).json({
      waterLogs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to get water logs",
    });
  }
}

export async function getTodayWaterLogsController(
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

    const waterLogs = await getTodayWaterLogs(userId);
    const totalAmount = await getTodayWaterTotal(userId);

    return res.status(200).json({
      totalAmount,
      waterLogs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to get today's water logs",
    });
  }
}