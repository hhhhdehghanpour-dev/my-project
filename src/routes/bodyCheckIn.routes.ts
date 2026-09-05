import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.ts";

import {
  createBodyCheckInController,
  getBodyCheckInsController,
  getLatestBodyCheckInController,
} from "../controllers/bodyCheckIn.controller.ts";

const router = Router();

router.post(
  "/body-check-in",
  authMiddleware,
  createBodyCheckInController
);

router.get(
  "/body-check-in",
  authMiddleware,
  getBodyCheckInsController
);

router.get(
  "/body-check-in/latest",
  authMiddleware,
  getLatestBodyCheckInController
);

export default router;