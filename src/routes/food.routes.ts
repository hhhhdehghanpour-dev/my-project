import { Router } from "express";

import {
  createFoodController,
  getFoodsController,
} from "../controllers/food.controller.ts";

const router = Router();

router.post(
  "/foods",
  createFoodController
);

router.get(
  "/foods",
  getFoodsController
);

export default router;