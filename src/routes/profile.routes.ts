import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import {
  createProfileController,
  getProfileController,
} from "../controllers/profile.controller.ts";

const router = Router();

router.post("/profile", authMiddleware, createProfileController);

router.get("/profile", authMiddleware, getProfileController);

export default router;