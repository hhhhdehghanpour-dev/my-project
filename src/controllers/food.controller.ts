import { Request, Response } from "express";

import {
  createFood,
  getFoods,
  getFoodsByCategory,
  searchFoods,
  FOOD_CATEGORIES,
} from "../services/food.service.ts";

export async function createFoodController(
  req: Request,
  res: Response
) {
  try {
    const {
      name,
      category,
      calories,
      protein,
      carbohydrates,
      fat,
    } = req.body;

    if (
      name === undefined ||
      category === undefined ||
      calories === undefined ||
      protein === undefined ||
      carbohydrates === undefined ||
      fat === undefined
    ) {
      return res.status(400).json({
        message:
          "name, category, calories, protein, carbohydrates and fat are required",
      });
    }

    if (
      typeof name !== "string" ||
      name.trim().length === 0
    ) {
      return res.status(400).json({
        message: "name must be a valid string",
      });
    }

    if (
      typeof category !== "string" ||
      !FOOD_CATEGORIES.includes(
        category as (typeof FOOD_CATEGORIES)[number]
      )
    ) {
      return res.status(400).json({
        message: "Invalid food category",
        allowedCategories: FOOD_CATEGORIES,
      });
    }

    if (
      typeof calories !== "number" ||
      calories < 0
    ) {
      return res.status(400).json({
        message: "calories must be a valid non-negative number",
      });
    }

    if (
      typeof protein !== "number" ||
      protein < 0
    ) {
      return res.status(400).json({
        message: "protein must be a valid non-negative number",
      });
    }

    if (
      typeof carbohydrates !== "number" ||
      carbohydrates < 0
    ) {
      return res.status(400).json({
        message:
          "carbohydrates must be a valid non-negative number",
      });
    }

    if (
      typeof fat !== "number" ||
      fat < 0
    ) {
      return res.status(400).json({
        message: "fat must be a valid non-negative number",
      });
    }

    const food = await createFood(
      name.trim(),
      category,
      calories,
      protein,
      carbohydrates,
      fat
    );

    return res.status(201).json({
      message: "Food created successfully",
      food,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create food",
    });
  }
}

export async function getFoodsController(
  req: Request,
  res: Response
) {
  try {
    const { category, search } = req.query;

    if (category !== undefined) {
      if (
        typeof category !== "string" ||
        !FOOD_CATEGORIES.includes(
          category as (typeof FOOD_CATEGORIES)[number]
        )
      ) {
        return res.status(400).json({
          message: "Invalid food category",
          allowedCategories: FOOD_CATEGORIES,
        });
      }

      const foods = await getFoodsByCategory(category);

      return res.status(200).json({
        foods,
      });
    }

    if (search !== undefined) {
      if (
        typeof search !== "string" ||
        search.trim().length === 0
      ) {
        return res.status(400).json({
          message: "search must be a valid string",
        });
      }

      const foods = await searchFoods(search.trim());

      return res.status(200).json({
        foods,
      });
    }

    const foods = await getFoods();

    return res.status(200).json({
      foods,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to get foods",
    });
  }
}