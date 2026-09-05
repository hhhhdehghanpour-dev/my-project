import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.ts";

import {
  createBodyCheckIn,
  getBodyCheckIns,
  getLatestBodyCheckIn,
} from "../services/bodyCheckIn.service.ts";

export async function createBodyCheckInController(
  req: AuthRequest,
  res: Response
) {
  try {
    const userId = req.userId;

    const {
      weight,
      waist,
      bodyFat,
      note,
    } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (weight === undefined) {
      return res.status(400).json({
        message: "weight is required",
      });
    }

    if (
      typeof weight !== "number" ||
      weight <= 0
    ) {
      return res.status(400).json({
        message: "weight must be a valid positive number",
      });
    }

    if (
      waist !== undefined &&
      (typeof waist !== "number" || waist <= 0)
    ) {
      return res.status(400).json({
        message: "waist must be a valid positive number",
      });
    }

    if (
      bodyFat !== undefined &&
      (typeof bodyFat !== "number" ||
        bodyFat < 0 ||
        bodyFat > 100)
    ) {
      return res.status(400).json({
        message: "bodyFat must be a number between 0 and 100",
      });
    }

    if (
      note !== undefined &&
      typeof note !== "string"
    ) {
      return res.status(400).json({
        message: "note must be a string",
      });
    }

    const checkIn = await createBodyCheckIn(
      userId,
      weight,
      waist,
      bodyFat,
      note
    );

    return res.status(201).json({
      message: "Body check-in created successfully",
      checkIn,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create body check-in",
    });
  }
}

export async function getBodyCheckInsController(
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

    const checkIns = await getBodyCheckIns(userId);

    return res.status(200).json({
      checkIns,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to get body check-ins",
    });
  }
}

export async function getLatestBodyCheckInController(
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

    const checkIn = await getLatestBodyCheckIn(userId);

    if (!checkIn) {
      return res.status(404).json({
        message: "No body check-in found",
      });
    }

    return res.status(200).json({
      checkIn,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to get latest body check-in",
    });
  }
}