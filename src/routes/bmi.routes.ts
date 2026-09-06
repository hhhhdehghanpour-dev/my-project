import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware.ts";

import {
  getBMIController,
} from "../controllers/bmi.controller.ts";

const router = Router();

router.get(
  "/bmi",
  authMiddleware,
  getBMIController
);

export default router;