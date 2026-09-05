import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.ts";

import {
  createProfileController,
  getProfileController,
  updateProfileController,
} from "../controllers/profile.controller.ts";

const router = Router();

router.post("/profile", authMiddleware, createProfileController);

router.get("/profile", authMiddleware, getProfileController);

router.put("/profile", authMiddleware, updateProfileController);

export default router;