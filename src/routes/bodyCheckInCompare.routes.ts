import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.ts";

import {
  compareBodyCheckInsController,
} from "../controllers/bodyCheckInCompare.controller.ts";

const router = Router();

router.get(
  "/body-check-in/compare",
  authMiddleware,
  compareBodyCheckInsController
);

export default router;