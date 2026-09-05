import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.ts";

import {
  createProfile,
  getProfile,
  updateProfile,
} from "../services/profile.service.ts";

export async function createProfileController(
  req: AuthRequest,
  res: Response
) {
  try {
    const userId = req.userId;

    const {
      age,
      gender,
      height,
      weight,
      targetWeight,
      waist,
      bodyFat,
      weightChangeSpeed,
    } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const profile = await createProfile(
      userId,
      age,
      gender,
      height,
      weight,
      targetWeight,
      waist,
      bodyFat,
      weightChangeSpeed
    );

    return res.status(201).json({
      message: "Profile created successfully",
      profile,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create profile",
    });
  }
}

export async function getProfileController(
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

    const profile = await getProfile(userId);

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to get profile",
    });
  }
}

export async function updateProfileController(
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
      age,
      gender,
      height,
      weight,
      targetWeight,
      waist,
      bodyFat,
      weightChangeSpeed,
    } = req.body;

    if (
      age === undefined ||
      gender === undefined ||
      height === undefined ||
      weight === undefined ||
      targetWeight === undefined
    ) {
      return res.status(400).json({
        message:
          "age, gender, height, weight and targetWeight are required",
      });
    }

    const profile = await updateProfile(
      userId,
      age,
      gender,
      height,
      weight,
      targetWeight,
      waist,
      bodyFat,
      weightChangeSpeed
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update profile",
    });
  }
}